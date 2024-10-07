# 随笔-反人类Web前端

> 注：标题“反人类”仅代表我码代码遇到bug时无能狂怒的心情。

因为在搭一个简单数据汇总工具，打算用vue3写了个简单的前端。不得不说在想要快速做个自用的工具的时候，ugui薄纱css布局太多了。


## CORS

> 背景：因为想在js里请求一个其他部门维护的项目的REST API，遇到了CORS问题，又不太好去改项目的配置。（之前遇到过都是直接改后端配置的）

网上搜到的方案一个比一个抽象：什么只能Get的JsonP，node.js搭个服务器过一下，还有nginx公用反向代理等方案。就没看到能装个插件写几行代码能解决的方案，我都怀疑CORS是故意搞出来恶心人的了，明明命令行打个curl这么方便（意思是模拟个http请求还是不难的），unity迁移到web上也不需要做CORS适配。

最后整了个.net的后端，反正我也要存一些配置文件。

顺便记录一下.net 8的开启全局CORS的配置

```cs
// ============ 其他代码 ============
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(
        policy =>
        {
            policy.WithAnyOrigin();
        });
});
// ============ 其他代码 ============
app.UseCors();
```

## 布局

web前端常用的flex布局和ugui基于anchor的布局相差很大，感觉前者自底向上，后者自顶向下。给父层级设置width的时候，一些ui控件的表现就会很奇怪。

## 各种规范的叠加

1. vue3中，一些功能既可以通过`<scrip setup>`实现，也可以通过`export default`实现，很恶心。

2. 不知道是不是因为js是脚本语言的原因，IDE WebStorm的提示怪怪的。例如，因为import一个帕斯卡命名法的函数，他就认为这是一个class。

## 参考
- [CORS with default policy and middleware - learn.microsoft](https://learn.microsoft.com/en-us/aspnet/core/security/cors?view=aspnetcore-8.0#dp)