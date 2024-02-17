# 动态性

> 一起感受 `DoFile()` 的魅力

lua作为一种拥有**动态类型**的**解释型**编程语言，本文将简单提及这些特性。

1. 动态类型
    - 数据代码文件：不必像其他语言一样传序列化文本，我们可以直接传表示数据的lua代码
    - 序列化方面仍然需要自己处理，而且由于动态类型的问题，处理时需要更加小心谨慎。
    - 降低了代码可阅读性

2. 动态载入代码
    - 编译的概念和`load()`: lua会先将lua代码预编译为中间代码，`load()`函数可以运行时做这件事
    - `loadfile(filename)`和`load(io.lines(filename, "*L"))`是等价的调用
    - 预编译指令`luac`（是运行在命令行的指令），`.lc`文件（预编译版本的代码），和`string.dump(loadfile(filename))`
    - `loadfile()`和`load()`都可以接受预编译文件

3. 包管理:`package`和`require`
    - 包管理也有部分是留给用户去定义的，用户可以定义搜索的位置，找到之后通过`loadfile()`载入
    - 并允许运行时卸载包，如`package.loaded.math = nil`
    - 定义和查看都在`package`包内，通过`require`检索定义的位置
    > 如XLua就自定义了`loader`使其查找目录增加了`Resource\`
    - 还引申出了`子模块`和`包`的概念，如`mod.sub`


## 示例

### 实现DoString

```lua
str = 'i=i+1'
load(str)()
```
等价于

```lua
(function () --匿名可变长参数函数(可以忽略t，t只是为了后面能够执行这个函数)
    i = i + 1
end)()
```

### 实现简单的模块

一个拥有`add`方法的二维点类

```lua
-- point.lua
local point = {}
-- package.loaded[...] = point --可以不用最后return，使用这种导出方式
local new = function(x, y)
    return {x=x, y=y}
end

point.new = new

point.add = function (p1, p2)
    return new(p1.x + p2.x, p1.y + p2.y)
end

return point
```

```lua
-- test.lua
require "point"

p1 = point.new(1, 1)
p2 = point.new(1, 2)
p3 = point.add(p1, p2)
```

## 参考
- [Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)
    - 第15章-数据文件和序列化
    - 第16章-编译、执行和错误
    - 第17章-模块和包
