# 协同开发

根据需求，有时可能需要和其他部门协同开发。应用不同的设计方法可以让其他人在不涉及具体业务代码的情况下，也能参与到游戏开发中来。

## UnityEvent

可以暴露在Unity Editor里`Inspector`中的委托？

WIP

## ScriptableObject

用于在Unity Editor中配置变量的东西，一些URP渲染管线的配置文件就是用它实现的。

::: details gpt介绍使用方法
要使用 `ScriptableObject`，请按照以下步骤操作：

1. 创建一个派生自 `ScriptableObject` 的脚本：
   在 Unity 中，创建一个新的 C# 脚本并使其继承自 `ScriptableObject`。例如，您可以使用以下代码示例创建一个名为 `MyData` 的自定义数据类：

   ```csharp
   using UnityEngine;

   [CreateAssetMenu(fileName = "NewMyData", menuName = "Create My Data")]
   public class MyData : ScriptableObject
   {
       public string myString;
       public int myInt;
       public float myFloat;

       // 可以在这里定义其他属性和方法
   }
   ```

   此示例代码定义了一个 `MyData` 类，它具有 `myString`、`myInt` 和 `myFloat` 三个公共变量。

2. 创建 `ScriptableObject` 实例：
   在 Unity 编辑器中，右键单击项目视图中的某个文件夹，选择 "Create"，然后选择 "Create My Data"（根据您的脚本命名而定）。这将在所选文件夹中创建一个新的 `MyData` 实例。

   您可以使用创建的 `MyData` 实例来编辑您的数据对象。在检查器窗口中，您可以设置和修改 `myString`、`myInt` 和 `myFloat` 等属性的值。

3. 在脚本中使用 `ScriptableObject`：
   要在其他脚本中使用 `ScriptableObject`，您可以通过以下方式引用和访问它：

   ```csharp
   public MyData myData;  // 声明一个 MyData 变量

   // 在脚本中使用 myData 的值
   void SomeMethod()
   {
       string dataString = myData.myString;
       int dataInt = myData.myInt;
       float dataFloat = myData.myFloat;

       // 可以在这里进行其他操作
   }
   ```

   在 Unity 编辑器中，将 `MyData` 脚本附加到场景中的游戏对象上，并将 `myData` 字段与先前创建的 `MyData` 实例关联起来。然后，您可以在脚本中使用 `myData` 变量来访问其属性值。
:::

## Editor

`Unity Editor`指的是unity客户端，`Editor`是一种专门用于自定义编辑器界面和工具的功能。它允许开发人员创建自定义的`Inspector`窗口、工具栏按钮和菜单项，以增强开发过程和提供更好的工作流程。

通过继承`EditorWindow`类，您可以创建自己的编辑器窗口，这使您能够在Unity编辑器中创建和管理自定义界面元素。`EditorWindow`提供了一系列方法和事件，可用于布局UI元素、处理用户输入和实现自定义功能。

这里列举一些挺不错的`Editor`插件：
- 处理法线：[AquaSmoothNormals - Github](https://github.com/DumoeDss/AquaSmoothNormals)
- 行为树插件：[Schema - Asset Store](https://assetstore.unity.com/packages/tools/behavior-ai/schema-200876)

### Editor实现`CSV`文件转换为`Scriptable Object`

使用gpt生成了一个挺不错的模板
::: details gpt代码模板
```cs
public class CSVImporterEditor : EditorWindow
{
    [MenuItem("MyMenu/Import CSV")]
    private static void ImportCSV()
    {
        string filePath = EditorUtility.OpenFilePanel("Import CSV", "", "csv");
        if (!string.IsNullOrEmpty(filePath))
        {
            // 读取CSV文件内容
            string[] lines = File.ReadAllLines(filePath);

            // 解析CSV文件内容并更新ScriptableObject
            MyScriptableObject myScriptableObject = AssetDatabase.LoadAssetAtPath<MyScriptableObject>("Assets/Path/To/Your/ScriptableObject.asset");
            for (int i = 0; i < lines.Length; i++) // TODO: 注意处理表头信息哦
            {
                string[] values = lines[i].Split(',');
                // 根据CSV文件的内容更新ScriptableObject的属性
                myScriptableObject.SetValue(i, values);
            }

            // 保存ScriptableObject的修改
            EditorUtility.SetDirty(myScriptableObject);
            AssetDatabase.SaveAssets();
            AssetDatabase.Refresh();
        }
    }
}
```
::: 
我的项目使用此模板完成了技能csv表到scriptable object的转换，附上[脚本内容 - Github](https://github.com/Unarimit/my-topdown-shooting-game/commit/ab0c3746797ad078d1a86032eda3569c221b80ac#diff-d76776d5cbe58bd51383b9709d4de327fd0e2cefb86dbaffeac814c4e5d4e5d2)


## 参考