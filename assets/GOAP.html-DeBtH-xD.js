import{_ as r}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as s,o as a,c as i,a as e,b as o,d as n,e as l}from"./app-4-R0Vhjj.js";const c="/assets/goap-0-iPE83oht.png",d="/assets/goap-1-DgDkgJNi.png",p={},h=l('<img src="'+c+'"><h1 id="goap-目标导向型行为规划" tabindex="-1"><a class="header-anchor" href="#goap-目标导向型行为规划"><span>GOAP-目标导向型行为规划</span></a></h1><p>为每个<code>行为</code>设计<code>条件</code>和<code>权值</code>，执行<code>行为</code>会改变<code>状态</code>，<strong>目标</strong>是一个特殊的状态<code>状态</code>，agent需要规划一系列<code>行为</code>，到达<strong>目标</strong><code>状态</code>。</p><blockquote><p>规划一系列<code>行为</code>的过程可以具象为求图中两点（目前<code>状态</code>和目标<code>状态</code>）的最短路径过程</p></blockquote><p>以上的解释对于不熟悉GOAP的人来说可能看起来非常抽象（毕竟只是我比较浅薄的理解），可以搜索<code>GOAP AI</code>或者利用gpt问答获得更具体的解释。在理解GOAP的概念之后，可以搜索一些实现方案，通过它们的api定义了解实际应用中是如何确定一些细则的。</p>',5),g={href:"https://www.cnblogs.com/OwlCat/p/17936809",target:"_blank",rel:"noopener noreferrer"},_={href:"https://assetstore.unity.com/packages/tools/behavior-ai/goap-252687",target:"_blank",rel:"noopener noreferrer"},m={href:"https://www.lfzxb.top/gdc-sharing-of-ai-system-based-on-goap-in-fear-simple-cn/",target:"_blank",rel:"noopener noreferrer"},u=e("p",null,"当然，可能这些仍然比较初级（包括我之后要演示的Demo），具体到生产项目中可能涉及更多的机制策略以及优化方案，这些请自行探索吧。",-1),b={href:"https://www.cnblogs.com/FlyingZiming/p/17274602.html",target:"_blank",rel:"noopener noreferrer"},f=l('<p>结合这些概念，GOAP的<strong>特点</strong>如下：</p><ul><li>相比行为树/状态机相对固定的逻辑，GOAP更动态一点，可以根据目标状态规划出行为列表。 <ul><li>动态意味着少量的代码就可以带来不错的效果，尤其是<code>行为</code>很多的时候</li><li>动态也同样意味着<strong>难以预测</strong>，debug会相对困难</li></ul></li><li>更容易在已有逻辑上添加<code>行为</code>，只要设计合理的权值就可以了</li><li>要设计一个特殊演出会比较困难，很难在GOAP规划内部进行条件判断 <ul><li>例如在目标角色为某个指定角色时安排一些额外<code>行为</code></li></ul></li></ul><p>以上特点使得GOAP更适用于战斗场景。</p><p>下面将以一个具体的实现解释其特点：</p><h2 id="demo-俯视平面的战斗ai决策" tabindex="-1"><a class="header-anchor" href="#demo-俯视平面的战斗ai决策"><span>Demo-俯视平面的战斗AI决策</span></a></h2>',5),A={href:"https://github.com/Unarimit/my-topdown-shooting-game/tree/dev/Assets/Scripts/CombatLogic/GOAPs",target:"_blank",rel:"noopener noreferrer"},G=e("ul",null,[e("li",null,'实现了GOAP类，用于计算"最短路径"'),e("li",null,"使用工厂模式构建GOAP图"),e("li",null,'根据场景内容，定义了16个"bool类型"的世界状态，并做了位运算优化'),e("li",null,"具体的行为逻辑使用行为树插件实现")],-1),O=e("p",null,"其中一个Agent的GOAP决策图为：",-1),P=e("img",{src:d},null,-1),w={href:"https://github.com/Unarimit/my-topdown-shooting-game/blob/1036f1da9989df0aa24b79d95f4aee7dc8c4e2e7/Assets/Scripts/CombatLogic/GOAPs/Builders/BuildHelper.cs",target:"_blank",rel:"noopener noreferrer"},k=e("p",null,'进一步的，可以融合"攻击技能"和"躲避技能"行为',-1),I=e("p",null,"WIP（由于行为实现和测试很麻烦，虽然状态定义好了，还没有实现）",-1),y=e("h2",{id:"参考",tabindex:"-1"},[e("a",{class:"header-anchor",href:"#参考"},[e("span",null,"参考")])],-1),x={href:"https://www.cnblogs.com/OwlCat/p/17936809",target:"_blank",rel:"noopener noreferrer"},v={href:"https://www.cnblogs.com/FlyingZiming/p/17274602.html",target:"_blank",rel:"noopener noreferrer"},D={href:"https://www.lfzxb.top/gdc-sharing-of-ai-system-based-on-goap-in-fear-simple-cn/",target:"_blank",rel:"noopener noreferrer"},C={href:"https://assetstore.unity.com/packages/tools/behavior-ai/goap-252687",target:"_blank",rel:"noopener noreferrer"},F={href:"https://book.douban.com/subject/27154117/",target:"_blank",rel:"noopener noreferrer"},q={href:"http://www.gameaipro.com/",target:"_blank",rel:"noopener noreferrer"};function B(E,N){const t=s("ExternalLinkIcon");return a(),i("div",null,[h,e("blockquote",null,[e("p",null,[o("推荐理论文章："),e("a",g,[o("游戏AI行为决策——GOAP（目标导向型行动规划）- cnblog"),n(t)]),o("。推荐实现方案："),e("a",_,[o("Goap - asset store"),n(t)]),o("。还有结合实例分析的一个例子："),e("a",m,[o("FEAR基于GOAP的AI系统GDC分享 - 烟雨迷离半世殇的博客"),n(t)])])]),u,e("blockquote",null,[e("p",null,[o("对于机制策略以及优化方案，文章 "),e("a",b,[o("游戏AI——GOAP技术要点 - FlyingZiming cnblog"),n(t)]),o(" 应该提供了一些宏观的观点。")])]),f,e("p",null,[e("a",A,[o("My-TDS"),n(t)]),o("中，在战斗场景实现了基于GOAP的行为决策，具体实现了以下内容：")]),G,O,P,e("p",null,[o("通过上述决策图就可以构建一个使用枪械，主动发现敌人，没子弹会撤退换弹，换完子弹继续冲的AI。等价的代码定义在"),e("a",w,[o("BuildHelper.cs"),n(t)]),o("中。")]),k,I,y,e("ul",null,[e("li",null,[o("理论-轮子："),e("a",x,[o("游戏AI行为决策——GOAP（目标导向型行动规划）- OwlCat cnblog"),n(t)])]),e("li",null,[o("理论-概览："),e("a",v,[o("游戏AI——GOAP技术要点 - FlyingZiming cnblog"),n(t)])]),e("li",null,[o("结合实例分析："),e("a",D,[o("FEAR基于GOAP的AI系统GDC分享 - 烟雨迷离半世殇的博客"),n(t)])]),e("li",null,[o("开源Unity Asset实现："),e("a",C,[o("Goap - asset store"),n(t)])]),e("li",null,[e("a",F,[o("《游戏人工智能》 4.行为选择算法一览"),n(t)]),e("ul",null,[e("li",null,[o("考虑到中文版已不再版，只有图书馆能借到，可以看在线英文版（对应第一版内容）："),e("a",q,[o("Game AI Pro"),n(t)])])])])])])}const U=r(p,[["render",B],["__file","GOAP.html.vue"]]),L=JSON.parse('{"path":"/AI/GOAP.html","title":"GOAP-目标导向型行为规划","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"Demo-俯视平面的战斗AI决策","slug":"demo-俯视平面的战斗ai决策","link":"#demo-俯视平面的战斗ai决策","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1707819000000,"updatedTime":1707819000000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":1}]},"readingTime":{"minutes":3.2,"words":961},"filePathRelative":"AI/GOAP.md","localizedDate":"February 13, 2024"}');export{U as comp,L as data};