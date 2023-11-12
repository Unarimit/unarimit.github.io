# 常用规范

## 字段与属性

由于`Serializable`属性并不会序列化属性，所有一些配置文件应该写作字段的形式。

> 用: `public int foo;` </br> 而不用: `public int foo {get; set;}` 

一些使用OOP设计的程序类仍可以使用属性

## 结构体替换类

尽可能使用结构体替换类，这样可以减少垃圾回收。

TODO: 待核实


## 参考
- [Unity小窍门100条！！！(上) - 知乎](https://zhuanlan.zhihu.com/p/558732611)
    - 对应视频：[100 UNITY TIPS!!! 🔥 - Youtube](https://www.youtube.com/watch?v=thA3zv0IoUM)