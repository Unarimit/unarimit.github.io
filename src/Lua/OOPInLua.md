# lua中的面向对象

一些面向对象的设计，可以通过 `表` 这一Lua专有特殊的结构实现。但由于这些实现不由语言本身指导，最好不要没事在lua中搞OOP。

> 就像《C++ Primer》一书中说: "尽量使用智能指针（而非指针），尽量不要做强制转换（尤其是 `reinterpreter_cast` 和c风格强转）"，但总归有一些使用场景得使用指针和强制转换。

lua的设计模式就不太支持OO（面向对象），光是想实现“实例化”这一功能，就得利用元表和`__index`。即便如此，也可以参考“基于原型的语言”在lua中模拟类。

> 《Lua程序设计》书中，只提到可以实现类的继承和私有（他甚至不敢说是封装），对于多态概念，代码层面实现多态很简单（毕竟大家都是表，什么方法不能调，还有 `print` 和 `__tostring()` 这一例子），但却难以规范，不像c++和c#可以通过类型（抽象类、接口）和类型转换来规范。

:::details gpt带你咬文嚼字：

Q：Lua程序设计》书中提到“可以使用lua实现类的继承和私有”，他为什么不说是“封装”而说是“私有”呢？这两个概念有什么区别？

A：在《Lua程序设计》中提到“可以使用Lua实现类的继承和私有”，在这里使用“私有”而不是“封装”可能是因为在Lua中并没有像其他面向对象编程语言一样提供内置的私有访问控制。在传统的面向对象编程语言中，私有性是通过访问修饰符（如private）来实现的，以确保某些属性或方法只能在类的内部访问。

在Lua中，面向对象编程通常是通过元表和闭包等特性来实现的，这意味着可以模拟出类似于私有成员的概念，但实际上这些成员并不是真正的私有。因此，作者在书中可能选择使用“私有”而不是“封装”，以强调在Lua中模拟私有性的方式，而不是传统意义上的封装。

封装是面向对象编程中的一个概念，指的是将数据和操作数据的方法捆绑在一起以确保数据的安全性和一致性。封装提供了对对象的访问控制，可以通过公共接口暴露必要的操作，同时隐藏内部实现的细节。在传统的面向对象编程语言中，封装往往与私有性紧密相关，而访问控制使用访问修饰符（public、private、protected）来实现。

因此，虽然在Lua中无法像传统面向对象编程语言一样提供真正的私有访问控制，但可以通过一些技巧来模拟类似的效果，这可能是为什么在书中作者选择使用“私有”而不是“封装”的原因。

:::

本文接下来会仿照《Lua程序设计》介绍lua语言如何：
- 实现类
- 实现类的继承
- 实现类成员的私有

并使用银行账户这一背景，和 `Account` 类，来写示例代码

## 实现类

类可以解释为“数据方法集合的定义”和“实例化”两个功能，我们可以通过元表和表方法定义（冒号运算符`:`）实现。

例如我们定义一个类 `Account` ，并实现 `deposit` 方法。

```lua
-- 定义 Account “类”
Account = {balance = 0}

function Account:new (o)
    o = o or {}
    self.__index = self
    setmetatable(o, self)
    return o
end

function Account:deposit(v)
    self.balance = self.balance + v -- 若self中没有索引，则self会产生索引
end

-- 操作
acc1 = Account:new()
acc1:deposit(10) -- 这时acc有了自己的key，而不再利用元表的key
```


## 实现类的继承

使用元表的 `__index` 来模拟继承，`__index`可以是一个被继承的表，构成一个简单的单继承实现。`__index`可以是一个方法，可以在里面具体控制索引`key`不在时按什么顺序查找哪些类，构成一个多继承的实现。

例如，我们可以创建一个基类 `Account`，然后派生出子类 `SuperAccount`：

```lua
-- 定义 Account “类”
Account = {balance = 0}

function Account:new (o)
    o = o or {}
    self.__index = self
    setmetatable(o, self)
    return o
end

function Account:deposit(v)
    self.balance = self.balance + v
end

-- 定义 SuperAccount “子类”
SuperAccount = Account:new()

function SuperAccount:deposit(v)
    self.balance = self.balance + v * 2; 
end

-- 操作
print(SuperAccount.balance) -- 0，是Account中的0
SuperAccount:deposit(50)
print(SuperAccount.balance) -- 100，是SuperAccount中的100
```

`SuperAccount` 的特点是存款（`deposit`）会变为两倍！

## 实现成员的私有

可以利用闭包或“对偶表示（dual representation）”实现类的私有

以闭包的方式实现:
```lua
-- 定义 Account “类”
function newAccount (initBalance)
    local self = {balance = initBalance}
    local deposit = function(v)
        self.balance = self.balance + v
    end
    local getBalance = function ()
        return self.balance
    end
    return{
        deposit = deposit,
        getBalance = getBalance
    } 
end

-- 操作
local acc = newAccount(10)
print(acc:getBalance()) -- 10
```
对偶表示的方式实现：

```lua
-- 定义 Account “类”
Account = {}
local balance = {} -- 注意看，这个表叫做小帅，他是实现对偶表示的关键

function Account:new (o)
    o = o or {}
    self.__index = self
    setmetatable(o, self)
    balance[o] = 0
    return o
end

function Account:deposit(v)
    balance[self] = balance[self] + v
end

function Account:getBalance()
    return balance[self]
end

-- 操作
local acc = Account:new()
acc:deposit(10)
print(acc:getBalance()) -- 10
```

可以看出对偶表示实现，代码结构更优雅一点，不用把成员函数作为闭包都写到一个函数中的了，但无论哪种方式到产生了额外的资源开销。
> 对于对偶实现中的 `balance` ，它可能永远也不会被垃圾回收，这在一些场景中可能会有问题，书后面的章节会尝试解决这一问题 （TODO：阅读后面内容补充）

## 参考
- [Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)
    - 20章，元表和元方法
    - 21章，面向对象编程