# 常用规范

## 字段与属性

由于`Serializable`属性并不会序列化属性，所有一些配置文件应该写作字段的形式。

> 用: `public int foo;` </br> 而不用: `public int foo {get; set;}` 

一些使用OOP设计的程序类仍可以使用属性