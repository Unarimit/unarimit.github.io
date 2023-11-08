# 音频系统

需要通过`AudioListener`组件接受声音，具体可以查阅Unity Documentation的音频部分。

## AudioClip常用函数

- `AudioClip.LoadAudioData`:加载剪辑的音频数据。设置了“Preload Audio Data”的AudioClip将自动加载音频数据。AudioClip如果加载成功，返回 true。
- `AudioSource.PlayClipAtPoint`:该函数会创建一个音频源，并在AudioClip播放完毕后自动处置该音频源。
- `AudioClip.Create`:使用名称和给定的样本长度、声道和频率创建用户 AudioClip。（用于处理流传输的音频或剪辑本地音频）
> 使用 SetData 设置您自己的音频数据。使用 PCMReaderCallback 和 PCMSetPositionCallback 委托，每当剪辑读取数据和更改位置时获取一个回调。如果 stream 为 true，Unity 将按需读取小块数据。如果 stream 为 false，则在创建期间读取所有样本。

## 例子

### 分割 AudioClip
这是一段分割连续枪声的例子，我通过肉眼观察得到声音峰值时间（射出子弹的最大声音），并按照峰值时间分割
``` cs
private List<AudioClip> SplitGunSound(AudioClip gunSound)
{
    if(gunSound.LoadAudioData() == false)
    {
        Debug.Log("audio not load");
        return null;
    }
    // 注：原音频长度为1.5秒
    float[] PeekSeconds = new float[] {
        0.07f, 0.143f, 0.227f, 0.307f, 0.391f,
        0.471f, 0.554f, 0.636f, 0.711f, 0.794f,
        0.88f, 0.96f, 1.03f, 1.12f, 1.2f  };

    var splitClips = new List<AudioClip>(15);

    for (int i = 0; i < 15; i++)
    {
        // 计算开始位置
        int startSample = 0;
        if (i != 0)
        {
            startSample = Mathf.CeilToInt(PeekSeconds[i-1] * gunSound.frequency);
            startSample -= Mathf.CeilToInt(0.04f * gunSound.frequency);
        }
        // 计算持续时间
        int cliplength = Mathf.CeilToInt((PeekSeconds[i]) * gunSound.frequency) - startSample;
        clipLength += Mathf.CeilToInt(0.04f * gunSound.frequency);

        float[] splitSamplesData = new float[cliplength];
        gunSound.GetData(splitSamplesData, startSample);

        // 创建audioclip，填入数据
        splitClips.Add(AudioClip.Create("SplitClip" + i, cliplength, gunSound.channels, gunSound.frequency, false));
        splitClips[i].SetData(splitSamplesData, 0);
    }

    // 返回分割后的片段
    return splitClips;
}
```


## 参考
- [XAudio - 在线音频编辑](https://www.xaudiopro.com/edit/)
- [Unity音频概述 - Unity Doc](https://docs.unity3d.com/cn/current/Manual/AudioOverview.html)