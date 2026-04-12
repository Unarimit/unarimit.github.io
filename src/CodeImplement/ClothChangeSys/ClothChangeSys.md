# 换装系统

换装系统（Avatar/Equipment System）是游戏中让玩家自定义角色外观的核心系统。

在换装系统中，我们需要考虑的地方有：
- 身体部位：肤色、脸型、体型、眼睛
    - 还有眼妆、纹身、胡子等
- 时装类：发型、衣服
- 武器：剑、枪等
- *部位微调：改joint大小或标准位置

这些部件的实现方式，根据复杂度不同，实现方式也会不同。

但在实现之前，理解什么是蒙皮动画是很重要的，可以参考[骨骼蒙皮动画](../../Animation/SkinnedAnimation)。

## 实现方式

我们可以将一开始说的几个点，按照实现方式细分：
- 共享骨骼：衣服 （最常见的情况）
- 改材质颜色：皮肤贴图、衣服改色
- 纹理替换：换皮衣服、内衣（性能友好）、袜子（性能友好）
- 基于插槽挂载（Socket Attachment）：武器、简单的装饰物（如发卡）
- 贴花：纹身

其中其他技术相对共享骨骼是相对常见和简单的，这里只简单介绍下共享骨骼技术：

为了使衣服跟着角色一起动，在资源导入时，保证衣服骨骼和人物骨骼相同即可。然后使用引擎的共享骨骼渲染：
- 在unity中，把衣服的SkinnedMeshRenderer挂载到动画控制的角色骨骼上。进一步的，考虑性能优化，需要合并SkinnedMeshRenderer。

```cs
// Unity 示例：将装备绑定到角色骨骼
public class EquipmentSystem : MonoBehaviour
{
    public SkinnedMeshRenderer targetMesh;  // 角色基础模型

    public void EquipItem(GameObject itemPrefab, Transform boneParent)
    {
        var item = Instantiate(itemPrefab, boneParent);
        var skinnedMesh = item.GetComponent<SkinnedMeshRenderer>();

        // 重新绑定骨骼
        skinnedMesh.bones = targetMesh.bones;
        skinnedMesh.rootBone = targetMesh.rootBone;
    }
}
```

## 可能出现的问题和解决方案

- 穿模：按部位设置渲染层级，或设计时预留空间
- Draw Call过高：合并同材质部件，使用Texture Atlas（UV包含多个mesh，这些mesh用同一个shader，只不过参数不同）

## 例子-记录VRoid导入Unity实现换装系统

在[记录VRoid导入Unity实现换装系统](../../CodingRamble/VRoidInUnity)中，我尝试实现了换装系统部分的共享骨骼部分。

## 参考
1. LLM
2. 大佬笔记，因为是付费笔记不上链接了