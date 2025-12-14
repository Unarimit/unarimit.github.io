# 雾效
本章是对GAMES104现代游戏引擎课程中提到的技术的总结【1】，并结合了相关资料。

从简单的过渡颜色填充到丁达尔效应

## 简单雾效-Depth Fog

Unity引擎默认使用`Exp Squared Fog`。比较简单，不做介绍。

<img src="../img/shading/Fog-1.png" width="500">

## 模拟雾下沉的雾效-Height Fog

对线性化的雾浓度使用Ray Marching，因为比较过时了，所以视频中不再详细介绍计算方式

## 更高级的雾效-Voxel-based Volumetric Fog

<img src="../img/shading/Fog-2.png" width="500">

类似[天空和云](./SkyAndCloud.md)中大气和体积云的计算方式

## 参考
1. [GAMES104现代游戏引擎课程的第七讲-bilibili](https://www.bilibili.com/video/BV1kY411P7QM)