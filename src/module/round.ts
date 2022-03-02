/**
 * 轮环
 */

import Graph from '../type/graph'
import { PathCurve } from '@wings-j/canvas'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'
import Context from '../type/context'

const preset = {
  color: '#000000',
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null,
  width: 1,
  mirror: false,
  period: Context.rate * 10, // 旋转周期，帧数
  base: Math.min(Context.width, Context.height) / 4, // 基础半径
  baseDynamic: false,
  amplitude: Math.min(Context.width, Context.height) / 4, // 振幅
  smooth: false,
  clockwise: true,
  rotate: 0
}

type Option = typeof preset

/**
 * 类
 */
class Round extends Graph<Option> {
  private time = 0

  private get maxRadius() {
    return Math.min(this.context.width, this.context.height) / 2
  }

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  constructor(
    context: ConstructorParameters<typeof Graph>[0],
    visualize: ConstructorParameters<typeof Graph>[1],
    audio: ConstructorParameters<typeof Graph>[2],
    option?: Option
  ) {
    super(context, visualize, audio)

    this.config(
      Object.assign(
        {},
        preset,
        {
          period: context.rate * 10,
          base: Math.min(this.context.width, this.context.height) / 4,
          amplitude: Math.min(this.context.width, this.context.height) / 4
        },
        option
      )
    )
  }

  /**
   * 配置
   * @param option 选项
   */
  config(option?: Partial<Option>) {
    super.config(option)

    let brush = this.visualize.brush

    brush.strokeStyle = this.option.color
    brush.lineWidth = this.option.width

    if (this.option.gradientColor?.length) {
      let gradient = brush.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      brush.strokeStyle = gradient
    }
  }
  /**
   * 更新
   */
  update() {
    let data = this.audio?.get() ?? []
    let d = Array.from(data)
    if (this.option.mirror) {
      d = d.concat(Array.from(d).reverse())
    }
    let average = mean(data)
    let brush = this.visualize.brush

    this.visualize.update(() => {
      let offset = Math.PI * 2 * (this.time / this.option.period)
      let delta = (Math.PI * 2) / d.length
      let base = this.option.base + (this.option.baseDynamic ? average * this.option.amplitude : 0)

      let direction = 1
      let points = d.map((a, i) => {
        let radian = i * delta * (this.option.clockwise ? 1 : -1) + offset * this.option.rotate
        let radius = a * this.option.amplitude * direction + base
        let x = Math.cos(radian) * radius
        let y = Math.sin(radian) * radius

        direction *= -1

        return [x, y] as [number, number]
      })
      let path = PathCurve(points, this.option.smooth ? 'bezier' : undefined, { close: true })

      if (this.option.dynamicColor?.length === 2) {
        let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
        brush.strokeStyle = color
      }

      brush.stroke(path)
    })

    this.time++
    if (this.time >= this.option.period) {
      this.time = 0
    }
  }
}

export default Round
export { Option }
