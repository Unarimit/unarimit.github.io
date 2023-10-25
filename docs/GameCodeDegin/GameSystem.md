# 游戏系统设计

处理所有逻辑业务的系统(如造成伤害, 仓库变化, 人物死亡等)，可能需要一定的解耦，要保证之后可以打补丁（热更新）

## 控制逻辑分离

在游戏逻辑，物理逻辑，动画逻辑中区分出游戏逻辑


### 例子

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