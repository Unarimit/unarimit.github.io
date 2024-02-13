# 多线程

::: details 为什么要使用多线程-gpt：
保证在进行异步计算时不影响游戏的帧数是非常重要的，以下是几种方法可以实现这一目标：

1. 控制计算量：在执行异步计算的过程中，需要控制每帧执行的计算量，以确保不会超过一个帧的时间导致卡顿。可以通过在每帧中执行一部分计算任务，并在下一帧继续执行剩余的任务，以逐步完成耗时计算。

2. 设置优先级和时间片：可以为游戏线程和计算线程设置不同的优先级，以确保游戏线程始终具有较高的优先级，并获得更多的CPU时间片。这样可以确保游戏线程在处理渲染和交互逻辑时不会受到太大的影响。

3. 使用Unity Job System的调度器（Scheduler）：Unity Job System提供了一个调度器，可以控制并发作业的执行顺序和优先级。通过合理设置调度器的执行顺序和优先级，可以确保异步计算在不影响游戏帧数的前提下得到适当的处理时间。

4. 实时性能监测：在开发过程中，可以使用Unity Profiler或其他性能监测工具来监测游戏的帧率、计算时间等关键指标。通过实时监测，可以发现潜在的性能问题并进行调优，以保证游戏帧数的稳定性。

无论采用哪种方法，都需要进行充分的测试和调试，确保异步计算不会影响游戏的帧率和流畅度。关注合理的任务调度和控制计算量是保证游戏帧数不受影响的重要因素。
:::

Unity的生命周期都是在主线程中进行的，协程属于一种异步封装，也是在主线程中运行。如果有**计算量大**的任务，应该创建线程，在线程中运行。
> 对于单线程平台`WEBGL`，使用多线程会相对困难

这里计划对Unity使用的两种多线程API做简单介绍
- Unity JobSystem
- *C# Task (WIP)*

## 使用Unity JobSystem

::: tip Unity文档
JobSystem允许您编写简单且安全的多线程代码，以便您的应用程序可以使用所有可用的CPU核心来执行您的代码。这有助于提高应用程序的性能。

您可以单独使用作业系统，但为了提高性能，您还应该使用Burst编译器，它专门为Unity的作业系统编译作业。Burst编译器改进了代码生成，从而提高了性能并减少了移动设备的电池消耗。

您可以将作业系统与Unity的实体组件系统(Entity Component System, ECS)一起使用，以创建高性能的数据导向代码。

