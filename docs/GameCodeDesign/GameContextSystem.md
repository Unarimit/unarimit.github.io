# 游戏上下文系统设计

处理所有逻辑业务的系统(如造成伤害, 仓库变化, 人物死亡等)，可能需要一定的解耦，要保证之后可以打补丁（热更新）

WIP

## 为什么要设计游戏上下文

如果游戏里存在很多agent，他们的每一次行为都需要了解敌人的位置、友军的位置等场景信息，并且每次做出的行为都希望被统一处理（如造成伤害）。那么你需要游戏上下文。

例如在回合制RPG游戏里，规定了每一位角色的行动顺序，他们还需要根据技能描述指定目标(如群体，单体)，那这些访问方法最好在游戏上下文中提供。因为：
- 后续可能会对索敌方式做更改（如隐身单位不能被群体索敌选中）
- 角色的行动顺序可能受某些角色影响
- 伤害效果的实现可能发生变动
- 角色死亡需要调用处理掉落物的函数
- ...

## 从一些框架出发
- ECS：面向数据，Cache友好的设计
- QFramework, GameFramework


## 分离上下文相关逻辑

为了实现相对独立的游戏上下文，需要把涉及多个独立模块交互的功能封装在里面。最典型的就是造成伤害，伤害可能受防御属性影响，可能需要统计伤害量，可能死亡效果需要UI层做一些相应，可能...

这里列举一些我能关注到的需要纳入到上下文范围的逻辑：
- 伤害
- 创建角色
- 获取敌人列表
- 涉及多个模块参与的视图模型
- 角色行动顺序（回合制）
- 角色复活（射击游戏）

有些地方和OOP思想有冲突，需要进一步理解

## 使用装饰者模式拓展上下文

随着游戏内容的逐渐丰富，我们的`游戏上下文`类，可能超过400行代码，并还有继续增加的趋势，这毫无疑问增加了我们维护它的成本（需要理解其中的代码）。即便我们使用`region`框住逻辑相同的代码块，他看起来仍然很乱。不如使用装饰着模式，将他彻底切割。（成员属性仍然保留，切了，但没切完）

例如，AI常用的按条件寻找敌人位置的方法，就可以封装在`AiInformationHelper.cs`类中，提供一系列寻找敌人坐标的方法。
> 当然，这些函数也可以封装在AI基类中，被称为`子类沙盒模式`

我实现的代码: [AiInformationHelper.cs](https://github.com/Unarimit/my-topdown-shooting-game/blob/9981b70eb553e8c827eaab56de2667d0f3f07d3c/Assets/Scripts/CombatLogic/ContextExtends/AiInformationHelper.cs)

## 例子

在**上帝视角射击游戏**的设计中，我的子弹碰撞检测器是用下方代码实现的。

``` csharp
public class DestructiblePersonController : MonoBehaviour
{
    public int HP = 10;
    private int _fullHp;

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.transform.tag == "Bullet")
        {
            HP -= 1;
            HittedEvent.Invoke(transform, collision.transform.GetComponent<BulletController>().InitiatePos);
            Shield.Simulate(1.0f);
            Shield.Play();
            Shield.startColor = new Color(1, 1, 1) * (float)HP / _fullHp;
        }
        if (HP == 2) Shield.Stop();
        if (HP <= 0) {
            EorTMark.SetActive(false);
            HP0Event.Invoke(transform);
        }
    }
}
```

这个检测器还承担了角色HP属性的计算和存储，我认为这样做是很不好的。应该将关于HP的判断分离处理，因为这属于游戏逻辑的计算。于是改成了下面这个样子：

``` csharp
public class DestructiblePersonController : MonoBehaviour
{
    // 加入上下文
    private CombatContextManager _contxt;

    private void OnCollisionEnter(Collision collision)
    {
        if (collision.transform.tag == "Bullet")
        {
            CombatContextManager.Instance.DellDamage(null, transform, 1);
            HittedEvent.Invoke(transform, collision.transform.GetComponent<BulletController>().InitiatePos);
            Shield.Simulate(1.0f);
            Shield.Play();
            Shield.startColor = new Color(1, 1, 1) * 
                (float)_contxt.GetOperatorCurrentHP(transform) / _contxt.GetOperatorMaxHP(transform);
        }
        
    }
    public void DoDied()
    {
        HP0Event.Invoke(transform);
    }
    public void GotDMG()
    {
        if (_contxt.GetOperatorCurrentHP(transform) == 2) Shield.Stop();
    }
}
```

这样一来，所有的游戏逻辑的计算都丢给了`CombatContext`去处理，碰撞检测器只需要检测碰撞并开启特效就行了。相当于分离了游戏逻辑和物理&画面逻辑。