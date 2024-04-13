# 泛型（C#）

相对C++复杂的模板编程，C#这边则简单很多。C#的泛型约束只能是non-sealed class（主要约束）、接口、类型关键字（`class` 和 `struct`）和构造器约束（`new()`）
``` csharp
public void Foo<T>(T val) where T : class, ITest
{

}
```

WIP

## 参考
