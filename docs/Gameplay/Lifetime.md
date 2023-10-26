# 生命周期(MonoBehavior)

::: tip
笔面试中，特别喜欢考`Awake`,`OnEnable`,`Start`,`FixedUpdate`,`Update`的执行顺序。除此之外，还需要掌握一些针对特殊需求的实现方法。例如`Update`里适合写什么逻辑等、`FixedUpdate`里适合写什么逻辑等。
:::

<center>来张官方的图</center>
<img  src="./../img/monobehaviour_flowchart.svg" />


## 例子

### 时间停止 & 时间加速

在一些rts中（如群星）玩家需要暂停时间进行一系列复杂的操作；又或是手游中的二倍速、三倍速战斗，所以如何实现暂停时间和加速时间的逻辑呢（除了UI之外的游戏逻辑都必须停止）

暂停时间 - 实现方法：
- 设置`Time.timeScale = 0`
- 如果要恢复时间，在`Update`或协程中执行判断逻辑恢复`Time.timeScale = 1`
    - `Time.timeScale = 0`时`FixedUpdate`不会执行，所以UI逻辑应该放到`OnGUI`或`Update`中

加速时间 - 实现方法：
- 设置`Time.timeScale = k`, k > 1, k为2就是加速两倍


在下面的代码中，可以观察到一次`fixedUpdate`和随时间不断增加的`update`
``` csharp
// 这是一个挂载了的 MonoBehavior
private void Awake()
{
    Time.timeScale = 0;
}
private void Update()
{
    Debug.Log("update");
}
private void FixedUpdate()
{
    Debug.Log("fixedUpdate");
}
```

::: details 一个gpt回答错误的例子
当`Time.timeScale`的值为0时，`Update`和`FixedUpdate`函数将不会被调用。

- `Update`函数是在每一帧绘制之前被调用的，通常用于处理与时间相关的逻辑和更新游戏对象的位置、动画等操作。当`Time.timeScale`为0时，即时间停止，`Update`函数将不再被调用，因为游戏逻辑因为时间停止而暂停。

- `FixedUpdate`函数用于处理物理模拟，它在固定的时间间隔内被调用（默认为每秒调用50次，可以在Project Settings中修改）。与`Update`函数不同，`FixedUpdate`函数受到`Time.timeScale`的影响，在时间停止时仍然会被调用，但是由于时间缩放为0，物理模拟的计算也会暂停。

因此，当`Time.timeScale`为0时，`Update`和`FixedUpdate`函数都将停止执行。如果你想在时间停止时执行特定的逻辑，可以考虑使用协程（Coroutine）或其他方式来模拟所需的行为。

:::

## 参考
- [Order of execution for event functions - Unity Documentation](https://docs.unity3d.com/Manual/ExecutionOrder.html)