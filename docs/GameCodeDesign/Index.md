# 代码设计
::: tip
“优雅，永不过时”
:::

## 问题

下列是我在游戏卡发中遇到的一些问题，做归档和回顾使用

### 设计层面

1. controller在oop中的作用，是否需要额外的model数据类？
2. 在editor中测试，经常出现数据还没加载好就被访问的情况，如何改善？
> 将初始化脚本执行顺序调高，见[同一函数的更新顺序](../UnityComponent/Lifetime.html#同一函数的更新顺序)

3. 统一管理类创造原型（实例化prefab） vs 原型Controller静态方法创造原型，哪个更好？（更利于理解游戏逻辑）

### 性能层面

1. update中遍历cnt100的数组和碰撞检测哪个更性能友好？

## 参考
- [Game Programming Patterns](https://gameprogrammingpatterns.com/)
- [GameFramework解析：开篇 - 知乎](https://zhuanlan.zhihu.com/p/426136370)
- [[Unity中文课堂教程预告片] Unity 游戏框架搭建 决定版 试听](https://www.bilibili.com/video/BV1wh411U7X6)