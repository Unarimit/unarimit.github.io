# 编译（C++）

本页将记录c++的编译流程和查看其汇编代码的方法。当然并不涉及cmake等编译工具的使用，主要是针对语言本身的特点进行描述。

## 编译流程介绍

一个经典的c程序的编译过程如下图所示：
> c++和c的编译过程是相似的，区别主要源于C++比C提供了更多的特性，比如类、模板、异常处理等。这些特性在编译过程中需要额外的处理。

<img src='../img/cpp_compile-1.jpg'>

还有一页我认为看着不错的ppt：

<img src='../img/cpp_compile-3.png' width="600">

一个cpp文件编译后的可执行文件的结构（以压缩文件打开）如下图所示：

<img src='../img/cpp_compile-2.png' width="600">

其中 `.text` 是代码段，`.bss` `.data` 是全局/静态存储段

## 针对c++特性的特殊处理

c++提供类、模板、lambda表达式、异常处理等特性，为了支持这些特性需要在编译时对其特殊处理。具体而言：
- 类中的成员变量、虚函数特性，分别产生了this指针、虚表这些概念来配合实现
- 模板需要在编译时生成对应类型的代码
- 当定义lambda时，编译器会生成一个与lambda对应的新类型和对象。
> 类拥有复杂的规则，展开谈可以单开一页。模板由于其抽象的约束模式和“模板元编程”，也可以单开一页。c++的异常处理我还不太了解，就先忽略了。

## 查看编译过程的汇编代码

对于c++语言，有两种选择，一种是查看 `.s` 文件，一种是对 `.exe` 文件执行 `objdump -d` 指令。

现在有如下代码，将通过两种方式观察其汇编代码。
> 这其实是一个相对复杂的例子，涉及字面量（char *）到字符串的转换，还有cout的调用。

```cpp
//#include <bits/stdc++.h>
#include <iostream>
using namespace std;

int main(){
    string str = "hello world!";
    cout << str << endl;
}
```

### **通过 `.s` 文件**

执行命令行: `g++ -S -fverbose-asm main.cpp` 获取 `main.cpp` 编译过程中的汇编代码。

> `-fverbose-asm` 是一个可选选项，它会在汇编输出中包含额外的注释

截取其中一部分代码：

```asm
 # c:\programdata\chocolatey\lib\mingw\tools\install\mingw64\include\c++\12.2.0\bits\basic_string.tcc:241: 	} __guard(this);
	movq	16(%rbp), %rdx	 # this, tmp98
	leaq	-24(%rbp), %rax	 #, tmp99
	movq	%rax, %rcx	 # tmp99,
	call	_ZZNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEE12_M_constructIPKcEEvT_S8_St20forward_iterator_tagEN6_GuardC1EPS4_	 #
 # c:\programdata\chocolatey\lib\mingw\tools\install\mingw64\include\c++\12.2.0\bits\basic_string.tcc:243: 	this->_S_copy_chars(_M_data(), __beg, __end);
	movq	16(%rbp), %rax	 # this, tmp100
	movq	%rax, %rcx	 # tmp100,
	call	_ZNKSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEE7_M_dataEv	 #
	movq	%rax, %rcx	 #, _6
```

结合注释看这段代码，好像是在描述`string str = "hello world!";`的拷贝过程。

### **通过 `.exe` 文件**

执行命令行: `objdump -d test.exe > disassembly.txt` 获取 `.exe` 中机器码对应的反汇编代码

> 一般代码块（机器码）在 `.exe` 文件中的 `.text` 段中，可以以压缩文件的方式打开`.exe` 文件中的 `.text`文件查看，也可以执行命令行 `objdump -s --section=.text test.exe > text_section.txt` 。

它的 `<main>` 代码块如下：

