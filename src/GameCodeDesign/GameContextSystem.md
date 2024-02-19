# 游戏上下文系统设计

游戏中的交互，在改变数据模型的时候往往还需要触发一些反馈效果（如伤害数字）。如果能用一个类去封装涉及数据模型变动的逻辑，就能解耦游戏状态逻辑和操控、显示逻辑。这个类就可以被称作“上下文类”，且往往全局可访问（采用单例模式或设为静态类）。
- 上下文类是一种通用的解决方案，可以在设计的时候运用MVC模式。

> 上下文类和MVC在思想上有类似的地方，都以解耦逻辑为出发点。但上下文类是一种通用的解决方案，而MVC是一种特定的软件架构模式。上下文类通常用于管理特定领域的状态和数据，而MVC模式更关注于分离业务逻辑、数据和用户界面。

## 为什么要设计游戏上下文

> 可以简单归纳为封装的好处

如果游戏里存在很多agent，他们的每一次行为都需要了解敌人的位置、友军的位置等场景信息，并且每次做出的行为都希望被统一处理（如造成伤害）。那么你需要游戏上下文，它可以使功能**可拓展**并一定程度**解耦**。

例如在回合制RPG游戏里，规定了每一位角色的行动顺序，他们还需要根据技能描述指定目标(如群体，单体)，那这些访问方法最好在游戏上下文中提供。因为：
- 后续可能会对索敌方式做更改（如隐身单位不能被群体索敌选中）
- 角色的行动顺序可能受某些角色影响
- 伤害效果的实现可能发生变动
- 角色死亡需要调用处理掉落物的函数
- ...


## 分离上下文相关逻辑

为了实现相对独立的游戏上下文，需要把涉及多个独立模块交互的功能封装在里面。最典型的就是造成伤害，伤害可能受防御属性影响，可能需要统计伤害量，可能死亡效果需要UI层做一些相应，可能...

这里列举一些我能关注到的需要纳入到上下文范围的逻辑：
- 伤害
- 创建角色
- 获取敌人列表
- 涉及多个模块参与的视图模型
- 角色行动顺序（回合制）
- 角色复活（射击游戏）

> 有些地方和OOP思想有冲突，需要进一步理解

> 例如每秒回血，和k秒后复活机制，可能需要给Model对象添加一个`Update`成员函数？

## 使用拓展方法拓展上下文

随着游戏内容的逐渐丰富，我们的`游戏上下文`类，可能超过400行代码，并还有继续增加的趋势，这毫无疑问增加了我们维护它的成本（需要理解其中的代码）。即便我们使用`region`框住逻辑相同的代码块，他看起来仍然很乱。不如使用装饰着模式，将他彻底切割。（成员属性仍然保留，切了，但没切完）
> 也可以使用`组件模式`，让`游戏上下文`作为纯粹包含游戏实体数组的数据类。

例如，AI常用的按条件寻找敌人位置的方法，就可以封装在`AiInformationHelper.cs`类中，提供一系列寻找敌人坐标的方法。
> 当然，这些函数也可以封装在AI基类中，被称为`子类沙盒模式`

我实现的代码: [MyTDS-AiInformationHelper.cs](https://github.com/Unarimit/my-topdown-shooting-game/blob/9981b70eb553e8c827eaab56de2667d0f3f07d3c/Assets/Scripts/CombatLogic/ContextExtends/AiInformationHelper.cs)

## 使用MVC模式设计上下文

解决代码量更多导致逻辑复杂的方式就是进一步封装，可以在`游戏上下文`类中设计各种`Controller`管理不同的`Model`。

一个使用MVC模式设计的上下文可能是这样的

```csharp
class GameContext : MonoBehaviour{
    // 注意区分它虽然和控制Go表现的组件一样叫Controller，但作用完全不同
    public CombatOperatorController CombatOperatorController;// 管理角色模型(M)的C
    public ResourceControler ResourceControler; // 管理资源模型(M)的C
    public LevelController LevelController; // 管理关卡模型(M)的C
    // ...

    private void Awake(){
        // 在这里初始化
        CombatOperatorController = gameObject.AddComponent<CombatOperatorController>();
        // ...
    }
}
```

当然可能一个涉及角色模型的`Controller`就能放下1000行代码，这时该如何解耦就是个相当有难度的问题了。

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

## 参考
- [上下文和MVC的区别 - Copilot](https://www.bing.com/)

::: details 上下文和MVC的区别
Q: 在程序设计中，一些后端框架经常有一些上下文类，如`DatabaseContext`，我认为这些上下文类和MVC的设计方式在思想上有重叠的地方，你可以给我讲讲它们两者的区别吗？

A: 当谈到程序设计中的上下文类和MVC（模型-视图-控制器）设计方式时，它们确实在某些方面存在一些重叠，但也有明显的区别。让我们来详细探讨一下：

MVC（模型-视图-控制器）模式：
- 简介：MVC是一种常见的软件架构模式，用于解决在软件系统中经常出现的问题。它将应用程序分为三个基本部分：模型、视图和控制器。
- 组成部分：
    - 模型（Model）：负责存储系统的中心数据。它封装了相应的数据并输出执行特定应用程序处理的过程。模型还提供了访问数据的函数，供视图组件使用。
    - 视图（View）：将信息显示给用户。可以定义多个视图，每个视图负责不同的数据呈现方式。
    - 控制器（Controller）：处理用户输入的信息。它从视图读取数据，控制用户输入，并向模型发送数据。控制器是应用程序中处理用户交互的部分，负责管理与用户的交互。
- 目的：
    - 实现动态的程序设计，简化对程序的修改和扩展。
    - 分离信息的内部表示和呈现方式，接受用户的请求。
    - 允许有效的代码重用，将模型和视图的实现代码分离，使同一个程序可以使用不同的表现形式。

上下文类：
- 概念：上下文类通常用于后端框架，例如数据库访问、事务管理等。它们是一种通用的、可重用的解决方案，用于在给定上下文中的软件体系结构中经常出现的问题。
- 作用：上下文类负责存储特定上下文中的状态和数据，以便其他组件可以访问。例如，DatabaseContext可能包含数据库连接、事务管理等。
- 区别：
    - 上下文类是一种通用的解决方案，而MVC是一种特定的软件架构模式。
    - 上下文类通常用于管理特定领域的状态和数据，而MVC模式更关注于分离业务逻辑、数据和用户界面。
    - 上下文类不一定遵循MVC的严格分层，而MVC模式明确将应用程序分为模型、视图和控制器。

总之，MVC模式和上下文类都是在不同层次上解决软件设计中的问题。MVC模式更关注于分离不同组件的职责，而上下文类更关注于管理特定上下文中的状态和数据。
:::