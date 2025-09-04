# 性能优化
<img src='../img/Profiler/index.png'>

性能优化可以从以下四个方面着手

## 移动平台特性
> 虽然大小核是多线程才需要考虑的问题，但游戏引擎本身就是多线程的，比如unity存在渲染线程和主线程，优化时需要考虑这一点

现代移动设备CPU普遍采用ARM的 [big.LITTLE](https://www.arm.com/technologies/big-little) 大小核架构。其核心调度规则由操作系统决定，规则总体上可以分为**负载感知**和**任务类型**两种，前者根据负载、后者根据优先级定义等辅助方法，将线程迁移到合适的核心。可以通过[工具](https://developer.android.com/agi/sys-trace/threads-scheduling)分析这一点。

### Unity中的应用
Unity的 `Job System` 并不直接控制线程在哪个核上运行。在大小核背景下，计算量大的任务相对多线程，不如采用分帧优化，还能节省些线程上下文切换的开销。

## 关键指标
使用 [Unity Profiler](https://docs.unity3d.com/Manual/Profiler.html) 分析以下指标是性能优化的起点。

- 内存（Memory）
    - 关注GC Alloc，避免在热路径（如`Update`）上产生不必要的堆内存分配。
    - 使用 `Memory Profiler` 包可以更深入地分析内存泄漏、碎片化等问题。
- CPU
    - 主要瓶颈来源。重点分析 `PlayerLoop`，找出耗时最长的部分，如 `Camera.Render`、`Physics.FixedUpdate`、脚本逻辑等。
- GPU
    - 查看 `Render Thread` 和GPU的使用情况。`SetPass Calls` (Draw Calls) 和 `Batches` 数量是关键。
    - 查看 `FrameDebugger` 来分析 `Overdraw` 视图来定位不必要的渲染开销。
- I/O
    - 主要指磁盘和网络读写。同步加载操作会阻塞主线程，导致严重卡顿，应始终使用异步API。

## 引擎的性能优化可选项（Unity）
选择合适的Unity选项能显著影响性能和资源占用。

目前列举了一些已知的，WIP

- AssetBundle
    - WriteTypeTree
- GC
    - IncrementalGC
- Asset
    - Mipmap：在贴图中用于快速采样减少摩尔纹，但对于Sprite、天空盒等不需要缩放的资源，应关闭以减少1/3的额外存储占用。
    - Compress
- FixedUpdate：必要时舍弃追帧行为

## 利用线程

> 在移动端，将计算任务放在新线程的行为非常小丑。而PC端，由于设备性能的提高，鲜有计算任务和主线程一个核不够用的场景，能想到的无非就那么几个：如MOD开多了的Stellaris（RTS+4X类型），又或是下文提到的戴森球（~~拼好厂~~自动化建造类型）

将计算任务从主线程移出是避免卡顿的核心思想，但如何将计算任务拆出并合理安排访存逻辑是较为困难的，可以参考[戴森球计划-新多线程框架 steam](https://store.steampowered.com/news/app/1366540/view/543361383085900510?l=schinese)中做的提到的难点和实践，很有帮助。

问题可以列为以下几种：
- 在任务直接存在数据依赖的情况下，利用上一帧数据还是同步
- 修改相同的内存不可避免时，如何处理修改的同步
- 拆分粒度，是否能忽略上下文切换的开销
- Debug难度增加

Unity中多线程的使用可以参考我的文档：[多线程](../CodeBase/MultiThread)


## Cache友好框架-ECS

WIP

## 参考
- [戴森球计划-新多线程框架 steam](https://store.steampowered.com/news/app/1366540/view/543361383085900510?l=schinese)