```asm
00000001400015e0 <main>:
   1400015e0:	55                   	push   %rbp
   1400015e1:	53                   	push   %rbx
   1400015e2:	48 83 ec 58          	sub    $0x58,%rsp
   1400015e6:	48 8d 6c 24 50       	lea    0x50(%rsp),%rbp
   1400015eb:	e8 07 02 00 00       	call   1400017f7 <__main>
   1400015f0:	48 8d 45 f7          	lea    -0x9(%rbp),%rax
   1400015f4:	48 89 45 f8          	mov    %rax,-0x8(%rbp)
   1400015f8:	90                   	nop
   1400015f9:	90                   	nop
   1400015fa:	48 8d 55 f7          	lea    -0x9(%rbp),%rdx
   1400015fe:	48 8d 45 d0          	lea    -0x30(%rbp),%rax
   140001602:	49 89 d0             	mov    %rdx,%r8
   140001605:	48 8d 15 f4 39 00 00 	lea    0x39f4(%rip),%rdx        # 140005000 <.rdata>
   14000160c:	48 89 c1             	mov    %rax,%rcx
   14000160f:	e8 3c 1b 00 00       	call   140003150 <_ZNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEEC1IS3_EEPKcRKS3_>
   140001614:	48 8d 45 f7          	lea    -0x9(%rbp),%rax
   140001618:	48 89 c1             	mov    %rax,%rcx
   # 后面太多了，省略...
```

简单看一下，如果不是其中的 `stringIcSt11char` 我根本看不出来它和我的程序有什么关系..

### 通过分析软件

分析软件往往附带可读性更高的交互UI（如在线工具[Compiler Explorer](https://godbolt.org/)），又或是清晰的断点调试（如Visual Studio）。

以在线工具[Compiler Explorer](https://godbolt.org/)为例，输入上述代码，得到以下汇编代码。
> 还附带交互UI，建议点进去试试

```asm
.LC0:
    .string "hello world!"
main:
    push    rbp
    mov     rbp, rsp
    push    rbx
    sub     rsp, 56
    lea     rax, [rbp-25]
    mov     QWORD PTR [rbp-24], rax
    nop
    nop
    lea     rdx, [rbp-25]
    lea     rax, [rbp-64]
    mov     esi, OFFSET FLAT:.LC0
    mov     rdi, rax
    call    std::__cxx11::basic_string<char, std::char_traits<char>, std::allocator<char> >::basic_string<std::allocator<char> >(char const*, std::allocator<char> const&)
    lea     rax, [rbp-25]
    mov     rdi, rax
    call    std::__new_allocator<char>::~__new_allocator() [base object destructor]
# 后面太多了，省略...
```

可以看出他对函数id的解析可读性更高一些。

## 参考
- [《C++ Primer 第五版》](https://book.douban.com/subject/10505113/)
    - 14.8.1 lambda是函数对象
    - 19.2 运行时类型识别
- [cpp separate complilation - hackingcpp](https://hackingcpp.com/cpp/lang/separate_compilation.html)
- 相关阅读-汇编语言和gdb的使用：[2015 CMU 15-213 CSAPP 深入理解计算机系统 课程视频 - Bilibili](https://www.bilibili.com/video/BV1iW411d7hd?p=5)
    - P5-P9
- 补充：U++
    - [UE4的C++与一般的C++有什么不同？需要先单独学C++吗？ - 西海的回答 - 知乎](https://www.zhihu.com/question/397725385/answer/1251427434)
:::details gpt谈u++
虚幻引擎中的C++常常被人戏称为U++，这是因为在虚幻引擎中，C++编程与一般的C++有一些不同之处。让我来解释一下：

虚幻引擎的编译流程规则：虚幻引擎定义了一套特定的编译流程规则，使得C++代码能够获得一些高级功能，例如类反射等，类似于Java或C#中的特性。
UBT和UHT：虚幻引擎使用构建工具（UBT）和反射编译器（UHT）来处理C++代码。这导致虚幻引擎的语法在某些方面独立于标准C++，因此被戏称为U++。
总之，虚幻引擎的C++编程不仅需要掌握C++本身，还需要理解其特定的编译流程和引擎内部机制。
:::