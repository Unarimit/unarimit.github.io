import { viteBundler } from '@vuepress/bundler-vite'
import { hopeTheme } from "vuepress-theme-hope"
import { defineUserConfig } from 'vuepress'

export default defineUserConfig({
    bundler: viteBundler(),
    title: '我要成为U3D高手',
    description: '个人网站',
    theme: hopeTheme({
        navbar: [
            { text: 'Github', link: 'https://github.com/unarimit' },
            { text: 'Bilibili', link: 'https://space.bilibili.com/1935339' },
        ],
        sidebar: [
            {
                text: '引言',
                link: '/index.html',
            },
            {
                text: '作品',
                link: '/Projects/index.html',
                collapsible: false,
                children: [
                    { text: "[W]上帝视角射击游戏", link: "/Projects/TopShooting" },
                    { text: "[W]个人主页-我要成为U3D高手", link: "/Projects/ToBecomeU3dMaster" },
                    { text: "*参考清单", link: "/Projects/StudyAssetList/StudyAssetList" },
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
                    { text: "寻路模块", link: "/UnityComponent/AINavigation" },
                    { text: "[W]Tag和Layer", link: "/UnityComponent/TagAndLayer" },
                ]
            },
            {
                text: '代码设计-基础',
                link: '/CodeBase/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/CodeBase/index.html" },
                    { text: "(游戏中的)设计模式", link: "/CodeBase/DesignPattern" },
                    { text: "[W]常用规范", link: "/CodeBase/CommonlySpec" },
                    { text: "多线程", link: "/CodeBase/MultiThread" },
                    { text: "[W]响应式编程", link: "/CodeBase/ReactiveProgramming/index.html" },
                    { text: "事件系统", link: "/CodeBase/EventSystem" },
                    { text: "[W]协同开发", link: "/CodeBase/Coop" },
                ]
            },
            {
                text: '代码设计-原型实现',
                link: '/CodeImplement/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/CodeImplement/index.html" },
                    { text: "技能系统设计", link: "/CodeImplement/AbilitySystem" },
                    { text: "人机切换", link: "/CodeImplement/HumanAgentSwitch" },
                    { text: "RTS相机", link: "/CodeImplement/RTSCamera" },
                    { text: "换装系统", link: "/CodeImplement/ClothChangeSys/ClothChangeSys" },
                    { text: "载具系统", link: "/CodeImplement/VehicleSystem" },
                    { text: "破坏系统", link: "/CodeImplement/DestructionSys" },
                    { text: "异步编程实践", link: "/CodeImplement/AsynchronousInPractice" },
                    { text: "[W]环境交互", link: "/CodeImplement/Interaction" },
                ]
            },
            {
                text: '代码设计-框架',
                link: '/CodeFramework/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/CodeFramework/index.html" },
                    { text: "网络", link: "/CodeFramework/Network/index.html" },
                    { text: "启动流程设计", link: "/CodeFramework/StartupProcedure" },
                    { text: "游戏上下文设计", link: "/CodeFramework/GameContextSystem" },
                    { text: "资源系统和服务", link: "/CodeFramework/ResourceSystem" },
                    { text: "JobSystem", link: "/CodeFramework/JobSystem/JobSystem" },
                    { text: "面向数据编程和ECS", link: "/CodeFramework/DOPAndECS/DOPAndECS" },
                    { text: "[W]UI系统设计", link: "/CodeFramework/UISystem" },
                ]
            },
            {
                text: '性能优化',
                link: '/Profiler/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Profiler/index.html" },
                    { text: "UGUI", link:"/Profiler/ProfilerUI/ProfilerUI"},
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
                    { text: "[W]阴影", link: "/ComputerGraphics/Shadow" },
                    { text: "环境光遮蔽", link: "/ComputerGraphics/AmbientOcclusion" },
                ]
            },
            {
                text: 'AI (NPC和人机)',
                link: '/AI/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/AI/index.html" },
                    { text: "寻路", link: "/AI/Navigation/Navigation" },
                    { text: "[W]状态机", link: "/AI/StateMachine" },
                    { text: "GOAP", link: "/AI/GOAP" },
                    { text: "行为树", link: "/AI/BehaviorTree/BehaviorTree" },
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
                    { text: "异步（C#）", link: "/Language/AsyncCSharp"},
                    { text: "其他特性", link: "/Language/OtherFeatures" },
                    { text: "一些“有趣”的问题", link: "/Language/Questions" },
                    { text: "*Unity的编译", link: "/Language/UnityCompile" },
                    { text: "*热更新方案", link: "/Language/HotfixSchema" },
                    { text: "*Effective C#读书笔记", link: "/Language/EffectiveCSharp"},
                    
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
                    { text: "随笔-反人类Web前端", link:"/CodingRamble/FuckWebChapter1"},
                    { text: "Untiy内存问题两则", link:"/CodingRamble/UnityMemoryQuestion"},
                    { text: "AI使用心得-2026", link:"/CodingRamble/AIUse2026/AIUse2026"},
                    { text: "[w]记录使用unity做MMD", link:"/CodingRamble/UnityMMD"},
                    { text: "[w]游戏常用的几何算法", link: "/CodingRamble/GameGeometry" },
                    { text: "[x]学习一下Unity的TD模板", link: "/CodingRamble/TowerDefenceTemplate" },
                    { text: "[W]记录VRoid导入Unity实现换装系统", link: "/CodingRamble/VRoidInUnity/index.html" },
                ]
            },
            {
                text: '渲染技术',
                link: '/Shading/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Shading/index.html" },
                    { text: "天空和云", link: "/Shading/SkyAndCloud"},
                    { text: "地形", link: "/Shading/Terrain"},
                    { text: "雾效", link: "/Shading/Fog"},
                    { text: "粒子系统", link: "/Shading/ParticalSystem"},
                    { text: "后处理", link: "/Shading/PostProcess"},
                    { text: "渲染风格和方法论", link: "/Shading/StyleAndMethod" },
                    { text: "NPR", link: "/Shading/NPR" },
                    { text: "URP渲染管线", link: "/Shading/URP_Pipeline" },
                    { text: "[x]Shader和渲染", link: "/WIP" },
                    { text: "[x]特效和粒子系统", link: "/WIP" },
                ]
            },
            {
                text: '动画 [低完成度]',
                link: '/Animation/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Animation/index.html" },
                    { text: "UI缓动动画", link: "/Animation/UITween" },
                    { text: "骨骼蒙皮动画", link: "/Animation/SkinnedAnimation" },
                    { text: "动画混合", link: "/Animation/Blending" },
                    { text: "IK", link: "/Animation/IK" },
                    { text: "面部动画", link: "/Animation/Facial" },
                    { text: "布娃娃效果", link: "/Animation/Ragdoll" },
                    { text: "衣料模拟", link: "/Animation/ClothSolver" },
                ]
            },
            {
                text: '未分类',
                ///link: '/NotClassify/index.html',
                collapsible: true,
                children: [
                    { text: "声音系统", link: "/NotClassify/VolumeSys/VolumeSys" },
                    { text: "游戏引擎工具链", link: "/NotClassify/ToolChains/ToolChains" },
                    { text: "CI/CD", link: "/NotClassify/CI_CD/index.html" },
                    { text: "[W]Blender", link: "/NotClassify/Blender" },
                    { text: "[W]模型", link: "/NotClassify/Modeling" },
                ]
            },
            {
                text: 'Gameplay [低完成度]', // TODO：因为还不够完善，暂且先排在后面
                link: '/Gameplay/index.html',
                collapsible: true,
                children: [
                    { text: "总览", link: "/Gameplay/index.html" },
                    { text: "3C", link: "/Gameplay/3C/3C" },
                    { text: "游戏引擎", link: "/Gameplay/GameEngine" },
                    { text: "MMORPG", link: "/Gameplay/MMORPG" },
                ]
            }
        ]
    },
    )
})