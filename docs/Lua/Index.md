<img src='../img/lua-0.png'>

# Lua学习笔记

::: tip
由于我有一些C#开发经验和其他语言的轻度使用经验（c++、python等），所以可能会默认读者也知道这些知识，当然更可能的是混淆一些概念，把东西写的更不清楚:（
:::

Lua作为一种胶水语言，主要用于游戏中的热更新。但看了[几种不同的热更新方案](../GameBuild/Mod&Hotfix)，我最不想用的就是lua（喜欢我动态类型吗），不过鉴于它在游戏开发的活跃程度，还是得学。
> 忘记最近在那本书上看到，“程序员不要介意多学语言”。

学习方式主要是看[Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)这本书，和使用[xLua](https://github.com/Tencent/xLua)实践。
> 书中有提到线上的文档涵盖内容更全（但没有示例代码），书中介绍的是相对常用的功能。

## 为什么用lua热更新？

因为lua虚拟机很小，几百KB。再加上设计之初就是用于给其他语言补丁用的。
> 但在网上经常看到哪个项目只用c#写框架，逻辑都用lua写。这对吗？

## 安装

简要介绍一下安装方法

windows下可以用choco装lua53
```bash
choco find lua # 能看到 'lua53 5.3.5 [Approved]'
choco install lua53
```

## 问题列表

## 参考
- [Lua程序设计 第四版 - Roberto](https://www.lua.org/pil/)