# 性能优化
<img src='../img/Profiler/index.png'>

性能优化可以从以下四个方面着手

## 平台差异
现代移动设备CPU普遍采用ARM的 [big.LITTLE](https://www.arm.com/technologies/big-little) 大小核架构。它将高性能的“大核”（Performance Cores）与高能效的“小核”（Efficiency Cores）集成在一起。其核心调度规则由操作系统内核的调度器（Scheduler）决定，主要目标是平衡性能与功耗。

- **调度规则**：
    - **负载感知**：调度器会实时监控每个线程的CPU负载。当线程负载超过某个阈值时，会被从“小核”迁移到“大核”以获得更高性能。反之，低负载或空闲线程则会被迁移回“小核”以节省电量。
    - **任务类型**：现代操作系统（如Android）的调度器会识别任务类型。前台UI线程、游戏主线程等对延迟敏感的任务，会优先被分配到“大核”。而后台服务、数据下载等任务则倾向于在“小核”上运行。
- **Unity中的应用**：
    - Unity的 `Job System` 并不直接控制线程在哪个核上运行，而是将任务（Job）交给操作系统的调度器。但我们可以通过 [`Unity.Jobs.LowLevel.Unsafe.JobsUtility.JobWorkerCount`](https://docs.unity3d.com/ScriptReference/Unity.Jobs.LowLevel.Unsafe.JobsUtility-jobWorkerCount.html) 获取工作线程数，并通过设置Job的批次大小（batch size）来影响任务粒度，从而间接影响调度。
    - 对于需要稳定高性能的持续性计算（如AI决策），可以考虑将其设计为长时间运行的Job，操作系统更有可能将其保持在大核上。

## 关键指标
使用 [Unity Profiler](https://docs.unity3d.com/Manual/Profiler.html) 分析以下指标是性能优化的起点。

- **内存（Memory）**：关注GC Alloc，避免在热路径（如`Update`）上产生不必要的堆内存分配。使用 `Memory Profiler` 包可以更深入地分析内存泄漏、碎片化等问题。
- **CPU**：主要瓶颈来源。重点分析 `PlayerLoop`，找出耗时最长的部分，如 `Camera.Render`、`Physics.FixedUpdate`、脚本逻辑等。
- **GPU**：查看 `Render Thread` 和GPU的使用情况。`SetPass Calls` (Draw Calls) 和 `Batches` 数量是关键。分析 `Overdraw` 视图来定位不必要的渲染开销。
- **I/O**：主要指磁盘和网络读写。同步加载操作会阻塞主线程，导致严重卡顿，应始终使用异步API。

## Unity选项的影响
选择合适的Unity选项能显著影响性能和资源占用。

- **AssetBundle**：是目前推荐的资源管理方案。它能让应用按需加载资源，减小初始包体和内存占用。但需要注意的是，不合理的打包策略（如包体过小、依赖关系复杂）反而会增加加载时的I/O负担和内存冗余。
- **Shader变体**：过多的Shader变体会急剧增加构建时间和内存占用。使用 [`Shader Variant Collection`](https://docs.unity3d.com/Manual/shader-variants.html) 精确指定需要打包的变体，是优化内存和加载速度的关键步骤。
- **Asset格式**：
    - **Mipmap**：为贴图生成多级渐远纹理。它会额外占用约33%的显存，但能大幅提升远处渲染性能并减少摩尔纹。对于UI贴图、天空盒等不需要距离缩放的纹理，**应关闭Mipmap**以节约这部分显存。
    - **模型压缩**：开启 [`Mesh Compression`](https://docs.unity3d.com/Manual/class-ModelImporterModel.html#MeshCompression) 可以减小模型文件大小和内存占用，但可能会牺牲一些精度。
- **追帧（Frame Pacing / Adaptive Performance）**：
    - 追帧技术（如动态分辨率）是保证流畅体验的有效手段，但它本身也有CPU开销。对于性能要求不高的轻量级游戏，或者在性能本就充足的设备上，开启它反而会带来不必要的消耗。应只在性能不足以稳定目标帧率时启用。Unity的 [Adaptive Performance](https://docs.unity3d.com/Packages/com.unity.adaptive-performance@latest/index.html) 包提供了更精细的控制。

## 利用线程
将计算任务从主线程移出是避免卡顿的核心思想。

- **多线程（Job System / C# Task）**
    - **使用时机**：适用于可并行处理的、计算密集型的纯数据任务。例如：寻路计算、AI行为决策、物理模拟、程序化网格生成、大量数据处理等。**关键是任务不直接访问Unity的非线程安全API**（大部分`Transform`、`GameObject`操作）。
    - **注意事项**：
        - **数据竞争**：多线程编程的核心难题。`Job System` 通过强制性的数据隔离（Jobs拥有自己数据的拷贝）和依赖管理来从根本上避免数据竞争。
        - **主线程同步**：计算结果最终需要同步回主线程才能应用到游戏世界中。这个同步点如果处理不当，也可能成为瓶颈。
- **游戏逻辑派发到渲染线程**
    - **使用时机**：适用于需要利用GPU进行大规模并行计算的逻辑，而非传统的渲染管线任务。例如：粒子系统模拟、流体模拟、程序化动画（顶点动画）、大规模的可见性剔除计算等。
    - **注意事项**：
        - **API限制**：这类任务通常通过 [`CommandBuffer`](https://docs.unity3d.com/ScriptReference/Rendering.CommandBuffer.html) 提交 [`ComputeShader`](https://docs.unity3d.com/Manual/class-ComputeShader.html) 来实现。你需要熟悉`ComputeShader`的编写和数据提交流程。
        - **异步性**：GPU执行是异步的。从GPU读回数据到CPU是一个非常耗时的操作（`GetData`），会造成GPU管线停顿。应尽量避免或在非关键帧进行，设计算法时最好让数据流保持在GPU上。

## 参考
