<img src="../img/abilitySystem-0.png">

# 技能系统

技能系统的目的是为了减少后续开发难度，和**热更新**的可能，采用数据驱动方法设计。要求在一开始时就考虑到各种效果的表现方式。并使用继承、封装等编程思想建立统一标准。

## 如何设计技能系统

统计所有技能的需求，把其中技能与技能之间不同的逻辑抽离出来。
- 技能的释放方式可能不同，包括原地释放、抛射释放、从天而降释放等，可以抽离出来设计
- 技能产生的影响可能不同，包括眩晕、减速、减防等，可以抽离出来设计
- 技能肯定都有释放者、冷却、造成伤害，这部分就可以统一设计

对于被抽离出来的类，通过继承关系，写到基础的技能类里面，方便调用。

另外还可以配合外部代码设计自由度更高的技能，同样依赖对逻辑的抽离。为了提高鲁棒性，还应该提供外部代码专用的接口，而不是从为游戏物体添加脚本开始。
> 参考设计模式中的 '字节码模式' 和本文详细案例中最后一小节。

::: tip 需要注意的是：
没有什么设计模式是可以一劳永逸的，都要随着需求变更不断迭代。利用设计模式的意义在于提供一定的可拓展性；并且重复的逻辑不需再写，减少了出现bug的可能性。
:::

## 详细案例

### 先介绍一个错误实现的例子

在我的[上帝视角射击游戏](../Projects/TopShooting.md)里，我的一个拥有两个技能的角色是这样设置技能触发机制的：

