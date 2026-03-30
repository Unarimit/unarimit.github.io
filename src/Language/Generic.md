# 泛型（C#）

相对C++复杂的模板编程，C#这边则简单很多。C#在定义泛型时，只需要考虑以下主要两点就能完成相对不错的实践：
- 泛型的约束
    - non-sealed class（主要约束）
    - 接口
    - 类型关键字（`class` 和 `struct`）和构造器约束（`new()`）等
- 泛型接口或委托是否支持协变（out）和逆变（in）

一个被约束了自定义接口`ITest`的泛型方法实例如下

``` csharp
public void Foo<T>(T val) where T : class, ITest
{

}
```

WIP

## TIPS
1. 值类型和引用类型作为泛型，在JIT为本机代码时。值类型为了减少拆装箱会有差距。
    - https://blog.stephencleary.com/2022/10/modern-csharp-techniques-3-generic-code-generation.html

## 作用对象


## 参考
- [out（泛型修饰符） - learn.microsoft](https://learn.microsoft.com/zh-cn/dotnet/csharp/language-reference/keywords/out-generic-modifier)