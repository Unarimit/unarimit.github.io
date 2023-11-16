# 资源系统

unity中，存在`Resources`和`AudioSource`等资源加载静态类。

其中`Resources`加载的资源，可能根据不同的平台和加载位置（`Resources`、`AssetStream`或是`Asset Bundle`）不同，产生不同的资源字符串。所以对`Resources`有封装需求。

而`AudioSource`或类似功能（如子弹发射），则可能因为频繁的创建和销毁产生内存碎片，并且不利于统一管理（如音量调节）。所以对`AudioSource`及其类似功能有封装需求。


## ResourceManager

一个最简单的`ResourceManager`示例

```cs
internal static class ResourceManager
{
    public static T Load<T>(string resName) where T : Object
    {
        var res = Resources.Load<T>(resName);
        if(res == null)
        {
            Debug.LogError($"ResourceManager can not find {resName}");
        }
        return res;
    }
}
```

若需初始加载配置，可以在静态构造函数里面做

## AudioManager

WIP


## 参考
- 视频的4p:[第三部分:Unity技能系统](https://www.bilibili.com/video/BV1WJ411T7YQ)