哦，对了，两个技能分别是：**投掷手雷**和**发射激光**，顺便附上[当时的代码目录 - github](https://github.com/Unarimit/my-topdown-shooting-game/tree/e250ab2cdbcd69eb90f07269da4d92570c8065d1/Assets/Scripts/CombatLogic)

<center><img  src="./../img/abilitySystem-1.jpg" /></center>

<center>其中上面那条绿线的目的地标错了，不要介意</center>


这里将技能释放分为三个步骤
1. 实例化技能
    - 根据按键不同实例化不同的技能prefab
    - 这里省略了表示技能属性（伤害，延时，取对象）的类，采用随用随new的设计模式（
2. 放入检查列表
3. 在游戏系统中触发技能的后续效果
    - 投掷物爆炸效果、伤害计算等

这样一个技能系统，显然是不合理的。
1. 每加一个技能，就要加一个类， 每改动一个实现方式，就要改技能类里的代码。
2. 不同的技能要添加不同的控制类。
    - 因为每个技能的逻辑不一样，特效也不一样。
3. 要在角色控制类中修改对应的释放技能。
4. ...

当然这里的触发延时逻辑的接口化还是不错的。

<br/>

### 更好的实现-技能系统雏形

我们可以使用数据驱动设计的思想，通过数据调用写好的逻辑。

先看看方案比较吧：

| 上文方法                       | 这个方法                 |  
| -------------                 |-------------              | 
| 每加一个技能，就要加一个控制类。😡     | 每加一个技能，添加一段json。😁 |
| 技能的控制类之间差异很大，不便维护。😡  | 共用一个控制类。😁        | 
| 要在角色控制类中修改对应的释放技能。😡| 不需关注角色控制类。😁      | 
| 不管什么需求都添加类。            | 需求超出一开始的预期需要改技能系统。😨|

然后再来着手设计方案：

1. 设计技能类（纯数据类）
2. 新建ScriptableObject存储技能类 
    - “添加一段json”是一种形容添加简单的形容词
3. 给角色绑定指定下标的技能 
4. 设计释放器
    - 释放器按照技能类的指导来释放

通过一番折腾，设计出了如下图所示的技能系统（当然技能的属性还不是很全，很多东西都没考虑到）。顺便附上[当时的代码目录 - github](https://github.com/Unarimit/my-topdown-shooting-game/tree/25ddf6847c97e6af37b52c625af3415f8f33a9d2/Assets/Scripts/CombatLogic)


<center><img  src="./../img/abilitySystem-2.png" /></center>

<center>看不清楚可以右键图片在新标签页中打开哦</center>

然后**投掷手雷**就变成了`技能1：抛出一个圆球Prefab，持续时间3秒` + `技能2：爆炸造成范围伤害`的组合。**发射激光**则变成了`技能0：射出一个圆球Prefab并造成伤害`。

<center><img  src="./../img/abilitySystem-3.png" /></center>
<center>对技能的配置</center>

**但是，他现在的可玩性也很低，因为只能在投、抛、检测并伤害中组合。**

这时候就需要在技能控制器中引入`Buffs`或更多效果类型，增加组合种类。
- 如眩晕，中毒，回血等效果，甚至可以做一个闪现技能，因为技能控制器中有释放者的Transform！
- 这时候利用lua等热更新技术，可以方便的完善技能的多样性。

### 更好的实现-释放、选择、影响

承接上文，为了避免在“投、抛、检测并伤害”上完善新方式的时候重复修改类型内的代码，将技能的释放过程拆解为三个部分（释放、选择目标、影响目标），解耦控制。下图是我按照上述方法拆解后的调用关系。（附上[当时的代码目录](https://github.com/Unarimit/my-topdown-shooting-game/tree/6b7f94746778638dcb6b510d402f715ba4ab42d5/Assets/Scripts/CombatLogic/Skill)）

<center><img src="../img/abilitySystem-4.png"></center>

- 技能管理器`SkillManager`调用`CastSkill`时，会初始化技能释放器`Releaser`，并将技能信息传递给`Releaser`。
- `Releaser`根据技能信息，使用**反射**生成对应的选择器`Selector`和影响器`Impactor`，并将信息传入。
- `Selector`根据算法选择到目标后，调用`List<Impactor>`的`Impact`
- `Impactor`对目标造成影响，如伤害，减速，生命恢复等。

这样一来，添加技能的方式就变为：

1. 如果现有的`Releaser`、`Selector`和`Impactor`能组合出技能，就通过配置表组合。
2. 如果不能，完成`Releaser`、`Selector`和`Impactor`中的一个或多个，满足1的条件后，通过配置表组合。

相比上一个实现方式，这种实现方式减少了“超出预期需要改技能系统”时的复杂度，并且耦合性更低了。
> 但考虑到有些技能逻辑特殊到不需要复用，这样实现就有些太复杂了，可以考虑“可编程技能系统的实现”，将会在`更好的实现-配合热更新`中介绍。

最后还可以通过csv文件+`Editor Menu`脚本的方式完成配置表的搭建，配置表如下图所示：

<center><img src="../img/abilitySystem-5.png"></center>

`Editor Menu`脚本的代码：[GenerateSkillInfoByCsvFile.cs](https://github.com/Unarimit/my-topdown-shooting-game/blob/6b7f94746778638dcb6b510d402f715ba4ab42d5/Assets/Scripts/Editor/GenerateSkillInfoByCsvFile.cs)，它的功能为将csv配置表转化为`更好的实现1`中的`ScriptableObject`。

在这个方案中，将技能的释放过程拆解为三个部分（释放、选择目标、影响目标）带来的好处如下：
- 方便进行排列组合
- 可以根据各个部分组合生成技能描述，非常便利

### 更好的实现-配合热更新

将技能的释放过程拆解为三个部分后，我们可以任意组合它们，丰富技能逻辑的数量。但对于一些特定的需求（比如我希望有一个投掷物画一个五角星，对投掷物的轨迹上的敌人造成伤害）却不能通过数据配置，而且专门为它设计一个`Selector`类好像也不太值当（因为重用的可能不高），所以我们可以尝试配合热更新，用**外部代码**实现。
> 类似设计模式中的字节码模式，当然我们不可能自己搓一个虚拟机，这里使用一种热更新方案-`XLua`实现（点击查看我总结的关于[热更新方案](../GameBuild/Mod&Hotfix)和[XLua](../Lua/UseXLua.md)的介绍）。

为了使用外部代码表示技能过程，参考上文中`Releaser`、`Selector`和`Impactor`的设计，且考虑到仍可以利用其中的组件达到重用代码的效果，我们从上述的三个部分出发，考虑以下做法：
- 设计外部代码专用的`Selector`，通过委托调用外部代码
- 使用外部代码实现`Impactor`的接口（方法的集合），传递给特定的`Releaser`
    - `Selector`也可以用上述方式实现，只不过`Selector`可能会使用碰撞器，就代表要继承MonoBehaviour，情况会复杂很多（例如`XLua`就不支持继承类）

下面是一个例子：“画一个五角星，对轨迹上的敌人造成伤害”，效果如下：

<img src='../img/abilitySystem-6.gif'>

使用XLua实现，代码如下：

```csharp
// C#通过外部代码初始化选择器
/// <summary>
/// 利用碰撞箱的选择器，用lua指定轨迹
/// </summary>
internal class LuaTriggerSelector : MonoBehaviour, ISelector
{
    List<IImpactor> _impactors;
    CombatSkill _skill;
    Action<GameObject, Transform, Vector3> action;
    public void Init(List<IImpactor> impectors, Transform caster, CombatSkill skill, Vector3 aim)
    {
        _impactors = impectors;
        _skill = skill;
        action =  MyServices.LuaEnv.Global.GetInPath<Action<GameObject, Transform, Vector3>>(skill.SkillSelector.Data);
        action(gameObject, caster, aim);
    }
    // 省略了通过`OnTriggerEnter`造成`Impact`的函数
    private void OnTriggerEnter(Collider collision);
}
```

```lua
-- lua执行技能的选择逻辑，是在游戏开始时载入的
LuaTestSkill = function (go, caster_trans, aim_pos)
    local comp = go:GetComponent("LuaTriggerSelector") -- 应该传进来的，懒得改了
    local size = 3
    local points = {}
    -- 五角星的五个点
    for i = 1, 5, 1 do
        local angle = i * 72 * CS.UnityEngine.Mathf.Deg2Rad;
        local x = aim_pos.x + size * CS.UnityEngine.Mathf.Cos(angle);
        local z = aim_pos.z + size * CS.UnityEngine.Mathf.Sin(angle);
        points[i] = CS.UnityEngine.Vector3(x, aim_pos.y, z)
    end
    go.transform.position = points[1]
    local step = 0.2
    local util = require 'xlua.util'
    comp:StartCoroutine(
        util.cs_generator(function ()
            coroutine.yield(CS.UnityEngine.WaitForSeconds(step)) -- 强行前摇
            go:GetComponent('Collider').enabled = true;
            CS.DG.Tweening.ShortcutExtensions.DOMove(go.transform, points[3], step);
            coroutine.yield(CS.UnityEngine.WaitForSeconds(step))
            CS.DG.Tweening.ShortcutExtensions.DOMove(go.transform, points[5], step);
            coroutine.yield(CS.UnityEngine.WaitForSeconds(step))
            CS.DG.Tweening.ShortcutExtensions.DOMove(go.transform, points[2], step);
            coroutine.yield(CS.UnityEngine.WaitForSeconds(step))
            CS.DG.Tweening.ShortcutExtensions.DOMove(go.transform, points[4], step);
            coroutine.yield(CS.UnityEngine.WaitForSeconds(step))
            CS.DG.Tweening.ShortcutExtensions.DOMove(go.transform, points[1], step);
        end))
end
```

## 总结

以上，文章所描述的技能系统的设计就先到此为止了，这里留下了一个问题：怎样设计出具有可拓展性和鲁棒性的技能系统呢？如果考虑热更新又如何？

> 我认为可以参考一些steam workshop中物品比较多的游戏MOD的设计，如环世界-Rimworld（利用文本配置和c#编译的dll），群星-Stellaris（利用文本配置和lua），暗黑地牢（利用文本配置）；还有一些steam之外的，如我的世界（利用jar包）和远行星号-StarSector（利用jar包）等。

> 像是mmorpg，手游等依赖热更新的场景，可选方案可能就比较有限。


## 参考
- 头图：[New collage with ALL ability icons in Dota2. - Reddit](https://www.reddit.com/r/DotA2/comments/mvd6v9/new_collage_with_all_ability_icons_in_dota2_check/)
- [第三部分:Unity技能系统 - Bilibili](https://www.bilibili.com/video/BV1WJ411T7YQ)
- [实现高扩展性的通用游戏技能系统 flashyiyi - 知乎](https://zhuanlan.zhihu.com/p/92651085)