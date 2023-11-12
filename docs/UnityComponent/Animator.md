# 动画机

本章包括：
- `Animator组件`介绍（Animator Component）
- `Animator面板`提供的功能（Animator Window）
- 关于3D动画格式的一些知识

## Animator组件

一般绑定在被控制的物体上面，使其在进行移动、攻击行为时，播放相应的动画。

<center><img  src="../img/animator-1.png" /></center>

<center>一个角色inspector中的animator</center>

在上图中可以看到要配置Controller和Avatar
- Controller：动画状态机，通过`Animator Window`编辑
    - 保持动画格式和模型格式相同（都是Genetic或Humanoid）
- Avatar：角色的骨骼表示
    - 保证被控制的骨骼（在Hierarchy中的子物体）来自这个Avatar

不难发现如果为一个角色写好一套逻辑，只想改变模型的话：修改物体Hierarchy下的模型和骨骼，在修改对应的Avatar就可以了。

## Animator面板

动画之前的切换采用了有限状态机的形式，可以通过配置在动画切换时播放过渡动画

除了状态之间的过渡动画外，还有混合树的形式，如通过速度blend走和跑两个动作，使速度介于走和跑中间时播放blend动画。

对于复杂的动作，可以使用层级控制（Layer）模式。例如可以控制上半身做释放技能动作，下半身仍做移动动作。

<center><img  src="../img/animator-2.png" /></center>

<center>一个状态动画机示例，看不清可以右键新标签页打开图片</center>

关于对其元素更多的解释，可以查看[Animator Controllers文档](https://docs.unity3d.com/cn/current/Manual/AnimatorControllers.html)

## humanoid & dynamic

在导入模型文件时，需要配置rig（翻译为：操纵 or 绑定），如下图所示。

<center><img  src="../img/animator-3.png" /></center>

WIP

## 其他选项

### 导入动画时

- 可以配置动画的Root Transform选项，使模型按照动画的轨迹在场景中位移。

## 参考
- [动画 - Unity Doc](https://docs.unity3d.com/cn/current/Manual/AnimationSection.html)
- Animation Rigging
    - blend
- Spite动画：[NIKKE射击系统在Unity中的实现-Bilibili](https://www.bilibili.com/video/BV1Hz4y1F75i)