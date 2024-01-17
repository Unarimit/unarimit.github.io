# 编译

Mono (JIT & Interpreter)

IL2cpp
- C# Code ---Mono---> IL ---IL2cpp---> cpp(还维持了个小gc，但大部分navtive) 
> Unity文档是这样描述的："Ahead of Time (AOT) compilation is an optimization method used by all platforms except iOS for optimizing the size of the built player."

Burst和DOTS
> 这两个好像都是一起使用的？

## 参考
- Burst https://zhuanlan.zhihu.com/p/371668397?utm_id=0
- [Unity 之Burst Compile底层原理 - 知乎](https://zhuanlan.zhihu.com/p/623274986)