---
article: false
timeline: false
---

Editor修复骨骼导入代码

Generate by Claude Opus 4.6
```cs
using UnityEngine;
using UnityEditor;
using System.Collections.Generic;

/// <summary>
/// 修复通过FBX导入的模型骨骼旋转与绑定关系，使其与VRM导入的参考模型一致。
/// 解决问题：UniVRM导入Unity和Blender导出FBX导入Unity，两种路径下T-Pose骨骼旋转不一致，
/// 导致FBX模型无法使用Humanoid Avatar。
/// </summary>
public class SkeletonBindingFixer : EditorWindow
{
    private GameObject referenceRoot;  // 参考模型（VRM导入的，绑定正确）
    private GameObject targetRoot;     // 目标模型（FBX导入的，需要修复）
    private bool copyPosition = false; // 是否同时复制骨骼位置
    private bool autoRecalcBindpose = true; // 自动重算bindpose
    private Vector2 scrollPos;
    private string logMessage = "";

    [MenuItem("Tools/Skeleton Binding Fixer")]
    public static void ShowWindow()
    {
        GetWindow<SkeletonBindingFixer>("骨骼绑定修复");
    }

    private void OnGUI()
    {
        scrollPos = EditorGUILayout.BeginScrollView(scrollPos);

        EditorGUILayout.LabelField("骨骼绑定修复工具", EditorStyles.boldLabel);
        EditorGUILayout.HelpBox(
            "将FBX导入模型的骨骼旋转修正为与VRM参考模型一致，并重新计算BindPose，使其兼容Humanoid Avatar。",
            MessageType.Info);

        EditorGUILayout.Space(10);

        referenceRoot = (GameObject)EditorGUILayout.ObjectField(
            "参考模型 (VRM，正确的)", referenceRoot, typeof(GameObject), true);

        targetRoot = (GameObject)EditorGUILayout.ObjectField(
            "目标模型 (FBX，待修复)", targetRoot, typeof(GameObject), true);

        EditorGUILayout.Space(5);

        copyPosition = EditorGUILayout.Toggle("同时复制骨骼位置", copyPosition);
        autoRecalcBindpose = EditorGUILayout.Toggle("自动重算 BindPose", autoRecalcBindpose);

        EditorGUILayout.Space(10);

        EditorGUI.BeginDisabledGroup(referenceRoot == null || targetRoot == null);

        if (GUILayout.Button("预览骨骼差异", GUILayout.Height(30)))
        {
            PreviewDifferences();
        }

        EditorGUILayout.Space(5);

        GUI.backgroundColor = new Color(0.4f, 0.8f, 0.4f);
        if (GUILayout.Button("执行修复", GUILayout.Height(40)))
        {
            if (EditorUtility.DisplayDialog("确认修复",
                "将修改目标模型的骨骼旋转和BindPose，此操作可通过Ctrl+Z撤销。\n确定执行？",
                "执行", "取消"))
            {
                FixBinding();
            }
        }
        GUI.backgroundColor = Color.white;

        EditorGUI.EndDisabledGroup();

        EditorGUILayout.Space(10);

        if (!string.IsNullOrEmpty(logMessage))
        {
            EditorGUILayout.LabelField("日志", EditorStyles.boldLabel);
            EditorGUILayout.TextArea(logMessage, GUILayout.MinHeight(100));
        }

        EditorGUILayout.EndScrollView();
    }

    /// <summary>
    /// 构建骨骼名到Transform的映射表
    /// </summary>
    private Dictionary<string, Transform> BuildBoneMap(Transform root)
    {
        var map = new Dictionary<string, Transform>();
        var stack = new Stack<Transform>();
        stack.Push(root);

        while (stack.Count > 0)
        {
            var current = stack.Pop();
            // 如果存在同名骨骼，保留层级更浅的
            if (!map.ContainsKey(current.name))
            {
                map[current.name] = current;
            }
            foreach (Transform child in current)
            {
                stack.Push(child);
            }
        }

        return map;
    }

    /// <summary>
    /// 预览两个模型之间的骨骼旋转差异
    /// </summary>
    private void PreviewDifferences()
    {
        var refMap = BuildBoneMap(referenceRoot.transform);
        var targetMap = BuildBoneMap(targetRoot.transform);

        logMessage = "=== 骨骼旋转差异预览 ===\n";
        int matchCount = 0;
        int diffCount = 0;
        int missingCount = 0;

        foreach (var kvp in targetMap)
        {
            string boneName = kvp.Key;
            Transform targetBone = kvp.Value;

            if (refMap.TryGetValue(boneName, out Transform refBone))
            {
                matchCount++;
                float angleDiff = Quaternion.Angle(targetBone.localRotation, refBone.localRotation);
                if (angleDiff > 0.1f)
                {
                    diffCount++;
                    logMessage += $"  [差异] {boneName}: 角度差 {angleDiff:F2}°\n";
                    logMessage += $"    目标: {targetBone.localRotation.eulerAngles}\n";
                    logMessage += $"    参考: {refBone.localRotation.eulerAngles}\n";
                }
            }
            else
            {
                missingCount++;
                logMessage += $"  [缺失] {boneName}: 参考模型中不存在\n";
            }
        }

        logMessage += $"\n匹配骨骼: {matchCount}, 有差异: {diffCount}, 参考中缺失: {missingCount}\n";
        Repaint();
    }

    /// <summary>
    /// 执行修复：复制参考模型骨骼旋转到目标模型，并重算BindPose
    /// </summary>
    private void FixBinding()
    {
        Undo.SetCurrentGroupName("修复骨骼绑定");
        int undoGroup = Undo.GetCurrentGroup();

        var refMap = BuildBoneMap(referenceRoot.transform);
        var targetMap = BuildBoneMap(targetRoot.transform);

        logMessage = "=== 开始修复 ===\n";

        // 第1步：记录所有目标SkinnedMeshRenderer的骨骼，用于后续重算bindpose
        var targetSkins = targetRoot.GetComponentsInChildren<SkinnedMeshRenderer>(true);

        // 第2步：复制骨骼旋转
        int fixedCount = 0;
        foreach (var kvp in targetMap)
        {
            string boneName = kvp.Key;
            Transform targetBone = kvp.Value;

            if (refMap.TryGetValue(boneName, out Transform refBone))
            {
                float angleDiff = Quaternion.Angle(targetBone.localRotation, refBone.localRotation);
                float posDiff = Vector3.Distance(targetBone.localPosition, refBone.localPosition);

                bool needsFix = angleDiff > 0.01f || (copyPosition && posDiff > 0.0001f);
                if (!needsFix) continue;

                Undo.RecordObject(targetBone, "修复骨骼旋转");

                targetBone.localRotation = refBone.localRotation;
                if (copyPosition)
                {
                    targetBone.localPosition = refBone.localPosition;
                }

                fixedCount++;
            }
        }

        logMessage += $"已修正 {fixedCount} 根骨骼的旋转\n";

        // 第3步：重新计算所有SkinnedMeshRenderer的BindPose
        if (autoRecalcBindpose)
        {
            foreach (var skin in targetSkins)
            {
                RecalcBindPoses(skin);
            }
        }

        Undo.CollapseUndoOperations(undoGroup);

        logMessage += "=== 修复完成 ===\n";
        logMessage += "如果需要撤销，请使用 Ctrl+Z\n";
        Repaint();
    }

    /// <summary>
    /// 重新计算SkinnedMeshRenderer的BindPose矩阵。
    /// BindPose[i] = bones[i].worldToLocalMatrix * transform.localToWorldMatrix
    /// 这样在rest pose下，bone.localToWorld * bindpose = mesh.localToWorld，mesh顶点位置不变。
    /// </summary>
    private void RecalcBindPoses(SkinnedMeshRenderer skin)
    {
        if (skin.sharedMesh == null || skin.bones == null || skin.bones.Length == 0)
            return;

        // 需要操作mesh实例，避免修改共享mesh资源
        // 如果是项目资源中的mesh，需要复制一份
        Mesh mesh = skin.sharedMesh;
        bool isAssetMesh = AssetDatabase.Contains(mesh);

        if (isAssetMesh)
        {
            mesh = Instantiate(mesh);
            mesh.name = skin.sharedMesh.name + "_fixed";
        }

        Undo.RecordObject(skin, "重算BindPose");

        Matrix4x4[] newBindposes = new Matrix4x4[skin.bones.Length];
        Matrix4x4 meshWorldToLocal = skin.transform.localToWorldMatrix;

        for (int i = 0; i < skin.bones.Length; i++)
        {
            if (skin.bones[i] != null)
            {
                newBindposes[i] = skin.bones[i].worldToLocalMatrix * meshWorldToLocal;
            }
            else
            {
                // 骨骼引用丢失，保留原始bindpose
                newBindposes[i] = mesh.bindposes[i];
                logMessage += $"  [警告] {skin.name} 的骨骼索引 {i} 引用为空，保留原始bindpose\n";
            }
        }

        mesh.bindposes = newBindposes;

        if (isAssetMesh)
        {
            // 保存新mesh到Assets目录
            string originalPath = AssetDatabase.GetAssetPath(skin.sharedMesh);
            string directory = System.IO.Path.GetDirectoryName(originalPath);
            string newPath = AssetDatabase.GenerateUniqueAssetPath(
                System.IO.Path.Combine(directory, mesh.name + ".asset"));

            AssetDatabase.CreateAsset(mesh, newPath);
            AssetDatabase.SaveAssets();

            skin.sharedMesh = mesh;
            logMessage += $"  已保存修复后的Mesh: {newPath}\n";
        }

        logMessage += $"  已重算 {skin.name} 的 BindPose ({newBindposes.Length} 根骨骼)\n";
    }
}
```