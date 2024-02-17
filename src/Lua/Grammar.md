# 常用语法

汇总了开发常用的语法，并对比了和其他语言(C++, C#)的区别。

> "解释型语言的区分并不在于源码是否被编译，而在于是否有能力（且轻易的）执行动态生成的代码"

## 烦人的特性

> 和其他语言(C++, C#)不同的地方

1. 符号可以不定义直接使用
> 如我打开lua console就开始`print(a)`，我会得到`nil`，而不是一个报错。
2. 数组下标从1开始，并不强求，但是很多机制都遵循这个标准
> ???
3. 喜欢定义标新立异的符号
> `#`, `..`, `...`, `--`, `[[]]`, for和while用`do`, if、else、elseif用`then`
4. 动态类型
5. 函数的丢弃规则
> `function foo(a) return 'a' end`</br>
> `a, b = foo(c, d, e)` --可以运行哦--> `a = 'a' b = nil`
6. lua的函数并不是像C++一样的“命了名的代码块”，而更像是一种“实例”
> “lua只有闭包没用函数（只是为了习惯称闭包为函数），函数本身是闭包的原型” </br>
> `function foo() {body} return` 是 `foo = function() {body} return` 的语法糖
7. lua的位运算符是"逻辑移位"，每个移位操作都会用0填充空出的位(补码表示下)
> 如`(-4) >> 2`在lua中会得到`4611686018427387903`而不是`-1`

## 基础数据类型

nil, number(integer, float), boolean, string, userdata, function, thread, table
- number于5.3开始区分integer和float
    - `//`是整除，`%`很特殊，`3.14 % 1 = 0.14`
    - `"10" + 1 --> 11.0`
- string是不变值，不能实现O(1)修改里面的某个字符，像c#
    - 长字符串声明`[[ string\n\rstring ]]`和`\z`
    - `..`、`#`以及[其他api](https://www.lua.org/manual/5.3/manual.html#6.4)
    - [utf8标准库](https://www.lua.org/manual/5.3/manual.html#6.5)
- table是lua中唯一的主要的数据结构
    - 是数组、是字典还是结构体
    - 结构体：把`math.sin`解释为“以字符串'sin'为键检索表`math`”
    - 数组：小心空洞
    - 字典：遍历键值对——`pairs`迭代器和`ipairs`(顺序)
    - `foo.x ~= foo[x]`, `foo.x == foo['x']`
    - [表标准库](https://www.lua.org/manual/5.3/manual.html#6.6)：很简单
    的两个小功能，双端队列都实现不了（指时间复杂度问题）
    - 书中第5章的练习中向我们展示了lua的二义性，真出生啊
> 使用`type`函数可以获取值对应的类型名词，如`type(true) ---> boolean`

## 控制流长啥样

### for
```lua
for i = 1, N do
    ...
end
```
### if
```lua
if n > N then
    ...
end
```

### 一些不同
- 使用`~=`作为不等判断

## 奇怪的符号

- `#`：获取字符串长度 `print(#"hello") --> 5`，获取table长度
- `..`: 链接两个字符串 `print("ab".."cd") --> abcd` 
- 注释使用`--`(单行)和`--[[ line,line  ]]--`(多行)
    - `--[=[]=]`


## 分号的必要性

> lua的分号是可有可无的

我在尝试匿名函数的调用时发现了一个“有趣”的bug

```lua
function a()
    print("ok")
end
a() -- 在后面加上分号就好了

(function ()
    print("233")
end)()
```

它的执行结果是`.\test.lua:4: attempt to call a nil value stack traceback:`，很显然它识别错了语法，尝试调用`a()()`。

## 异常处理家族

- `error()`: 类似 throw ex
- `assert()`：一种封装了判断功能的 throw ex
- `pcall()`: 实现try-catch结构

## 参考
- [Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)