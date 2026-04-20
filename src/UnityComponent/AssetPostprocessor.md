# 资源导入和AssetPostprocessor

当一个资源（如 .png 或 .fbx）被放入工程，Unity 会经历以下四个阶段：

1. 检测（Detection）：监听文件变化。
2. 预处理（Pre-process）：在正式转换前，修改导入参数。主要改`.meta`文件。
3. 转换（Import/Convert）：将源文件根据目标平台转为 Library 下的格式（如 ASTC、压缩网格等）。
4. 后处理（Post-process）：转换完成后，对生成的对象进行二次加工。主要改“资产对象”，这些改动会被 Unity 序列化到 Library 文件夹下的缓存资源里。
    - 如fbx导入成project视图下的（白蓝相间的）方盒子就是“资产对象”，可以在Post-process中往上面挂脚本
    - 如果 Library 缓存没有刷新，可以右键Reimport

## 常见资源问题

1. Gamma颜色空间和sRGB
2. 图片大小、压缩格式等图片配置，注意图集图片不需要配置压缩格式。
3. 骨骼蒙皮规范统一
    - 见[记录VRoid导入Unity实现换装系统](../CodingRamble/VRoidInUnity/#模型导入)中的模型导入部分。

## 参考
1. [AssetPostprocessor - unity脚本文档](https://docs.unity3d.com/cn/2022.3/ScriptReference/AssetPostprocessor.html)