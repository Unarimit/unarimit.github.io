# 蒙皮动画

## 实现原理
- 顶点转换：不同坐标系
    - Model Space
    - Local Space
    - World Space

<img src="../img/Animation/SkinnedAnimation-1.png">

- 骨骼定义。如人形标准骨骼Humanoid，标准化命名（pelvis、head），方便工具识别
    - 额外骨骼：眉毛、衣服等。武器可以采用Mount一个节点或单独绑的方式实现
    - Root节点：经常是中心点。Humanoid一般定义为两脚中间

- 绑定动画：如下图所示，人骑马的动画，实际上人用人的动画，马用马的动画。会有一个专门的Mount节点

<img src="../img/Animation/SkinnedAnimation-2.png">

- 绑定姿势：T-Pose vs A-Pose
    - A-Pose绑定后肩膀表现力更强



## 参考
1. [GAMES104现代游戏引擎课程的第八讲-bilibili](https://www.bilibili.com/video/BV1jr4y1t7WR)
