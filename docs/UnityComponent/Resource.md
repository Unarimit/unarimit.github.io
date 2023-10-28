# 资源管理

Unity提供`Resource`API和`Addressable`包用于管理资源。
> Unity2018之前也使用`AssetsBundle`管理，因为使用`AssetsBundle`实现一套资源管理系统非常复杂，所有有了`Addressable`，而`AssetsBundle`已被标记为"out of date"。

:::tip gpt

- `Resource`:简单易用😁，所有资源全部加载到内存(?)😡，不支持热更新😡
- `Addressable`:分组管理😁，异步加载😁，学习成本较高😡

对于较小的项目或不需要频繁更新资源的情况下，可以使用简单的 Resource 管理方式。而对于大型项目或需要动态加载和更新资源的情况下，更推荐使用灵活的 Addressable 方式来管理资源。
:::

## Resource

::: warning
Resources 文件夹是 Unity 项目中许多常见问题的来源。Resources 文件夹的使用不当会使项目构建出现膨胀，导致内存消耗过高，并显著增加应用程序启动时间。
:::

用于动态的载入prefab，贴图等素材(不需要在inspector中拖动)。相对于放在其他地方的资源，Resource下的必定会被打包发布，其他资源只有在打包的场景使用到的时候才会被打包发布。

1. 把资源放在`[项目名]\Assets\Resources\`下
2. 通过`Resources.Load<GameObject>([资源名]);`载入资源，这里通过泛型限定了载入类型为prefab
 
## Addressable

WIP

## 参考
- [Unity资源管理方案 Addressable详解 - changyun的文章 - 知乎](https://zhuanlan.zhihu.com/p/635796583)
- [Unity资源管理系列：Unity Addressable资源管理实战 - 鲨鱼辣椒的文章 - 知乎](https://zhuanlan.zhihu.com/p/541893117)