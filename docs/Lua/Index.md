<img src='../img/lua-0.png'>

# Lua学习笔记

::: tip
由于我有一些C#开发经验和其他语言的轻度使用经验（C++、Python等），所以可能会默认读者也知道这些知识。

当然有可能是混淆一些概念，把东西写的更不清楚:（
:::

Lua是一种解释性语言，意味着和我们学习过的常用编程语言（如C，C++，Java）和Unity开发使用的C#语言有很多不同。
> 他和同为解释性语言的Python倒是有很多相似的地方（连开发时间都很接近呢）。



## (我)为什么学习lua？

Lua作为一种胶水语言，在游戏热更新中普遍使用。但看了[几种不同的热更新方案](../GameBuild/Mod&Hotfix)，我最不想用的就是lua（喜欢我动态类型吗），不过鉴于它在游戏开发的活跃程度，还是得学。
> 忘记最近在那本书上看到：“程序员不要介意多学语言”。

## (我)如何学习lua？

学习方式主要是看[Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)这本书，和使用[xLua](https://github.com/Tencent/xLua)实践。
> 书中有提到线上的文档涵盖Api更全（但没有示例代码），书中介绍的是相对常用的功能。

## 带着问题去学习

> 这些问题大部分是在学习过程中产生的

#### Q1: 游戏行业为什么普遍使用lua做热更新？

因为lua虚拟机很小，几百KB。再加上设计之初就是用于给其他语言补丁用的。
> 但在网上经常看到哪个项目只用c#写框架，逻辑都用lua写。这对吗？

#### Q2: 在Unity中，Lua与C#交互的方式有哪些？（Lua通过什么影响游戏世界？）

以XLua为例：

参考[Demo2](https://github.com/Tencent/xLua/tree/master/Assets/XLua/Examples/02_U3DScripting)，可以通过设定`LuaBehaviour`，按照`Behaviour`生命周期调用指定lua文件的相关函数，并定义`Inspector`，通过其中的配置，注入所需的(依赖的)对象。其中的关键操作为：
- 获取`LuaEnv`（教程的写法是共用一个`LuaEnv`，是为了避免lua多次载入CS下命名空间的开销吗？）
- 以`TextAsset`的形式载入脚本文件，使用`DoString`方法将脚本载入到一个`LuaTable`中，避免命名冲突
- 在`LuaTable`中使用`Set`方法设置所需的(依赖的)对象
- 在`LuaTable`中使用`Get`方法获取脚本中的函数，类型为C#的`Action`
- 在生命周期中调用上一步获取的lua函数

上述例子实现了C#调用Lua(start, update等生命周期函数)，和Lua调用C#(操作注入的对象)

#### Q3: 如何产生Lua端的代码提示？

WIP

## 使用Lua做热更新的准备工作！

### 安装lua在本机用于学习

简要介绍一下安装方法

windows下可以用choco装lua53
```bash
choco find lua # 能看到 'lua53 5.3.5 [Approved]'
choco install lua53
```

代码高亮和自动补全可以搜搜vscode的拓展插件

### 安装XLua在项目中

进入[XLua的github仓库](https://github.com/Tencent/xLua)，下载仓库的zip包(Code->Download Zip)，将`Assets目录`覆盖到Unity项目的`Assets目录`。如有必要，还可以将release下的更新的`dll`包覆盖到项目中。

> 路径不是绝对的，但变更路径可能产生一些影响，例如需要重新配置Generate Path。

> 期间可能出现多个**相同名字和配置**`lua.dll`导致的Unity报错(应该是支持环境没下载全导致的meta文件的配置没识别对，从而出现了相同配置的`lua.dll`)，我的解决方式是把不需要的删掉，只留`x86`。

之后运行`Hello world`测试

```csharp
XLua.LuaEnv luaenv = new XLua.LuaEnv();
luaenv.DoString("CS.UnityEngine.Debug.Log('hello world')");
luaenv.Dispose();
```

若有看到控制台输出，就代表安装完成了！进一步的经验请参考[使用XLua](./UseXLua)部分。

## 参考
- [Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)