# 模板（C++）

模板是一种用于运行时多态的技术，最容易接触到的就是一些容器类，如vector，又或是手写的模板print函数。可以看完下列内容之后去看看vector和function两个STL模板类的实现。

## 作用对象

- 函数模板：
- 类模板：
- 成员函数模板：
- 变量模板：这个比较罕见，如`is_same_v`

## `enable_if` 和 SFINAE（C++ 11）

`enable_if`是一种类型特征（type trait）

SFINAE（Substitution Failure Is Not An Error，替换失败不是错误）

## `forward` 和 `&&`（C++ 11）

## 参考
- [C++11：感觉像是门新语言 - HOPL4 C++](https://github.com/Cpp-Club/Cxx_HOPL4_zh/blob/main/04.md#4-c11%E6%84%9F%E8%A7%89%E5%83%8F%E6%98%AF%E9%97%A8%E6%96%B0%E8%AF%AD%E8%A8%80)
- [C++视频教程 - The Cherno & Bilibili搬运](https://www.bilibili.com/video/BV1oD4y1h7S3)
    - [The Cherno - Youtube主页](https://www.youtube.com/@TheCherno)
    - p92 自己写Vector（用到了模板编程的各种知识）