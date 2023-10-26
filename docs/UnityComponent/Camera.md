# 摄像机
::: warning
施工中
:::

## 基本相机属性


## 自动相机-Cinemachine

`Cinemachine`是unity提供的一套控制相机移动的组件，需要配置以下组件:
- `CinemachineVirtualCamera`
- `CinemachineBrain`：可以控制多个`CinemachineVirtualCamera`替换主相机
    - 可以实现丝滑的在两个`CinemachineVirtualCamera`之间切换，是主要功能之一

### CinemachineBrain

`CinemachineBrain`用来控制主相机，和相机切换时的blend、
- 通过改变`CinemachineVirtualCamera`优先级的方式切换相机
- 默认为平滑过渡，可以给每个虚拟相机设置过渡曲线

`CinemachineBrain`配置可以参考：[How to use Cameras in Unity: Cinemachine Overview and Brain Explained!](https://www.youtube.com/watch?v=P_ibDJhFVMU)
- 通过`World Up Override`消除Camera Roll

### CinemachineVirtualCamera

`CinemachineVirtualCamera`有两组主要属性
- 第一组：`Follow`和`Body`。
- 第二组：`LookAt`和`Aim`。

对于第一组属性，选择该组件的`Body`，确定相机的**跟随**目标的风格
- `3rd person follow`：第三人称相机，在TPS、(A)RPG类型中使用较多
    - 例如：神秘海域，原神，PUBG
- `Farming Transposer`：第三人称俯视视角，在MOBA、RTS(即时策略)、2D-RPG类型中使用较多
    - 例如：模拟农场，英雄联盟、HellDivers、冒险岛
    - 特性：角色前向的视野会比其他方向多
- `Hard Lock to Target`：第一人称
- `Orbital Transposer`：第三人称环绕，用于一些游戏的胜利演出之类的？
    - 例如：跑跑卡丁车冲线后动画
- `Tracked Dolly`：一定范围内水平移动
- `Transposer`：随`Transform`相对运动

第二组属性的用法，可以参考：[How to use Cameras in Unity: Cinemachine Virtual Cameras Explained](https://www.youtube.com/watch?v=asruvbmUyw8)，里面对组件的各个属性有详细介绍。例如配置第二组属性，可以实现多人联机拖拽视角的效果

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
- [How to use Cameras in Unity: Cinemachine Virtual Cameras Explained - Youtube](https://www.youtube.com/watch?v=asruvbmUyw8)