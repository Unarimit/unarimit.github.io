# blender

bleader贴图相关，
- 如何生成法线贴图
- 低模使用高模贴图

## 差异

由于blender和Unity(或其他游戏引擎)对模型的解释不一样：
- Blender 使用的是 Z-Up 右手坐标系，而 Unity 是 Y-Up 左手坐标系。
- Unity 没有 Joint Orient 这个属性。它所有的轴向偏移都必须通过 localRotation（四元数/欧拉角）来表示。
    - Apply Transform 清除轴向信息
    - 但可能还需要进一步统一配置，参考[记录VRoid导入Unity实现换装系统](../CodingRamble/VRoidInUnity)

## refs

[Blender教程】使用Blender烘焙法线贴图 - 0xSimple - bilibili](https://www.bilibili.com/video/BV1Nh411H7N3)


## tools

- Better Fbx Importer & Exporter 