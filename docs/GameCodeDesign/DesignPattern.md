# 设计模式
::: warning
施工中
:::

Unity引擎本身就包含了大量的设计模式，例如MonoBehavior就应用了更新模式，使开发者不必再自发的“保护UI线程”等。

本章主要内容为几种设计模式的核心思想（或我认为的核心思想）和我自己的相关实现。如果想进一步了解游戏中的设计模式，请自行阅读 [《Game Programming Patterns》](https://gameprogrammingpatterns.com/) 这本书，有中文翻译的纸质书在售。

**\*注：下文在引用这本书时，会简写为`GPP`。**

## 命令模式

用于实现战棋游戏的悔棋和editor的撤回操作，封装后更容易实现网络同步。

`GPP`中还提到了可以用作：
- 按键映射的中间处理
- 抽离控制逻辑和角色行为逻辑

但我认为unity中的inputsystem已经完成了按键映射，而角色行为逻辑的抽离由于玩家使用控制器移动和Agent使用NavMesh移动的方式差距过大，实现存在一定难度。


## 观察者模式

它还有一些其他名字：“响应式编程”和“数据流编程”

在Unity（C#）中，主要以事件的形式体现，即`delegate`和`event`，还有unity自己封装的`UnityEvent`。一般用于UI更新通知，和成就系统等。
> 采用观察者模式的主要原因是解耦两个不相关的模块，如果使用观察者模式反而阻碍了对游戏逻辑的理解，则不需要使用

::: tip 注意
采用事件模式编程时，及时在`OnDestroy`注销事件
:::

### 实现UI更新-观察者模式

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

## 原型模式

像是unity里的Prefab，一种批量生成实例的思想。

如常用的敌人物体，一定会包括`NavMesh Agent`,`Animator`和一些自定义的Component，就可以把物体打包为prefab，并由某个静态方法去初始化这个敌人物体。

如弹出UI框的设计（一个简单的例子），只需要一段string就可以创建这个实例

```cs
// 弹出UI框的例子
internal class TipsUI : MonoBehaviour
{
    public TextMeshProUGUI Text;
    public static void GenerateNewTips(string text)
    {
        var prefab = ResourceManager.Load<GameObject>("UIs/Tip");
        var go = Instantiate(prefab);
        go.GetComponent<TipsUI>().Text.text = text;
    }

    private void Start()
    {
        var cg = GetComponent<CanvasGroup>();
        cg.alpha = 0;
        cg.DOFade(1, 0.2f); // 渐入动画
        Destroy(gameObject, 1.5f); // 持续1.5秒后销毁
    }
}
```

## 单例模式

单例模式在unity开发中很常用，但需要加以限制。
> 例如你可能不想在一堆游戏逻辑中看到一句`AudioSource.PlayClipAtPoint(...)`

避免使用单例模式的原因是为了降低耦合，因为单例模式属于全局变量，全局变量可能因为某个模块**逻辑错误**或**并发**顺序异常产生错误修改，而引起其他模块异常，且很难debug。当然对于一些游戏的Context不可避免的使用全局变量。`GPP`提供了几种避免使用单例模式的策略：
- 使用依赖注入（对于需要引用实例的场合通过传参的方式）
- 一部分管理类（Manager or System or ...）可以被优化，由被管理的类本身实现这些逻辑（OOP）
- 服务定位模式...


## 双缓存模式

双缓存模式主要用于GPU的渲染，单缓存可能会出现GPU读到脏数据的情况。

另外也可以用作帧同步（每帧的执行结果不受MonoBehavior顺序的影响），通过给每个状态设置：
```cs
{
    T current_state;
    T next_state;
}
```
的方式，在每帧中`current_state`不会被更改，`next_state`会被更改，在每帧的开始或结束（如`LastUpdate()`），交换`next_state`和`current_state`。

## 游戏循环-更新方法

Unity提供了游戏循环部分的设计，即MonoBehavior。GPP书中主要解释了使用变时步长更新机制（`Update()`）的的坏处，会使整个系统不确定，尤其是在涉及网络的时候。

Unity中`FixedUpdate()`就避免了上述问题。

对于更新方法GPP书中提到了更新方法的解耦设计，可以结合状态模式、组件模式等设计模式进行。

由于Unity已经自带了这些设计，包括组件模式，这些设计方法已经被Unity开发中被动使用，在实现上不太需要关注，但可以通过追问“为什么要这么做”，更好的认识Unity生命周期函数。

## 字节码模式

> “通过将行为编码成虚拟机指令，而使其具备数据的灵活性。”

GPP书中讲述了如何实现这个模式，从语法分析到API，再到基于栈的虚拟机。这很像以太坊中的智能合约，目的都是赋予软件**从程序外部编写行为**的能力。

实际开发过程中使用lua等脚本语言，它们会完成最为复杂的工作（语法分析和虚拟机，lua是基于寄存器的虚拟机），开发只需要关注提供什么样的api即可。

TODO：通过技能系统的迭代在该章节追加实践内容

## 子类沙盒

> GPP：“使用基类提供的操作集合来定义子类中的行为。”
> </br>
> 基类提供子类调用的保护方法和给子类实现的虚方法。

这种模式普遍到不需要靠语言称赞它的地步，举一个例子: `MonoBehaviour`：
- 首先，对于子类沙盒中定义行为的概念，`MonoBehaviour`通过一系列生命周期函数，使主线程中的游戏循环调用者无需关注他的具体类型和状态。
- 除此之外，子类沙盒的另一个主要思想是：使用基类封装一些api函数，给子类直接调用，目的是限制子类的访问范围，如`MonoBehaviour`的`StartCoroutine`，`Instantiate`等（可以，这很沙盒）。

这在游戏开发中被经常使用，例如同样存在生命周期的UI系统（基类定义子类调用的创建新层等保护方法，和给子类实现的刷新，退出行为方法）和技能系统（基类定义子类调用的粒子，音效，伤害等保护方法，和给子类实现的发射行为方法）等。

GPP书中就介绍了一个拥有100个超级英雄类，可以使用不同的技能的场景。并强调当子类足够多的时候，采用数据驱动的方法设计（使用数据定义行为），这也是我的项目中使用过的方式，见[技能系统-更好的实现2](/GameCodeDesign/AbilitySystem.html#更好的实现2)。


## 类型对象

> GPP：“通过创建一个类来支持新类型的灵活创建，其每个实例都代表一个不同的对象类型。”
> </br>
> 如创建Breed类来支持Dragon(龙)、Troll(巨魔)类型的灵活创建。完成`Monster m = dragonBreed.newMonster()`的表述。Dragon、Troll类型成为了Breed类型的实例，Breed即为类型对象。

我第一次听到这个名词是在C#使用的虚拟机`CLR`中，`CLR`在每次调用类之前，都要提前初始化他的`类型对象`，而`类型对象`中存储了成员函数的指针，静态属性等。

GPP中介绍，在认为对象之后可能存在拓展情况（如增加怪物种类）的情况、或需要不修改代码增加新类型的情况下，可以使用类型对象模式。

## 总结-行为模式

GPP中，把上文的`字节码模式`，`子类沙盒模式`和`类型对象模式`成为行为模式。

WIP

## 组件模式

> GPP：“允许一个单一的实体跨越多个不同的域而不会导致耦合。”

Unity框架的核心`GameObject`完全围绕组件来设计。

### 处理互相关联的组件逻辑

> 一个属于某个对象的组件，由于其“属于某个对象”的特点，必然会产生关联的逻辑。

1. 容器对象Model
2. 直接关联
3. 事件广播

WIP

## 事件队列

> GPP：“对消息或事件的发送与受理进行时间上的解耦。”

他像是一个异步的观察者模式，如果不是在必须异步或多线程的情况下，不要使用它（实际上这个模式在游戏中也不怎么使用，他更多应用在分布式系统中）。而他的“优势区间”就是多线程和异步，如音频播放系统（多线程），动作游戏中缓存按键（异步）等。

## 不常用的模式

这里列举在GPP书中见到过，但实际开发很少用的设计模式

- 状态模式：实现方式很像命令模式，但是用来做状态机的版本，可以参考[AI状态机的例子](/AI/StateMachine)
- 享元模式：简而言之就是把重复使用的数据封装取引用。可能理解的难点主要在cpu和gpu的数据交换上。
    - Unity的material复用和渲染时合批使用了这种思想，可以参考unity批处理的条件。

## WIP

装饰者、工厂。

对象池。（实际上的优化表现存在争议，有待测试）

多态（运行时，编译）

## 参考
- **主要参考**：[《Game Programming Patterns》](https://gameprogrammingpatterns.com/)
- [《InsideUE4》GamePlay架构（十一）Subsystems - 大钊的文章 - 知乎](https://zhuanlan.zhihu.com/p/158717151)
