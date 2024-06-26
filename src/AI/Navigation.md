# 寻路

说到寻路，一定会想到A\*算法，A\*是一种很有名的路径搜索算法，作为启发式算法，有独特的构造方式。但在游戏中，为了贴合具体的场景（例如三维场景下的高度差，二维场景下的跳跃等），在图的构建方面会比较复杂。

## 游戏中的寻路算法

WIP 2D，3D

## Unity方案-AINavigation

`AINavigation`是一种基于A\*和网格的unity内置寻路方案。由`NavMesh`和`NavMeshAgent`两个主要组件构成，起使用流程如下：

1. Bake NavMesh，根据使用Navigation版本不同，操作会有差异
    - 通过Mesh或碰撞箱建立`NavMesh`
    - 通过`NavMeshObstacle`添加空气墙
    - 通过`NavMeshLink`添加跳跃等导航指引
    - 通过`NavMeshModifier`给障碍物添加过滤属性
    - 可以根据不同的agent属性添加不同的`NavMesh`
2. 给人物添加`NavMeshAgent`
    - 不要和`CharacterController`挂到一个go上
3. 调用`NavMeshAgent.Move(Vector3 offset)`，`NavMeshAgent`会自动导航至目标

`NavMeshAgent`和`CharacterController`一样，是操控具体人物的组件，依赖于NavMesh Surface等配置。他也向`CharacterController`一样，自带一些碰撞和移动策略。有以下三类属性:
- `Steering`: 控制移动表现（模拟人物在不同的环境，如冰面，路面等）
- `Obstacle Avoidance`: 控制agent躲避其他agent，可以通过设置priority实现优先躲避，或设置Quality直接取消躲避。
    - 这个属性抽象在他不受物理碰撞设置的影响
- `PathFinding`: 一些寻路策略的应用

**具体实现详见参考中的视频**

### 不同层级的碰撞

如果想实现空中单位和陆地单位不相互碰撞，可以通过将空中单位躲避优先级（`Obstacle Avoidance -> priority`）调高，并躲避质量（`Obstacle Avoidance -> Quality`）为None的方式实现。
- 当然，还是为空中专门设计类似“地面”的结构比较好。

### 运行时更新NavMesh

`navMeshSurface.UpdateNavMesh(navMeshSurface.navMeshData);`

### NavMesh的使用方法

在烘焙`NavMesh`后，给角色挂载`NavMeshAgent`组件，实现代理式寻路。程序只需制定好地点和速度，`NavMeshAgent`组件就会控制角色按最短路径移动到目标地点。

下面是一段自己写的移动到目标位置的代码和使用NavMesh的代码的对比（未考虑寻路和遮挡）
::: details 展开查看

``` csharp
IEnumerator MoveOnceSub(float MaxSpeed)
{
    float Speed = 0;
    while (transform.position != MovingLocation)
    {
        if (!Moving) break;
        var aim = MovingLocation - transform.position;
        aim.y = 0;
        var moveVec = aim.normalized * Time.deltaTime * Speed;

        Speed = Accelarator(Speed, MaxSpeed, aim.magnitude); // 自己写的加速度函数
        _animator.SetFloat(_animIDSpeed, Speed);
        var flag = _controller.Move(moveVec);
        // 防止阻挡死循环
        if (flag == CollisionFlags.CollidedSides || flag == CollisionFlags.Sides) Speed = 0;

        // 防止运动超出界限
        if (Speed == 0) break;
        yield return null;
    }
    Moving = false;
    _animator.SetFloat(_animIDSpeed, 0);
    yield return null;
}
```

使用NavMesh，代码简化成了：

``` csharp
public void MoveOnce(Vector3 location, float MaxSpeed)
{
    _navMeshAgent.speed = MaxSpeed/2;
    _navMeshAgent.SetDestination(location);
    // animator里面的速度在update里面更新
}
```
:::


## 优化

考虑到在rimworld中表现糟糕的寻路延迟卡顿，寻路是否可以异步进行？（是因为寻路耗时，还是NavMap创造耗时？）


## 参考

- 新版Navigation：[New AI Navigation in Unity - Youtube](https://www.youtube.com/watch?v=u2EQtrdgfNs)
- 旧版Navigation：[Making A MOBA Character in 2023 - #1: INTRODUCTION (Unity 2023 Tutorial) - Youtube](https://www.youtube.com/watch?v=p3AB_GP45C4)
- NavMesh实现原理：[Navigation Meshes and Pathfinding](https://www.gamedev.net/tutorials/programming/artificial-intelligence/navigation-meshes-and-pathfinding-r4880/)
- [ai.navigation@2.0 - Unity Manual](https://docs.unity3d.com/Packages/com.unity.ai.navigation@2.0/manual/CreateNavMesh.html)