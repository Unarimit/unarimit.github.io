# 一些“有趣”的问题

一部分是从网上找到的问题，一部分来自我面试、笔试时遇到的问题

## C++

### 常规八股

1. malloc和free，new和delete

malloc和free是c标准库函数，new和malloc在内存分配空间的差异，返回值的差异等..

new和delete分别会调用构造、析构函数。

可以看看：[new和malloc的区别 - Dr_Cassie CSDN](https://blog.csdn.net/Dr_Cassie/article/details/96494444)

### 类设计

1. 以下代码哪些地方有问题
```cpp
struct A {
    int* get_p() const {
        return p;
    }
    string& get_str() const {
        return s; // 这里不行
    }
private:
    string s;
    int* p;
};
```
考察类的const方法

2. 虚函数和隐藏
```cpp
struct A{
    void testHide(){
        cout << "A";
    }
    virtual void testVirtual(){
        cout << "A";
    }
    void testHide2(){
        cout << "A";
    }
};
struct B: public A{
    void testHide(){ // 隐藏了A中的函数
        cout << "B";
    }
    void testVirtual(){ // 建议补上override或final增加可读性
        cout << "B";
    }
    virtual void testHide2(){ // 隐藏了A中的函数
        cout << "B";
    }
};
```
其实这个概念凭直觉大概率能猜对。另外还可以引申出一些其他问题，如B如何调用被隐藏的A方法。


### 内存管理

1. 以下代码在32位编译环境下的输出结果

```cpp
struct A {
    char* fixed;
    char arr[32];
};
int main(){
    A a[16];
    cout << (char *)(a[2].arr + 32) - (char *)a;
}
```
考察对内存安排和指针（数组）的理解

2. 除了递归还有什么情况会导致栈溢出

分配一个足够大的数组，因为定长数组是在栈上分配的，如下方代码所示

```cpp
int main(){
    int a[600000];
}
```

顺便说一下C#的数组是分配在堆上的，无论定长还是不定长。

### static关键字

1. 静态变量
C++的静态变量是在没有实际的cpp开发经验的话，很容易忽略的一个点。
- （函数内）局部静态变量在函数第一次调用时执行到定义语句时执行。
- （类内）成员静态变量需要在全局作用域显示定义之后才可以使用，否则在编译时就会报未定义错误。所以可以将成员静态变量当作全局静态变量来看，在程序开始执行时初始化。

> 顺便说一下，C#只有成员静态变量一说（没有局部静态变量，即不能在函数里定义静态变量），且在 `类型对象` 第一次初始化时初始化成员静态变量。

2. 静态函数
表明函数的作用范围，仅在定义该函数的文件内才能使用。在多人开发项目时，为了防止与他人命名空间里的函数重名，可以将函数定位为static。

### 模板

1. 模板和静态成员

`Foo<int>::cnt`成员的初始化和实例化分别发生在下方代码的哪个地方？

```cpp
template<class T>
struct Foo{
    T data;
    static int cnt;
};

template<typename T>
int Foo<T>::cnt = 111;

int main(){
    auto f1 = Foo<int>();
    auto f2 = Foo<float>();
}
```

## C#

### 函数

1. 如何避免struct在函数中传参时的装箱

利用泛型函数，或提前装好箱再传，下面是一个利用泛型函数的例子

```csharp
interface ITest
{
    public void Test3();
}
struct StructA : ITest
{
    int b;
    public static void Test<T>(T a) where T : struct, ITest // 这里可以进一步用in修饰，减少值类型拷贝的开销。
    {
        a.Test3();
    }
    public static void Test2(StructA a) // 这里是入口！
    {
        Test(a);
    }
    public void Test3()
    {

    }
}
```
需要明确的是，将struct转化为一个interface必定会发生装箱，但使用泛型（将泛型约束到接口）却不会。是因为在调用时JIT会生成`Test(StructA a)`的代码。

### 内存管理

1. unsafe指针为什么不能长期持有

GC的影响（回收和压缩），以及 `fixed` 关键字（C# Essential中有提及）




## 参考