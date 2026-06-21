---
article: false
timeline: false
---

# 引擎架构和构建技术

TODO：从unity为什么使用c#作为脚本出发介绍吧 

TODO：引入引擎架构[^GAMES104]

TODO：迁移 UnityCompile 内容

后续将添加以下内容：
- 脚本层和由此带来的性能问题
    - 序列化
    - 对比ue、unity
- 热更（重启时补丁热更，运行时热更）
    - 迁移热更新相关过来
- 构建需要考虑什么（可能塞在其他小章节里面）

### 编译过滤

- 打包(build)时忽略的程序集: `Edtior`
- 编译过程中不编译不被引用的类

## 参考
- [Unity build error: The type or namespace name 'Editor' could not be found - Stackoverflow](https://stackoverflow.com/questions/73856452/unity-build-error-the-type-or-namespace-name-editor-could-not-be-found)
[^GAMES104]: [GAMES104-现代游戏引擎：从入门到实践，第2讲](https://www.bilibili.com/video/BV12Z4y1B7th)