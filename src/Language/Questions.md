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