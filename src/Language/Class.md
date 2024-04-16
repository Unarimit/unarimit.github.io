# 类型

流行的编程语言基本都支持OOP（Object Oriented Programming, 面向对象编程），而类型是OOP的基石。类型具有封装、多态和继承特性。

在类型中，往往需要考虑以下问题：
- 类型中的数据，如何排布在内存中
    - C++和C#的策略并不相同
- （类型的）实例如何传递给函数，其数据成员如何共享
- 类型如何利用虚函数实现（运行时）多态
- 访问控制（封装）
- 类型转换规则（如：int->long，derive->base）

## 类型内存安排

为了加速内存的读取（可能和内存读写的最小单位有关），类型中的数据往往会被施以内存对齐策略。[《游戏引擎架构 第2版》](https://book.douban.com/subject/34864920/)中，就给出了C++中的一种默认对齐策略：

<center><img height="200" src="../img/class-1-1.png"> <img height="200" src="../img/class-1-2.png"> </center>

针对这种对齐策略，可以进一步修改类成员的顺序，减少内存开销：

<center><img height="200" src="../img/class-2-1.png"> <img height="200" src="../img/class-2-2.png"> </center>

左边为类型详情，右边为在内存中的排布。这种策略是按照字节大小的倍数（4字节（32位）对齐4字节，1字节（8位）对齐1字节）对齐。C++中提供一些方法可以配置对齐的粒度。

:::details C++配置对齐粒度

方法一：使用 `#pragma pack`

```cpp
#pragma pack(push, 1) // 设置字节对齐为 1 字节，取消自动对齐
struct UnalignedStruct {
    char a;
    int b;
    short c;
};
#pragma pack(pop) // 恢复默认的字节对齐设置
```

方法二：使用`alignas` ( `alignof` 查询)

```cpp
struct alignas(16) AlignedStruct {
    int i;
};

int main() {
    AlignedStruct a;
    std::cout << "Alignment of AlignedStruct: " << alignof(a) << std::endl;
    return 0;
}
```
:::

而对于**C#**，由于堆内存已经被托管，且指针被设为 `unsafe`，除了对齐策略外，还有再排序策略（对class默认启用该策略，对struct默认不启用该策略）。[《CLR via C# 第四版》](https://book.douban.com/subject/26285940)第110页已经给出了详尽的解释：

<img src="../img/class-3.png">

## 特殊的成员函数和对象拷贝

### 构造函数和析构函数

> "我立即添加了构造函数和析构函数。它们当时非常新颖，但从我的计算机架构和操作系统背景来看，我认为它们也不算很新奇，因为我需要一个机制来建立一个工作环境（构造函数）和一个逆操作来释放运行期获得的资源（析构函数）" —— [《HOPL4 C++》，Bjarne Stroustrup](https://github.com/Cpp-Club/Cxx_HOPL4_zh/tree/main)

C++提出了RAII（Resource Acquisition ls Initialization，资源获取即初始化）这一理念来定义构造函数应该做的事情，以便在对象离开作用域后能正确的释放资源。

注意：
- 构造函数会从基类开始执行
- （C++）当存在虚函数时，析构函数也应该是虚函数

### 成员的初始化

C++的成员初始化发生在构造函数的 `初始化列表` 中，并且按照变量的**声明顺序**构造，也可以内联构造，如以下代码所示：

```cpp
class TestClassB{
public:
    // TestClass是一个构造函数中带cout的类，用于调试这种东西
    TestClass tc1 = TestClass(0); // 内联初始化
    TestClass tc2 = TestClass(3);
    TestClassB(): tc1(2) // 覆盖了tc1的内联初始化，应该在编译时就优化掉了
    {
    }
};
```

C#中class的成员初始化发生在构造函数的 `函数体` 中，也可以内联构造（和C++的覆盖规则不同），如以下代码所示：

```csharp
class TestClassB
{
    int a;
    TestClass b = new TestClass(0); // 先执行
    public TestClassB() // 这里只能写 `:base(xxx)` 看来C#的开发人员不是很喜欢C++的初始化列表
    {
        a = 10;
        b = new TestClass(1); // 后执行
    }
}
```

对于C#中的struct，成员初始化不可以内联构造，且在构造函数中必须为所有成员初始化。一个声明了却没有初始化的struct，其值置为“零”或null。
> "值类型（struct）构造器的工作方式与引用类型（class）的构造器截然不同。CLR总是允许创建值类型的实例，并且没有办法阻止值类型的实例化。" - [《CLR via C# 第四版》](https://book.douban.com/subject/26285940) 8.2章

在C#中如果在class中定义一个struct，并且不做任何显式初始化，他就会被初始为全“零”，但**不会**调用无参构造函数，这一点和C++有很大的区别。

### 拷贝-C++：复杂的规则和用户控制

C++的拷贝控制函数有哪些呢？
- 拷贝构造函数
- 拷贝赋值函数
- 移动拷贝构造函数
- 移动拷贝赋值函数
- 析构函数

除此之外，还需注意：
- 隐式转换的影响和explict

### 拷贝-C#：Class和Struct的区别

WIP

## 虚函数和管理方法

### C++：虚表和RTTI
RTTI（Runtime Type Identification，执行期类型识别）

### C#：类型对象

WIP

## 访问控制

c++的b友元是谁想出来的？

## 类型转换

### C++：static_cast、reinterpret_cast、const_cast 和 dynamic_cast

消除了 C 风格的类型转换 `()` 中的二义性 

### C#：is、as和类型安全

WIP

## 参考
- [《游戏引擎架构 第2版》](https://book.douban.com/subject/34864920/)
    - 3.2.5.1 C/C++的数据、代码和内存/对齐和包裹
- [C++字节对齐 - 编程指北](https://csguide.cn/cpp/basics/byte_alignment.html#%E5%AD%97%E8%8A%82%E5%AF%B9%E9%BD%90%E8%A7%84%E5%88%99)
- [《CLR via C# 第四版》](https://book.douban.com/subject/26285940)
    - 5.2 引用类型和值类型
    - 8.2 实例构造器和结构（值类型）
- [《HOPL4 C++》，Bjarne Stroustrup](https://github.com/Cpp-Club/Cxx_HOPL4_zh/tree/main)
- [《C++ Primer 第五版》](https://book.douban.com/subject/10505113/)
- 拓展（好像是设计思想）：[《深度探索C++对象模型》[美] Stanley B. Lippman，侯捷译](https://book.douban.com/subject/10427315/)
- 