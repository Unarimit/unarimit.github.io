# 其他特性

这里将列举一些编程语言的其他特性，它们不如那些单独开章节的特性那样基础和常用，故只做简单的介绍（我自己了解的也不深）。

## 协程

> "协程提供了一种协作式多任务模型，比使用线程或进程要高效得多。" 
<br> "C++20 协程的历史始于 Niklas Gustafsson（微软）关于“可恢复函数”的提案 [Gustafsson 2012]。" <br> <div style="text-align: right;"> —— [C++20：方向之争 - Cxx_HOPL4, Github](https://github.com/Cpp-Club/Cxx_HOPL4_zh/blob/main/09.md) </div>

我认为对协程最好的解释是“可恢复函数”，虽然实现时需要保存状态信息（栈帧）使得它更像一个对象而并非函数。这里从**作用**和**设计**两个角度描述它。

协程可以用于：异步IO处理，延时任务，步长GC，生成器/迭代器（在python和科学运算领域很常见）

协程按设计可以分为：有栈协程和无栈协程，有栈协程比无栈协程更通用（但速度较慢）[参考：Cxx_HOPL4]。
> 有栈协程和无栈协程的区别主要在于协程的执行栈是由谁分配和管理的。在有栈协程中，操作系统为每个协程分配一个固定大小的栈空间，由协程自己管理和使用。在无栈协程中，协程的执行栈是动态分配的，可以在运行时根据需要进行扩展或收缩，也可以与其他协程共享同一个栈空间。

- 无栈协程：C#中的 `async/await` 设计可以看作一种无栈协程（但一般没人这么叫），该类设计被称为一种“编译器魔法”。这类设计将函数转化为状态机，局部变量变为状态机对象的字段。通过状态机的状态来满足“可恢复”这一特性。（可以参考[《CLR via C# 第四版》](https://book.douban.com/subject/26285940)的第28.3节）
- 有栈协程：而反观有栈协程，更像是一种在用户态模拟的线程，同样以栈的方式存储其嵌套调用的函数信息，通过完整的调用栈来满足“可恢复”这一特性。

我的理解：从定义上看感觉有栈协程的调度更简单些，有栈协程因为有调用栈，随时都可以暂停，而无栈协程要等到它运行到下一个状态才可以。相对的，有栈协程每次调度都需要将上下文切换到调用栈，调用栈的大小肯定是比单个状态大很多的。

## 闭包

无论是C++的函数对象、C#的委托、Lua的function还是各种lambda匿名函数，都能看到闭包的身影。闭包的定义如下：

> “闭包（英语：Closure），又称词法闭包（Lexical Closure）或函数闭包（function closures），是在支持头等函数的编程语言中实现词法绑定的一种技术。闭包在实现上是一个结构体，它存储了一个函数（通常是其入口地址）和一个关联的环境（相当于一个符号查找表）。环境里是若干对符号和值的对应关系，它既要包括约束变量（该函数内部绑定的符号），也要包括自由变量（在函数外部定义但在函数内被引用），有些函数也可能没有自由变量。闭包跟函数最大的不同在于，当捕捉闭包的时候，它的自由变量会在捕捉时被确定，这样即便脱离了捕捉时的上下文，它也能照常运行。捕捉时对于值的处理可以是值拷贝，也可以是名称引用，这通常由语言设计者决定，也可能由用户自行指定（如C++）。”

C++中的闭包是比较直观的，因为其实现原理很容易解释清楚。而lua的闭包则相对难以理解，因为其并不是由编译器生成一个xx结构来完成的。

### C++的闭包

C++在 `C++11` 之后支持闭包，通过将lambda表达式转换为函数对象的方式（在`[]`中表示闭包的捕获），如下方代码所示的，`main` 函数中定义的局部变量 `func1` 的左边部分经过编译后会产生一个和 `test` 结构体等价的函数对象。
> 可以在在线的cpp->汇编网站上查看结果 [cpp separate complilation - hackingcpp](https://hackingcpp.com/cpp/lang/separate_compilation.html)
 
```cpp
#include <bits/stdc++.h>
using namespace std;
struct test{
    int& a;
    test(int& a): a(a){}
    void operator()(int x){
        cout << x + a;
    }
};

int main(){
    int b = 10;
    auto func1 = [&](int x){ // 指定隐式引用捕获（编译器负责推导）
        cout << b + x;
    };
    auto func2 = test(b);
    func1(5);
    func2(5);
}
```

C++中闭包最大的问题是引用捕获的变量可能被移除（栈中的退出作用域和堆中的delete），而在基于**垃圾回收机制**的语言中实现闭包就不需要考虑这种问题。

### Lua中的闭包

lua中的函数就是闭包（“函数是一类特殊的闭包”），相比C++的函数对象，lua语言由于一开始便支持闭包，则提供了“更好的”实现方法。其实现利用了上值等概念，可以参考一些代码解析，如: [Functions & Closures Implement - poga, github page](https://poga.github.io/lua53-notes/function_closure.html)，[The Implementation of Lua 5.0 - Roberto Ierusalimschy](https://www.jucs.org/jucs_11_7/the_implementation_of_lua/jucs_11_7_1159_1176_defigueiredo.html)。下面一段代码可以帮助理解lua中的闭包和C++中函数对象的不同。

```lua
function test()
    b = function (str)
        x = x + 1
        print(x)
        f = load(str) -- 动态载入代码
        f()
    end
    x = 5;
    y = 10;
    return b
end

c = test();
c('print(y)'); -- 输出6 \n 10
```

上述代码尝试在闭包函数 `function (str)` 中访问 `x` 和 `y` 时，实际上是在访问作为上值的 `test()` 栈中的 `x` 和 `y`。`test()` 相当于已被“实例化”，其分配的空间也需在不被引用时被垃圾回收。

## 反射

## 模块化
C#：程序集（Assembly）

C++：C++20的import

## *AppDomain

## 参考
- [C++20：方向之争 - Cxx_HOPL4, Github](https://github.com/Cpp-Club/Cxx_HOPL4_zh/blob/main/09.md)
    - 3.2 协程
- [有栈协程与无栈协程 - 李明亮等100万人，知乎](https://zhuanlan.zhihu.com/p/330606651)
- [《CLR via C# 第四版》](https://book.douban.com/subject/26285940)
    - 28.3 编译器如何将异步函数转换成状态机
- [Closure (computer programming) - Wikipedia](https://en.wikipedia.org/wiki/Closure_(computer_programming))
- Lua闭包实现
    - [Functions & Closures Implement - poga, github page](https://poga.github.io/lua53-notes/function_closure.html)
    - [The Implementation of Lua 5.0 - Roberto Ierusalimschy](https://www.jucs.org/jucs_11_7/the_implementation_of_lua/jucs_11_7_1159_1176_defigueiredo.html)