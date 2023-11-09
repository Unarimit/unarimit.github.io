# URP渲染管线
Files
- UniversalRenderPipelineAsset.asset
- UniversalRenderPipelineAsset_Renderer.asset
- UniversalRenderPipelineGlobalSettings.asset

可能还会有
- Setting/Low_PipelineAsset.asset
- Setting/High_PipelineAsset.asset
- Setting/Ultra_PipelineAsset.asset
- ...

根据需要配置，在`project setting->Quality`中可以看到editor使用的模式


## 介绍
阅读参考，完善md文件

## 和其他渲染管线的区别

HDRP,甚至UE的一些渲染管线

## 问题？
给Volume设置layer会导致其失效


## 例子

### 如果要使用一个导入的后处理

1. 检查 `_Renderer.asset` 中是否要加入对应的 `Renderer Features`
2. 检查 `UniversalRenderPipelineAsset.asset` 中是否提供了需要的材质，如边缘检测需要`Depth Texture`

## 参考
[URP管线修改落地实战 - UWA开源社区](https://edu.uwa4d.com/course-intro/0/489?entrance=3)