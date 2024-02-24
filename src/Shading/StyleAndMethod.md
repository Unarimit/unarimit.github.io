# 渲染风格和手段

## PBR和NRP

PBR：基于物理的渲染（Physically Based Rendering）

::: tip gpt老师：
NPR是一种渲染技术，旨在模拟或呈现非真实世界的图像效果。与传统的渲染方法不同，NPR的目标不是追求逼真的光照和材质表现，而是通过艺术手法和风格化技术，创造出更加抽象、卡通或绘画风格的图像。常见的NPR技术包括卡通渲染、水彩画效果、钢笔画效果等。NPR常用于动画电影、游戏和艺术创作中，以营造特定的视觉风格和情感效果。

相比之下，BPR是一种以物理为基础的渲染技术，旨在模拟真实世界的光照和材质表现。BPR利用物理学原理和逼真的材料属性，模拟光线在环境中的传播、反射和折射，并计算出物体表面的真实光照效果。BPR能够产生高度逼真的图像，常用于电影特效、产品可视化和游戏开发等领域。

两种渲染方法之间的选择取决于应用场景和需求。NPR适用于需要艺术化或表现特殊风格的情况，而BPR适用于更注重真实感和物理准确性的应用。
:::

简单而言，PBR是追求真实感的渲染方式，也是通用的渲染方式。而NPR则是追求风格化，用于游戏、电影等创作的渲染方式。

因为追求的目标不同，所以两者在画面上没有什么可比性。

<center><img  width="80%" src="./../img/whatIsNPR.jpg" /></center>

<center>一张图表达NPR的特点，左边是'a normal shader'，右边是NPR。</center>

<br>

<center><img  width="80%" src="./../img/whatIsPBR.png" /></center>

<center>一张图表达PBR的特点，最明显的是瞄准镜的反光更加真实了。</center>

<center>（用作镜像的gitee不让过，估计是枪械太真实了，想看图的点参考里面的链接吧..）</center>

## 讨论

一些观点认为NPR的性能是比BPR好的，因为不用像BPR一样追求极致的细节，处理光的反射等。

另外NPR是可以用粗糙的模型达到比较好的效果的，我认为这点对独立开发者很友好。


## PBR

## 参考
- [图-NPR的特点-Wikipedia](https://en.wikipedia.org/wiki/Non-photorealistic_rendering)
- [图-PBR的特点-marmoset](https://marmoset.co/posts/pbr-texture-conversion/)