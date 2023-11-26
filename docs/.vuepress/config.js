module.exports = {
    title: '我要成为U3D高手',
    description: '个人网站',
    themeConfig: {
        nav: [
            { text: '首页', link: '/' },
            { text: 'Github', link: 'https://github.com/unarimit' }
        ],
        sidebar: [
            {
                title: '作品',
                path: '/Projects/Index',
                collapsable: false, 
                children: [
                    { title: "[W]上帝视角射击游戏", path: "/Projects/TopShooting" },
                ]
            },
            {
                title: 'Gameplay',
                path: '/Gameplay/Index',
                collapsable: true, 
                children: [
                    { title: "[x]占位符", path: "/WIP" }, // 不加过不了build
                ]
            },
            {
                title: 'Unity组件',
                path: '/UnityComponent/Index',
                collapsable: true,
                children: [
                    { title: "摄像机", path: "/UnityComponent/Camera" },
                    { title: "生命周期", path: "/UnityComponent/Lifetime" },
                    { title: "InputSystem", path: "/UnityComponent/Inputsystem" },
                    { title: "[W]角色控制", path: "/UnityComponent/CharacterController" },
                    { title: "[W]Animator", path: "/UnityComponent/Animator" },
                    { title: "[W]碰撞箱", path: "/UnityComponent/BoxCollider" },
                    { title: "[W]资源管理", path: "/UnityComponent/Resource" },
                    { title: "UGUI", path: "/UnityComponent/UGUI" },
                    { title: "TextMeshPro", path: "/UnityComponent/TextMeshPro" },
                    { title: "[W]常用Transform", path: "/UnityComponent/Transform" },
                    { title: "音频系统", path: "/UnityComponent/AudioSystem" },
                    { title: "[W]数据持久化", path: "/UnityComponent/DataPersistence" },
                    { title: "[x]环境交互", path: "/WIP" },
                    { title: "[x]TimeLine", path: "/UnityComponent/TimeLine" },
                ]
            },
            {
                title: '代码设计',
                path: '/GameCodeDesign/Index',
                collapsable: true,
                children: [
                    { title: "[W]常用规范", path: "/GameCodeDesign/CommonlySpec" },
                    { title: "[W]设计模式", path: "/GameCodeDesign/DesignPattern" },
                    { title: "[W]游戏系统设计", path: "/GameCodeDesign/GameSystem" },
                    { title: "技能系统设计", path: "/GameCodeDesign/AbilitySystem" },
                    { title: "[W]UI系统设计", path: "/GameCodeDesign/UISystem" },
                    { title: "[W]存储和事件系统", path: "/GameCodeDesign/EventSystem" },
                    { title: "[W]资源系统", path: "/GameCodeDesign/ResourceSystem" },
                    { title: "[W]多线程", path: "/GameCodeDesign/MultiThread" },
                    { title: "[W]协同开发", path: "/GameCodeDesign/Coop" }
                ]
            },
            {
                title: '编译&运维相关',
                path: '/GameBuild/Index',
                collapsable: true,
                children: [
                    { title: "[W]编译", path: "/GameBuild/Compile" },
                    { title: "[W]热更新", path: "/GameBuild/Mod&Hotfix" },
                    { title: "[W]GC机制", path: "/GameBuild/GC" },
                ]
            },
            {
                title: 'AI (NPC&人机&Boot)',
                path: '/AI/index',
                collapsable: true,
                children: [
                    { title: "寻路", path: "/AI/Navigation" },
                    { title: "[W]状态机", path: "/AI/StateMachine" },
                    { title: "[W]常见AI设计", path: "/AI/AIDesign" }
                ]
            },
            {
                title: '画面表示',
                path: '/Shading/index',
                collapsable: true,
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
                title: '计算机图形学',
                path: '/ComputerGraphics/Index',
                collapsable: true, 
                children: [
                    { title: "[x]四元数", path: "/WIP" },
                ]
            },
            {
                title: '代码杂谈',
                path: '/Coding/Index',
                collapsable: true, 
                children: [
                    { title: "记Leetcode第373次周赛", path: "/Coding/LeetcodeWeekContest373" },
                ]
            }
        ]
    },
}