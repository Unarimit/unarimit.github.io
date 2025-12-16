# 面部动画

做好很难，做简单的也很简单

一个好的面部动画，可能需要Morph、骨骼动画、材质动画等技术一起使用。
- 参考UE的metahuman

## 定义

Facial Action Coding System (FACS)：表情编码

28 Core Action Unit: 将所有表情编码的表情拆分为了28个可以拼接的组件

Morph Target Animation: 存储了每个Action Unit相对中性表情的偏移，方便做表情之间的Lerp

## 挑战

在捏脸系统或脸型多变的游戏中，Morph需要结合面部骨骼使用
- 也可以重定向Morph动画，但也会遇到骨骼动画重定向时的问题

*UE的 metahuman，更精细的面部表情


## 参考
1. [GAMES104现代游戏引擎课程的第九讲-bilibili](https://www.bilibili.com/video/BV1pY411F7pA)