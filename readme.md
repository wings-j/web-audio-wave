Web 音频波形，频域可视化。

基于 Canvas。

# 安装

```bash
npm install @wings-j/web-audio-wave
```

# 使用

## ESM

```js
import WebAudioWave from '@wings-j/web-audio-wave'

let audio = document.querySelector('audio')
let webAudioWave = new WebAudioWave(
  'bar',
  audio,
  {
    rate: 60,
    size: 512,
    width: 1200,
    height: 800
  },
  {
    color: 'skyblue',
    gap: 1
  }
)

document.body.append(webAudioWave.canvas)
```

## IIFE

```html
<script src="@wings-j/web-audio-wave/dist/index.iife.js"></script>
```

```js
let audio = document.querySelector('audio')
let webAudioWave = new WebAudioWave.default(
  'bar',
  audio,
  {
    rate: 60,
    size: 512,
    width: 1200,
    height: 800
  },
  {
    color: 'skyblue',
    gap: 1
  }
)

document.body.append(webAudioWave.canvas)
```

# API

## 类

```ts
WebAudioWave(type: string, audio: HTMLAudioElement, option?: Option)
```

- type：类型
- audio：音频元素
- option：通用选项

## 播放

```ts
WebAudioWave.prototype.play()
```

## 停止

```ts
WebAudioWave.prototype.stop()
```

## 配置类型

```ts
WebAudioWave.prototype.config(option: GraphOption)
```

option：可视化配置

# 配置

## 类型

- bar：柱形
- curve：曲线
- circle：圆圈
- ripple：波纹

## 通用配置（Option）

| 名称             | 说明                    | 类型             | 默认值   |
| ---------------- | ----------------------- | ---------------- | -------- |
| width            | SVG 宽度                | number           | 1024     |
| height           | SVG 高度                | number           | 1024     |
| rate             | 帧率                    | number           | 60       |
| time             | 时域                    | boolean          | false    |
| size             | FFT 长度                | number           | 512      |
| slice            | 剪切                    | [number, number] | [0, 512] |
| pow              | 对 FFT 的值做幂运算的幂 | number           | 1        |
| gain             | 增益                    | number           | 1        |
| db               | 分贝                    | boolean          | false    |
| effect.trace     | 轨迹。[0,1]             | number           | 1        |
| filter.type      | 过滤器类型              | string           | ''       |
| filter.frequency | 过滤器频率              | number           | 0        |
| filter.q         | 过滤器 Q 值             | number           | 0        |
| filter.gain      | 过滤器增益              | number           | 1        |

可选的滤波器类型：[BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode)。

## 类型配置（VisualizeOption）

颜色选项用 6 位 HEX 表示，并且有优先级，从高到低：

1. `dynamicColor`
2. `gradientColor`
3. `color`

### bar

| 名称          | 说明     | 类型                     | 默认值    |
| ------------- | -------- | ------------------------ | --------- |
| color         | 颜色     | string                   | "#000000" |
| gradientColor | 渐变颜色 | string[] \| null         | null      |
| dynamicColor  | 动态颜色 | [string, string] \| null | null      |
| gap           | 柱形间距 | number                   | 0         |

### curve

| 名称          | 说明     | 类型                     | 默认值    |
| ------------- | -------- | ------------------------ | --------- |
| color         | 颜色     | string                   | "#000000" |
| gradientColor | 渐变颜色 | string[] \| null         | null      |
| dynamicColor  | 动态颜色 | [string, string] \| null | null      |
| width         | 线宽     | number                   | 1         |
| mirror        | 镜像     | boolean                  | false     |
| reverse       | 反转     | boolean                  | false     |
| backforth     | 来回     | boolean                  | false     |
| smooth        | 平滑     | boolean                  | false     |

### circle

| 名称          | 说明     | 类型                     | 默认值    |
| ------------- | -------- | ------------------------ | --------- |
| color         | 颜色     | string                   | "#000000" |
| gradientColor | 渐变颜色 | string[] \| null         | null      |
| dynamicColor  | 动态颜色 | [string, string] \| null | null      |
| width         | 线宽     | number                   | 1         |
| fill          | 填充     | boolean                  | false     |
| average       | 平均值   | boolean                  | false     |

### ripple

| 名称         | 说明                               | 类型                              | 默认值    |
| ------------ | ---------------------------------- | --------------------------------- | --------- |
| color        | 颜色                               | string                            | "#000000" |
| dynamicColor | 动态颜色                           | [string, string] \| null          | null      |
| width        | 线宽                               | number                            | 1         |
| fill         | 填充                               | boolean                           | false     |
| threshold    | 阈值                               | number                            | 0         |
| period       | 动画帧数                           | number                            | 60        |
| interval     | 最小间隔帧数                       | number                            | 60        |
| minRadius    | 最小半径                           | number                            | 0         |
| maxRadius    | 最大半径。默认为全局设置宽高的一半 | number                            | 0         |
| ease         | 缓动函数                           | ((v: number) => number) \| string | undefined |

可选的缓动函数：

- linear
- sineIn
- sineOut
- sineInOut
- quadIn
- quadOut
- quatInOut
- cubicIn
- cubicOut
- cubitInOut
- quartIn
- quartOut
- quartInOut
- quintIn
- quintOut
- quintInOut
- expoIn
- expoOut
- expoInOut
- circIn
- circOut
- circInOut
- backIn
- backOut
- backInOut
- elasticIn
- elasticOut
- elasticInOut
- bounceIn
- bounceOut
- bounceInOut
