# 垃圾回收

垃圾回收（Garbage Collect，GC）是一种内存管理机制，是实现托管内存的必须产物。Java和C#两种托管内存的编程语言均实现了基于代的垃圾回收机制。

## 常见的垃圾回收机制

### 基于代的垃圾回收

WIP，是否内存压缩，扫描机制，什么时候扫描第1、2代。

### 全扫描垃圾回收

详见Lua学习笔记中的：[Lua的垃圾回收](../Lua/GCInLua)

### 基于内存扫描的乐观垃圾回收

BOEHM GC：[Unity 垃圾回收GC的原理？ - 知乎](https://zhuanlan.zhihu.com/p/623849906)

## Unity的垃圾回收

在unity doc中提到，unity的垃圾回收会在内存不够分配时进行，对整个堆扫描，删除不被引用的对象。
> When a script tries to make an allocation on the managed heap but there isn’t enough free heap memory to accommodate the allocation, Unity runs the garbage collector. When the garbage collector runs, it examines all objects in the heap, and marks for deletion any objects that your application no longer references. Unity then deletes the unreferenced objects, which frees up memory.

unity在编译方式为il2cpp时（常用的编译方式），使用的GC算法为BOEHM GC，是一种保守垃圾回收机制（相对于java和c#的精准机制）。

其特点在于：不直接访问对象的内部结构和引用关系，而是通过扫描内存中的数据块，根据指针的引用关系判断哪些可以删除。

表现为：
- 性能更好？且不需要复杂的N生代机制。（相对JVM）
- 可能由于误判导致有些已经可以释放的内存无法释放。

可以调用`GarbageCollector.CollectIncremental()`或`System.GC.Collect()`主动进行垃圾回收

### CollectIncremental

`GC.Collect`会在一个游戏帧内找出需要回收的垃圾，让玩家感受到卡顿（unity在卸载场景时会自动调用`GC.Collect`，我一个只包含一些UI元素的都要卡0.2秒）。使用`CollectIncremental`可以缓解这个问题，但这个方案也需要CPU不停计算待回收的垃圾，最好可以手动控制。
> 虽然unity文档中说`Incremental garbage collection`策略时默认开启的，但我打开两个unity版本为`2021.3.5`的项目，都没有默认开启这个选项。

## 参考
- [Memory in Unity - Unity Docs](https://docs.unity3d.com/cn/2023.2/Manual/performance-memory-overview.html)
- BOEHM GC：[Unity 垃圾回收GC的原理？ - 知乎](https://zhuanlan.zhihu.com/p/623849906)
- [当面试被问到unityGC有什么问题 - stack exchange](https://gamedev.stackexchange.com/questions/204261/what-are-unitys-problems-with-garbage-collection)