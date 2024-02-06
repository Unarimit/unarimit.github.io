# 使用XLua

> XLua为Unity、.Net、Mono等C#环境增加Lua脚本编程的能力，借助xLua，这些Lua代码可以方便的和C#相互调用。

安装方式见[索引页](./#使用lua做热更新的准备工作)

为了了解XLua的使用方式，首先要看XLua仓库下的的Demos，里面详细的介绍了在unity中常见的调用方式和热补丁等特性的配置方式。

## 本地Lua逻辑

> 相对热更新而言的，直接在本地载入txt写的lua文件`TextAsset`。


## 热更新Lua逻辑

## 配置`[LuaCallCSharp]`、`[CSharpCallLua]`等特性

- `[LuaCallCSharp]`特性用于加速lua调用C#（不然就使用反射）
- `[CSharpCallLua]`特性用于适配委托（delegate，Action，Func，event）或把一个lua table适配到一个C# interface。
	- 有时也不一定需要配置，“如果不确定，可以等报错的时候再加入配置”。

还有其他特性去看文档吧：[(必看)XLua的配置：介绍如何配置xLua。- Github Official](https://github.com/Tencent/xLua/blob/master/Assets/XLua/Doc/configure.md)

一种推荐的配置方式示例：[XLua ExampleGenConfig.cs - Github Official](https://github.com/Tencent/xLua/blob/master/Assets/XLua/Examples/ExampleGenConfig.cs)

## 注意事项

### 注意Lua编译C#泛型容器的方式

对于数组，不能使用`ipair`，因为lua默认数组是从1开始计数的，会出问题。只能使用for i的方式，如下所示：
```lua
for i = 0, list.Count-1, 1 do -- list是C#的List类型
    print(i .. list.Name)
end
```

而对于字典，则可以使用`pair`遍历，但随机访问却无法按照常理进行，需要使用`get_Item`和`set_Item`的方式：

详见[XLua FAQ - Dictionary访问问题 - Github Official](https://github.com/Tencent/xLua/blob/master/Assets/XLua/Doc/faq.md#thisstring-field%E6%88%96%E8%80%85thisobject-field%E6%93%8D%E4%BD%9C%E7%AC%A6%E9%87%8D%E8%BD%BD%E4%B8%BA%E4%BB%80%E4%B9%88%E5%9C%A8lua%E6%97%A0%E6%B3%95%E8%AE%BF%E9%97%AE%E6%AF%94%E5%A6%82dictionarystring-xxx-dictionaryobject-xxx%E5%9C%A8lua%E4%B8%AD%E6%97%A0%E6%B3%95%E9%80%9A%E8%BF%87dicabc%E6%88%96%E8%80%85dicabc%E6%A3%80%E7%B4%A2%E5%80%BC)

### 注意CS下的类型名称

在[demo3](https://github.com/Tencent/xLua/tree/master/Assets/XLua/Examples/03_UIEvent)中，通过lua控制button的点击逻辑，代码如下：
```lua
function start()
	print("lua start...")

	self:GetComponent("Button").onClick:AddListener(function()
		print("clicked, you input is '" ..input:GetComponent("InputField").text .."'")
	end)
end
```

它通过`input:GetComponent("InputField").text`获取了输入框文本，这里如果写错`"InputField"`或`text`(相对来说容易写错的地方)，如果不到执行的时候将得不到任何提示。除此之外也要明确的区分`:`和`.`。

> 了解这一点之后，应该避免在lua中写过于复杂的逻辑，每次写功能也要全面测试，覆盖所有的代码块。

> 有一些辅助工具（如`EmmyLua`和它的子组件`EmmyLuaUnity`）可以通过注释提供Unity API的代码补全，具有一定的提示作用，但其作用仍是有限的。

## 参考
- [XLua - Github Official](https://github.com/Tencent/xLua)
- [给XLua生成Unity Api的EmmyLua代码提示 - CSDN](https://blog.csdn.net/ak47007tiger/article/details/127940571)
- [EmmyLuaUnity - visualstudio market](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-unity)