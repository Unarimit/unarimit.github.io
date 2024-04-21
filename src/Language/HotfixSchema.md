# 热更新

<img src='../img/hotfix-0.png'>

热更新是游戏开发中一种技术，允许在不影响游戏运行的情况下更新内容，修复错误或添加新功能，通常通过下载补丁或更新程序来实现，提供了灵活性和快速响应性。

热更新可以拆分为以下两个概念：
- 资源热更新：更新游戏中的资源文件，如模型、音频、纹理、关卡配置和技能数据表配置等。
- 代码热更新：更新游戏中的代码逻辑，例如修复bug、改进性能或添加新功能，而无需重新打包发布应用程序。

本文主要讨论**代码热更新**，将从理论角度分析热更新方案的优劣，并以**XLua**为例，介绍几个常用场景。

> 感觉**资源热更新**的难点主要在打包、解包和包的管理上面，可以参考[资源管理页面](../UnityComponent/Resource)。

## 外部代码

WIP

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

## 热更新流程-XLua

有一篇文章简单介绍了热更新的流程，目的是替换一段编译好的C#脚本：[Unity - AssetBundle和XLua热更新教程（简单详细） - 长生但酒狂 csdn](https://blog.csdn.net/qq_28299311/article/details/104870024)。其过程可以描述为：
- 明确需要热更新的位置（通过`[Hotfix]`特性），并生成配置信息`XLua -> Generate Code`
    - 在高版本unity中，`[Hotfix]`特性的使用方式与文章中不同，详见github上的文档。
- 编写替换逻辑的lua脚本，xlua提供的api有`xlua.hotfix(class, [method_name], fix)`和`util.hotfix_ex(class, method_name, fix)`
- 打包热更新的lua文本资源(TextAsset)为AssetBundle，并通过某种方式获取（如模拟下载）
- 配置载入打包(AssetBundle)的逻辑，并执行其中的lua代码
- 确保xlua其他配置正确(如HOTFIX_ENABLE宏的配置，和Editor下启用`XLua->Hotfix Inject In Editor`)，然后运行测试结果是否符合预期。

> XLua的使用方面，请参考[热补丁操作指南](https://github.com/Tencent/xLua/blob/master/Assets/XLua/Doc/hotfix.md)和其他文档获取更详细的内容。

**通过了解上述过程得知需要学习以下知识：**
- XLua的热更新使用方法
- AssetBundle能够存储的内容
    > AssetBundle 是一个存档文件，包含可在运行时由 Unity 加载的特定于平台的非代码资源（比如模型、纹理、预制件、音频剪辑甚至整个场景）
- *AssetBundle的管理

### 常见的热更新场景

1. 需要为已有的逻辑打补丁（参考上文的例子）
2. 需要添加新的逻辑（Monobehaviour）
    - 可以参考[02_U3DScripting: 展示怎么用lua来写MonoBehaviour](https://github.com/Tencent/xLua/tree/master/Assets/XLua/Examples/02_U3DScripting)的例子，通过预定义的支持lua的C#脚本，在热更新时只需在prefab中引用它并传入新逻辑的lua脚本即可。


## 参考
- 头图：[20.1 Hotfix Update - infiniteflight](https://infiniteflight.com/timeline/20-1-hotfix-update)
- [Unity 中的Mono与IL2CPP - 知乎](https://zhuanlan.zhihu.com/p/663371215)
- [Unity - AssetBundle和XLua热更新教程（简单详细） - 长生但酒狂 csdn](https://blog.csdn.net/qq_28299311/article/details/104870024)