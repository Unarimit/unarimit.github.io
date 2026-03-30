# 泛型（C#）

相对C++复杂的模板编程，C#这边则简单很多。C#在定义泛型时，只需要考虑以下主要两点就能完成相对不错的实践：
- 泛型的约束[【1】](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/where-generic-type-constraint)
    - 类型约束：`class`、`struct`、`unmanaged`，或者基类约束
    - 实现接口
    - 构造器约束 `new()`
    - 等等其他（C#语言也在不断迭代，直接看文档是对的）
- 泛型接口或委托是否支持协变（out）和逆变（in）

一个被约束了自定义接口`ITest`的泛型方法示例如下

``` csharp
public void Foo<T>(T val) where T : class, ITest
{

}
```

一个泛型类示例如下
``` csharp
public interface IMyInterface { }

namespace CodeExample
{
    class Dictionary<TKey, TVal>
        where TKey : IComparable<TKey>
        where TVal : IMyInterface
    {
        public void Add(TKey key, TVal val) { }
    }
}
```


## 实现原理和特性

一个泛型定义（泛型函数、泛型类）在被JIT之前，仍旧是一个长得像泛型的定义。所以有了以下特性：
1. 无需考虑C#中泛型是否会产生代码膨胀
    - 但一般unity会使用il2cpp，这就不好说了
2. 值类型和引用类型作为泛型，在JIT为本机代码时，值类型为了减少拆装箱会有不同的代码生成。
    - https://blog.stephencleary.com/2022/10/modern-csharp-techniques-3-generic-code-generation.html

## 参考
1. [where（泛型类型约束 - learn.microsoft](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/where-generic-type-constraint)
2. [out（泛型修饰符） - learn.microsoft](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/out-generic-modifier)