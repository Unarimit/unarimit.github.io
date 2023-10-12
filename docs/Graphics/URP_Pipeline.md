# URP渲染管线
Files
- UniversalRenderPipelineAsset.asset
- UniversalRenderPipelineAsset_Renderer.asset
- UniversalRenderPipelineGlobalSettings.asset



## 例子

### 如果要使用一个导入的后处理

1. 检查 `_Renderer.asset` 中是否要加入对应的 `Renderer Features`
2. 检查 `UniversalRenderPipelineAsset.asset` 中是否提供了需要的材质，如边缘检测需要`Depth Texture`