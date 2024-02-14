# 启动流程设计

启动流程中需要对一系列模块进行初始化，例如检测新版本，检测服务器状态，加载外部代码，加载场景等。它们之间往往具有先后顺序（例如"加载游戏资源步骤"依赖于"检测新版本"步骤），并可以以流程图的方式表示出来。

## 简单的做法

在Unity中调整某一`MonoBehaviour`的优先级，直接在他的`Awake`函数下做启动初始化即可。对于一些不依赖`MonoBehaviour`功能的初始化过程，也可以利用C#的静态构造函数来做，保证该类在第一次访问之前完成初始化。

如我在MyTDS中所做的
1. 利用MonoBehaviour的初始化

```csharp
internal class StartSceneStartup : MonoBehaviour{
    private void Awake()
    {
        // 加载背景（根据一些存档信息）
        SceneManager.LoadScene("HomeBackground", new LoadSceneParameters(LoadSceneMode.Additive));

        // 加载lua脚本 (添加关卡和技能）
        luaLogicLevelInject();
        luaLogicSkillInject();

    }
}
```

2. 利用C#静态构造函数的初始化
```csharp
/// <summary> 服务提供者（定位器） </summary>
internal static class MyServices
{
    /// <summary> 运行时存储，不等于存档 </summary>
    public static IGameDatabase Database { get; }
    /// <summary> 游戏数据常用方法 </summary>
    public static GameDataHelper GameDataHelper { get; }
    /// <summary> Lua全局环境 </summary>
    public static LuaEnv LuaEnv { get; }
    static MyServices()
    {
        // 测试使用
        Database = new TestDatabase();
        //Database = new FileDatabase();
        GameDataHelper = new GameDataHelper(Database);
        LuaEnv = new LuaEnv();
    }
}
```

## 复杂的做法

在大型项目中，初始化的逻辑可能很复杂（如涉及对资源的销毁并引入生命周期），并涉及多个人开发的不同模块，可能不能在一个代码块中描述出所有逻辑。

这时候会把逻辑拆分到标准化的类中，并设计优先级、加载、卸载、调试信息、异常处理（例如商店模块在检测不到谷歌服务的情况下无法运作，但却不影响游戏进行，这就需要做异常处理）等特性，可以参考一些开源的游戏框架，如`GameFramework`。
> 引用一篇不错的讲解：[GameFramework解析：流程 (Procedure) 花桑 - 知乎](https://zhuanlan.zhihu.com/p/431013230)

这里由于缺乏实践就不过多描述了

## 其中的问题

无论哪种做法，随着项目的复杂度提高，为了解耦逻辑都会将初始化功能拆分到其他类中，这也导致了初始化过程的不直观。
> 我认为在程序内部，可以通过管理类提供统一的接口，再使用log可视化初始化过程。程序外部则使用详细的文档描述初始化过程。不过因为我没接触过大点的项目，这些仍停留在理论层面。

## 参考
- [GameFramework解析：流程 (Procedure) 花桑 - 知乎](https://zhuanlan.zhihu.com/p/431013230)