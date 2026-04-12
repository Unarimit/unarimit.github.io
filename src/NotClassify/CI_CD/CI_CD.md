# CI/CD

CI/CD是指持续集成（英语：continuous integration）和持续交付（英语：continuous delivery）或持续部署（英语：continuous deployment）的组合实践。CI/CD通过在应用程序的构建、测试和部署中实施自动化，在开发和运营团队之间架起了桥梁。【1】

游戏开发中，常用来实现CI/CD的工具有Jenkins、TeamCity等

![alt text](image.png)

## 关键实现

自动构建：一般通过githook，但游戏客户端包体大、构建流程长，其自动构建触发频率不应过高，需要依赖一定的规则。

快速反馈：在代码提交触发githook时，可以跑一个简短的流程。找出严重影响的问题，如提交的代码不能通过编译等。

自动测试：

自动部署：


## 参考
1. [CI/CD wikipedia](https://zh.wikipedia.org/wiki/CI/CD)