/**
 * 波纹
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'
import Context from '../type/context'
import { Ease } from '@wings-j/web-sdk'

const preset = {
  color: '#000000',
  dynamicColor: null as [string, string] | null,
  width: 1,
  fill: false,
  threshold: 0,
  period: Context.rate, // 扩散时间，帧数
  interval: Context.rate, // 产生间隔，帧数
  minRadius: 0,
  maxRadius: 0,
  ease: undefined as undefined | ((v: number) => number) | keyof typeof Ease
}

type Option = typeof preset

/**
 * 单元
 */
class Unit {
  private option: Option
  private color: string
  private time = 0

  get finished() {
    return this.time >= this.option.period
  }
  get phase() {
    return Math.min(this.time / this.option.period, 1)
  }

  constructor(option: Option, color: string) {
    this.option = option
    this.color = color
  }

  /**
   * 更新
   */
  update() {
    this.time++
  }
  /**
   * 数据
   */
  get() {
    let phase = this.phase
    if (this.option.ease) {
      if (typeof this.option.ease === 'string') {
        phase = Ease[this.option.ease](phase)
      } else {
        phase = this.option.ease(phase)
      }
    }

    let radius = (this.option.maxRadius - this.option.minRadius) * phase + this.option.minRadius
    let color =
      this.color +
      Math.floor(255 * (1 - phase))
        .toString(16)
        .padStart(2, '0')

    return {
      radius,
      color
    }
  }
}

/**
 * 类
 */
class Ripple extends Graph<Option> {
  private units = new Set<Unit>()
  private count = 0

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
    option: Option
  ) {
    super(context, visualize, audio)

    this.config(
      Object.assign({}, preset, { period: context.rate, interval: context.rate, maxRadius: Math.min(this.context.width, this.context.height) / 2 }, option)
    )
  }

  /**
   * 配置
   * @param option 选项
   */
  protected config(option?: Partial<Option>) {
    super.config(option)

    let brush = this.visualize.brush
    brush.lineWidth = this.option.width
  }

  /**
   * 更新
   */
  update() {
    this.count++
    let brush = this.visualize.brush

    if (this.count >= this.option.interval) {
      let data = this.audio?.get() ?? []
      let average = mean(data)

      if (average >= this.option.threshold) {
        this.count = 0

        let color = this.option.color
        if (this.option.dynamicColor?.length === 2) {
          color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
        }

        this.units.add(new Unit(this.option, color))
      }
    }

    this.visualize.update(() => {
      for (let a of this.units.values()) {
        let { radius, color } = a.get()

        brush.beginPath()
        brush.moveTo(radius, 0)
        brush.arc(0, 0, radius, 0, 360)
        brush.closePath()

        if (this.option.fill) {
          brush.fillStyle = color
          brush.fill()
        } else {
          brush.strokeStyle = color
          brush.stroke()
        }

        a.update()
        if (a.finished) {
          this.units.delete(a)
        }
      }
    })
  }
}

export default Ripple
export { Option }
