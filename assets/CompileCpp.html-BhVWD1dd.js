import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as i,o as c,c as r,a as e,b as n,d as s,e as t}from"./app-BX3Xhc_b.js";const d="/assets/cpp_compile-1--4noY3tE.jpg",o="/assets/cpp_compile-3-DrLl-Czw.png",p="/assets/cpp_compile-2-CCwTKwzY.png",m={},u=t('<h1 id="编译-c" tabindex="-1"><a class="header-anchor" href="#编译-c"><span>编译（C++）</span></a></h1><p>本页将记录c++的编译流程和查看其汇编代码的方法。当然并不涉及cmake等编译工具的使用，主要是针对语言本身的特点进行描述。</p><h2 id="编译流程介绍" tabindex="-1"><a class="header-anchor" href="#编译流程介绍"><span>编译流程介绍</span></a></h2><p>一个经典的c程序的编译过程如下图所示：</p><blockquote><p>c++和c的编译过程是相似的，区别主要源于C++比C提供了更多的特性，比如类、模板、异常处理等。这些特性在编译过程中需要额外的处理。</p></blockquote><img src="'+d+'"><p>还有一页我认为看着不错的ppt：</p><img src="'+o+'" width="600"><p>一个cpp文件编译后的可执行文件的结构（以压缩文件打开）如下图所示：</p><img src="'+p+`" width="600"><p>其中 <code>.text</code> 是代码段，<code>.bss</code> <code>.data</code> 是全局/静态存储段</p><h2 id="针对c-特性的特殊处理" tabindex="-1"><a class="header-anchor" href="#针对c-特性的特殊处理"><span>针对c++特性的特殊处理</span></a></h2><p>c++提供类、模板、lambda表达式、异常处理等特性，为了支持这些特性需要在编译时对其特殊处理。具体而言：</p><ul><li>类中的成员变量、虚函数特性，分别产生了this指针、虚表这些概念来配合实现</li><li>模板需要在编译时生成对应类型的代码</li><li>当定义lambda时，编译器会生成一个与lambda对应的新类型和对象。</li></ul><blockquote><p>类拥有复杂的规则，展开谈可以单开一页。模板由于其抽象的约束模式和“模板元编程”，也可以单开一页。c++的异常处理我还不太了解，就先忽略了。</p></blockquote><h2 id="查看编译过程的汇编代码" tabindex="-1"><a class="header-anchor" href="#查看编译过程的汇编代码"><span>查看编译过程的汇编代码</span></a></h2><p>对于c++语言，有两种选择，一种是查看 <code>.s</code> 文件，一种是对 <code>.exe</code> 文件执行 <code>objdump -d</code> 指令。</p><p>现在有如下代码，将通过两种方式观察其汇编代码。</p><blockquote><p>这其实是一个相对复杂的例子，涉及字面量（char *）到字符串的转换，还有cout的调用。</p></blockquote><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token comment">//#include &lt;bits/stdc++.h&gt;</span>
<span class="token macro property"><span class="token directive-hash">#</span><span class="token directive keyword">include</span> <span class="token string">&lt;iostream&gt;</span></span>
<span class="token keyword">using</span> <span class="token keyword">namespace</span> std<span class="token punctuation">;</span>

<span class="token keyword">int</span> <span class="token function">main</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
    string str <span class="token operator">=</span> <span class="token string">&quot;hello world!&quot;</span><span class="token punctuation">;</span>
    cout <span class="token operator">&lt;&lt;</span> str <span class="token operator">&lt;&lt;</span> endl<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="通过-s-文件" tabindex="-1"><a class="header-anchor" href="#通过-s-文件"><span><strong>通过 <code>.s</code> 文件</strong></span></a></h3><p>执行命令行: <code>g++ -S -fverbose-asm main.cpp</code> 获取 <code>main.cpp</code> 编译过程中的汇编代码。</p><blockquote><p><code>-fverbose-asm</code> 是一个可选选项，它会在汇编输出中包含额外的注释</p></blockquote><p>截取其中一部分代码：</p><div class="language-asm line-numbers-mode" data-ext="asm" data-title="asm"><pre class="language-asm"><code> # c:\\programdata\\chocolatey\\lib\\mingw\\tools\\install\\mingw64\\include\\c++\\12.2.0\\bits\\basic_string.tcc:241: 	} __guard(this);
	movq	16(%rbp), %rdx	 # this, tmp98
	leaq	-24(%rbp), %rax	 #, tmp99
	movq	%rax, %rcx	 # tmp99,
	call	_ZZNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEE12_M_constructIPKcEEvT_S8_St20forward_iterator_tagEN6_GuardC1EPS4_	 #
 # c:\\programdata\\chocolatey\\lib\\mingw\\tools\\install\\mingw64\\include\\c++\\12.2.0\\bits\\basic_string.tcc:243: 	this-&gt;_S_copy_chars(_M_data(), __beg, __end);
	movq	16(%rbp), %rax	 # this, tmp100
	movq	%rax, %rcx	 # tmp100,
	call	_ZNKSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEE7_M_dataEv	 #
	movq	%rax, %rcx	 #, _6
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>结合注释看这段代码，好像是在描述<code>string str = &quot;hello world!&quot;;</code>的拷贝过程。</p><h3 id="通过-exe-文件" tabindex="-1"><a class="header-anchor" href="#通过-exe-文件"><span><strong>通过 <code>.exe</code> 文件</strong></span></a></h3><p>执行命令行: <code>objdump -d test.exe &gt; disassembly.txt</code> 获取 <code>.exe</code> 中机器码对应的反汇编代码</p><blockquote><p>一般代码块（机器码）在 <code>.exe</code> 文件中的 <code>.text</code> 段中，可以以压缩文件的方式打开<code>.exe</code> 文件中的 <code>.text</code>文件查看，也可以执行命令行 <code>objdump -s --section=.text test.exe &gt; text_section.txt</code> 。</p></blockquote><p>它的 <code>&lt;main&gt;</code> 代码块如下：</p><div class="language-asm line-numbers-mode" data-ext="asm" data-title="asm"><pre class="language-asm"><code>00000001400015e0 &lt;main&gt;:
   1400015e0:	55                   	push   %rbp
   1400015e1:	53                   	push   %rbx
   1400015e2:	48 83 ec 58          	sub    $0x58,%rsp
   1400015e6:	48 8d 6c 24 50       	lea    0x50(%rsp),%rbp
   1400015eb:	e8 07 02 00 00       	call   1400017f7 &lt;__main&gt;
   1400015f0:	48 8d 45 f7          	lea    -0x9(%rbp),%rax
   1400015f4:	48 89 45 f8          	mov    %rax,-0x8(%rbp)
   1400015f8:	90                   	nop
   1400015f9:	90                   	nop
   1400015fa:	48 8d 55 f7          	lea    -0x9(%rbp),%rdx
   1400015fe:	48 8d 45 d0          	lea    -0x30(%rbp),%rax
   140001602:	49 89 d0             	mov    %rdx,%r8
   140001605:	48 8d 15 f4 39 00 00 	lea    0x39f4(%rip),%rdx        # 140005000 &lt;.rdata&gt;
   14000160c:	48 89 c1             	mov    %rax,%rcx
   14000160f:	e8 3c 1b 00 00       	call   140003150 &lt;_ZNSt7__cxx1112basic_stringIcSt11char_traitsIcESaIcEEC1IS3_EEPKcRKS3_&gt;
   140001614:	48 8d 45 f7          	lea    -0x9(%rbp),%rax
   140001618:	48 89 c1             	mov    %rax,%rcx
   # 后面太多了，省略...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>简单看一下，如果不是其中的 <code>stringIcSt11char</code> 我根本看不出来它和我的程序有什么关系..</p><h3 id="通过分析软件" tabindex="-1"><a class="header-anchor" href="#通过分析软件"><span>通过分析软件</span></a></h3>`,33),v={href:"https://godbolt.org/",target:"_blank",rel:"noopener noreferrer"},b={href:"https://godbolt.org/",target:"_blank",rel:"noopener noreferrer"},h=t(`<blockquote><p>还附带交互UI，建议点进去试试</p></blockquote><div class="language-asm line-numbers-mode" data-ext="asm" data-title="asm"><pre class="language-asm"><code>.LC0:
    .string &quot;hello world!&quot;
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
    call    std::__cxx11::basic_string&lt;char, std::char_traits&lt;char&gt;, std::allocator&lt;char&gt; &gt;::basic_string&lt;std::allocator&lt;char&gt; &gt;(char const*, std::allocator&lt;char&gt; const&amp;)
    lea     rax, [rbp-25]
    mov     rdi, rax
    call    std::__new_allocator&lt;char&gt;::~__new_allocator() [base object destructor]
# 后面太多了，省略...
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>可以看出他对函数id的解析可读性更高一些。</p><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,4),_={href:"https://book.douban.com/subject/10505113/",target:"_blank",rel:"noopener noreferrer"},g=e("ul",null,[e("li",null,"14.8.1 lambda是函数对象"),e("li",null,"19.2 运行时类型识别")],-1),x={href:"https://hackingcpp.com/cpp/lang/separate_compilation.html",target:"_blank",rel:"noopener noreferrer"},k={href:"https://www.bilibili.com/video/BV1iW411d7hd?p=5",target:"_blank",rel:"noopener noreferrer"},f=e("ul",null,[e("li",null,"P5-P9")],-1),C={href:"https://www.zhihu.com/question/397725385/answer/1251427434",target:"_blank",rel:"noopener noreferrer"},q=e("details",{class:"hint-container details"},[e("summary",null,"gpt谈u++"),e("p",null,"虚幻引擎中的C++常常被人戏称为U++，这是因为在虚幻引擎中，C++编程与一般的C++有一些不同之处。让我来解释一下："),e("p",null,"虚幻引擎的编译流程规则：虚幻引擎定义了一套特定的编译流程规则，使得C++代码能够获得一些高级功能，例如类反射等，类似于Java或C#中的特性。 UBT和UHT：虚幻引擎使用构建工具（UBT）和反射编译器（UHT）来处理C++代码。这导致虚幻引擎的语法在某些方面独立于标准C++，因此被戏称为U++。 总之，虚幻引擎的C++编程不仅需要掌握C++本身，还需要理解其特定的编译流程和引擎内部机制。")],-1);function w(E,S){const a=i("ExternalLinkIcon");return c(),r("div",null,[u,e("p",null,[n("分析软件往往附带可读性更高的交互UI（如在线工具"),e("a",v,[n("Compiler Explorer"),s(a)]),n("），又或是清晰的断点调试（如Visual Studio）。")]),e("p",null,[n("以在线工具"),e("a",b,[n("Compiler Explorer"),s(a)]),n("为例，输入上述代码，得到以下汇编代码。")]),h,e("ul",null,[e("li",null,[e("a",_,[n("《C++ Primer 第五版》"),s(a)]),g]),e("li",null,[e("a",x,[n("cpp separate complilation - hackingcpp"),s(a)])]),e("li",null,[n("相关阅读-汇编语言和gdb的使用："),e("a",k,[n("2015 CMU 15-213 CSAPP 深入理解计算机系统 课程视频 - Bilibili"),s(a)]),f]),e("li",null,[n("补充：U++ "),e("ul",null,[e("li",null,[e("a",C,[n("UE4的C++与一般的C++有什么不同？需要先单独学C++吗？ - 西海的回答 - 知乎"),s(a)])])])])]),q])}const U=l(m,[["render",w],["__file","CompileCpp.html.vue"]]),y=JSON.parse('{"path":"/Language/CompileCpp.html","title":"编译（C++）","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"编译流程介绍","slug":"编译流程介绍","link":"#编译流程介绍","children":[]},{"level":2,"title":"针对c++特性的特殊处理","slug":"针对c-特性的特殊处理","link":"#针对c-特性的特殊处理","children":[]},{"level":2,"title":"查看编译过程的汇编代码","slug":"查看编译过程的汇编代码","link":"#查看编译过程的汇编代码","children":[{"level":3,"title":"通过 .s 文件","slug":"通过-s-文件","link":"#通过-s-文件","children":[]},{"level":3,"title":"通过 .exe 文件","slug":"通过-exe-文件","link":"#通过-exe-文件","children":[]},{"level":3,"title":"通过分析软件","slug":"通过分析软件","link":"#通过分析软件","children":[]}]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1712756117000,"updatedTime":1713776391000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":7}]},"readingTime":{"minutes":4.74,"words":1421},"filePathRelative":"Language/CompileCpp.md","localizedDate":"April 10, 2024"}');export{U as comp,y as data};
