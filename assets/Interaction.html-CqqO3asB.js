import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as c,c as p,a as n,b as s,d as e,e as l}from"./app-4-R0Vhjj.js";const i="/assets/interaction-1-uL1FjfYD.png",r="/assets/interaction-2-C5W0dvnE.gif",u={},d=l('<img src="'+i+'"><h1 id="环境交互" tabindex="-1"><a class="header-anchor" href="#环境交互"><span>环境交互</span></a></h1><p>可以分为按键交互和无按键交互</p><ul><li>按键交互：如碰到篝火可以做饭，碰到墙可以爬。通过碰撞箱和方向判断实现，在检测到按键输入后，需要调用UI函数或游戏逻辑事件。</li><li>无按键交互：如水里游泳，雪地脚印。主要通过shader和cs脚本控制渲染参数实现。</li><li>开放世界触发场景加载</li></ul><h2 id="按键交互" tabindex="-1"><a class="header-anchor" href="#按键交互"><span>按键交互</span></a></h2><h3 id="简单碰撞箱交互" tabindex="-1"><a class="header-anchor" href="#简单碰撞箱交互"><span>简单碰撞箱交互</span></a></h3><p>下图是一个通过<code>ShpereCollider</code>实现的靠近互动逻辑。</p><ul><li>勾选<code>isTrigger</code>，并放入设定的互动碰撞层</li><li>监听<code>Trigger</code>事件判断是否显示UI，和挂载互动事件响应</li><li>物体和角色必须其中一方拥有rigidbody</li></ul><img src="'+r+`"><p>关键代码：</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnTriggerEnter</span><span class="token punctuation">(</span><span class="token class-name">Collider</span> other<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>other<span class="token punctuation">.</span>tag <span class="token operator">==</span> TestDB<span class="token punctuation">.</span>PLAYER_TAG<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">showInteractTip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        other<span class="token punctuation">.</span>gameObject<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PlayerController<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>InteractEventHandler <span class="token operator">+=</span> doInteract<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
<span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">OnTriggerExit</span><span class="token punctuation">(</span><span class="token class-name">Collider</span> other<span class="token punctuation">)</span>
<span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>other<span class="token punctuation">.</span>tag <span class="token operator">==</span> TestDB<span class="token punctuation">.</span>PLAYER_TAG<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">closeInteractTip</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        other<span class="token punctuation">.</span>gameObject<span class="token punctuation">.</span><span class="token generic-method"><span class="token function">GetComponent</span><span class="token generic class-name"><span class="token punctuation">&lt;</span>PlayerController<span class="token punctuation">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>InteractEventHandler <span class="token operator">-=</span> doInteract<span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,11),k={href:"https://github.com/Unarimit/my-topdown-shooting-game/blob/9981b70eb553e8c827eaab56de2667d0f3f07d3c/Assets/Scripts/CombatLogic/LevelLogic/InteractableObjectController.cs",target:"_blank",rel:"noopener noreferrer"},m=n("h2",{id:"无按键交互",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#无按键交互"},[n("span",null,"无按键交互")])],-1),h=n("p",null,"WIP",-1),v=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考"},[n("span",null,"参考")])],-1),g={href:"https://ys.mihoyo.com/",target:"_blank",rel:"noopener noreferrer"};function b(_,f){const a=o("ExternalLinkIcon");return c(),p("div",null,[d,n("p",null,[s("完整代码链接："),n("a",k,[s("InteractableObjectController.cs"),e(a)])]),m,h,v,n("ul",null,[n("li",null,[s("头图："),n("a",g,[s("原神"),e(a)])])])])}const C=t(u,[["render",b],["__file","Interaction.html.vue"]]),T=JSON.parse('{"path":"/GameCodeDesign/Interaction.html","title":"环境交互","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"按键交互","slug":"按键交互","link":"#按键交互","children":[{"level":3,"title":"简单碰撞箱交互","slug":"简单碰撞箱交互","link":"#简单碰撞箱交互","children":[]}]},{"level":2,"title":"无按键交互","slug":"无按键交互","link":"#无按键交互","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1707819000000,"updatedTime":1707819000000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":1}]},"readingTime":{"minutes":0.85,"words":255},"filePathRelative":"GameCodeDesign/Interaction.md","localizedDate":"February 13, 2024"}');export{C as comp,T as data};