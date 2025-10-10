# 阴影

硬阴影、软阴影、叠加阴影

> 绘制阴影是很耗时的，如果一帧渲染需要30ms，其中阴影会占2-4ms[2]。

## Shadow Mapping

## 经典做法-Cascade Shadow

层级Shadow，越近的Shadow细节越高，LOD思想。

两个软阴影算法
- PCSS（Percentage Closer Soft Shadow）：根据经验硬算，效率较低，不能用于实时渲染
- VSSM（Variance Soft Shadow Map）：通过概率学估计算软阴影，效率高

## Ray Tracing


## 参考
1. [GAMES101- 闫令琪 Bilibili](https://www.bilibili.com/video/BV1X7411F744/?p=12)
    - p12 ShadowMapping部分
2. [GAMES104- 王希 Bilibili](https://www.bilibili.com/video/BV1J3411n7WT)
    - 05.渲染中光和材质的数学魔法 1:36:05 阴影