# UI系统

对于动态窗口（如mmorpg频繁开启的任务状态、背包、人物等），对UI采用设计模式是非常有必要的。

列举一个简单的需求：**一键隐藏所有UI**（这是一个很多游戏都有的功能），可以作为UI系统设计的出发点。

::: tip 达内Unity培训课：
核心类
1. Ul 窗口类 UIWindow 
    - 所有 UI 窗口的基类，用于以层次化的方式管理具体窗口类。
    - 定义所有窗口共有行为(显隐、获取事件监听器)。
2. UI 管理类 UIManager
    - 管理(记录、禁用、查找)所有窗口。
3. UI 事件监听器 UIEventListener
    - 提供当前 UI 所有事件(具有事件参数类)。

使用方式
1. 定义 UIXXXWindow 类，继承自 UIWindow，负责处理该窗口逻辑。
2. 通过窗口基类的 GetUIEventListener 方法获取需要交瓦的 UI 元素事件监听器。
3. 通过事件监听器 UIEventListener 提供的各种事件，实现交互行为。
4. 通过 UIManager 访问各个窗口成员。
    - `UIManagerInstance.GetWindow<窗口类型>().成员`:
:::

## 参考
