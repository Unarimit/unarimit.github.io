import{_ as t}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as p,o,c,a as n,b as a,d as e,e as l}from"./app-4-R0Vhjj.js";const i={},u=l(`<h1 id="启动流程设计" tabindex="-1"><a class="header-anchor" href="#启动流程设计"><span>启动流程设计</span></a></h1><p>启动流程中需要对一系列模块进行初始化，例如检测新版本，检测服务器状态，加载外部代码，加载场景等。它们之间往往具有先后顺序（例如&quot;加载游戏资源步骤&quot;依赖于&quot;检测新版本&quot;步骤），并可以以流程图的方式表示出来。</p><h2 id="简单的做法" tabindex="-1"><a class="header-anchor" href="#简单的做法"><span>简单的做法</span></a></h2><p>在Unity中调整某一<code>MonoBehaviour</code>的优先级，直接在他的<code>Awake</code>函数下做启动初始化即可。对于一些不依赖<code>MonoBehaviour</code>功能的初始化过程，也可以利用C#的静态构造函数来做，保证该类在第一次访问之前完成初始化。</p><p>如我在MyTDS中所做的</p><ol><li>利用MonoBehaviour的初始化</li></ol><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token keyword">internal</span> <span class="token keyword">class</span> <span class="token class-name">StartSceneStartup</span> <span class="token punctuation">:</span> <span class="token type-list"><span class="token class-name">MonoBehaviour</span></span><span class="token punctuation">{</span>
    <span class="token keyword">private</span> <span class="token return-type class-name"><span class="token keyword">void</span></span> <span class="token function">Awake</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 加载背景（根据一些存档信息）</span>
        SceneManager<span class="token punctuation">.</span><span class="token function">LoadScene</span><span class="token punctuation">(</span><span class="token string">&quot;HomeBackground&quot;</span><span class="token punctuation">,</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LoadSceneParameters</span><span class="token punctuation">(</span>LoadSceneMode<span class="token punctuation">.</span>Additive<span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

        <span class="token comment">// 加载lua脚本 (添加关卡和技能）</span>
        <span class="token function">luaLogicLevelInject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token function">luaLogicSkillInject</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>利用C#静态构造函数的初始化</li></ol><div class="language-csharp line-numbers-mode" data-ext="cs" data-title="cs"><pre class="language-csharp"><code><span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> 服务提供者（定位器） <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
<span class="token keyword">internal</span> <span class="token keyword">static</span> <span class="token keyword">class</span> <span class="token class-name">MyServices</span>
<span class="token punctuation">{</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> 运行时存储，不等于存档 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">IGameDatabase</span> Database <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> 游戏数据常用方法 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">GameDataHelper</span> GameDataHelper <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token doc-comment comment">/// <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;</span>summary</span><span class="token punctuation">&gt;</span></span> Lua全局环境 <span class="token tag"><span class="token tag"><span class="token punctuation">&lt;/</span>summary</span><span class="token punctuation">&gt;</span></span></span>
    <span class="token keyword">public</span> <span class="token keyword">static</span> <span class="token return-type class-name">LuaEnv</span> LuaEnv <span class="token punctuation">{</span> <span class="token keyword">get</span><span class="token punctuation">;</span> <span class="token punctuation">}</span>
    <span class="token keyword">static</span> <span class="token function">MyServices</span><span class="token punctuation">(</span><span class="token punctuation">)</span>
    <span class="token punctuation">{</span>
        <span class="token comment">// 测试使用</span>
        Database <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">TestDatabase</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token comment">//Database = new FileDatabase();</span>
        GameDataHelper <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">GameDataHelper</span><span class="token punctuation">(</span>Database<span class="token punctuation">)</span><span class="token punctuation">;</span>
        LuaEnv <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token constructor-invocation class-name">LuaEnv</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="复杂的做法" tabindex="-1"><a class="header-anchor" href="#复杂的做法"><span>复杂的做法</span></a></h2><p>在大型项目中，初始化的逻辑可能很复杂（如涉及对资源的销毁并引入生命周期），并涉及多个人开发的不同模块，可能不能在一个代码块中描述出所有逻辑。</p><p>这时候会把逻辑拆分到标准化的类中，并设计优先级、加载、卸载、调试信息、异常处理（例如商店模块在检测不到谷歌服务的情况下无法运作，但却不影响游戏进行，这就需要做异常处理）等特性，可以参考一些开源的游戏框架，如<code>GameFramework</code>。</p>`,12),r={href:"https://zhuanlan.zhihu.com/p/431013230",target:"_blank",rel:"noopener noreferrer"},d=n("p",null,"这里由于缺乏实践就不过多描述了",-1),k=n("h2",{id:"其中的问题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#其中的问题"},[n("span",null,"其中的问题")])],-1),m=n("p",null,"无论哪种做法，随着项目的复杂度提高，为了解耦逻辑都会将初始化功能拆分到其他类中，这也导致了初始化过程的不直观。",-1),v=n("blockquote",null,[n("p",null,"我认为在程序内部，可以通过管理类提供统一的接口，再使用log可视化初始化过程。程序外部则使用详细的文档描述初始化过程。不过因为我没接触过大点的项目，这些仍停留在理论层面。")],-1),h=n("h2",{id:"参考",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#参考"},[n("span",null,"参考")])],-1),b={href:"https://zhuanlan.zhihu.com/p/431013230",target:"_blank",rel:"noopener noreferrer"};function g(y,w){const s=p("ExternalLinkIcon");return o(),c("div",null,[u,n("blockquote",null,[n("p",null,[a("引用一篇不错的讲解："),n("a",r,[a("GameFramework解析：流程 (Procedure) 花桑 - 知乎"),e(s)])])]),d,k,m,v,h,n("ul",null,[n("li",null,[n("a",b,[a("GameFramework解析：流程 (Procedure) 花桑 - 知乎"),e(s)])])])])}const S=t(i,[["render",g],["__file","StartupProcedure.html.vue"]]),D=JSON.parse('{"path":"/GameCodeDesign/StartupProcedure.html","title":"启动流程设计","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"简单的做法","slug":"简单的做法","link":"#简单的做法","children":[]},{"level":2,"title":"复杂的做法","slug":"复杂的做法","link":"#复杂的做法","children":[]},{"level":2,"title":"其中的问题","slug":"其中的问题","link":"#其中的问题","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1707819000000,"updatedTime":1707892589000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":2}]},"readingTime":{"minutes":2.25,"words":676},"filePathRelative":"GameCodeDesign/StartupProcedure.md","localizedDate":"February 13, 2024"}');export{S as comp,D as data};