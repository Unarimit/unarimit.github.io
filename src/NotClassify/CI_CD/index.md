# CI/CD

CI/CD是指持续集成（英语：continuous integration）和持续交付（英语：continuous delivery）或持续部署（英语：continuous deployment）的组合实践。CI/CD通过在应用程序的构建、测试和部署中实施自动化，在开发和运营团队之间架起了桥梁。【1】

游戏开发中，CI/CD主要考虑如何保证数 GB 甚至上百 GB 的资源能稳定、高效地转化为最终玩家手中的安装包。常用来实现CI/CD的工具有Jenkins、TeamCity等。在实现CI/CD的过程中，要注重系统的**鲁棒性**。
> 例如unity在关闭bundle的 type tree 时，使用mono的hash校验保证资源不被错误加载，进一步引发难以预测的错误


![alt text](./image.png)

## 关键实现

自动构建：一般通过githook，但游戏客户端包体大、构建流程长，其自动构建触发频率不应过高，需要依赖一定的规则。

快速反馈：在代码提交触发githook时，可以跑一个简短的流程。找出严重影响的问题，如提交的代码不能通过编译等。

自动测试：WIP

自动部署：WIP


## 其他特性

打包报告：将打包状态、资源预警等通知发送到OA系统

自动修正：如unity平台漏提交meta文件、资源格式不正确，针对此增加自动修正机制
- 一部分也可以通过git hook做

策略组、交互优化：针对项目痛点，让打包流程功能更易用


## 难点

WIP

缓存管理：打包加速往往需要通过空间换时间，那缓存的版本管理也同样重要，依赖错误的缓存可能导致效率没有提升或其他超出预期的结果。

AssetBundle构建：资源依赖是否正确、新增变更是否合理等等

## 参考
1. [CI/CD wikipedia](https://zh.wikipedia.org/wiki/CI/CD)