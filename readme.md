Web 音频波形，频域可视化。

基于 Canvas。

# 安装

```bash
npm install @wings-j/web-audio-wave
```

# 使用

```js
import WebAudioWave from '@wings-j/web-audio-wave'

let audio = document.querySelector('audio')

let webAudioWave = new WebAudioWave('bar', audio, {
  rate: 60,
  size: 512,
  width: 1200,
  height: 800
})
webAudioWave.config({
  color: 'skyblue',
  gap: 1
})

document.body.append(webAudioWave.canvas)
audio.addEventListener('play', () => {
  webAudioWave.play()
})
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
WebAudioWave.prototype.config(option: VisualizeOption)
```

option：可视化配置

# 配置

## 类型

- bar：柱形
- curve：曲线
- circle：圆环

## 通用配置（Option）

| 名称         | 说明                    | 类型   | 默认值 |
| ------------ | ----------------------- | ------ | ------ |
| rate         | 帧率                    | number | 60     |
| size         | FFT 长度                | number | 512    |
| pow          | 对 FFT 的值做幂运算的幂 | number | 1      |
| width        | SVG 宽度                | number | 1024   |
| height       | SVG 高度                | number | 1024   |
| effect.trace | 轨迹。[0,1]             | number | 1      |

## 类型配置（VisualizeOption）

下列选项中，颜色选项有优先级，从高到低：

1. `dynamicColor`
2. `gradientColor`
3. `color`

### bar

| 名称          | 说明     | 类型                     | 默认值    |
| ------------- | -------- | ------------------------ | --------- |
| color         | 颜色     | string                   | "#000000" |
| gap           | 柱形间距 | number                   | 0         |
| gradientColor | 渐变颜色 | string[] \| null         | null      |
| dynamicColor  | 动态颜色 | [string, string] \| null | null      |

### curve

| 名称          | 说明     | 类型                     | 默认值    |
| ------------- | -------- | ------------------------ | --------- |
| color         | 颜色     | string                   | "#000000" |
| width         | 线宽     | number                   | 1         |
| mirror        | 镜像     | boolean                  | false     |
| reverse       | 反转     | boolean                  | false     |
| gradientColor | 渐变颜色 | string[] \| null         | null      |
| dynamicColor  | 动态颜色 | [string, string] \| null | null      |

### circle

| 名称          | 说明     | 类型                     | 默认值    |
| ------------- | -------- | ------------------------ | --------- |
| color         | 颜色     | string                   | "#000000" |
| width         | 线宽     | number                   | 1         |
| gradientColor | 渐变颜色 | string[] \| null         | null      |
| dynamicColor  | 动态颜色 | [string, string] \| null | null      |
| fill          | 填充     | boolean                  | false     |
