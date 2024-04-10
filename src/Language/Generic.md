# 泛型

c++对泛型的约束相比c#要复杂很多。

c#的泛型约束只能是non-sealed class（主要约束）、接口、类型关键字（`class` 和 `struct`）和构造器约束（`new()`）
``` csharp
public void Foo<T>(T val) where T : class, ITest
{

}
```

而c++


## c++



### 泛型和静态成员

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



## 参考