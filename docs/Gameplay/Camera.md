# 摄像机
::: warning
施工中
:::

## `Cinemachine`

`Cinemachine`是unity提供的一套控制相机移动的组件，配置好`CinemachineBrain`和`CinemachineVirtualCamera`即可使用。

有三个主要属性`Follow`，`LookAt`和`Body`。

选择该组件的`Body`，确定相机的跟随目标的风格
- `3rd person follow`
- `Farming Transposer`
- `Hard Lock to Target`
- `Orbital Transposer`
- `Tracked Dolly`
- `Transposer`

## 实现

看一个简单moba游戏跟随相机的实现

``` csharp
float smoothness = 0.5f;
void Start(){
    cemeraOffset = transform.position - player.transform.position;
}
void update(){
    Vector3 newPos = Player.position + cemeraOffset;
    transform.position = Vector3.Slerp(transform.position, newPos, smoothness);
}
```

实际上可以通过`CinemachineVirtualCamera`(Framing Transposer)实现一样的功能，并且有更多参数可以调节，可以做得更好

## 参考
- 简易跟随相机代码：[Making A MOBA Character #1: MOVEMENT (Unity 2019 Tutorial) - Youtube](https://youtu.be/d_0dAwk3wqI?si=lkzEyYuIJKDawH5Q&t=140)
- [How to use Cameras in Unity: Cinemachine Virtual Cameras Explained](https://www.youtube.com/watch?v=asruvbmUyw8)