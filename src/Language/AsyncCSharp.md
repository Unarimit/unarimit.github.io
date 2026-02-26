# 异步（C#）

> 相关章节：[多线程](../CodeBase/MultiThread)、[异步编程实践](../CodeImplement/AsynchronousInPractice)

C#提供了[三种异步编程模型](https://learn.microsoft.com/zh-cn/dotnet/standard/asynchronous-programming-patterns/)。**基于任务的异步模式(TAP)** 、基于事件的异步模式 (EAP)、异步编程模型 (APM) 。其中，后两者较少使用，故文档中不多涉及。

[代码设计-异步编程](../GameCodeDesign/Asynchronous)中介绍了一些TAP的用法和注意事项。

其他的一些使用方法，甚至是不常用的“取消”和“进度报告”，[文档中已经描述的很清楚了](https://learn.microsoft.com/zh-cn/dotnet/standard/asynchronous-programming-patterns/task-based-asynchronous-pattern-tap)

特点：
- 高封装度，通过`async`和`await`修饰符，就可以使用
   - 相对而言，由于高封装度的影响，要理解调度机制才可顺利使用
   - 需要一定的代码规范（比如async方法以Async结尾）
- 控制流更明确
- WIP

::: details 问GPT：如果想要掌握“基于任务的异步模式”，需要了解哪些类的作用？

基本类：`Tasks.Task`、`Tasks.Task<TResult>` 和 `Tasks.TaskCompletionSource<TResult>`

任务取消相关类：`CancellationToken` 和 `CancellationTokenSource`

任务组合相关类和方法：`Task.WhenAll` 和 `Task.WhenAny`

调度上下文相关类：`SynchronizationContext` 和 `TaskScheduler`

性能优化：`ValueTask` 和 `ValueTask<TResult>`

辅助工具类：例如 `SemaphoreSlim` 和 `AsyncLocal<T>`

## 学习路径示例
1. **基本任务管理：**
   - 学习`Task`和`Task<TResult>`的基础用法，包括创建、等待、返回值和异常处理。
2. **深入理解`async`和`await`：**
   - 了解同步上下文、状态机生成、`ConfigureAwait(false)`的影响。
3. **任务组合：**
   - 学习`Task.WhenAll`和`Task.WhenAny`来组合和管理多个任务。
4. **取消任务：**
   - 理解`CancellationToken`和`CancellationTokenSource`的用法。
5. **异常处理：**
   - 掌握任务的异常传播和捕获。
6. **性能优化：**
   - 了解`ValueTask`、`TaskCompletionSource`和其他高性能选项。

:::

## C# Task

Task是组成异步函数的基础，因为异步函数的签名大多情况都包含`Task`，一些其他情景，如事件触发时会用`async void`为签名。

C# Task 是对**线程池**的又一层封装，提供了返回值的支持：

```csharp
ThreadPool.QueueUserWorkItem(Foo, 5); // Calling [void Foo(int num)]
new Task(Foo, 5).Start(); // Equivalent of preceding using Task
Task.Run(() => Foo(5)); // Another equivalent
```

要记得处理异常，调用 `Wait`、`Result` 或 `ContinueWith` 中设置 `TaskContinuationOptions.OnlyOnFaulted`
   > 以Task为代表的异步编程模型在执行程序员定义的代码时，会捕获异常存起来，也可以实现一套异步编程模型，设置遇到异常的逻辑。

### Task的拓展方法

- Task工厂：TaskFactory，辅助对任务构造和调度。
- Task的群体等待方法。
- 并行For：Parallel，提供对并行循环和区域的支持。

可以参考[Task 类 - learn.microsoft](https://learn.microsoft.com/zh-cn/dotnet/api/system.threading.tasks.task?view=netframework-4.8)

### 调度选项和任务取消

除了`Result`和`Exception`外，这两个引入的Feature也应该好好理解。

- 调度选项：通过配置 `TaskScheduler` 达成目的，一般用于在GUI应用中，让一部分改变GUI的代码在主线程中执行。
- 任务取消：通过配置 `CancellationToken` 达成目的，程序员写的代码需要根据传入的token打断当前逻辑。

## Awaitable-如何构造可等待对象

一种方式是：通过一个继承自 `TaskCompletionSource<T>` 或 `TaskCompletionSource` 的类，在适当的时机调用 `SetResult` 方法或其他转换任务状态的方法。

另一种是：通过一个继承 `Task`类，可以参考[Task.Delay](https://source.dot.net/#System.Private.CoreLib/src/libraries/System.Private.CoreLib/src/System/Threading/Tasks/Task.cs,14879c32ba2be734)的实现，就是通过一个继承自`Task`的 `DelayPromise`对象

最后一种则是实现 ​​Awaitable 模式​​，这样提供了更高的自由度，如下方代码所示，`CustomAwaitable`是一个可等待对象

```csharp
public class CustomAwaitable
{
    public CustomAwaiter GetAwaiter() => new CustomAwaiter();
}

public struct CustomAwaiter : INotifyCompletion
{
    public bool IsCompleted => /* 逻辑 */;
    public void OnCompleted(Action continuation) => /* 逻辑 */;
    public int GetResult() => /* 结果 */;
}
```

总结一下，一般而言应该使用“继承自 `TaskCompletionSource<T>`类​”的方式，而对性能敏感或需要更高自定义的情景，则使用“实现 ​​Awaitable 模式​”的方式

## TaskScheduler-如何构造调度器

> "FCL提供了两个派生自`TaskScheduler`的类型：线程池任务调度器（thread pool task scheduler），和同步上下文任务调度器（synchronization context task scheduler）"。前者用于将任务调度到线程池，后者将任务调度到对应的主线程（如WPF的GUI线程、Unity的主线程等）

Unity在处理GameObject相关API，在异步函数调用时的线程不安全问题时，只重写了调度上下文类（`UnitySynchronizationContext : SynchronizationContext`），继续使用同步上下文任务调度器。
> Github: https://github.com/Unity-Technologies/UnityCsReference/blob/master/Runtime/Export/Scripting/UnitySynchronizationContext.cs

确实大部分情况下不需要再对TaskScheduler本身进行修改，在[.net文档 TaskScheduler Class](https://learn.microsoft.com/en-us/dotnet/api/system.threading.tasks.taskscheduler?view=net-9.0)中给出的例子是：一种限制线程数量的调度器。

## 针对Unity API依赖主线程的解决方案-UniTask

UniTask是一个开源项目，主要解决在Unity环境中，使用Task代替coroutine时，Task“不够好用”的问题，例如：
- 提供值类型的Task以及配套方法，避免因异步任务产生的GC
- 完全运行在Unity主线程（Runs completely on Unity's PlayerLoop），避免Task的误用产生错误调度到非Unity主线程，导致访问不了UnityAPI的情况。

仓库：https://github.com/Cysharp/UniTask


## 其他

volatile 关键字：用于指示一个字段可以由多个同时执行的线程修改。保证编译器，运行时系统甚至硬件不重新排列对存储器位置的读取和写入。

lock 关键字：同步一段代码块的逻辑用的

## 参考
- [.Net异步编程模式 - learn.microsoft](https://learn.microsoft.com/zh-cn/dotnet/standard/asynchronous-programming-patterns/)
- [UniTask - Github](https://github.com/Cysharp/UniTask)
- [Task的源码 - dot.net](https://source.dot.net/#System.Private.CoreLib/src/libraries/System.Private.CoreLib/src/System/Threading/Tasks/Task.cs)
- [volatile（C# 参考）- learn.microsoft](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/volatile)
- [《CLR via C# 第四版》](https://book.douban.com/subject/26285940)
   - 27.5.7 任务调度器