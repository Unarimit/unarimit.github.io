import{_ as p}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as o,o as c,c as l,a as n,b as s,d as t,e}from"./app-4-R0Vhjj.js";const i="/assets/eventsystem-1-BtJF-nHn.png",u={},k=e('<img src="'+i+'"><h1 id="事件系统" tabindex="-1"><a class="header-anchor" href="#事件系统"><span>事件系统</span></a></h1><blockquote><p>事件系统是指在Unity中实现成就、触发任务等功能的实现。不是指<code>UntiyEvent</code>。</p></blockquote><p>我认为，事件系统应该分为延时事件系统和即时事件系统</p><ul><li>延时事件系统：主要强调事件发生的时间 <ul><li>例如游戏进行的第100个回合会有一个胜负判定，这是一个延时事件</li><li>游戏《群星》中，存在大量按时间触发的事件，丰富了游戏内容</li><li><strong>实现方式：按时间排序的事件队列（优先队列）</strong></li></ul></li><li>即时事件系统：当事件发生时就立刻处理，需要回调函数，常常用C#事件实现 <ul><li>如各种游戏的成就系统，任务系统</li><li><strong>实现方式：对事件标记的存储方法注册监听事件</strong></li></ul></li></ul><blockquote><p>说到事件系统，总让我想到消息队列这种常用于分布式、多任务的后端技术。但这种技术好像在游戏中（不包括后端业务）没有使用场景。</p></blockquote><h2 id="延时事件系统-例子" tabindex="-1"><a class="header-anchor" href="#延时事件系统-例子"><span>延时事件系统-例子</span></a></h2><p>我认为上述说明已经足够，直接从一个例子开始吧。</p>',8),r={href:"https://github.com/Unarimit/my-topdown-shooting-game/tree/dev/Assets/Scripts/HomeLogic",target:"_blank",rel:"noopener noreferrer"},d={href:"https://github.com/Unarimit/my-topdown-shooting-game/blob/dev/Assets/Scripts/Entities/HomeMessage/HomeMessage.cs",target:"_blank",rel:"noopener noreferrer"},m=n("code",null,"HomeMessage",-1),v={href:"https://github.com/Unarimit/my-topdown-shooting-game/blob/dev/Assets/Scripts/Entities/HomeMessage/HomeMessageQueue.cs",target:"_blank",rel:"noopener noreferrer"},b=n("code",null,"HomeMessageQueue",-1),y={href:"https://github.com/Unarimit/my-topdown-shooting-game/blob/dev/Assets/Scripts/HomeLogic/HomeStartup.cs",target:"_blank",rel:"noopener noreferrer"},g=n("code",null,"Home",-1),h=e(`<div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">HomeMessage</span>
<span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token keyword">static</span> <span class="token class-name"><span class="token keyword">int</span></span> _ID <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Id<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token class-name"><span class="token keyword">int</span></span> Day<span class="token punctuation">;</span> <span class="token comment">// 延时事件的延时根据</span>
    <span class="token keyword">public</span> <span class="token class-name">Action<span class="token punctuation">&lt;</span>HomeContextManager<span class="token punctuation">&gt;</span></span> MessageAction<span class="token punctuation">;</span> <span class="token comment">// 使用委托传递主要逻辑</span>
    <span class="token keyword">public</span> <span class="token function">HomeMessage</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        Id <span class="token operator">=</span> _ID<span class="token operator">++</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">DoMessage</span><span class="token punctuation">(</span><span class="token class-name">HomeContextManager</span> context<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token function">MessageAction</span><span class="token punctuation">(</span>context<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p><code>HomeMessageQueue.cs</code>我就不单独列出了，主要是封装了<code>SortedSet&lt;T&gt;</code>，让他像一个优先队列。</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">HomeStartup</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Start</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token comment">// ...</span>
        <span class="token comment">// 处理HomeMessages事件</span>
        <span class="token keyword">while</span> <span class="token punctuation">(</span>MyServices<span class="token punctuation">.</span>Database<span class="token punctuation">.</span>HomeMessages<span class="token punctuation">.</span>Count <span class="token operator">!=</span> <span class="token number">0</span> <span class="token operator">&amp;&amp;</span> MyServices<span class="token punctuation">.</span>Database<span class="token punctuation">.</span>HomeMessages<span class="token punctuation">.</span><span class="token function">Peek</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">.</span>Day <span class="token operator">&lt;=</span> MyServices<span class="token punctuation">.</span>GameDataHelper<span class="token punctuation">.</span>DayNow<span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token class-name"><span class="token keyword">var</span></span> act <span class="token operator">=</span> MyServices<span class="token punctuation">.</span>Database<span class="token punctuation">.</span>HomeMessages<span class="token punctuation">.</span><span class="token function">Pop</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
            act<span class="token punctuation">.</span><span class="token function">MessageAction</span><span class="token punctuation">(</span>HomeContextManager<span class="token punctuation">.</span>Instance<span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="即时事件系统-例子" tabindex="-1"><a class="header-anchor" href="#即时事件系统-例子"><span>即时事件系统-例子</span></a></h2><p>我认为上述说明已经足够，直接从一个例子开始吧。</p>`,5),w={href:"https://github.com/Unarimit/my-topdown-shooting-game/tree/dev/Assets/Scripts/CombatLogic",target:"_blank",rel:"noopener noreferrer"},f={href:"https://github.com/Unarimit/my-topdown-shooting-game/blob/dev/Assets/Scripts/CombatLogic/LevelLogic/GameLevelManager.cs",target:"_blank",rel:"noopener noreferrer"},_=n("code",null,"GameLevelManager",-1),M=n("code",null,"事件标记",-1),D=n("li",null,[s("在"),n("code",null,"GameLevelManager"),s("的添加"),n("code",null,"事件标记"),s("方法中检测是否满足目标。")],-1),A=n("li",null,[s("*这里我把敌人的掉落物和"),n("code",null,"事件标记"),s("混合了起来取巧，使其一起被检测，不用独立掉落物存储和注册回调逻辑了。但不相关物体会对性能产生一点点影响（如果继续向内部函数传key的话可以实现O(1)的不相关过滤，这里是懒得做了吧）。")],-1),S=e(`<p>下面是代码，请主要关注<code>addDropout</code>方法会调用<code>事件标记</code>检测方法这一点。</p><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">public</span> <span class="token keyword">class</span> <span class="token class-name">GameLevelManager</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">&gt;</span></span> Dropouts <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">Dictionary<span class="token punctuation">&lt;</span><span class="token keyword">string</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token punctuation">&gt;</span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CalculateDropout</span><span class="token punctuation">(</span><span class="token class-name">CombatOperator</span> cOperator<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>cOperator<span class="token punctuation">.</span>Team <span class="token operator">==</span> <span class="token number">0</span><span class="token punctuation">)</span> <span class="token function">addDropout</span><span class="token punctuation">(</span>MyConfig<span class="token punctuation">.</span>ItemTable<span class="token punctuation">.</span>KillTeam<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">if</span> <span class="token punctuation">(</span>cOperator<span class="token punctuation">.</span>Team <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token comment">// 自带掉落</span>
            <span class="token keyword">foreach</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> ePrab <span class="token keyword">in</span> _rule<span class="token punctuation">.</span>OperatorPrefabs<span class="token punctuation">)</span>
            <span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>ePrab<span class="token punctuation">.</span>OpInfo<span class="token punctuation">.</span>Id <span class="token operator">==</span> cOperator<span class="token punctuation">.</span>OpInfo<span class="token punctuation">.</span>Id<span class="token punctuation">)</span>
                <span class="token punctuation">{</span>
                    <span class="token keyword">if</span><span class="token punctuation">(</span>ePrab<span class="token punctuation">.</span>Dropouts <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span>
                    <span class="token punctuation">{</span>
                        <span class="token keyword">foreach</span> <span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">var</span></span> dp <span class="token keyword">in</span> ePrab<span class="token punctuation">.</span>Dropouts<span class="token punctuation">)</span>
                        <span class="token punctuation">{</span>
                            <span class="token function">addDropout</span><span class="token punctuation">(</span>dp<span class="token punctuation">.</span>DropItem<span class="token punctuation">.</span>ItemId<span class="token punctuation">,</span> dp<span class="token punctuation">.</span><span class="token function">GetDropoutAmount</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
                        <span class="token punctuation">}</span>
                    <span class="token punctuation">}</span>
                    <span class="token keyword">break</span><span class="token punctuation">;</span>
                <span class="token punctuation">}</span>
            <span class="token punctuation">}</span>
            <span class="token comment">// 敌人指示物</span>
            <span class="token function">addDropout</span><span class="token punctuation">(</span>MyConfig<span class="token punctuation">.</span>ItemTable<span class="token punctuation">.</span>KillEnemy<span class="token punctuation">.</span><span class="token function">ToString</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">,</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">addDropout</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">,</span> <span class="token class-name"><span class="token keyword">int</span></span> <span class="token keyword">value</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token operator">!</span>Dropouts<span class="token punctuation">.</span><span class="token function">ContainsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> Dropouts<span class="token punctuation">.</span><span class="token function">Add</span><span class="token punctuation">(</span>key<span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        Dropouts<span class="token punctuation">[</span>key<span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token keyword">value</span><span class="token punctuation">;</span>
        <span class="token function">CheckAimAndAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">int</span></span> <span class="token function">getDropout</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> key<span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>Dropouts<span class="token punctuation">.</span><span class="token function">ContainsKey</span><span class="token punctuation">(</span>key<span class="token punctuation">)</span><span class="token punctuation">)</span> <span class="token keyword">return</span> Dropouts<span class="token punctuation">[</span>key<span class="token punctuation">]</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> <span class="token keyword">return</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">public</span> <span class="token keyword">delegate</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">AimChangeEventHandler</span><span class="token punctuation">(</span><span class="token class-name"><span class="token keyword">string</span></span> text<span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token keyword">event</span> <span class="token class-name">AimChangeEventHandler</span> AimChangeEvent<span class="token punctuation">;</span>
    <span class="token keyword">public</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">CheckAimAndAction</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>isAccomplish <span class="token keyword">is</span> <span class="token class-name">true</span><span class="token punctuation">)</span> <span class="token keyword">return</span><span class="token punctuation">;</span>

        <span class="token comment">// 这里在更新ui</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>AimChangeEvent <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> AimChangeEvent<span class="token punctuation">.</span><span class="token function">Invoke</span><span class="token punctuation">(</span><span class="token function">generateText</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 最后执行物体控制指令（</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isMatchWinCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">levelAccomplish</span><span class="token punctuation">(</span><span class="token boolean">true</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span><span class="token function">isMatchLossCondition</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span>
        <span class="token punctuation">{</span>
            <span class="token function">levelAccomplish</span><span class="token punctuation">(</span><span class="token boolean">false</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="参考" tabindex="-1"><a class="header-anchor" href="#参考"><span>参考</span></a></h2>`,3),C={href:"https://gameprogrammingpatterns.com/",target:"_blank",rel:"noopener noreferrer"};function H(x,I){const a=o("ExternalLinkIcon");return c(),l("div",null,[k,n("p",null,[s("在"),n("a",r,[s("My-TDS家园场景"),t(a)]),s("中，有一个延时事件系统的设计，用于结算当天发生的事件，做了以下工作：")]),n("ul",null,[n("li",null,[s("定义"),n("a",d,[s("事件信息类"),m,t(a)]),s("，使用委托存储事件逻辑。")]),n("li",null,[s("定义"),n("a",v,[s("事件队列"),b,t(a)])]),n("li",null,[s("在"),n("a",y,[g,s("场景加载时判断"),t(a)])])]),h,n("p",null,[s("在"),n("a",w,[s("My-TDS战斗场景"),t(a)]),s("中，有一个即时事件系统的设计，用于结算战斗时什么时候满足战斗目标，触发战斗结算。做了以下工作：")]),n("ul",null,[n("li",null,[s("在"),n("a",f,[_,t(a)]),s("中。记录"),M]),D,A]),S,n("ul",null,[n("li",null,[n("a",C,[s("《Game Programming Patterns》"),t(a)])])])])}const L=p(u,[["render",H],["__file","EventSystem.html.vue"]]),O=JSON.parse('{"path":"/GameCodeDesign/EventSystem.html","title":"事件系统","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"延时事件系统-例子","slug":"延时事件系统-例子","link":"#延时事件系统-例子","children":[]},{"level":2,"title":"即时事件系统-例子","slug":"即时事件系统-例子","link":"#即时事件系统-例子","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1707819000000,"updatedTime":1714201679000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":2}]},"readingTime":{"minutes":2.93,"words":880},"filePathRelative":"GameCodeDesign/EventSystem.md","localizedDate":"February 13, 2024"}');export{L as comp,O as data};