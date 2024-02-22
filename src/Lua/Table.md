# 表-关键数据结构

> 在Lua编程语言中，表（table）是一种非常重要的数据结构，可以用来表示关联数组、集合、记录、对象等。表在Lua中是一种强大而灵活的数据结构，它既可以被用作数组，也可以被用作字典或关联数组。

它有以下用途：
- 作为基础的数据结构（数组，字典）
- 作为面向对象设计的`类`，通过原型模式
- 元方法实现运算符重载和其他特性

## 表的基本操作

由于lua是动态类型的，你可以往表里面塞任何东西，通过`string`和`number`索引就行
> 任何东西，lua的基本类型：值（boolean, number, string），函数(function)，thread，table，userdata

然后我们通过表的定义，和作为列表和字典使用时的操作简单看一下表的概念

表定义:
```lua
foo = {} --不定义的话，以类似foo[1]的方式访问表内元素会导致程序终止哦
```

列表的定义、遍历和基本操作:
```lua
arr = {}
for i = 1, 10, 1 do
    arr[i] = i;
end

-- 遍历
for index, value in ipairs(arr) do
    print(value)
end  

-- 基本操作，使用表标准库：insert，remove
table.insert(arr, 1, 10) -- 在1之前插入10，会导致1-10的元素后移
table.remove(arr, 2) -- 删除第二位元素
```

字典的定义、遍历和基本操作
```lua
dic = {}
dic['a'] = 10 dic['b'] = 12 dic['c'] = 15
-- 或 dic = {['a'] = 10, ['b'] = 12, ['c'] = 15}

-- 遍历
for key, value in pairs(dic) do
    print(key, value)
end

-- 基本操作：contains
if dic['a'] ~= nil then
    print("contains element 'a'")
end
```

*记录式，到目前为止没什么卵用（需要配合面向对象的一些feature
```lua
a = {x = 10, y = 20}
print(a.x) -- 10
a.z = 30
print(a.z) -- 30
print(a.undefine) -- nil
```
**以上定义方式还可以混合使用...** 是不是汗流浃背了呢

### 作为列表使用的一些问题

如果通过`arr[i]=nil`的方式尝试删除元素，就可能会遇到一些问题(书中把他称为空洞)
> 建议使用`table.remove`

例如求长度的符号`#`只会计算从`下标1`到第一个nil为止的列表长度，会变得不可靠。解决方案是程序员自己存储长度信息。
> 注意作为字典使用时的情况，`#`基本没用

## 元表（metatable）

元表是表的表，元表中的方法（叫做元方法），提供了类似重载运算符（如`__add`和`__concat`）、重载api实现（如`__tostring`、`__metatable`和`__pairs`）和重载表相关的元方法（如`__index`）。
> 也可以是任何类型的表，但修改其他类型的元表在lua语言中是做不到的

通过元表，延伸出了面向对象设计和沙箱运行环境等特殊做法。

获取和设定元表：`getmetatable(table)` 和 `setmetatable(table, metatable)`
> 可以通过设置`__metatable`控制是否允许访问metatable

表相关的元方法
- `__index`：访问不到的表索引会执行元表的`__index`方法，若未定义该元方法，则返回nil。
    - 可以用来实现oop中的继承，由于函数更灵活，甚至可以实现多继承
- `__newindex`：添加表中不存在的索引会执行元表的`__newindex`方法
    - 可以阻止向表中添加元素，也可以结合`__index`方法利用“代理”概念进一步控制
> “`__index`用于表的查询而`__newindex`用于表的更新”
- 更多应用
    - 追踪表的修改：保持表是空的，在元表中“代理”对表的操作
    - 默认值和对偶表示


## 参考
- [Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)
    - 20章，元表和元方法