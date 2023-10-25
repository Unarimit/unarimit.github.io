module.exports = {
    title: '作品展示',
    description: '个人网站',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: 'Github', link: 'https://github.com/unarimit' }
        ],
        sidebar: [
            {
                title: '上帝视角射击游戏',
                path: '/Page1',
                collapsable: false, // 不折叠
            },
            {
                title: 'Gameplay',
                path: '/Gameplay/index',
                collapsable: false, // 不折叠
                children: [
                    { title: "摄像机", path: "/Gameplay/Camera" },
                    { title: "[W]生命周期", path: "/Gameplay/Lifetime" },
                    { title: "[x]角色控制", path: "/WIP" },
                    { title: "[x]Animator", path: "/WIP" },
                    { title: "[x]环境交互", path: "/WIP" },
                    { title: "[x]存储系统", path: "/WIP" },
                    { title: "[x]事件系统", path: "/Gameplay/EventSystem" },
                    { title: "InputSystem", path: "/Gameplay/Inputsystem" },
                    { title: "[W]UGUI", path: "/Gameplay/UGUI" },
                    { title: "[x]音频系统", path: "/WIP" },
                ]
            },
            {
                title: 'AI (NPC&人机&Boot)',
                path: '/AI/index',
                collapsable: false, // 不折叠
                children: [
                    { title: "寻路", path: "/AI/Navigation" },
                    { title: "[x]自动机", path: "/WIP" },
                    { title: "[x]常见AI设计", path: "/WIP" }
                ]
            },
            {
                title: '画面表示',
                path: '/Shading/index',
                collapsable: false, // 不折叠
                children: [
                    { title: "[x]模型", path: "/WIP" },
                    { title: "[x]Shader和渲染", path: "/WIP" },
                    { title: "渲染风格和手段", path: "/Shading/StyleAndMethod" }, // title 需要修改
                    { title: "NPR", path: "/Shading/NPR" },
                    { title: "[x]粒子系统", path: "/WIP" },
                    { title: "[x]优化策略", path: "/WIP" }
                ]
            },
            {
                title: '代码设计',
                path: '/GameCodeDegin/Index',
                collapsable: false, // 不折叠
                children: [
                    { title: "游戏系统设计", path: "/GameCodeDegin/GameSystem" },
                    { title: "[W]技能系统设计", path: "/GameCodeDegin/AbilitySystem" },
                    { title: "[W]设计模式", path: "/GameCodeDegin/DesignPattern" },
                    { title: "[W]多线程", path: "/GameCodeDegin/MultiThread" },
                    { title: "[W]协同开发", path: "/GameCodeDegin/Coop" }
                ]
            },
            {
                title: '编译&运维相关',
                path: '/WIP',
                collapsable: false, // 不折叠
                children: [
                    { title: "[W]编译", path: "/GameBuild/Compile" },
                    { title: "[W]热更新", path: "/GameBuild/Mod&Hotfix" },
                    { title: "[W]GC机制", path: "/GameBuild/GC" },
                ]
            },
            {
                title: '计算机图形学',
                path: '/ComputerGraphics/Index',
                collapsable: false, // 不折叠
                children: [
                    { title: "[x]四元数", path: "/WIP" },
                ]
            }
            /*
            {
                title: '欢迎学习',
                path: '/',
                collapsable: false, // 不折叠
                children: [
                    { title: "学前必读", path: "/" }
                ]
            },
            {
                title: "基础学习",
                path: '/handbook/ConditionalTypes',
                collapsable: false, // 不折叠
                children: [
                    { title: "条件类型", path: "/handbook/ConditionalTypes" },
                    { title: "泛型", path: "/handbook/Generics" }
                ],
            }*/
        ]
    },
}