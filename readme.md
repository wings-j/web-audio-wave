Web audio visualization.

Based on canvas。

# Usage

```sh
npm install @wings-j/web-audio-wave
```

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

## `WebAudioWave(type: string, audio: HTMLAudioElement, option?: Option)`

Parameters:

- `type`：type of animation
- `audio`：HTMLAudioElement
- `option`：common options

## `play()`

Play animation.

## `stop()`

Stop animation.

## `config(option: GraphOption)`

Config animation.

Parameters:

- `option`：options

# Configuration

## types

- bar
- curve
- circle
- ripple

## Common option (`Option`)

| Name             | Demonstration                    | Type             | Default   |
| ---------------- | ----------------------- | ---------------- | -------- |
| width            | width of canvas               | number           | 1024     |
| height           | width of canvas                | number           | 1024     |
| rate             | frame rate                    | number           | 60       |
| time             | time domain                    | boolean          | false    |
| size             | FFT size                | number           | 512      |
| slice            | slice the data                    | [number, number] | [0, 512] |
| pow              | pow the data | number           | 1        |
| gain             | gain of the audio                    | number           | 1        |
| db               | db unit for data                    | boolean          | false    |
| effect.trace     | trace effect. [0,1]             | number           | 1        |
| filter.type      | type of the filter              | string           | ''       |
| filter.frequency | frequency of the filter              | number           | 0        |
| filter.q         | Q of the filter             | number           | 0        |
| filter.gain      | gain of the filter              | number           | 1        |

Optional filter types: [BiquadFilterNode](https://developer.mozilla.org/en-US/docs/Web/API/BiquadFilterNode).

## Type option (`VisualizeOption`)

Options about color are in format of hex. And they have priorities, from high to low:

1. dynamicColor
2. gradientColor
3. color

Option `ease` is easing function, optional values：

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

### bar

| Name          | Demonstration     | Type                     | Default    |
| ------------- | -------- | ------------------------ | --------- |
| color         | Single color     | string                   | "#000000" |
| gradientColor | Grident colors | string[] \| null         | null      |
| dynamicColor  | Dynamic colors | [string, string] \| null | null      |
| gap           | Gap between bars | number                   | 0         |

### curve

| Name          | Demonstration     | Type                     | Default    |
| ------------- | -------- | ------------------------ | --------- |
| color         | Single color     | string                   | "#000000" |
| gradientColor | Grident colors | string[] \| null         | null      |
| dynamicColor  | Dynamic colors | [string, string] \| null | null      |
| width         | Width of lines     | number                   | 1         |
| mirror        | Two mirrored curve     | boolean                  | false     |
| reverse       | Reversed direction     | boolean                  | false     |
| backforth     | Backforthed data     | boolean                  | false     |
| smooth        | Smoothed curve     | boolean                  | false     |

### circle

| Name          | Demonstration     | Type                     | Default    |
| ------------- | -------- | ------------------------ | --------- |
| color         | Single color     | string                   | "#000000" |
| gradientColor | Grident colors | string[] \| null         | null      |
| dynamicColor  | Dynamic colors | [string, string] \| null | null      |
| width         | Width of line     | number                   | 1         |
| fill          | Fill the shape with the color     | boolean                  | false     |
| average       | Take the average as the value   | boolean                  | false     |

### ripple

| Name         | Demonstration                               | Type                              | Default    |
| ------------ | ---------------------------------- | --------------------------------- | --------- |
| color        | Single color                               | string                            | "#000000" |
| dynamicColor | Dynamic colors                          | [string, string] \| null          | null      |
| width        | Width of lines                               | number                            | 1         |
| fill         | Fill the shape with the color                              | boolean                           | false     |
| threshold    | Threshold value to trigger the ripple                               | number                            | 0         |
| period       | Period of a trigger                          | number                            | 60        |
| interval     | Minium frame between two trigger                       | number                            | 60        |
| minRadius    | Minium radius                           | number                            | 0         |
| maxRadius    | Maximum. Defaul value is the half of the gloabl width or height | number                            | 0         |
| ease         | Easing function                           | ((v: number) => number) \| string | undefined |

### round

| Name          | Demonstration       | Type                     | Default    |
| ------------- | ---------- | ------------------------ | --------- |
| color         | single color       | string                   | "#000000" |
| gradientColor | grident colors   | string[] \| null         | null      |
| dynamicColor  | dynamic colors   | [string, string] \| null | null      |
| width         | width of lines       | number                   | 1         |
| mirror        | mirrored shape       | boolean                  | false     |
| period        | Period of a rotation   | number                   | 600       |
| base          | Basic radius   | number                   | 256       |
| amplitude     | Amplitude radius   | number                   | 256       |
| smooth        | Smoothed curve       | boolean                  | false     |
| clockwise     | Clockwise rotation | boolean                  | true      |
| rotate        | Rotating       | number                   | 0         |

`rotate` optional values：

- `0`：no rotation
- `1`：clockwise
- `-1`：counterclockwise
