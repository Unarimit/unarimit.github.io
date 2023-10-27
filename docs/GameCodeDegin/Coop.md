# 协同开发

根据需求，有时可能需要和其他部门协同开发。应用不同的设计方法可以让其他人在不涉及具体业务代码的情况下，也能参与到游戏开发中来。

## UnityEvent

## ScriptableObject

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

## 参考