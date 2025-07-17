# 常用规范

## 命名规范

::: details GPT谈Unity命名规范
在Unity中编写C#脚本时，通常遵循以下命名规范：

1. 类名：使用帕斯卡命名法（PascalCase），即每个单词的首字母大写，不使用下划线。例如：`PlayerController`。

2. 方法名和变量名：使用驼峰命名法（camelCase），即第一个单词的首字母小写，后续单词的首字母大写，不使用下划线。例如：`moveSpeed`，`attackPlayer()`。

3. 常量名：使用大写字母和下划线命名（UPPER_CASE），单词之间用下划线分隔。例如：`MAX_HEALTH`。

4. 私有变量名：通常以一个下划线开头，然后按照驼峰命名法命名。例如：`private int _count`。

如果需要通过Inspector导入的变量，可以考虑在变量名前面加上`SerializeField`属性，这样即使是私有变量也可以在Inspector中显示。例如：

``` cs
[SerializeField]
private int m_health;
```

这里的`m_`只是一个命名习惯，意在提醒该变量是通过Inspector导入的。你可以根据自己的喜好选择适合你的命名方式，只要保持代码风格一致和易于理解即可。 😉
:::

核心在于“只要保持代码风格一致和易于理解即可”

1. 需要Inspector注入的变量
    - 使用`m_`开头+帕斯卡命名法的方式，如：`m_MyField`
2. 通过管理类初始化的私有变量
    - 使用`_`开头+驼峰命名法的方式，如: `_context`
3. 其他私有变量（如通过find找到的组件，记录的临时状态
    - 使用驼峰命名法的方式，如: `speed`

WIP

## 字段与属性

由于`Serializable`属性并不会序列化属性（属性的本质是方法），所有一些配置文件应该写作字段的形式。

> 用: `public int foo;` </br> 而不用: `public int foo {get; set;}` 

一些使用OOP设计的程序类仍可以使用属性

## 结构体替换类

尽可能使用结构体替换类，这样可以减少垃圾回收。

TODO: 待核实
> 没错，但结构体如果封装到类中，一样会在堆上分配内存。在代码中创建struct在CLR中会分配到线程栈中，作用域结束就会被抛弃。在《CLR via C#》中建议：结构体不应无脑使用，他的大小最好小于16B，且不需要传递来传递去。

## 参考
- [Unity小窍门100条！！！(上) - 知乎](https://zhuanlan.zhihu.com/p/558732611)
    - 对应视频：[100 UNITY TIPS!!! 🔥 - Youtube](https://www.youtube.com/watch?v=thA3zv0IoUM)