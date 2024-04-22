# 模板（C++）

模板是一种用于运行时多态的技术，最容易接触到的就是一些容器类，如vector，又或是手写的模板print函数。可以看完下列内容之后去看看vector和function两个STL模板类的实现。

## 为什么叫模板？

> template: a shaped piece of rigid material used as a pattern for processes such as cutting out, shaping, or drilling.

附上一段template的英文释义，C++的模板更像是在一个模具中“填充”或“替换”，可惜无论cutting、shaping还是drilling好像都没有这层意思。

### 我的理解

当有下面一个模板函数：
```cpp
template<class T>
void try_push(T arr[], size_t n){
    for(int i = 0; i < n; i++) cout << arr[i] << " ";
}
```
你可能会说：啊~是打印数组。（所有T都在编译时被替换为相应的类型）

当有下面一个模板函数：
```cpp
template<class T>
void try_push(T& t, int a){
    t.push_back(a);
}
```
你可能会说：嗯？这有什么意义？T只能是一个类似`vector<int>`的东西

是的，这就是我对C++模板的理解，他很自由，自由到可以随便定义这种没有意义的东西（

## 作用对象

- 函数模板：作用于函数，例如最简单的打印数组（泛型版）
- 类模板：作用于类，例如stl的容器类
- 成员函数模板：作用于类的成员函数，例如 `priority_queue<>` 的构造方法。
    - `priority_queue<>` 的构造方法会根据泛型是函数对象还是函数指针生成接受不同参数的构造函数。
- 变量模板（C++ 14）：呃呃，结合“概念”和 `constexpr` 产生了很多我看不懂的东西，可以参考[C++14：完成 C++11 - HOPL4 C++，github](https://github.com/Cpp-Club/Cxx_HOPL4_zh/blob/main/05.md)

## `enable_if` 和 SFINAE（C++ 11）

`enable_if`是一种类型特征（type trait）

SFINAE（Substitution Failure Is Not An Error，替换失败不是错误）

## `forward` 和 `&&`（C++ 11）

引用折叠

## 试写 `vector<T>`

```cpp
template<class T>
class my_vector{
public:
    my_vector(const initializer_list<T>& list); // 列表初始化
    my_vector(size_t size, const T& t = {}); // 正常初始化
    my_vector(const my_vector& right); // 拷贝构造
    my_vector operator= (const my_vector& right); // 拷贝赋值
    T& operator[] (const size_t index); // 下标访问符
    const T& operator[] (const size_t index) const; // const下的下标访问符
    void push_back(const T& t); // 插入
    void push_back(T&& t); // 右值插入
    void pop_back(); // 删除
    template<class... Args>
    void emplace_back(const Args& ... clist); // 内存原地构造，placement new，参数包转发
    size_t size(); // 获取数组大小
    ~my_vector(); // 析构
private:
    T* arr; // 存储
    size_t capacity, used_size; // 容量和已使用大小
    void insure_size(size_t size); // 保证内存空间（在这里扩容）
};
```

## 参考
- [C++11：感觉像是门新语言 - HOPL4 C++，github](https://github.com/Cpp-Club/Cxx_HOPL4_zh/blob/main/04.md#4-c11%E6%84%9F%E8%A7%89%E5%83%8F%E6%98%AF%E9%97%A8%E6%96%B0%E8%AF%AD%E8%A8%80)
- [C++视频教程 - The Cherno & Bilibili搬运](https://www.bilibili.com/video/BV1oD4y1h7S3)
    - [The Cherno - Youtube主页](https://www.youtube.com/@TheCherno)
    - p92 自己写Vector（用到了模板编程的各种知识）