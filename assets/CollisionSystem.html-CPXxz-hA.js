import{_ as a}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r,o as c,c as u,d as t,w as o,a as l,b as e,e as s}from"./app-4-R0Vhjj.js";const _="/assets/collisionSystem-1-BuPccSNf.png",d="/assets/collisionSystem-2-CpFWIW1M.png",h="/assets/collisionSystem-3-Bdza59Ik.png",p="/assets/collisionSystem-4-DGwDvuL7.png",m="/assets/collisionSystem-10-8zSeV1K4.png",g="/assets/collisionSystem-5-oc0AsufV.png",B="/assets/collisionSystem-6-D-lnSnZo.png",f="/assets/collisionSystem-7-BP-eKWeg.png",b="/assets/collisionSystem-8-CIvVD1Ny.png",k="/assets/collisionSystem-9-CRaHrkqS.jpg",y="/assets/collisionSystem-11-Bz4TQPFD.png",A="/assets/collisionSystem-12-CmEIcSwf.png",w="/assets/collisionSystem-13-yKl-9aNB.png",S={},C=s('<h1 id="初探碰撞系统" tabindex="-1"><a class="header-anchor" href="#初探碰撞系统"><span>初探碰撞系统</span></a></h1><p>碰撞系统是游戏引擎很重要的一部分，理解其原理，可以在选择碰撞体和处理碰撞逻辑等实践中提供理论指导。</p><p>碰撞系统可以分为几何相交检测和刚体力学模拟两部分，本文主要围绕“几何相交检测”部分展开。</p><p>由于文中涉及大量碰撞体的碰撞逻辑介绍，摘录了《游戏引擎架构》中的一些图片。这些图片为了便于理解都是二维的，但文中的介绍和描述则是三维的（会提到z轴），请不要感到意外。</p><h2 id="碰撞原型" tabindex="-1"><a class="header-anchor" href="#碰撞原型"><span>碰撞原型</span></a></h2><p>复杂的碰撞体可由碰撞原型组合得到，碰撞原型都是些简单的几何体。</p><div class="hint-container tip"><p class="hint-container-title">凸性</p><p>凸形状（三角形，圆形，矩形等）检测相交会比凹形状（吃豆人等）检测相交更简单</p><blockquote><p>“凸形状的定义是，由形状内发射的光线不会穿越形状表面两次或以上。有一个简单的办法可判断形状是否为凸，我们可以想象用保鲜膜包裹形状，若形状是凸的，那么保鲜膜下便不会有气囊。” —— 《游戏引擎架构》</p></blockquote></div><p>碰撞原型有：</p><ul><li>球体：最高效的碰撞体</li><li>胶囊体：由两点和半径定义，比圆柱体和长方体高效，因此常用来建模相似的物体，如人的四肢</li></ul>',9),x=l("img",{width:"400",src:_},null,-1),O=l("ul",null,[l("li",null,"轴对齐包围盒（axis-aligned bounding box, AABB）：由两点定义，逼近原物体，可以高速检测与另一AABB是否相交（做过滤使用），但可能会逼近很差的形状。")],-1),q=l("img",{width:"400",src:d},null,-1),v=l("img",{width:"600",src:h},null,-1),D=l("ul",null,[l("li",null,[l("p",null,[e("定向包围盒（oriented bounding box, OBB）：允许将AABB的盒子在坐标系中"),l("strong",null,"旋转"),e("，便得到OBB。表示为三个“半尺寸”（半高，半宽，半长）再加上一个变换（表示方式和unity的cube一样嘛）。OBB是一种常用的碰撞原型，因为能够较好地表示任意物体，而其表示方式仍然比较简单。")])]),l("li",null,[l("p",null,"集散定向多胞形（discrete oriented polytope, DOP）：是比AABB和OBB更泛化的形状。AABB和OBB算是6-DOP。")])],-1),E=l("img",{width:"400",src:p},null,-1),N=s('<p>有些碰撞引起允许直接表达<strong>任意凸体积</strong>和<strong>多边形汤（polygon soup）</strong>，后者的意思是“任意的，非凸的形状，有时不一定是体积，可以是开放的表面”，会进行一些预处理（离线计算），通常用来表示地形或建筑。</p><h2 id="碰撞检测" tabindex="-1"><a class="header-anchor" href="#碰撞检测"><span>碰撞检测</span></a></h2><h3 id="判断相交" tabindex="-1"><a class="header-anchor" href="#判断相交"><span>判断相交</span></a></h3><p>将按照上文碰撞原型中的顺序，介绍其如何判断相交。</p><ul><li><p>球体之间：最简单的，判断球是否相交，直接求两个中心点的距离，和半径和去比就行了。</p></li><li><p>胶囊体之间：利用求两条直线最近点，把胶囊体的相交简化成球体的相交。</p></li></ul>',5),z=l("img",{width:"400",src:m},null,-1),T={href:"https://zh.wikipedia.org/wiki/%E8%B6%85%E5%B9%B3%E9%9D%A2%E5%88%86%E9%9B%A2%E5%AE%9A%E7%90%86",target:"_blank",rel:"noopener noreferrer"},V=l("img",{width:"600",src:g},null,-1),G=l("img",{width:"600",src:B},null,-1),I=l("ul",null,[l("li",null,"轴对齐包围盒（AABB）之间：根据上述定理，判断AABB和AABB的相交，检测其x,y,z轴上的(min, max)区间，是否有重叠。若三个轴上的区域都重叠，那么它们是相交的，否则它们不相交。")],-1),R=l("img",{width:"600",src:f},null,-1),J=l("b",null,"二维的",-1),K=l("ul",null,[l("li",null,"定向包围盒（OBB）之间：相对AABB的只要判断主坐标轴，判断OBB和OBB的相交需要判断两个OBB“主坐标轴”的并集（可能有3-6个轴），若在这些轴的区域都重叠，那么它们是相交的，否则它们不相交。")],-1),P=l("img",{width:"400",src:b},null,-1),F=l("b",null,"二维的",-1),j={href:"https://zhuanlan.zhihu.com/p/405154230",target:"_blank",rel:"noopener noreferrer"},L=l("img",{width:"600",src:k},null,-1),W={href:"https://caseymuratori.com/blog_0003",target:"_blank",rel:"noopener noreferrer"},U=l("blockquote",null,[l("p",null,"“然而，读者需要意识到一个重点，就是形状对形状的组合的数目十分庞大。事实上，对于 N 种形状，所需的成对测试便需要 O(N^2)个。碰撞引擎的复杂度，很大程度上是由大量所需处理的相交组合所造成的。这也是碰撞引擎的作者总是尽量限制碰撞原型数量的原因，这样做可以大幅度降低所需处理的相交组合数目。(这是GJK流行的原因——GJK 能一举处理所有凸形状之间的碰撞检测。而不同形状的唯一区别只在于算法所使用的支持函数)。” —— 《游戏引擎架构》")],-1),H=l("h3",{id:"检测快速运动的物体",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#检测快速运动的物体"},[l("span",null,"检测快速运动的物体")])],-1),M=l("p",null,"写过子弹碰撞逻辑的人都知道，快速移动的子弹可能出现穿透碰撞体的现象。是因为游戏引擎中，运动通常以离散步时（time step）来模拟的。",-1),Q=l("blockquote",null,[l("p",null,[e("这在unity中，一般通过设置"),l("code",null,"刚体"),e("的"),l("code",null,"连续碰撞"),e("参数解决。")])],-1),Z=l("img",{width:"700",src:y},null,-1),X=l("p",null,"《游戏引擎架构》书中给出了两种解决方案：",-1),Y=l("ul",null,[l("li",null,[l("ol",null,[l("li",null,"使用扫掠图形")]),l("blockquote",null,[l("p",null,"检测相交时,由测试碰撞世界的静态快照，改为测试形状从上一个快照的位置及定向移动至当前快照所形成的扫掠形状。此方法等同对快照间的形状做线性插值，因为我们通常以快照间的直线线段扫掠。")]),l("ul",null,[l("li",null,"但若目标不是直线移动，可能会出现一些误差。")])])],-1),$=l("img",{width:"400",src:A},null,-1),ll=l("img",{width:"700",src:w},null,-1),el=s('<ul><li><ol start="2"><li>使用连续碰撞检测</li></ol><blockquote><p>处理隧穿的另一个方法是使用连续碰撞检测(continuouscollision detec-tion,CCD)技术。CCD的目标是对两个移动物体在某时间区间内，求得最早的冲击时间(time of impact, TOl)。CCD算法一般是迭代式的。</p></blockquote></li></ul><h3 id="检测优化" tabindex="-1"><a class="header-anchor" href="#检测优化"><span>检测优化</span></a></h3><p>若采用蛮力法做碰撞检测，时间复杂度为O(N^2)，其中N为物体数量。所以为了使其过程更加迅速，使用了下列优化手段：</p><ul><li>利用时间连续性 <blockquote><p>当碰撞体以正常速率移动时，在两时步中其位置及定向通常会很接近。通过跨越多帧把结果缓存，可以避免为每帧重新计算一些类型的信息。</p></blockquote></li><li>使用空间分割算法</li><li>使用包围盒过滤一遍 <ul><li>粗略阶段（AABB），中间阶段（OBB），精确阶段（使用真正的碰撞体）</li></ul></li><li>*通过碰撞层过滤</li><li>更多.. <ul><li>如扫掠裁减算法，其基本思路是对各个碰撞体的AABB的最小、最大坐标在3个主轴上排序,然后通过遍历该有序表检测AABB间是否重叠。</li></ul></li></ul><h2 id="碰撞查询" tabindex="-1"><a class="header-anchor" href="#碰撞查询"><span>碰撞查询</span></a></h2><p>游戏中，我们可能会需要查询下一时刻两个物体是否会发生碰撞。如射击检测，找出半径范围的敌人，汽车从A点移动至B点是否碰到障碍物等。具体到实现，可以分为：</p><ul><li>射线检测，返回物体的首次接触点。如unity的<code>RayCast</code></li><li>物体投射，范围形状的首次接触点。如unity的<code>SphereCast</code></li><li>“幻影”碰撞器，可以理解为零距离形状投射，常用于判断碰撞体是否在范围内。如unity里collider的<code>IsTrigger</code>参数</li><li>等等</li></ul>',7),tl={href:"https://en.wikipedia.org/wiki/Computational_geometry#Geometric_query_problems",target:"_blank",rel:"noopener noreferrer"},nl={href:"https://en.wikipedia.org/wiki/Spatial_database",target:"_blank",rel:"noopener noreferrer"},ol=l("h2",{id:"参考",tabindex:"-1"},[l("a",{class:"header-anchor",href:"#参考"},[l("span",null,"参考")])],-1),il={href:"https://book.douban.com/subject/34864920/",target:"_blank",rel:"noopener noreferrer"},sl=l("ul",null,[l("li",null,"12.3-碰撞检测系统")],-1),rl={href:"https://zhuanlan.zhihu.com/p/405154230",target:"_blank",rel:"noopener noreferrer"},al={href:"https://book.douban.com/subject/30296179/",target:"_blank",rel:"noopener noreferrer"},cl={href:"https://wickedengine.net/2020/04/26/capsule-collision-detection/",target:"_blank",rel:"noopener noreferrer"},ul={href:"https://en.wikipedia.org/wiki/Computational_geometry#Geometric_query_problems",target:"_blank",rel:"noopener noreferrer"},_l={href:"https://en.wikipedia.org/wiki/Spatial_database",target:"_blank",rel:"noopener noreferrer"};function dl(hl,pl){const n=r("center"),i=r("ExternalLinkIcon");return c(),u("div",null,[C,t(n,null,{default:o(()=>[x]),_:1}),O,t(n,null,{default:o(()=>[q]),_:1}),t(n,null,{default:o(()=>[v]),_:1}),D,t(n,null,{default:o(()=>[E]),_:1}),N,t(n,null,{default:o(()=>[z]),_:1}),l("p",null,[e("为了计算后面的碰撞原型，需要引入“"),l("a",T,[e("超平面分离定理（分离轴定理）"),t(i)]),e("”，此定理指出，若能找到一个轴，两个凸形状在该轴上的投影不重叠，就能确定两个形状不相交。")]),t(n,null,{default:o(()=>[V]),_:1}),t(n,null,{default:o(()=>[G]),_:1}),I,t(n,null,{default:o(()=>[R]),_:1}),t(n,null,{default:o(()=>[J,e("不相交例子")]),_:1}),K,t(n,null,{default:o(()=>[P]),_:1}),t(n,null,{default:o(()=>[F,e("不相交例子")]),_:1}),l("ul",null,[l("li",null,[e("球体和（AABB或OBB）：方法可能不是很直观，这里仅列出伪代码，可以去"),l("a",j,[e("知乎的一篇翻译文章"),t(i)]),e("中看解释。对球体来说，AABB和OBB差别不大。")])]),t(n,null,{default:o(()=>[L]),_:1}),l("ul",null,[l("li",null,[e("判断任意凸形状：使用"),l("a",W,[e("GJK算法"),t(i)]),e("。 "),U])]),H,M,Q,t(n,null,{default:o(()=>[Z]),_:1}),X,Y,t(n,null,{default:o(()=>[$]),_:1}),t(n,null,{default:o(()=>[ll]),_:1}),el,l("p",null,[e("这类问题可以归纳为"),l("a",tl,[e("几何查询（geometric query）问题"),t(i)]),e("，也适用于上述的检测优化算法。另外，这些投射算法不会发生碰撞穿透问题。")]),l("ul",null,[l("li",null,[e("可以看看名为"),l("a",nl,[e("“空间数据库”"),t(i)]),e("的解决方案")])]),ol,l("ul",null,[l("li",null,[l("a",il,[e("游戏引擎架构（第2版）- 【美】Jason Gregory"),t(i)]),sl]),l("li",null,[l("a",rl,[e("22.13包围盒（Bounding-Volume）/包围盒相交 Justin - 知乎"),t(i)]),l("ul",null,[l("li",null,[e("对"),l("a",al,[e("《Real-Time Rendering, Fourth Edition - Tomas》"),t(i)]),e("的翻译")])])]),l("li",null,[l("a",cl,[e("Capsule Collision Detection - wicked engine"),t(i)])]),l("li",null,[l("a",ul,[e("几何查询（geometric query） - wiki"),t(i)])]),l("li",null,[l("a",_l,[e("空间数据库（Spatial Database） - wiki"),t(i)])])])])}const Bl=a(S,[["render",dl],["__file","CollisionSystem.html.vue"]]),fl=JSON.parse('{"path":"/CodingRamble/CollisionSystem.html","title":"初探碰撞系统","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"碰撞原型","slug":"碰撞原型","link":"#碰撞原型","children":[]},{"level":2,"title":"碰撞检测","slug":"碰撞检测","link":"#碰撞检测","children":[{"level":3,"title":"判断相交","slug":"判断相交","link":"#判断相交","children":[]},{"level":3,"title":"检测快速运动的物体","slug":"检测快速运动的物体","link":"#检测快速运动的物体","children":[]},{"level":3,"title":"检测优化","slug":"检测优化","link":"#检测优化","children":[]}]},{"level":2,"title":"碰撞查询","slug":"碰撞查询","link":"#碰撞查询","children":[]},{"level":2,"title":"参考","slug":"参考","link":"#参考","children":[]}],"git":{"createdTime":1708443769000,"updatedTime":1708512849000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":2}]},"readingTime":{"minutes":7.11,"words":2133},"filePathRelative":"CodingRamble/CollisionSystem.md","localizedDate":"February 20, 2024"}');export{Bl as comp,fl as data};