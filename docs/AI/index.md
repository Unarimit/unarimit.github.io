# AI (NPC&人机&Boot)
::: warning
施工中
:::

AI是战斗游戏中比较重要的部分，好的AI能增加玩家的沉浸感。在“[什么组成了优秀的AI | 游戏制作工具箱 - Youtube](https://www.youtube.com/watch?v=9bbhJi0NBkk)”这个视频里，介绍了不同的策略。包括
- 模拟行为（如真的用眼睛去看，模拟真实遮挡等）
- 给AI增加特定目标
- 通过语言或动作暴露AI动机
- 给AI增加固定的行为（如关门，拉电闸）

通过虚幻引擎的AI系统（如EQS）了解一系列逻辑如何实现。


## 例子

我在[上帝视角射击游戏](../Projects/TopShooting.md)第二版，设计了一个简单的AI，有三个状态，大概如下图所示。

<img src="../img/ai-1.png">

这样的设计是比较简单的，agent没有除了杀敌之外的目标。

## 参考
- [什么组成了优秀的AI | 游戏制作工具箱 - Youtube](https://www.youtube.com/watch?v=9bbhJi0NBkk)
- [UE4学习笔记——AI（行为树 ；EQS；感知系统；调试）- Bilibili CV](https://www.bilibili.com/read/cv8219823)
- [斯坦福UE4C++课程P46-P49AI、EQS再生逻辑 - Bilibili](https://www.bilibili.com/read/cv19555388/)
    - [【教程】虚幻5教程 斯坦福专用课程 UE4 & C++ 专业游戏开发教程 24.5小时 中文字幕 - Bilibili](https://www.bilibili.com/video/BV1nU4y1X7iQ)