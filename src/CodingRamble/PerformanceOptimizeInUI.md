# 性能优化-UI篇

UI的性能优化可以分为三个方向：
1. 减少draw call提交的I/O
    - 触发动态合批（dynamic batching），首先通过图集合并细小的UI，会增加一定量的CPU开销。
    - 减少图片大小，使用平铺、非焦点图低像素等技巧。
2. 减少CPU计算
    - 使用多个画布（平行或内嵌），实现动静分离。
    - 非必要不使用布局（Layout）
3. 针对特定场景
    - 对于有大量元素的列表，采用分页式设计，不加载被mask的元素。
    - 。。。

实际实施过程中，有时为了美术效果或设计方便，往往使UI难以采用优化策略。如合批方面，当多个必要的材质在层级上混合，且由Animation在层级上控制时，就不是打个图集就能完事得的了。（理想和现实的差距）

本文将主要讨论“动态合批”和“动静分离”策略。

## 动态合批

动态合批中unity的解释


问题：看不到源码，逻辑的判定点不明
- 入口：UniversalRenderPipeline.RenderSingleCamera -> ScriptableRenderer.Execute -> DrawObjectsPass.Execute(Name:"Render Transparents") -> ScriptableRenderContext -> _Internal
- 要看看是什么Pass
- CommandBuffer是渲染命令


## 动静分离

动静结合，合批是否合理。



## 参考
- [动态合批 - Unity Doc](https://docs.unity3d.com/2021.3/Documentation/Manual/dynamic-batching.html)
- [嵌套画布优化 - 阿严Dev, Youtube](https://www.youtube.com/watch?v=D3m_pfJ1nwQ)
    - [Nested Canvas Optimization 2019.3 - Learn unity](https://learn.unity.com/tutorial/nested-canvas-optimization-2019-3#)
    - [Unity UI 优化技巧 - Unity HowTo](https://unity.com/cn/how-to/unity-ui-optimization-tips)
- [Unity UI (uGUI) 2.0 - Unity Manul](https://docs.unity3d.com/Packages/com.unity.ugui@2.0/manual/index.html)