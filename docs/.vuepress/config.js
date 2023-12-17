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
                    { title: "[W]UnityObject", path: "/UnityComponent/UnityObject" },
                    { title: "[W]数据持久化", path: "/UnityComponent/DataPersistence" },
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
                    { title: "[x]启动流程设计", path: "/GameCodeDesign/StartupProcedure"},
                    { title: "[W]游戏上下文系统设计", path: "/GameCodeDesign/GameContextSystem" },
                    { title: "资源系统和服务", path: "/GameCodeDesign/ResourceSystem" },
                    { title: "[W]UI系统设计", path: "/GameCodeDesign/UISystem" },
                    { title: "技能系统设计", path: "/GameCodeDesign/AbilitySystem" },
                    { title: "[W]环境交互", path: "/GameCodeDesign/Interaction" },
                    { title: "人机切换", path: "/GameCodeDesign/HumanAgentSwitch" },
                    { title: "[W]存储和事件系统", path: "/GameCodeDesign/EventSystem" },
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
                    { title: "[x]Shader和渲染", path: "/WIP" },
                    { title: "URP渲染管线", path: "/Shading/URP_Pipeline" },
                    { title: "[W]Blender", path: "/Shading/Blender" },
                    { title: "[W]模型", path: "/Shading/Modeling" },
                    { title: "渲染风格和手段", path: "/Shading/StyleAndMethod" }, // title 需要修改
                    { title: "NPR", path: "/Shading/NPR" },
                    { title: "[x]特效和粒子系统", path: "/WIP" },
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
                path: '/CodingRamble/Index',
                collapsable: true, 
                children: [
                    { title: "记Leetcode第373次周赛", path: "/CodingRamble/LeetcodeWeekContest373" },
                    { title: "小地图组件使用感想", path:"/CodingRamble/MinimapRamble"},
                    { title: "[w]记一次场景搭建", path:"/CodingRamble/ASceneStructure"},
                    { title: "[x]学习一下Unity的TD模板", path:"/CodingRamble/TowerDefenceTemplate"},
                ]
            }
        ]
    },
}