# 碰撞箱

碰撞箱不仅仅可以解决**物理**碰撞问题（从两球相撞到赛车游戏），还可以解决RPG中的互动问题（逻辑碰撞）。

两个同时拥有`collider`组件的Game Object需要至少其中一个拥有`rigid body`才能发生碰撞事件。

## Collider

Collider（碰撞器）组件是Unity中用于处理碰撞检测和触发器事件的组件之一。它定义了游戏对象的物理形状，可以与其他游戏对象进行交互。下面是Collider组件的一些常用属性和它们的作用：

关键属性： 
- `IsTrigger`（是触发器）：`IsTrigger`属性确定碰撞器是否为触发器。如果启用了该属性，碰撞器将不会产生物理碰撞响应，而是触发触发器事件（例如`OnTriggerEnter`、`OnTriggerStay`和`OnTriggerExit`）。
- `LayerOverride`：控制他影响的层，如战斗技能的碰撞器可以只工作在角色层，减少不必要的碰撞计算开销
    - 关于collider和rigid body对Layer override的覆盖，rigidbody的优先级高于collider的

拥有碰撞器的Game Object可以触发碰撞事件，需要自行监听并实现相应功能
- `OnCollisionEnter`、`OnCollisionStay`和`OnCollisionExit`

``` csharp
// 一段被碰撞后造成1点伤害的代码
private void OnCollisionEnter(Collision collision)
{
    CombatContextManager.Instance.DellDamage(null, transform, 1);
}
```

### Mesh Collider和其他Collider

Mesh Collider可以完美的贴合模型的碰撞面，但其性能开销是非常大的。

官方建立使用大模型作为MeshCollider时，可以先拆成小模型，在各自做MeshCollider。

实际开发中，可以使用`BoxCollider`, `SphereCollider`, `CapsuleCollider`做碰撞体的简化。如人形角色的碰撞体，大部分情况可以使用`CapsuleCollider`作为平替。

## rigid body

Rigidbody组件是Unity中用于模拟物体物理行为的组件之一。它可以赋予游戏对象真实的物理特性，包括重力、碰撞和惯性。

::: details gpt介绍主要属性及其用法

1. Mass（质量）：Mass属性定义了游戏对象的质量，影响它对外力的响应和物理模拟的效果。较大的质量值意味着对象更难受到外力的移动或改变方向。

2. Drag（阻力）：Drag属性模拟了游戏对象在运动中遇到的空气或液体阻力。较高的阻力值会减缓游戏对象的速度，使其更快地停下来。

3. Angular Drag（角阻力）：Angular Drag属性定义了游戏对象在旋转时所受到的阻力。增加角阻力会导致游戏对象更快地停止旋转。

4. Use Gravity（使用重力）：Use Gravity属性确定游戏对象是否受到重力的影响。启用此属性后，游戏对象会受到场景中的重力影响，否则它将不受重力影响而漂浮。

5. Is Kinematic（是运动学物体）：Is Kinematic属性指示物体是否为运动学物体。如果启用了该属性，物体将不受物理引擎的影响，你可以通过代码直接控制物体的位置和旋转。

6. Constraints（约束）：Constraints属性控制游戏对象在物理模拟中的约束情况。你可以限制对象的位置和旋转在某些轴上的运动，或者保持物体在某些轴上保持静止。
:::

::: details 一次`AddForce`引发的问题

我有一个需求是“在0.2秒把物体向前推进20m”，那我的force应该是`var force = transform.forward * 20 / 0.2f`，或者是这个数的10倍，100倍等，然而实际上我需要使用`var force = transform.forward * 1000 / 0.2f`才能达到我想要的效果。

这和AddForce的默认模式`ForceMode.Force`：`Add a continuous force to the rigidbody, using its mass.`中的`continuous`有关，我的物理处理帧刚好是一秒50帧。

解决方案：通过`GetComponent<Rigidbody>().velocity = transform.forward * 20 / 0.2f;`解决，或使用`ForceMode.VelocityChange`

:::

## 实现原理和使用须知

Unity作为一个成熟的游戏引擎，配置正确的Layer可以使碰撞运算的性能达到state of art，除非有一些特殊的需求（例如多线程模拟人物骨骼，或一个简化的检测系统等），一般都可以用碰撞箱做范围检测。

例如：
- 在射击游戏内检测子弹是否命中敌人（如果出于一些原因勾选`IsTrigger`导致rigidbody的`ContinueDetection`不能生效，可能需要自行处理运动过快导致的碰撞未触发问题）
- 在塔防游戏内检测敌人是否在攻击范围
- 在rpg中检测可交互物体是否在交互范围
- 等等

需要注意的是，尽量使用Unity提供的基础碰撞体（Box，Sphere，Capsule等），避免MeshCollider的使用。

关于其原理，检测部分应该涉及空间分割算法和包围盒等优化；物体计算方面比较复杂，一般使用外部的物理模拟库实现。
> 补充更多内容和参考文章，如服务端计算、空间算法等 WIP

## 参考
[Colliders - Unity Official Tutorials - Youtube](https://www.youtube.com/watch?v=bh9ArKrPY8w)