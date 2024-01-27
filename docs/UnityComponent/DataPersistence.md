# 数据持久化

## PlayerPrefs

由于存储数据类型比较有限，可以用于存储玩家偏好设置。
> It can store string, float and integer values into the user’s platform registry.

有`SetFloat`,`SetInt`,`SetString`等方法

根据不同的平台，会将数据存储在不同的位置
> Windows下是 On Windows, PlayerPrefs are stored in the registry under `HKCU\Software\[company name]\[product name]` key, where company and product names are the names set up in Project Settings.

## 序列化存文件

虽然也可以把序列化的string存到`PlayerPrefs`中，但有时我们希望自定义存储位置。
> windows下会写到注册表中，这位玩家，你也不想你的注册表被写满游戏存档数据吧~

Application中定义了5个Path，我认为两个Path比较常用，分别是`Application.dataPath`和`Application.persistentDataPath`
- `dataPath`和工程目录相关，具体见[文档](https://docs.unity3d.com/ScriptReference/Application-dataPath.html)
- `persistentDataPath`和用户目录相关，具体见[文档](https://docs.unity3d.com/ScriptReference/Application-persistentDataPath.html)

### 简要介绍一下序列化问题

理论上，只要给序列化的类，和他里面包含的`field`的定义类(class和struct)都加上`[Serializable]`特性即可，另外对于一些不想被序列化的`field`加上`[NonSerialized]`特性，对于不想被序列化的事件，需要加上`[field: NonSerialized]`。
> 委托和枚举类型都是默认带`[Serializable]`特性的，而struct和class不是。一般没有人想序列化事件吧，对象图中的事件还牵扯一堆订阅类。

实际上，还是可能会遇到各种问题如：
- 由于`Vector3`，`Vector2Int`等Unity中提供的类没有`[Serializable]`特性，需要额外处理一下。
	- 可以使用简单使用属性表示不能序列化的类，数据拆开使用`field`存储，虽然会对性能有影响（不影响性能可以参考下面的`ISerializable`）。
- 序列化一个继承类，而父类不可以加上`[Serializable]`特性。
	- 实现`ISerializable`接口定义序列化逻辑。

``` csharp
// 简单处理的代码
/// <summary> 放置位置 </summary>
[Serializable]
internal struct PlaceInfo{
	public Vector2Int PlacePosition { 
		get { 
			return new Vector2Int(_placePostionX, _placePostionY);
		}
		set
		{
			_placePostionX = value.x;
			_placePostionY = value.y;
		}
	}

	// 为了序列化
	private int _placePostionX;
	private int _placePostionY;
}
```

### 序列化存文件Demo

下面两个函数描述了简单的保存和加载应该怎么做：

```csharp
[Serializable]
class SaveData
{
    public int savedInt;
    public float savedFloat;
    public bool savedBool;
}
void SaveGame()
{
	BinaryFormatter bf = new BinaryFormatter(); 
	FileStream file = File.Create(Application.persistentDataPath 
                 + "/MySaveData.dat"); 
	SaveData data = new SaveData();
	data.savedInt = intToSave;
	data.savedFloat = floatToSave;
	data.savedBool = boolToSave;
	bf.Serialize(file, data);
	file.Close();
	Debug.Log("Game data saved!");
}
void LoadGame()
{
	if (File.Exists(Application.persistentDataPath 
                   + "/MySaveData.dat"))
	{
		BinaryFormatter bf = new BinaryFormatter();
		FileStream file = 
                   File.Open(Application.persistentDataPath 
                   + "/MySaveData.dat", FileMode.Open);
		SaveData data = (SaveData)bf.Deserialize(file);
		file.Close();
		intToSave = data.savedInt;
		floatToSave = data.savedFloat;
		boolToSave = data.savedBool;
		Debug.Log("Game data loaded!");
	}
	else
		Debug.LogError("There is no save data!");
}
```

### 存档流程设计

看完了上面两个函数，再来思考下一个问题：如何完成存档，读档功能呢？我认为可以分为以下几个部分：
- 存档类
    - 确定哪些数据是需要存储的
- 加载存档的UI和存档摘要类
    - 在读档页面希望看到什么摘要数据
- 文件读写功能
    - 可以通过一个通用的泛型功能完成
- 完成存读档流程
    - 加载存档后将数据写入使用区域（在c#中可能只是改个引用）
    - 写入新的存档后也要变更存档摘要哦
- 调试和测试
    - 看看数据是否完整，或编写测试用例


## 参考
- [API PlayerPrefs - Unity Doc](https://docs.unity3d.com/ScriptReference/PlayerPrefs.html)
- [API Application - Unity Doc](https://docs.unity3d.com/ScriptReference/Application.html)
- [Saving Game Data with Unity - redgate](https://www.red-gate.com/simple-talk/development/dotnet-development/saving-game-data-with-unity/)
- 《CLR Via C# 第四版》24章-运行时序列化：[CLR Via C# - Jeffrey Richter](https://book.douban.com/subject/26285940/)
- [How do I ignore event subscribers when serializing an object? - Stack Overflow](https://stackoverflow.com/questions/1173667/how-do-i-ignore-event-subscribers-when-serializing-an-object)
