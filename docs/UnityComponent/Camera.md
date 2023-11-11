# 摄像机

摄像机作为游戏制作的3C之一，... 后面忘了

## 基本相机属性

Unity版本2022.3，使用URP

- `RenderType`
- `Projection`：可以通过调整FOV（视场）帮助cpu正确的剔除不需要渲染的物体
- `Rendering`：总之就是渲染相关
    - 里面有一个`Post-Processing`选项，每次都忘记选。
- `Stack`
- `Enviorment`：设置背景，即没投影到物体显示什么东西
- `Output`
    - 两个渲染位置：RenderTexture & Screen


### 分层渲染

WIP

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

## 例子

### 实现moba游戏跟随相机

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

## bugs
### 内存溢出：在URP管线下，两个相机，使用全局Volume和后处理

一个相机输出到render texture（256\*256），1920\*1080分辨率

TODO: 不知道是不是我导入其他后处理效果导致的（关闭导入的后处理效果不影响），进一步实验确认。

现象：点击play，三秒钟内存使用8G，在等几秒立刻崩溃。

虽然说改用local Volume可以解决这个问题，但他奶奶的global模式是干什么用的？

## 参考
- 简易跟随相机代码：[Making A MOBA Character #1: MOVEMENT (Unity 2019 Tutorial) - Youtube](https://youtu.be/d_0dAwk3wqI?si=lkzEyYuIJKDawH5Q&t=140)
- [How to use Cameras in Unity: Cinemachine Virtual Cameras Explained - Youtube](https://www.youtube.com/watch?v=asruvbmUyw8)
- [Unity HDRP 多摄像机分层渲染 - cnblog](https://www.cnblogs.com/koshio0219/p/14263078.html)