# 后处理
本章是对GAMES104现代游戏引擎课程的第七讲中提到的技术的总结[1]，并结合了相关资料。

## 常用方法
- Bloom 光晕
    - 做法：通过像素的颜色阈值，通常结合HDR + downsample->高斯卷积->upsample
- ToneMapping 曝光
    - HDR通过曲线映射到SDR
    - filmic -> ACES
- Color Grading 调色，风格化
    - 颜色 通过查表（LUT） 映射到另一个颜色
- Outline 描边
    - 边缘检测

## 参考
1. [GAMES104现代游戏引擎课程的第七讲-bilibili](https://www.bilibili.com/video/BV1kY411P7QM)