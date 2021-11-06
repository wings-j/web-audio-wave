# Web 音频波形

音频频域可视化，基于 SVG 和 D3。

## 安装

```bash
npm install @wings-j/web-audio-wave
```

## 使用

```js
import WebAudioWave from '@wings-j/web-audio-wave'

let audio = document.querySelector('audio')

let webAudioWave = new WebAudioWave('bar', audio, {
  frameRate: 60,
  fftSize: 512,
  svgWidth: '1200px',
  height: '800px',
  viewBoxWidth: 1200,
  viewBoxHeight: 800
})
document.body.append(webAudioWave.svg)
webAudioWave.config({
  color: 'skyblue',
  gradientColor: ['#ff00ff', '#ff0000'],
  gradientNumber: 100,
  gap: 1,
  mirrorX: true,
  mirrorY: true
})

audio.addEventListener('play', () => {
  webAudioWave.play()
})
```

## API

### 类

```ts
WebAudioWave(type: string, audio: HTMLAudioElement, option?: Option)
```

- type：类型
- audio：音频元素
- option：通用选项

### 播放

```ts
WebAudioWave.prototype.play()
```

### 停止

```ts
WebAudioWave.prototype.stop()
```

### 配置类型

```ts
WebAudioWave.prototype.config(option: VisualizeOption)
```

option：可视化配置

## 配置

### 类型

- bar：柱形
- curve：曲线

### 通用配置（Option）

| 名称          | 说明                    | 类型   | 默认值 |
| ------------- | ----------------------- | ------ | ------ |
| frameRate     | 帧率                    | number | 60     |
| fftSize       | FFT 长度                | number | 512    |
| pow           | 对 FFT 的值做幂运算的幂 | number | 1      |
| svgWidth      | SVG 宽度                | string | "100%" |
| svgHeight     | SVG 高度                | string | "100%" |
| viewBoxWidth  | ViewBox 宽度            | number | 1000   |
| viewBoxHeight | ViewBox 高度            | number | 1000   |

### 类型配置（VisualizeOption）

#### bar

| 名称           | 说明             | 类型             | 默认值  |
| -------------- | ---------------- | ---------------- | ------- |
| color          | 颜色             | string           | #000000 |
| gradientColor  | 渐变颜色         | [string, string] | null    |
| gradientNumber | 渐变颜色分段数量 | number           | 10      |
| gap            | 柱形间距         | number           | 0       |
| mirrorX        | 横向镜像         | boolean          | false   |
| mirrorY        | 纵向镜像         | boolean          | false   |
| reverseX       | 横向反转         | boolean          | false   |
| reverseY       | 纵向反转         | boolean          | false   |

#### curve

| 名称           | 说明                                       | 类型                     | 默认值      |
| -------------- | ------------------------------------------ | ------------------------ | ----------- |
| color          | 颜色                                       | string                   | #000000     |
| gradientColor  | 渐变颜色                                   | [string, string]         | null        |
| gradientNumber | 渐变颜色分段数量                           | number                   | 10          |
| gradientType   | 渐变类型。amplitude：幅度，frequency：频率 | "amplitude"\|"frequency" | "amplitude" |
| reverse        | 反转                                       | boolean                  | false       |
| strokeWidth    | 线宽                                       | number                   | 1           |
