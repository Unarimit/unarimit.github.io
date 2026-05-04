# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## 项目概述

这是一个使用 `vuepress-theme-hope` 的 VuePress v2 静态站点。它是一个中文个人博客和学习笔记，专注于 Unity 3D 客户端开发。站点通过 GitHub Actions 部署到 GitHub Pages。

## 常用命令

所有命令均使用 `pnpm`。

- `pnpm docs:dev` — 启动开发服务器。
- `pnpm docs:build` — 构建静态站点。输出目录为 `src/.vuepress/dist`。
- `pnpm docs:clean-dev` — 清除缓存并启动开发服务器。
- `pnpm docs:update-package` — 更新 VuePress 主题及相关包。

## 架构
- **源码目录**：`src/`。所有 Markdown 内容均存放于此。
- **VuePress 配置**：`src/.vuepress/config.js`。这是站点结构的唯一事实来源。`sidebar` 数组定义了每个章节和页面；添加或移动内容时需要同步更新此文件。
- **打包工具**：Vite（`@vuepress/bundler-vite`）。
- **搜索**：Slimsearch（`@vuepress/plugin-slimsearch`），配置为 `indexContent: true`。
- **样式**：通过 `sass-embedded` 支持 Sass。

### 内容组织

站点按主题组织（例如 `UnityComponent`、`CodeBase`、`CodeImplement`、`ComputerGraphics`、`AI`、`Language`、`Lua`、`Shading`、`Animation`、`Gameplay`）。每个主题是 `src/` 下的一个目录，并包含一个 `index.md` 文件。页面是使用标准 VuePress frontmatter 的普通 Markdown 文件。

### 写作规范

内容风格参考 `src/WritingStyleGuide.md`。要点：
- 每篇文章以单个 `#` 标题开头。
- 使用 `##` 和 `###` 划分章节。
- 文章末尾必须有 `## 参考` 章节，用于列出外部链接。
- 提供带语言标签的代码示例（例如 `cs`、`cpp`、`json`）。
- 使用内部相对链接关联相关文章。
- 在页面标题中使用 `[W]` 标记进行中的页面，使用 `[x]` 标记尚未创建的页面。

## 部署

`.github/workflows/docs.yml` 工作流在每次推送到 `main` 分支时构建并部署站点。部署步骤 `crazy-max/ghaction-github-pages` 需要 `ACCESS_TOKEN` 密钥。
