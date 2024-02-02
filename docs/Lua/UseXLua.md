# 使用XLua

> XLua为Unity、.Net、Mono等C#环境增加Lua脚本编程的能力，借助xLua，这些Lua代码可以方便的和C#相互调用。

安装方式见[索引页](./#使用lua做热更新的准备工作)

为了了解XLua的使用方式，首先要看XLua仓库下的的Demos，里面详细的介绍了在unity中常见的调用方式和热补丁等特性的配置方式。

## 本地Lua逻辑

> 相对热更新而言的，直接在本地载入txt写的lua文件`TextAsset`。


## 热更新Lua逻辑


## 注意CS下的类型名称

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
- [XLua - Github](https://github.com/Tencent/xLua)
- [给XLua生成Unity Api的EmmyLua代码提示 - CSDN](https://blog.csdn.net/ak47007tiger/article/details/127940571)
- [EmmyLuaUnity - visualstudio market](https://marketplace.visualstudio.com/items?itemName=CppCXY.emmylua-unity)