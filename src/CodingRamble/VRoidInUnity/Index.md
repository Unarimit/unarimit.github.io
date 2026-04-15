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
1. 素体导入
    - 使用`UniVRM-for-Unity`，安装后直接拖入vrm素体，好处是可以直接用自带的面部表情
2. 衣服编辑和导入
    - 衣服、头发
    - 袜子，由于长筒袜`VRoid`是把贴图绘制在体模上的，所以需要拆分开来
    - 相比[记一次人物模型的运行时配置](../HumanModelRuntimeConfig.md)中记载的情况更加复杂，要编辑+转换两个不同的humanoid配置
3. 衣服如何套上去
    - 参考[换装系统](../../CodeImplement/ClothChangeSys/ClothChangeSys)，使用共享骨骼
4. 预计使用`VRoid`生成小中大三种素体，捏人系统中的细节调整如何实现
5. 脸型使用预设，需要拆分脸部，看在`UniVRM`插件体系下好不好做

### 衣服的编辑和导入

工具链：vrm模型 -> blender -> fbx -> unity
- vrm模型导入blender使用`UniVRM-Blender`插件
- 在blender中修改，保留衣服和骨骼
    - 长筒袜的特殊处理
        - `VRoid`穿袜子的时候会调整腿部、脚部Mesh，尤其是脚趾会变成穿袜子的表现
    - 头发直接挂上去
    - 衣服的额外骨骼？根节点转化时需要对子节点也应用变化
- blender导出fbx使用`blender-to-unity-fbx-exporter`插件
    - 这里规避左右手坐标系的转换造成的奇怪旋转
- fbx导入unity
    - 会出现骨骼格式不对的问题，无法匹配vrm导入产生的humanoid，这里写一个[脚本](./SkeletonBindingFixer.cs)矫正


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