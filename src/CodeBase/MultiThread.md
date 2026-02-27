# 多线程

> 相关章节：[异步（C#）](../Language/AsyncCSharp)、[异步编程实践](../CodeImplement/AsynchronousInPractice)、[JobSysmtem](../CodeFramework/JobSysmtem)

::: details 为什么要使用多线程-gpt：
保证在进行异步计算时不影响游戏的帧数是非常重要的，以下是几种方法可以实现这一目标：

1. 控制计算量：在执行异步计算的过程中，需要控制每帧执行的计算量，以确保不会超过一个帧的时间导致卡顿。可以通过在每帧中执行一部分计算任务，并在下一帧继续执行剩余的任务，以逐步完成耗时计算。

2. 设置优先级和时间片：可以为游戏线程和计算线程设置不同的优先级，以确保游戏线程始终具有较高的优先级，并获得更多的CPU时间片。这样可以确保游戏线程在处理渲染和交互逻辑时不会受到太大的影响。

3. 使用Unity Job System的调度器（Scheduler）：Unity Job System提供了一个调度器，可以控制并发作业的执行顺序和优先级。通过合理设置调度器的执行顺序和优先级，可以确保异步计算在不影响游戏帧数的前提下得到适当的处理时间。

4. 实时性能监测：在开发过程中，可以使用Unity Profiler或其他性能监测工具来监测游戏的帧率、计算时间等关键指标。通过实时监测，可以发现潜在的性能问题并进行调优，以保证游戏帧数的稳定性。

无论采用哪种方法，都需要进行充分的测试和调试，确保异步计算不会影响游戏的帧率和流畅度。关注合理的任务调度和控制计算量是保证游戏帧数不受影响的重要因素。
:::

Unity的生命周期都是在主线程中进行的，Unity协程属于一种（分帧）异步封装，也是在主线程中运行。如果有**计算量大**的任务，应该创建线程，在线程中运行。
> 对于单线程平台`WEBGL`，使用多线程会相对困难

这里计划对两种多线程方案做简单介绍
- JobSystem
- C# Task (注意和异步函数声明的Task区分)

::: tip 与异步的区别
本文事实上主要讨论将任务分配到其他线程的方法，所以这里的多线程主要强调 “需要多个线程的场景”。

如同多线程是单线程的反义词，异步是同步的反义词，但实际应用中这两个概念有时难以区分，例如：
- 可以说在两个线程中，他们的信息传递是异步的。
- 可以说在异步函数中配置了调度参数，使其调度到另一个线程，变成了多线程。
:::

## 并行编程的问题

- CPU Cache造成的脏读写
- 原子操作会被编译优化乱序影响结果
- 多种种类的同步锁
    > 对于包含静态条件的代码，（中间忘了）。为了性能，使用互锁（Interlocked类）和易变（Volatile类）这样低级的基元构造，会让情况更加复杂。在好的多线程编程中，“越简单越好”或许才是最重要的原则。- 《Essential C# 7.0》
- 等等...

这类问题经常在**操作系统**（线程冲突/进程调度）相关内容中被频繁讨论，故只列举一些问题

## 技术选择——以unity为例
### JobSystem

在[JobSysmtem](../CodeFramework/JobSysmtem)，有关于JobSystem的内容

特点:

- 一般由游戏引擎实现（这里是Unity JobSystem），对游戏引擎支持好
- 每个线程的执行者基于coroutine机制，能避免线程切换开销
- 考虑游戏引擎的跨平台兼容和多线程的复杂性，JobSystem的早期版本可能bug较多

### C# Task

Task是C#支持的高度抽象的异步编程概念，在[异步（C#）](../Language/AsyncCSharp)中，有关于Task的内容。

> The Task Parallel Library (TPL) is based on the concept of a task, which represents an asynchronous operation. In some ways, a task resembles a thread or ThreadPool work item but at a higher level of abstraction —— [Task-based asynchronous programming, learn.microsoft](https://learn.microsoft.com/en-us/dotnet/standard/parallel-programming/task-based-asynchronous-programming)

特点:

- 使用C# Task，相对Unity JobSystem的繁文缛节，它更加易用。
- 有一定理解成本，来自其 **高度抽象的语法** 和 **为了解决“并行编程问题”引申出的`同步上下文`概念**
- 开发者需要自行管理多线程可能会出现的脏读写问题，以及与Unity API的兼容问题。
    > 可以查看[Unity 中的 .NET 概述 - Unity Doc](https://docs.unity3d.com/cn/current/Manual/overview-of-dot-net-in-unity.html)中的"Limitations of async and await tasks"部分

### C# Thread

略，很少使用

## 我的多线程问题合集

1. 同一个进程中的多线程，是否要考虑线程上下文切换的内存载入问题？（高内存使用场景）

A: 简化问题为：线程调度是否涉及内存页的调度？那答案应该是“要考虑”，线程也有自己的私有数据，比如栈和寄存器等【3】。

补充：【1】中提到，线程切换仍然会消耗1000-2000的CPU时钟，所以提到了纤程（Fiber Thread）的概念。Unity的协程可以视为一种特殊的纤程理论实现，即都在当前线程中调度包装好的任务，节约了线程切换的开销。
- 但Unity的协程本身不包含任务派发给多个核心的调用，或者说Unity的协程的重心不在于此，这里只是类比。

2. `Thread.Sleep()`和`Task.Delay()`的使用都应该仔细权衡，看是否有替代方案。

A: 如果要等待一个事件触发，可以使用消息通知，如Task的`TaskCompletionSource`。尽量避免`Thread.Sleep()`、`Task.Delay()`甚至`yield return null`等意义不明的业务等待。


### 处理主线程调用

由于Unity API并不能保证线程安全，所以Unity API被认为只应该在主线程调用（在Dev下会抛异常，Build下会造成未定义的错误）。Unity也为此实现了同步上下文（主要用于异步编程），那么使用Task时也可以利用这一点，将Task调度到主线程上。

```csharp
void Start() // (假设)有一个(多线程)计算任务结束时，需要将结果展示在游戏中
{
    var t1 = new Task<int>(() => { 
        return 648; 
    });
    t1.Start();
    
    var ct = t1.ContinueWith(task => {
        Debug.Log(System.Threading.SynchronizationContext.Current);
        GameObject.CreatePrimitive(PrimitiveType.Cube); // 拉一个cube
        Debug.Log(Time.deltaTime * t1.Result);
    }, 
    TaskScheduler.FromCurrentSynchronizationContext()); // 指定调度方式
}
```



## 参考
1. [GAMES104-现代游戏引擎：从入门到实践，第20讲](https://www.bilibili.com/video/BV1EP411V7jx)
2. [《Essential C# 7.0》](https://book.douban.com/subject/27009371/)
    - 19.1 多线程处理基础
3. [进程、线程基础知识，线程的上下文切换 - 小林coding](https://www.xiaolincoding.com/os/4_process/process_base.html#%E7%BA%BF%E7%A8%8B%E7%9A%84%E4%B8%8A%E4%B8%8B%E6%96%87%E5%88%87%E6%8D%A2)