# 设计模式
::: warning
施工中
:::

Unity引擎本身就包含了大量的设计模式，例如MonoBehavior就应用了更新模式，使开发者不必再自发的“保护UI线程”等。

本章主要内容为几种设计模式的核心思想（或我认为的核心思想）和我自己的相关实现。如果想进一步了解游戏中的设计模式，请自行阅读 [《Game Programming Patterns》](https://gameprogrammingpatterns.com/) 这本书，有中文翻译的纸质书在售。

## 命令模式


## 享元模式


## 观察者模式

它还有一些其他名字：“响应式编程”和“数据流编程”

在Unity（C#）中，主要以事件的形式体现，即`delegate`和`event`，还有unity自己封装的`UnityEvent`。一般用于UI更新通知，和成就系统等。
> 采用观察者模式的主要原因是解耦两个不相关的模块，如果使用观察者模式反而阻碍了对游戏逻辑的理解，则不需要使用

::: tip 注意
采用事件模式编程时，及时在`OnDestroy`注销事件
:::

### 实现UI更新

在这个例子中，`Foo.cs`是被观察者，而`xxUI.cs`是观察者。`Foo.cs`通过`CheckAim()`通知UI要更新了，而不用UI在每一帧自行去观察Foo.cs来更新UI。

Foo.cs
``` cs
public delegate void AimChangeEventHandler(string text);
public event AimChangeEventHandler AimChangeEvent;

public void CheckAim(string key)
{
    AimChangeEvent.Invoke(generateText());
}
```
xxUI.cs
``` cs
private void Start()
{
    Foo.Instance.AimChangeEvent += ChangeText; 
}

private void ChangeText(string text)
{
    MainText.text = text;
}

private void OnDestroy()
{
    Foo.Instance.AimChangeEvent -= ChangeText;
}
```

## 单例模式

单例模式在unity开发中很常用。

## 原型模式

## 状态模式



## WIP

装饰者、工厂。

对象池。（实际上的优化表现存在争议，有待测试）

多态（运行时，编译）

## 参考
- **主要参考**：[《Game Programming Patterns》](https://gameprogrammingpatterns.com/)
- [《InsideUE4》GamePlay架构（十一）Subsystems - 大钊的文章 - 知乎](https://zhuanlan.zhihu.com/p/158717151)
