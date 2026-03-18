# AI使用心得-2026

2025到2026期间，AI声音很大，从Anthropic等AI巨头的抽象操作，再到人人都有小龙虾的“大折腾”时代，可谓热闹至极。我也不得不重视起AI编程的作用，写下这篇文章。

本文将从两个场景出发，意在说明如何在游戏开发中更好的使用AI以及AI的局限性。

## 情景1-自己做游戏补充行为树

在[行为树](../../AI/BehaviorTree/BehaviorTree.md)中，我尝试让Cline使用大语言模型帮我迭代10轮后，发现AI逻辑并没有明显变化。

参考了利用LLM做星际争霸AI的论文后，我决定用Claude Code CLI的Agent Team试一试

## 情景2-做公司业务

相比情景1时的重心在如何制定AI的工作流水线，公司业务则由于难以让AI理解策划写的图文不并茂策划案，往往需要自己完成情景1中planner的任务。

往往存在下列问题，导致最后用AI生成的代码速度不快，质量不高：

- 缺乏审核机制，会导致自己做planner写错的逻辑只能在人工测试中发现。
- 有些描述时间大于编码时间的内容也很难办。

## 软件使用

前端开发常常会用Cline、Claude Code或者别的什么LLM套壳IDE，甚至OpenClaw，他们之间的使用情景如下:

1. Cline，可以装在vscode或rider里，辅助开发用。例如：
    - 忘了unity api怎么用，或者比较随意的需求，可以让他先写个原型
    - 一个外部api需要接入，有详细的文档
    - 一个描述简单但写起来复杂的筛选需求
2. Claude Code CLI，相比Cline可以处理相对“重”的工作，但前期规划要做好。例如
    - 情景1中，使用Claude Code分多个agent完成游戏行为树
    - 将相对固定的流程Skill化，如资源替换
    - *国内可以用平替"Code Buddy"
3. OpenClaw，接OA后可以用于处理自动化事务，但不能参与敏感操作
4. Codex，自动化特化
5. Python控制流，具体任务特化。比起Claude Code CLI用一句话确定的工作流，这种方式开发的掌控性更强，且能一定程度减少ai幻觉的影响，但实现起来相对复杂。
    - 如情景1中提到的[做法](https://zhuanlan.zhihu.com/p/2355110476)

## 衍生技术、术语
1. 为项目建立给LLM看的文档
    - 检索增强生成（Retrieval-augmented Generation，简称RAG）和embedding模型，这个部署比较麻烦，一般用于开放文档的知识库ai
    - 分层文本文档，可用于本地开发
2. 获取网络知识：Web Search
3. 检索本地代码：Grep or Lsp

## 问题和改进思路
1. 如果让AI来写工作上下文相关的文档，会写很多多余的部分
- 如何限制AI的输入和输出

## 参考
1. [AI到底是如何进行编程的？抓包拆解Claude Code](https://www.bilibili.com/video/BV1AuzkBREhx)
2. [Cline](https://cline.bot/)
3. [Nexus - github](https://github.com/abhigyanpatwari/GitNexus) 
4. [Unity MCP](https://github.com/CoplayDev/unity-mcp)