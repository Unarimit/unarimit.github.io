# 有限状态机

对于接触unity的人来说，状态机应该不是一个陌生的概念。但如何优雅的实现一个自动机应该是设计AI系统的最终目标。

## 和行为树的区别

WIP

## 状态机设计

设计完全参考 [在Unity中使用状态机制作一个敌人AI - Bilibili](https://www.bilibili.com/video/BV1zf4y1r7FJ) 中所描述的（视频中也有详细的例子），使用以下代码作为Agent脚本：
``` cs
public class AgentController : PersonController
{
    private Dictionary<StateType, IAgentState> states = new Dictionary<StateType, IAgentState>();
    private IAgentState currentState;

    protected override void Start()
    {

        base.Start();
        _instantiatePosition = transform.position;

        states.Add(StateType.Idle, new IdleState(this));
        states.Add(StateType.React, new ReactState(this));
        // ...
    }
    // 在状态转移时执行 OnExit() 和 OnEnter()
    public void TranslateState(StateType state) 
    {
        if (currentState != null)
            currentState.OnExit();
        currentState = states[state];
        currentState.OnEnter();
    }
    private void Update()
    {
        currentState.OnUpdate();
    }
}

// 每个state都是一个cs脚本，继承这个接口
public interface IAgentState
{
    void OnEnter();

    void OnUpdate();

    void OnExit();
}
```
通过简单几行代码，就有状态机的雏形了。且各状态代码管理起来方便直观。

但这样AI的代码只能通过程序实现，有图形化状态机的插件更好。

## 参考
- [在Unity中使用状态机制作一个敌人AI - Bilibili](https://www.bilibili.com/video/BV1zf4y1r7FJ)