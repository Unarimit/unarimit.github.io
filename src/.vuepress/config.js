import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from "vuepress-theme-hope"
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    title: '我要成为U3D高手',
    description: '个人网站',
    theme: hopeTheme({
        nav: [
            { text: 'Github', link: 'https://github.com/unarimit' },
            { text: 'Bilibili', link: 'https://space.bilibili.com/1935339' },
        ],
        sidebar: [
            {
                text: '作品',
                link: '/Projects/index.html',
                collapsible: false,
                children: [
                    { text: "[W]上帝视角射击游戏", link: "/Projects/TopShooting" },
                    { text: "[W]个人主页-我要成为U3D高手", link: "/Projects/ToBecomeU3dMaster" },
                ]
            },
            {
                text: 'Unity组件',
                link: '/UnityComponent/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/UnityComponent/index.html" },
                    { text: "摄像机", link: "/UnityComponent/Camera" },
                    { text: "生命周期", link: "/UnityComponent/Lifetime" },
                    { text: "InputSystem", link: "/UnityComponent/Inputsystem" },
                    { text: "[W]角色控制", link: "/UnityComponent/CharacterController" },
                    { text: "[W]动画机", link: "/UnityComponent/Animator" },
                    { text: "碰撞箱", link: "/UnityComponent/BoxCollider" },
                    { text: "资源管理", link: "/UnityComponent/Resource" },
                    { text: "UGUI", link: "/UnityComponent/UGUI" },
                    { text: "TextMeshPro", link: "/UnityComponent/TextMeshPro" },
                    { text: "[W]常用Transform操作", link: "/UnityComponent/Transform" },
                    { text: "[W]音频系统", link: "/UnityComponent/AudioSystem" },
                    { text: "[W]UnityObject", link: "/UnityComponent/UnityObject" },
                    { text: "自定义Editor", link: "/UnityComponent/CustomEditor" },
                    { text: "数据持久化", link: "/UnityComponent/DataPersistence" },
                    { text: "TimeLine", link: "/UnityComponent/TimeLine" },
                ]
            },
            {
                text: '代码设计',
                link: '/GameCodeDesign/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/GameCodeDesign/index.html" },
                    { text: "[W]常用规范", link: "/GameCodeDesign/CommonlySpec" },
                    { text: "(游戏中的)设计模式", link: "/GameCodeDesign/DesignPattern" },
                    { text: "多线程", link: "/GameCodeDesign/MultiThread" },
                    { text: "异步编程", link: "/GameCodeDesign/Asynchronous" },
                    { text: "[W]响应式编程", link: "/GameCodeDesign/ReactiveProgramming/index.html" },
                    { text: "启动流程设计", link: "/GameCodeDesign/StartupProcedure" },
                    { text: "游戏上下文设计", link: "/GameCodeDesign/GameContextSystem" },
                    { text: "资源系统和服务", link: "/GameCodeDesign/ResourceSystem" },
                    { text: "[W]UI系统设计", link: "/GameCodeDesign/UISystem" },
                    { text: "技能系统设计", link: "/GameCodeDesign/AbilitySystem" },
                    { text: "[W]环境交互", link: "/GameCodeDesign/Interaction" },
                    { text: "人机切换", link: "/GameCodeDesign/HumanAgentSwitch" },
                    { text: "RTS相机", link: "/GameCodeDesign/RTSCamera" },
                    { text: "事件系统", link: "/GameCodeDesign/EventSystem" },
                    { text: "[W]协同开发", link: "/GameCodeDesign/Coop" },
                    { text: "[W]Tag和Layer", link: "/GameCodeDesign/TagAndLayer" },
                ]
            },
            {
                text: '计算机图形学',
                link: '/ComputerGraphics/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/ComputerGraphics/index.html" },
                    { text: "坐标变换", link: "/ComputerGraphics/Transformation" },
                    { text: "光栅化", link: "/ComputerGraphics/Rasterization" },
                    { text: "着色", link: "/ComputerGraphics/Shading" },
                    { text: "阴影", link: "/ComputerGraphics/Shadow" },
                ]
            },
            {
                text: 'AI (NPC&人机&Boot)',
                link: '/AI/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/AI/index.html" },
                    { text: "寻路", link: "/AI/Navigation" },
                    { text: "[W]状态机", link: "/AI/StateMachine" },
                    { text: "GOAP", link: "/AI/GOAP" },
                    { text: "[W]行为树", link: "/AI/BehaviorTree" },
                    { text: "[W]常见AI设计", link: "/AI/AIDesign" },
                ]
            },
            {
                text: '编程语言的学习方法[WIP]',
                link: '/Language/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Language/index.html" },
                    { text: "内存管理", link: "/Language/MemoryManage" },
                    { text: "编译（C++）", link: "/Language/CompileCpp" },
                    { text: "编译（C#）", link: "/Language/CompileCsharp" },
                    { text: "函数", link: "/Language/Function" },
                    { text: "数值", link: "/Language/Number" },
                    { text: "类型", link: "/Language/Class" },
                    { text: "模板（C++）", link: "/Language/Template" },
                    { text: "泛型（C#）", link: "/Language/Generic" },
                    { text: "垃圾回收", link: "/Language/GC" },
                    { text: "其他特性", link: "/Language/OtherFeatures" },
                    { text: "一些“有趣”的问题", link: "/Language/Questions" },
                    { text: "*Unity的编译", link: "/Language/UnityCompile" },
                    { text: "*热更新方案", link: "/Language/HotfixSchema" },
                    
                ]
            },
            {
                text: 'Lua学习笔记',
                link: '/Lua/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Lua/index.html" },
                    { text: "[w]常用语法", link: "/Lua/Grammar" },
                    { text: "表-关键数据结构", link: "/Lua/Table" },
                    { text: "动态性", link: "/Lua/Dynamic" },
                    { text: "lua中的面向对象", link: "/Lua/OOPInLua" },
                    { text: "使用XLua", link: "/Lua/UseXLua" },
                    { text: "Lua中的GC", link: "/Lua/GCInLua" },
                    { text: "[w]Lua常用功能", link: "/Lua/CommonLuaFunction" },
                ]
            },
            {
                text: '代码杂谈',
                link: '/CodingRamble/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/CodingRamble/index.html" },
                    { text: "问题清单", link: "/CodingRamble/QuestionList.md" },
                    { text: "记Leetcode第373次周赛", link: "/CodingRamble/LeetcodeWeekContest373" },
                    { text: "小地图组件使用感想", link: "/CodingRamble/MinimapRamble" },
                    { text: "记一次场景搭建", link: "/CodingRamble/ASceneStructure" },
                    { text: "记一次人物模型的运行时配置", link: "/CodingRamble/HumanModelRuntimeConfig" },
                    { text: "记初次使用行为树插件", link: "/CodingRamble/UseBehaviorDesigner" },
                    { text: "初探碰撞系统", link: "/CodingRamble/CollisionSystem" },
                    { text: "第一个月工作有感", link:"/CodingRamble/FirstMonthWorkLog"},
                    { text: "性能优化-UI篇", link:"/CodingRamble/PerformanceOptimizeInUI"},
                    { text: "随笔-反人类Web前端", link:"/CodingRamble/FuckWebChapter1"},
                    { text: "Untiy内存问题两则", link:"/CodingRamble/UnityMemoryQuestion"},
                    { text: "[w]游戏常用的几何算法", link: "/CodingRamble/GameGeometry" },
                    { text: "[x]学习一下Unity的TD模板", link: "/CodingRamble/TowerDefenceTemplate" },
                ]
            },
            {
                text: '模型和渲染 [低完成度]',
                link: '/Shading/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Shading/index.html" },
                    { text: "[x]Shader和渲染", link: "/WIP" },
                    { text: "URP渲染管线", link: "/Shading/URP_Pipeline" },
                    { text: "[W]Blender", link: "/Shading/Blender" },
                    { text: "[W]模型", link: "/Shading/Modeling" },
                    { text: "渲染风格和手段", link: "/Shading/StyleAndMethod" }, // text 需要修改
                    { text: "NPR", link: "/Shading/NPR" },
                    { text: "[x]特效和粒子系统", link: "/WIP" },
                    { text: "[x]优化策略", link: "/WIP" }
                ]
            },
            {
                text: 'Gameplay [低完成度]', // TODO：因为还不够完善，暂且先排在后面
                link: '/Gameplay/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Gameplay/index.html" },
                    { text: "[x]占位符", link: "/WIP" }, // 不加过不了build
                ]
            }
        ]
    },
    )
})