当使用Burst编译器时，JobSystem工作得最好。由于Burst不支持托管对象，因此需要使用非托管类型来访问作业中的数据。您可以使用[blittable类型](https://learn.microsoft.com/en-us/dotnet/framework/interop/blittable-and-non-blittable-types)或Unity内置的[NativeContainer对象](https://docs.unity3d.com/cn/current/ScriptReference/Unity.Collections.LowLevel.Unsafe.NativeContainerAttribute.html)，这是一种线程安全的C#包装器，用于本机内存。NativeContainer对象还允许作业访问与主线程共享的数据，而不是使用副本。
:::

> 如果对JobSystem的使用方法不是很了解，可以先阅读下方的“demo和介绍”章节。

Unity文档中提到了以下信息：
- 可以使用Burst编译器优化
- 不完全支持托管(unmanage)对象（引用类型都是托管对象）
    - 文档中描述的是“当使用Burst编译器时”的场合，但实际上Job Struct不允许有托管对象成员，还有人在unity论坛控诉[PLEASE allow us to pass MANAGED types to jobs !](https://forum.unity.com/threads/please-allow-us-to-pass-managed-types-to-jobs.1258980/)
    - 当然，不用Burst编译器时，可以在Job内部创建和使用托管类型。
- 涉及面向数据编程（Unity DOTS）
    - 如果不是特别在意**缓存命中**带来的性能提升，也可以全程unsafe，或者更激进一点，用GCHandle访问主线程的托管类型。

除了上述提到的不完全支持托管对象的限制，还有其他限制。

### 更多限制

通过一些规则的制定，规避了一些复杂行为，同时也限制了一些功能，必要时这些功能也可以通过添加attribute、或者使用指针的方式来打破一些规则。
规定包括但不限于：

- 不允许访问静态变量
- 不允许在Job里调度子Job
- 只能向Job里传递值类型，并且是通过拷贝的方式从主线程将数据传输进Job，当Job运行结束数据会拷贝回主线程，我们可以在主线程的job对象访问Job的执行结果。
- 不允许在Native容器里添加托管类型
- 不允许在Native容器里嵌套Native容器
    - 只能使用unsafe容器或BlobAssets，[参考UnityForum](https://forum.unity.com/threads/how-to-fix-error-nested-native-containers-are-illegal-in-jobs.1420019/)
- 不允许使用指针
    - 一样可以通过unsafe方法
- 不允许多个Job同时写入同一个地方
- 不允许在Job里分配额外内存

这部分引自[Unity JobSystem使用及技巧 - cnblog](https://www.cnblogs.com/FlyingZiming/p/17241013.html)，感兴趣可以看看，或者找一些相对成熟的开源项目，如[Automatic-DynamicBone - Github](https://github.com/OneYoungMean/Automatic-DynamicBone/tree/master)，它在unity使用jobsystem实现了动态骨骼的物理模拟。
> 注意！`Automatic-DynamicBone`使用的是较早版本的JobSystem，有些声明方式可能已经不是最佳选择。

### demo和介绍

这里展示了一个Unity文档中的Demo，一个继承了`IJob`的简单计算。

```csharp
using UnityEngine;
using Unity.Collections;
using Unity.Jobs;

public class MyScheduledJob : MonoBehaviour
{
    // Create a native array of a single float to store the result. Using a 
    // NativeArray is the only way you can get the results of the job, whether
    // you're getting one value or an array of values.
    NativeArray<float> result;
    // Create a JobHandle for the job
    JobHandle handle;

    // Set up the job
    public struct MyJob : IJob
    {
        public float a;
        public float b;
        public NativeArray<float> result;

        public void Execute()
        {
            result[0] = a + b;
        }
    }

    // Update is called once per frame
    void Update()
    {
        // Set up the job data
        result = new NativeArray<float>(1, Allocator.TempJob);

        MyJob jobData = new MyJob
        {
            a = 10,
            b = 10,
            result = result
        };

        // Schedule the job
        handle = jobData.Schedule();
    }

    private void LateUpdate()
    {
        // Sometime later in the frame, wait for the job to complete before accessing the results.
        handle.Complete();

        // All copies of the NativeArray point to the same memory, you can access the result in "your" copy of the NativeArray
        // float aPlusB = result[0];

        // Free the memory allocated by the result array
        result.Dispose();
    }
}
```

从上述代码中可以观察到，使用Job在于以下几点：
- 定义Job类和运算内容`Execute()`
- 在主线程创建Job实例`job`，并传入数据
- `Schedule`该`job`，使用`JobHandle`监视完成状态
    - 可以用`handle.IsCompleted`属性
- 等待完成后调用`handle.Complete()`方法，访问`job`的运算内容
    - 这个`Complete()`一开始让我很疑惑，注释中只说了"Ensures that the job has completed."，没有更多描述。

> 可以使用`job.Run()`使其运行在主线程，以便debug

> 在debug信息不够详细时(例如Native容器遇到错误，单靠log信息很难排查问题)，使用visual studio的`attach debug`，可以得到更多的信息

这样一来，就对JobSystem有一个大概的认识了，快上手写一个Job感受JobSystem的种种限制和面向数据编程与面向对象编程的冲突吧，记得配合Burst编译。进一步的，可以了解并行Job和ECS，更深刻的掌握JobSystem。
> 可以通过[ProfilerMarker](https://docs.unity3d.com/ScriptReference/Unity.Profiling.ProfilerMarker.html)或简单的时间开销`Time.realtimeSinceStartup`测试其性能表现。

## C# Task

使用C# Task，相对JobSystem的繁文缛节，它更加易用。但相对的，开发者需要自行管理多线程可能会出现的脏读写问题，以及与Unity API的兼容问题。
> 可以查看[Unity 中的 .NET 概述 - Unity Doc](https://docs.unity3d.com/cn/current/Manual/overview-of-dot-net-in-unity.html)中的"Limitations of async and await tasks"部分


WIP

## 参考
- [Job system - Unity Documentation](https://docs.unity3d.com/Manual/JobSystem.html)
- [继承IJob的示例 - Unity Documentation](https://docs.unity3d.com/cn/current/ScriptReference/Unity.Jobs.IJob.html)
- [Unity JobSystem使用及技巧 - cnblog](https://www.cnblogs.com/FlyingZiming/p/17241013.html)
- 评论区吵架很有意思：[Blittable ECS？- 知乎](https://zhuanlan.zhihu.com/p/83120068)