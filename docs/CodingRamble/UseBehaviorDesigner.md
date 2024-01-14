# 记初次使用Unity行为树插件-Behavior Designer

最近在尝试AI模块的开发，小记一下
> 可以先提前学习一下行为树的理论知识，推荐这篇文章：[游戏AI行为决策——行为树 - cnblog](https://www.cnblogs.com/OwlCat/p/17871494.html)

目标是实现：
- `Behavior Designer`的基础用法
- 使用代码控制`Behavior Designer`的状态

## 从一个拓展库的Demo出发

接触`Behavior Designer`，是因为我对他的[Tactical Pack](https://opsive.com/assets/behavior-designer-tactical-pack/)很感兴趣，如果能接入到我的项目中（[MyTDS](../Projects/TopShooting)）就能大大提高我的开发效率。不多说了，我们直接开始。

"Behavior Designer Tactical Pack"示例场景的`Hierarchy`如下：

<img src='../img/UseBehaviorDesigner-1.png'>

标红的部分中存储了agent和插件中的行为树组件`BehaviorTree`，标绿的名为`Main Camera`的gameobject（以下简称go）中挂载了对行为树的配置脚本`BehaviorSelection`（怪阴间的，怕别人能找到是吧）

对于`BehaviorTree`：
- 这些行为树（有很多不同的Tactical），都只有两个节点（树根和叶子节点），居然把整个策略用一个节点表示...
    - 好在我们可以查看叶子节点的脚本，看看他的策略是怎么写的
- 他依赖go中挂载的`NavMeshAgent`组件和实现了`IAttackAgent`的组件
- 在叶子节点中，配置了攻击目标为带`Player TAG`go，若场景不存在带`Player TAG`的go，还会报错...（可能是需要在到达这个节点前先判断敌人是否存在）

对于`BehaviorSelection`:
- 字如其名的负责选择`Tactical Pack`中的策略（负责响应UI，选择对应的策略），即切换Agent go中`BehaviorTree`的激活状态

这样一来我们便了解了`Tactical Pack`中策略的工作原理，策略节点封装了完整的策略流程（移动+攻击），部分实现依赖于角色go上挂载的相关组件。若要配置策略节点的参数，例如攻击目标、队长等属性，可以在`Behavior Designer`的编辑器中，也可以通过代码的方式，调用`BehaviorTree`组件的`SetVariableValue`方法。



## 参考
- [游戏AI行为决策——行为树 - cnblog](https://www.cnblogs.com/OwlCat/p/17871494.html)
- [Behavior Designer Tactical Pack](https://opsive.com/assets/behavior-designer-tactical-pack/)
- [Behavior Designer插件文档](https://opsive.com/support/documentation/behavior-designer/overview/)