# 代码设计

<img src="../img/code-design.png">

::: tip
“优雅，永不过时”
:::

游戏开发是使用最多设计模式的开发之一，其系统的复杂度高，且逻辑难以解耦。

## 包括下列内容：

- 对设计模式的消化整理（主要基于[Game Programming Patterns](https://gameprogrammingpatterns.com/)这本书）
- 游戏泛用设计模式整理和实现
    - 如：游戏启动流程，上下文，UI等设计
- 特定游戏模式的设计方式
    - 如：RTS相机，RPG中的换手等。
- Unity里的异步、多线程和协同开发

## 问题

下列是我在游戏卡发中遇到的一些问题，做归档和回顾使用

### 设计层面

1. controller在oop中的作用，是否需要额外的model数据类？
2. 在editor中测试，经常出现数据还没加载好就被访问的情况，如何改善？
> 将初始化脚本执行顺序调高，见[同一函数的更新顺序](../UnityComponent/Lifetime.html#同一函数的更新顺序)

3. 统一管理类创造原型（实例化prefab） vs 原型Controller静态方法创造原型，哪个更好？（更利于理解游戏逻辑）

### 性能层面

1. update中遍历cnt100的数组和碰撞检测哪个更性能友好？
    - 分片算法的优化程度

### 插件使用

1. DOTween的`DelayCall`和`OnComplete`中报错，只会记录调用某个函数发生错误，不会深入函数中，影响debug。（尝试复现的时候没有发现此现象，可能是我记错了？）
> 可以仅在委托中改变控制变量，利用委托等方式绕开DOTween的调用栈。或在一些独立的模块的开发过程中，先执行以下试试。

## 参考
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [GameFramework解析：开篇 - 知乎](https://zhuanlan.zhihu.com/p/426136370)
- 头图：[Code to Design Complete Guide for 2023 - uxpin](https://www.uxpin.com/studio/blog/code-to-design-guide/)