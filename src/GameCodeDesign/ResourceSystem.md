# 资源系统和服务

## 资源系统

unity中，存在`Resources`和`AudioSource`等资源加载静态类。

其中`Resources`加载的资源，可能根据不同的平台和加载位置（`Resources`、`AssetStream`或是`Asset Bundle`）不同，产生不同的资源字符串。所以对`Resources`有封装需求。

而`AudioSource`或类似功能（如子弹发射），则可能因为频繁的创建和销毁产生内存碎片，并且不利于统一管理（如音量调节）。所以对`AudioSource`及其类似功能有封装需求。


### 以Resources Api的封装为例

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
在这样的封装下，找不到资源会告诉你资源的名称，是不是比仅仅抛一个空引用异常要好呢？


## 服务和服务定位器

除了对unity固有api的封装外，我们有时还需要让这些资源加载类改变一下工作行为。对于音频输入，在其他模块的开发中需要它输出一些log而非播放嘈杂的音频特效；对于数据管理器，在测试阶段需要它每次都读取固定的数据而非可以在游戏内变更的存储系统。这时，就需要服务这一概念了（有点像是后端开发中的面向接口编程）。
> 在多人开发中，这样做可以对正在并行开发的服务置空而不影响开发流程

关于服务和服务定位器的概念，可以查看[“设计模式-服务定位器”章节](DesignPattern.html#服务定位器)。


### 以TestDatabase为例

在我的游戏的开发过程中，存档系统的优先级比较靠后，所以先用静态类实现。为了方便之后丝滑的在两者之间切换，有了以下设计：

``` cs
// 服务定位器
internal static class MyServices
{
    public static IGameDatabase Database { get; }
    static MyServices()
    {
        // 测试使用
        Database = new TestDatabase();
    }
}
```

``` cs
// 服务接口
internal interface IGameDatabase
{
    /// <summary> 玩家拥有的Op </summary>
    public List<Operator> Operators { get; }
    /// <summary> 玩家拥有的机甲 </summary>
    public List<MechaBase> Mechas { get; }
    /// <summary> 所有关卡规则 </summary>
    public List<LevelRule> LevelRules { get; }
    // ...
}
```
``` cs
// 服务提供者
internal class TestDatabase : IGameDatabase
{
    public List<Operator> Operators { get; private set; }

    public List<MechaBase> Mechas { get; private set; }

    public List<LevelRule> LevelRules { get; private set; }

    public TestDatabase()
    {
        LevelRules = generateTestLevel();
        Operators = generateTestOperators();
        Mechas = generateTestMechas();
        registerDatabind();
    }
}
```
这样在以后实现存档系统后，让实现存档系统的类继承`IGameDatabase`的接口，并在读取存档时配置`MyServices`，就可以实现无缝切换了。

具体的代码可以在[MyTDS-MyServices.cs](https://github.com/Unarimit/my-topdown-shooting-game/blob/0154b461cfff4dbdddf2188972c68159486be56e/Assets/Scripts/MyServices.cs)和[MyTDS-Services](https://github.com/Unarimit/my-topdown-shooting-game/tree/0154b461cfff4dbdddf2188972c68159486be56e/Assets/Scripts/Services)找到。

## 参考
- 视频的4p:[第三部分:Unity技能系统](https://www.bilibili.com/video/BV1WJ411T7YQ)
- [《Game Programming Patterns》](https://gameprogrammingpatterns.com/)