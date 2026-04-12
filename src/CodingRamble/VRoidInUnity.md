# 记录VRoid导入Unity实现换装系统

VRoid生成的模型可以商用，但VRoid导出格式为VRM，一般情况下需要转化为unity可读的FBX，但出于方便也可以直接使用UniVRM插件，使unity可以识别VRM格式。

以下主要介绍使用UniVRM插件会遇到的问题。

## 模型导入

[UniVRM](https://github.com/vrm-c)

导入遇到以下问题：
1. 脸部贴图不好更换shader
    - 其alpha通道+cutout的设计比较抽象，看看能不能让ai拓展一下shader功能


## 基于VRoid的捏人系统

目的是基于VRoid生成的人物素体完成捏人系统的设计，目前遇到以下问题

1. 衣服如何套上去
2. 预计使用VRoid生成小中大三种素体，捏人系统中的细节调整如何实现
3. 脸型使用预设，需要拆分脸部，看在UniVRM插件体系下好不好做

### 细节调整

准备在Unity中动态调整

::: details 相关资料-AI

```
// 获取大腿骨骼并缩放
Transform thighBone = animator.GetBoneTransform(HumanBodyBones.LeftUpperLeg);
thighBone.localScale = new Vector3(1.2f, 1f, 1.2f); // 加粗大腿

Blend Shape法（如果Blender中已创建）：
SkinnedMeshRenderer skinnedMesh = GetComponent<SkinnedMeshRenderer>();
skinnedMesh.SetBlendShapeWeight(0, 50f); // 调整形态键权重
```
推荐插件：
- https://assetstore.unity.com/packages/tools/animation/magica-clothes-2-242307 - 包含身体变形功能
- https://vrm.dev/ - 官方SDK支持Blend Shape

:::

## 参考
1. [【UE5】捏脸+换装的角色方案！-bilibili](https://www.bilibili.com/video/BV1rZYvzKEXV)
2. [DanbaidongRP Documents](https://my.feishu.cn/docx/EXPtdrNmnox8hkx4mnCcy8QNn2b)
    - 目前主要用的渲染平台