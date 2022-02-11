/**
 * 波纹
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'
import { FilterType } from '../core/audio'
import Context from '../type/context'

const option = {
  color: '#000000',
  dynamicColor: null as [string, string] | null,
  width: 1,
  dynamicWidth: null as [number, number] | null,
  fill: false,
  threshold: 0,
  period: Context.rate, // 扩散周期，帧数
  interval: Context.rate, // 产生间隔，帧数
  minRadius: 0,
  maxRadius: 0,
  filter: '' as '' | FilterType,
  filterFrequency: 0,
  filterQ: 0,
  filterGain: 1
}

type Option = typeof option

/**
 * 单元
 */
class Unit {
  private time = 0
  private period: number
  private minRadius: number
  private maxRadius: number
  private color: string

  get finished() {
    return this.time >= this.period
  }
  get phase() {
    return Math.min(this.time / this.period, 1)
  }

  constructor(period: number, minRadius: number, maxRadius: number, color: string) {
    this.period = period
    this.minRadius = minRadius
    this.maxRadius = maxRadius
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
    let radius = (this.maxRadius - this.minRadius) * this.phase + this.minRadius
    let color =
      this.color +
      Math.floor(255 * (1 - this.phase))
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
    audio: ConstructorParameters<typeof Graph>[2]
  ) {
    super(context, visualize, audio)

    this.config(option)

    this.option.period = context.rate
    this.option.interval = context.rate
  }

  /**
   * 配置
   * @param option 选项
   */
  config(option?: Partial<Option>) {
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
        this.units.add(new Unit(this.option.period, this.option.minRadius, this.option.maxRadius || this.maxRadius, this.option.color))
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
