# Unity组件

这里总结了我对Unity常用内置组件的学习，主要方式是看API文档再结合实践。在每种组件的介绍中都至少附带一个实例，也代表着这部分的内容主要以实践为主。如果想要理解其背后的理论知识，可以参考《游戏引擎架构》这本书。

如果是初学者，可以简单看看gpt老师对Unity组件的总结：

::: details gpt:
当涉及到Unity中提供的方便的API和组件时，有很多可以谈论的内容。以下是一些常用的API和组件的简要介绍：

1. Transform组件：Transform组件是每个游戏对象都具备的组件，它用于控制物体的位置、旋转和缩放。通过Transform组件，你可以移动、旋转和缩放游戏对象。

2. Rigidbody组件：Rigidbody组件用于模拟物体的物理行为，例如重力、碰撞和惯性。通过Rigidbody组件，你可以使游戏对象具有真实的物理特性，并对其施加力、应用作用力和处理碰撞。

3. Collider组件：Collider组件用于检测和处理游戏对象之间的碰撞。Unity提供了各种类型的碰撞器（Colliders），例如Box Collider、Sphere Collider、Capsule Collider等，用于不同形状的碰撞检测。

4. Input类：Input类允许你从用户那里获取输入，例如键盘按键、鼠标点击和触摸屏幕。你可以使用Input类来检测用户输入，并作出相应的反应。

5. Coroutine：协程（Coroutine）是Unity中用于实现异步操作的一种方式。协程可以在一段时间内挂起执行，然后在稍后的时间继续执行，这对于处理复杂的动画、延迟操作和异步加载等任务非常有用。

6. Instantiate函数：Instantiate函数允许你在运行时创建新的游戏对象。你可以使用Instantiate函数复制和生成预制件（Prefab），并在场景中动态生成对象。

7. Physics类：Physics类提供了一组用于处理物理相关操作的静态函数。你可以使用Physics类进行射线检测、转换坐标、检测碰撞等物理计算。

这只是Unity提供的一小部分有用的API和组件，它们可以帮助你开发游戏、处理输入、实现物理仿真和处理碰撞等功能。根据你的具体需求，Unity还提供了更多强大的功能和工具，用于实现各种游戏机制和效果。
:::

Unity提供了一系列api让我们处理3d世界的显示和交互，对这些api都有深刻的认识是很有必要的。大部分常用的都可以在unity文档中了解。例如unity文档的[最佳实践专栏](https://docs.unity3d.com/Manual/best-practice-guides.html)，可以了解游戏开发涉及的常用组件。
> 除此之外，Unity还提供了几种不同主题的模板，如塔防模板（比较复杂），第三人称模板（简单）等。

## 参考
- [Unity User Manual 2021.3 (LTS) 中文](https://docs.unity3d.com/cn/current/Manual/index.html)
- [Advanced best practice guides - Unity Doc](https://docs.unity3d.com/Manual/best-practice-guides.html)
- [游戏引擎架构（第2版）- 【美】Jason Gregory](https://book.douban.com/subject/34864920/)