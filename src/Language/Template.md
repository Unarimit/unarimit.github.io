# 模板（C++）

模板是一种用于运行时多态的技术，最容易接触到的就是一些容器类，如vector，又或是手写的模板print函数。可以看完下列内容之后去看看vector和function两个STL模板类的实现。

本章只涉及常见的模板知识（如stl中出现的），不涉及一些比较费解的概念（如模板元编程、类型萃取）

## 为什么叫模板？

> template: a shaped piece of rigid material used as a pattern for processes such as cutting out, shaping, or drilling.

附上一段template的英文释义，C++的模板更像是在一个模具中“填充”或“替换”，可惜无论cutting、shaping还是drilling好像都没有这层意思。

### 我的理解

> 《Effective C++》中将其称为一种 “隐式接口” （相对于类的“显示接口”），我觉得也是一种合适的解释。

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
你可能会说：嗯？这有什么意义？T只能是一个类似`vector<int>`的东西（要求有一个 `push_back(int)` 成员函数）

是的，这就是我对C++模板的理解，他很自由，~~自由到可以随便定义这种没有意义的东西~~，他是被隐式约束的，非常考察开发者的记忆力和注释水平。

## 作用对象

- 函数模板：作用于函数，例如最简单的打印数组（泛型版）
- 类模板：作用于类，例如stl的容器类
- 成员函数模板：作用于类的成员函数，例如 `priority_queue<>` 的构造方法。
    - `priority_queue<>` 的构造方法会根据泛型是函数对象还是函数指针生成接受不同参数的构造函数。
- 变量模板（C++ 14）：呃呃，结合“概念”和 `constexpr` 产生了很多我看不懂的东西，可以参考[C++14：完成 C++11 - HOPL4 C++，github](https://github.com/Cpp-Club/Cxx_HOPL4_zh/blob/main/05.md)

## 成员函数生成控制：`enable_if` 和 SFINAE（C++ 11）

以 `priority_queue<>` 为例，有以下代码

```cpp
#include <bits/stdc++.h>
using namespace std;

struct comps{
    bool operator()(int x, int y){
        return x < y;
    }
};

int main(){
    auto comp1 = [](int x, int y){return x < y; };

    auto pq1 = priority_queue<int, vector<int>, decltype(comp1)>(comp1); // 正确的构造
    //auto pq1_1 = priority_queue<int, vector<int>, decltype(comp1)>(); // 不能通过编译
    auto pq2 = priority_queue<int, vector<int>, less<>>(); // 正确的构造（C++14）
    auto pq3 = priority_queue<int, vector<int>, function<bool(int, int)>>(); // 虽然能过编译，但在对象上操作就会报错
    auto pq4 = priority_queue<int, vector<int>, comps>(); // 正确的构造
}
```

`pq1` 和 `pq2` 在构造函数上的差距就是本小节的主题。即模板第三个为函数指针 `decltype(comp1)` 时，不生成无参构造方法，模板第三个为函数对象 `less<>` 时，生成无参构造方法。

模板如何根据参数不同生成不同的成员函数呢？即是C++模板特性之一“SFINAE（Substitution Failure Is Not An Error，替换失败不是错误）”，它是随一种类型特征（type trait）`enable_if` 产生的概念。

`priority_queue<>`的构造函数定义如下：

```cpp
template<typename _Tp, typename _Sequence = vector<_Tp>,
    typename _Compare  = less<typename _Sequence::value_type> >
class priority_queue
{
    // ...
template<typename _Seq = _Sequence, typename _Requires = typename
	       enable_if<__and_<is_default_constructible<_Compare>,
				is_default_constructible<_Seq>>::value>::type>
	priority_queue()
	: c(), comp() { }
    // ...
}
```
在本文语境下，通过 `is_default_constructible` 判断模板第三个（即 `_Compare`）需要拥有默认构造函数，若拥有，则允许生成该无参构造函数，若没有，则发生了“替换失败”，该无参构造函数不再生成。
> 参考[is_default_constructible 类 - learn.microsoft](https://learn.microsoft.com/zh-cn/cpp/standard-library/is-default-constructible-class?view=msvc-170)

本例中，除了SFINAE规则外，还利用了类型萃取，这是一个涉及到模板编程的概念，就不再深入了（我不懂了）。
> 可以看看[问题：C++ 关于 concept 与 type traits 的优劣是什么？ - 知乎](https://www.zhihu.com/question/542280815)下的回答。

上述代码 `pq3` 这种能通过编译的定义方式，也说明了该方案还有不够完美的地方（不过也很好排查就是了，运行时会抛出`function<>` 中定义的空异常）。

## 传参：`forward` 和 `&&`（C++ 11）



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

## 试写 `function<>`


## 参考
- [《HOPL4 C++》，Bjarne Stroustrup](https://github.com/Cpp-Club/Cxx_HOPL4_zh/tree/main)
    - C++11
- [C++视频教程 - The Cherno & Bilibili搬运](https://www.bilibili.com/video/BV1oD4y1h7S3)
    - [The Cherno - Youtube主页](https://www.youtube.com/@TheCherno)
    - p92 自己写Vector（用到了模板编程的各种知识）