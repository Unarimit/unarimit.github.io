import{_ as l}from"./plugin-vue_export-helper-DlAUqK2U.js";import{r as c,o as i,c as u,a as n,b as s,d as a,w as e,e as t}from"./app-4-R0Vhjj.js";const k="/assets/leetcodew373-1-DNm7l57m.png",r="/assets/leetcodew373-2-lh7rRkUC.png",d="/assets/leetcodew373-3-CAEss4aX.png",v={},m=n("h1",{id:"记leetcode第373次周赛",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#记leetcode第373次周赛"},[n("span",null,"记Leetcode第373次周赛")])],-1),b=n("img",{src:k},null,-1),h=n("p",null,"记录这次周赛的主要原因，是因为凭运气全部AC了，并且拿到了147的名次（我的历史最优）。",-1),g=n("blockquote",null,[n("p",null,"凭运气是指：在理解错一道题+第四道题关键推论证明不出来的情况下，依然做对了。")],-1),f=n("p",null,"怀着激动的心情，记录一下我周赛编程中遇到的一些问题，以及可以改进的地方",-1),_={href:"https://leetcode.cn/contest/weekly-contest-373/",target:"_blank",rel:"noopener noreferrer"},w=n("h2",{id:"第一道题",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#第一道题"},[n("span",null,"第一道题")])],-1),y=n("p",null,"用时10分钟，在理解错题意的情况下AC",-1),q={href:"https://leetcode.cn/problems/matrix-similarity-after-cyclic-shifts/",target:"_blank",rel:"noopener noreferrer"},x=t('<h3 id="题目-循环移位后的矩阵相似检查" tabindex="-1"><a class="header-anchor" href="#题目-循环移位后的矩阵相似检查"><span>题目：循环移位后的矩阵相似检查</span></a></h3><blockquote><p>给你一个大小为<code>m x n</code>的整数矩阵<code>mat</code>和一个整数<code>k</code>。请你将矩阵中的<strong>奇数</strong>行循环<strong>右</strong>移<code>k</code>次，<strong>偶数</strong>行循环<strong>左</strong>移<code>k</code>次。 如果初始矩阵和最终矩阵完全相同，则返回 true ，否则返回 false 。</p></blockquote>',2),z=n("img",{src:r},null,-1),j=t('<h3 id="题目分析" tabindex="-1"><a class="header-anchor" href="#题目分析"><span>题目分析</span></a></h3><p>先说结论，判断上述矩阵相似<strong>无需注意</strong>题目中提到的<strong>奇数行</strong>、<strong>偶数行</strong>、<strong>左循环</strong>和<strong>右循环</strong>。直接判断整个数组循环左移（或循环右移）k次是否和原数组相同就就行。</p><blockquote><p>矩阵运算中，若A*B=A，那么也有A*(B^-1)=A。左移的^-1就是右移。（只是大概解释一下，可能不一定对(∠・ω&lt; )⌒★）</p></blockquote><h3 id="我的错误理解" tabindex="-1"><a class="header-anchor" href="#我的错误理解"><span>我的错误理解</span></a></h3><p>当我在做这道题时，先开始思考“什么是<strong>奇数</strong>行循环<strong>右</strong>移，<strong>偶数</strong>行循环<strong>左</strong>移”，然后我看了看示例图和它的描述，得出结论：</p><p>奇数<strong>列</strong>在右移，偶数<strong>列</strong>在右移。可这不是列吗，题目描述为什么是行呢？</p><blockquote><p>这里还有一个问题，没有考虑从0开始计数，最左边那一列属于偶数列</p></blockquote>',7),C=n("img",{src:d},null,-1),I=t(`<p>可能是我和官方其中有一个对<strong>行</strong>和<strong>列</strong>的理解有偏差，我直接不管，开始做题。 然后就通过了，因为这道题中，判断左移k位还是右移k位都不重要，只要移了k位就行。</p><p><strong>总结环节：</strong> 为什么会造成这样的理解错误呢？</p><ol><li>没有搞懂<code>行循环右移</code>这个概念</li><li>没有搞懂<code>奇数行</code>、<code>偶数行</code>的指的是哪些行</li><li>在满足1，2的同时，看示例，根据“俺寻思”先入为主</li></ol><p>从自身当时的想法出发，可能是因为标的简单题，就没想仔细分析。这种做题习惯是不好的，如果没能AC还需要反复看题，产生额外的时间开销和负面情绪反馈。 建议做一些简单题提高阅读理解水平。</p><h3 id="代码展示" tabindex="-1"><a class="header-anchor" href="#代码展示"><span>代码展示</span></a></h3><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token comment">// 我的错误理解，但是通过的代码</span>
<span class="token keyword">bool</span> <span class="token function">areSimilar</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;&gt;</span><span class="token operator">&amp;</span> mat<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    k <span class="token operator">%=</span> mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> mat<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mat<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">(</span>i<span class="token operator">+</span>k<span class="token punctuation">)</span><span class="token operator">%</span>mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">!=</span> mat<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mat<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">(</span>i<span class="token operator">-</span>k<span class="token operator">+</span>mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">%</span>mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">!=</span> mat<span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
<span class="token comment">// 后面修正的完全按照题意，也通过的代码</span>
<span class="token keyword">bool</span> <span class="token function">areSimilar</span><span class="token punctuation">(</span>vector<span class="token operator">&lt;</span>vector<span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;&gt;</span><span class="token operator">&amp;</span> mat<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    k <span class="token operator">%=</span> mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> mat<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> j <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> j <span class="token operator">&lt;</span> mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> j<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>i <span class="token operator">%</span> <span class="token number">2</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span><span class="token punctuation">{</span> <span class="token comment">// 实际上这个if是完全不需要的</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mat<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">(</span>j<span class="token operator">+</span>k<span class="token punctuation">)</span><span class="token operator">%</span>mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">!=</span> mat<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span><span class="token keyword">else</span><span class="token punctuation">{</span>
                <span class="token keyword">if</span><span class="token punctuation">(</span>mat<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span><span class="token punctuation">(</span>j<span class="token operator">-</span>k<span class="token operator">+</span>mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token operator">%</span>mat<span class="token punctuation">[</span><span class="token number">0</span><span class="token punctuation">]</span><span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">]</span> <span class="token operator">!=</span> mat<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">[</span>j<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token keyword">return</span> <span class="token boolean">false</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> <span class="token boolean">true</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="第四道题" tabindex="-1"><a class="header-anchor" href="#第四道题"><span>第四道题</span></a></h2><p>用时36分钟，在关键推论证明不出来的情况下AC</p>`,8),A={href:"https://leetcode.cn/problems/count-beautiful-substrings-ii/",target:"_blank",rel:"noopener noreferrer"},L=t(`<h3 id="题目-统计美丽子字符串-ii" tabindex="-1"><a class="header-anchor" href="#题目-统计美丽子字符串-ii"><span>题目：统计美丽子字符串 II</span></a></h3><p>给你一个字符串<code>s</code>和一个正整数<code>k</code>。</p><p>用<code>vowels</code>和<code>consonants</code>分别表示字符串中元音字母和辅音字母的数量。</p><p>如果某个字符串满足以下条件，则称其为<code>美丽字符串</code>：</p><p><code>vowels == consonants</code>，即元音字母和辅音字母的数量相等。 <code>(vowels * consonants) % k ==0</code>，即元音字母和辅音字母的数量的乘积能被<code>k</code>整除。 返回字符串<code>s</code>中<code>非空美丽子字符串</code>的数量。</p><p>子字符串是字符串中的一个连续字符序列。</p><p>英语中的<code>元音字母</code>为<code>&#39;a&#39;、&#39;e&#39;、&#39;i&#39;、&#39;o&#39;</code>和<code>&#39;u&#39;</code>。</p><p>英语中的<code>辅音字母</code>为除了元音字母之外的所有字母。</p><p>提示：</p><ul><li><code>1 &lt;= s.length &lt;= 5 * 10^4</code></li><li><code>1 &lt;= k &lt;= 1000</code></li><li><code>s</code>仅由小写英文字母组成。</li></ul><h3 id="题目分析-1" tabindex="-1"><a class="header-anchor" href="#题目分析-1"><span>题目分析</span></a></h3><p>  首先，这次周赛的第二题名为<code>统计美丽子字符串 I</code>，和<code>统计美丽子字符串 II</code>相比，除了数据范围都一模一样。而<code>统计美丽子字符串 I</code>我是用两个前缀和+枚举所有范围的方式做的，但显然当数据扩大到<code>5 * 10^4</code>时，就不能再用时间复杂度<code>O(n^2)</code>的枚举了。</p><p>  这时考虑面对<strong>子序列</strong>（子串、子数组）问题的一般思路：顺序遍历数组，当遍历到某个下标<code>i</code>时，在<code>O(1)</code>的时间复杂度下统计以当前下标<code>i</code>为结尾的所有满足情况的子序列个数。</p><blockquote><p>如示例<code>&quot;abba&quot;</code>，当我们遍历到<code>i=3</code>，即最后一个<code>a</code>时，在<code>O(1)</code>的时间复杂度下统计<code>&quot;abba&quot;</code>、<code>&quot;bba&quot;</code>、<code>&quot;ba&quot;</code>、<code>&quot;a&quot;</code>满足情况的个数。</p></blockquote><p>  显然，在忽略第二个条件<code>(vowels * consonants) % k == 0</code>时，利用<strong>前缀状态和+map</strong>就可以在<code>O(1)</code>的时间复杂度下统计下标<code>i</code>为结尾的所有满足情况的子序列个数。</p><blockquote><p>前缀状态和: 遇到元音<code>+1</code>，遇到辅音<code>-1</code>，当遍历到下标<code>i</code>的前缀状态和为<code>q</code>，去找前面前缀状态和<strong>同为</strong><code>q</code>的下标<code>pre_i</code>，组成的<code>[pre_i, i]</code>子串，一定满足<code>vowels == consonants</code>。</p></blockquote><p>  需要在满足第二个条件的同时，保持<code>O(n)</code>的算法复杂度，考虑分组遍历。是否可以根据k的大小，按照某一固定<code>步长</code>遍历，再改变开始点遍历<code>步长</code>次（共计遍历整个数组一次），得到同时满足两个条件的子序列数呢？   当<code>k=1</code>时，可以取<code>步长</code>为1；当<code>k=2</code>时，可以取<code>步长</code>为2；当<code>k=3</code>时，可以取<code>步长</code>为3；当<code>k=4</code>时，可以取<code>步长</code>为？... 可以取<code>步长</code>为2。可以看出步长不能简单的根据<code>k</code>来取，可能需要考虑<code>vowels * consonants</code>是k的最小倍数？那么先定义<code>(interval * interval) % k == 0</code>，<code>步长 = interval * 2</code>，求<code>步长</code>改为求<code>interval</code>。   如何保证所求<code>interval</code>正确呢，例如<code>interval=4</code>和<code>interval=6</code>都在<code>k=4</code>时必要（不充分）满足题意，如何保证不会求到错误的<code>interval</code>？但因为时间不够，直接找最先满足条件的<code>interval</code>试试，最后通过，下方是求最先满足条件的<code>interval</code>的代码。</p><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">long</span> <span class="token keyword">long</span> interval <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
<span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>interval <span class="token operator">*</span> interval<span class="token punctuation">)</span> <span class="token operator">%</span> k <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> interval <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="没能证明的推论" tabindex="-1"><a class="header-anchor" href="#没能证明的推论"><span>没能证明的推论</span></a></h3><p>根据程序通过这一结论，可以判断出从小到大遍历，最先满足的步长，一定是解，但为什么呢？</p><blockquote><p>如果这里判断的不是<code>interval * interval % k == 0</code> 而是<code>interval % k == 0</code>，那我一定能得出后面再满足情况的<code>interval&#39;</code>一定是第一个满足条件的<code>interval</code>的数倍，此时<code>interval</code>就包括了<code>interval&#39;</code>的结果。</p></blockquote>`,21),N={href:"https://leetcode.cn/problems/count-beautiful-substrings-ii/solutions/2542274/fen-jie-zhi-yin-zi-qian-zhui-he-ha-xi-bi-ceil/",target:"_blank",rel:"noopener noreferrer"},O=t(`<blockquote><p>使<code>interval * interval % k == 0</code>，他把k分成了三种情况讨论：</p><ol><li><code>k</code>为质数：interval的分解必须包含<code>k</code></li><li><code>k</code>不为质数，分解后存在偶次幂，如 k = 3^4：interval的分解必须包含<code>3^2</code></li><li><code>k</code>不为质数，分解后存在奇次幂，如 k = 2*3^5：interval的分解必须包含<code>2*3^3</code></li></ol></blockquote><p>通过对分解质因子求步长方式的研究，就不难理解为什么<code>从小到大遍历，最先满足的步长，一定是解</code>了。因为下一个满足条件的<code>interval&#39;</code>也需要包含指定因子，那就一定是第一个满足条件的<code>interval</code>的数倍。</p><p>结合上文我对<code>k=4</code>时，遍历取<code>interval</code>，&quot;可能&quot;首先取4、6的疑问。<code>k=4</code>，interval的分解必须包含<code>2</code>，取2就可以了，不存在首先取到<code>4=2^2</code>、<code>6=2*3</code>的可能。</p><h3 id="代码展示-1" tabindex="-1"><a class="header-anchor" href="#代码展示-1"><span>代码展示</span></a></h3><div class="language-cpp line-numbers-mode" data-ext="cpp" data-title="cpp"><pre class="language-cpp"><code><span class="token keyword">long</span> <span class="token keyword">long</span> <span class="token function">beautifulSubstrings</span><span class="token punctuation">(</span>string s<span class="token punctuation">,</span> <span class="token keyword">int</span> k<span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token keyword">long</span> <span class="token keyword">long</span> interval <span class="token operator">=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token keyword">while</span><span class="token punctuation">(</span><span class="token punctuation">(</span>interval <span class="token operator">*</span> interval<span class="token punctuation">)</span> <span class="token operator">%</span> k <span class="token operator">!=</span> <span class="token number">0</span><span class="token punctuation">)</span> interval <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
    interval <span class="token operator">*=</span> <span class="token number">2</span><span class="token punctuation">;</span>

    <span class="token keyword">auto</span> set <span class="token operator">=</span> unordered_set<span class="token operator">&lt;</span><span class="token keyword">char</span><span class="token operator">&gt;</span><span class="token punctuation">{</span> <span class="token char">&#39;a&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;e&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;i&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;o&#39;</span><span class="token punctuation">,</span><span class="token char">&#39;u&#39;</span> <span class="token punctuation">}</span><span class="token punctuation">;</span>
    <span class="token keyword">auto</span> balance <span class="token operator">=</span> <span class="token generic-function"><span class="token function">vector</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span>s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">,</span> <span class="token number">0</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> i <span class="token operator">&lt;</span> s<span class="token punctuation">.</span><span class="token function">length</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">if</span><span class="token punctuation">(</span>set<span class="token punctuation">.</span><span class="token function">count</span><span class="token punctuation">(</span>s<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">)</span> <span class="token operator">==</span> <span class="token number">1</span><span class="token punctuation">)</span> balance<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> balance<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">+</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token keyword">else</span> balance<span class="token punctuation">[</span>i<span class="token operator">+</span><span class="token number">1</span><span class="token punctuation">]</span> <span class="token operator">=</span> balance<span class="token punctuation">[</span>i<span class="token punctuation">]</span> <span class="token operator">-</span> <span class="token number">1</span><span class="token punctuation">;</span>
    <span class="token punctuation">}</span>

    <span class="token keyword">long</span> <span class="token keyword">long</span> res <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
    <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> b <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span> b <span class="token operator">&lt;</span> interval<span class="token punctuation">;</span> b<span class="token operator">++</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
        <span class="token keyword">auto</span> pre_cnt <span class="token operator">=</span> <span class="token generic-function"><span class="token function">unordered_map</span><span class="token generic class-name"><span class="token operator">&lt;</span><span class="token keyword">int</span><span class="token punctuation">,</span> <span class="token keyword">int</span><span class="token operator">&gt;</span></span></span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token keyword">auto</span> pre <span class="token operator">=</span> <span class="token number">0</span><span class="token punctuation">;</span>
        <span class="token keyword">for</span><span class="token punctuation">(</span><span class="token keyword">int</span> i <span class="token operator">=</span> b<span class="token punctuation">;</span> i <span class="token operator">&lt;</span> balance<span class="token punctuation">.</span><span class="token function">size</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> i<span class="token operator">+=</span><span class="token punctuation">(</span><span class="token keyword">int</span><span class="token punctuation">)</span>interval<span class="token punctuation">)</span><span class="token punctuation">{</span>
            pre <span class="token operator">=</span> balance<span class="token punctuation">[</span>i<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token keyword">if</span><span class="token punctuation">(</span>pre_cnt<span class="token punctuation">.</span><span class="token function">find</span><span class="token punctuation">(</span>pre<span class="token punctuation">)</span> <span class="token operator">!=</span> pre_cnt<span class="token punctuation">.</span><span class="token function">end</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">{</span>
                res <span class="token operator">+=</span> pre_cnt<span class="token punctuation">[</span>pre<span class="token punctuation">]</span><span class="token punctuation">;</span>
            <span class="token punctuation">}</span>
            pre_cnt<span class="token punctuation">[</span>pre<span class="token punctuation">]</span> <span class="token operator">+=</span> <span class="token number">1</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
    <span class="token punctuation">}</span>
    <span class="token keyword">return</span> res<span class="token punctuation">;</span>
<span class="token punctuation">}</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div>`,5);function S(B,E){const o=c("ExternalLinkIcon"),p=c("center");return i(),u("div",null,[m,b,h,g,f,n("p",null,[s("竞赛链接："),n("a",_,[s("Leetcode第373次周赛链接"),a(o)])]),w,y,n("p",null,[s("原站链接："),n("a",q,[s("100139. 循环移位后的矩阵相似检查"),a(o)])]),x,a(p,null,{default:e(()=>[z]),_:1}),a(p,null,{default:e(()=>[s("示例图")]),_:1}),j,a(p,null,{default:e(()=>[C]),_:1}),a(p,null,{default:e(()=>[s('大聪明结论示意图，橙框（"奇"数列）右移，绿框（"偶"数列）左移')]),_:1}),I,n("p",null,[s("原站链接："),n("a",A,[s("100132. 统计美丽子字符串 II"),a(o)])]),L,n("p",null,[s("查看对题解的讨论，有通过分解质因子的方式求出了步长："),n("a",N,[s("分解质因子+前缀和+哈希表 - 灵茶山艾府 leetcode"),a(o)])]),O])}const V=l(v,[["render",S],["__file","LeetcodeWeekContest373.html.vue"]]),W=JSON.parse('{"path":"/CodingRamble/LeetcodeWeekContest373.html","title":"记Leetcode第373次周赛","lang":"en-US","frontmatter":{},"headers":[{"level":2,"title":"第一道题","slug":"第一道题","link":"#第一道题","children":[{"level":3,"title":"题目：循环移位后的矩阵相似检查","slug":"题目-循环移位后的矩阵相似检查","link":"#题目-循环移位后的矩阵相似检查","children":[]},{"level":3,"title":"题目分析","slug":"题目分析","link":"#题目分析","children":[]},{"level":3,"title":"我的错误理解","slug":"我的错误理解","link":"#我的错误理解","children":[]},{"level":3,"title":"代码展示","slug":"代码展示","link":"#代码展示","children":[]}]},{"level":2,"title":"第四道题","slug":"第四道题","link":"#第四道题","children":[{"level":3,"title":"题目：统计美丽子字符串 II","slug":"题目-统计美丽子字符串-ii","link":"#题目-统计美丽子字符串-ii","children":[]},{"level":3,"title":"题目分析","slug":"题目分析-1","link":"#题目分析-1","children":[]},{"level":3,"title":"没能证明的推论","slug":"没能证明的推论","link":"#没能证明的推论","children":[]},{"level":3,"title":"代码展示","slug":"代码展示-1","link":"#代码展示-1","children":[]}]}],"git":{"createdTime":1707819000000,"updatedTime":1708011239000,"contributors":[{"name":"Unarimit","email":"1798907875@qq.com","commits":2}]},"readingTime":{"minutes":7.66,"words":2297},"filePathRelative":"CodingRamble/LeetcodeWeekContest373.md","localizedDate":"February 13, 2024"}');export{V as comp,W as data};