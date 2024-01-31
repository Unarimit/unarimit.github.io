# 热更新和模组

本文将从理论角度分析热更新方案的优劣，并讨论实践过程中遇到的问题。

模组方面延迟讨论

## 热更新方案

- [xlua](https://github.com/Tencent/xLua)
    - 特性：使用lua（lua在游戏热更新界有一定历史，unity和ue都有lua的热更方案）
    - 为什么不选：使用lua写逻辑和c#相差很大
- ILRuntime
    - 特性：基于Mono，使用C#
    - 为什么不选：ios不支持Mono JIT，Interpreter又太慢
- [HybridCLR(曾用名：huatuo)](https://github.com/focus-creative-games/hybridclr)
    - 特性：拓展自IL2cpp，使用C#
    - 为什么不选：2021年出现？比较新，而且商业化
- [puerTS](https://github.com/Tencent/puerts)
    - 特性：支持Unity和UE，使用TypeScript
    - 为什么不选：使用TypeScript写逻辑和c#相差很大，但TypeScript是静态语言，比lua好

看知乎上的一些讨论，感觉`HybridCLR`倾向于热更新逻辑和框架逻辑在同一个作用域，而其他方案则分离热更新逻辑和框架逻辑。



::: tip 相关概念 
- AOT(Ahead-of-time, 提前编译)
    - 区别于"完全静态编译（Full-ahead-of-time,Full-AOT）:程序运行前，将所有源码编译成目标平台的原生码。" // 感觉怪怪的
    - Unity文档是这样描述的："Ahead of Time (AOT) compilation is an optimization method used by all platforms except iOS for optimizing the size of the built player."
    - 程序运行之前，将.exe或.dll文件中的CIL的byte code部分转译为目标平台的原生码并且存储，程序运行中仍有部分CIL的byte code需要JIT编译。
- JIT(Just-in-time, 即时编译)
    - 程序运行过程中，将CIL的byte code转译为目标平台的原生码。
    - 具体在C#中，执行函数前会加载函数需要的程序集，并在执行方法时编译方法的IL代码，一个方法反复执行在同一个AppDomain中时，只用编译一遍。
- Interpreter(解释器)
    - 参考Python等解释语言，由于每一段逻辑都要运行时编译，会显著影响效率。
:::

### xlua

## 参考
dll和lua的区别
ab包
- [Unity 中的Mono与IL2CPP - 知乎](https://zhuanlan.zhihu.com/p/663371215)