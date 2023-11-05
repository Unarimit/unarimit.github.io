# 垃圾回收

在unity doc中提到，unity的垃圾回收会在内存不够分配时进行，对整个堆扫描，删除不被引用的对象。
> When a script tries to make an allocation on the managed heap but there isn’t enough free heap memory to accommodate the allocation, Unity runs the garbage collector. When the garbage collector runs, it examines all objects in the heap, and marks for deletion any objects that your application no longer references. Unity then deletes the unreferenced objects, which frees up memory.

unity在编译方式为il2cpp时（常用的编译方式），使用的GC算法为BOEHM GC，是一种保守垃圾回收机制（相对于java和c#的精准机制）。

其特点在于：不直接访问对象的内部结构和引用关系，而是通过扫描内存中的数据块，根据指针的引用关系判断哪些可以删除。

表现为：
- 性能更好？且不需要复杂的N生代机制。（相对JVM）
- 可能由于误判导致有些已经可以释放的内存无法释放。

可以调用`GarbageCollector.CollectIncremental()`或`System.GC.Collect()`主动进行垃圾回收



## 参考
- [Memory in Unity - Unity Docs](https://docs.unity3d.com/cn/2023.2/Manual/performance-memory-overview.html)
- BOEHM GC：[Unity 垃圾回收GC的原理？ - 知乎](https://zhuanlan.zhihu.com/p/623849906)