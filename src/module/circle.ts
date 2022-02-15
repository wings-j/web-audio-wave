/**
 * 圆形
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'

const preset = {
  color: '#000000',
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null,
  width: 1,
  fill: false,
  average: false
}

type Option = typeof preset

/**
 * 类
 */
class Circle extends Graph<Option> {
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

    this.config(Object.assign({}, preset, option))
  }

  /**
   * 配置
   * @param option 选项
   */
  protected config(option?: Partial<Option>) {
    super.config(option)

    let brush = this.visualize.brush
    brush.strokeStyle = this.option.color
    brush.fillStyle = this.option.color
    brush.lineWidth = this.option.width

    if (this.option.gradientColor?.length) {
      let gradient = brush.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      brush.strokeStyle = gradient
      brush.fillStyle = gradient
    }
  }

  /**
   * 更新
   */
  update() {
    let brush = this.visualize.brush
    let data = this.audio?.get() ?? []

    this.visualize.update(() => {
      if (this.option.average) {
        let average = mean(data)
        brush.beginPath()
        brush.moveTo(this.maxRadius * average, 0)
        brush.arc(0, 0, this.maxRadius * average, 0, 360)
        brush.closePath()

        if (this.option.dynamicColor?.length === 2) {
          let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
          brush.fillStyle = color
        }
        if (this.option.fill) {
          brush.fill()
        } else {
          brush.stroke()
        }
      } else {
        if (this.option.fill) {
          for (let a of data) {
            brush.beginPath()
            brush.moveTo(this.maxRadius * a, 0)
            brush.arc(0, 0, this.maxRadius * a, 0, 360)
            brush.closePath()

            if (this.option.dynamicColor?.length === 2) {
              let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], a)
              brush.fillStyle = color
            }

            brush.fill()
          }
        } else {
          for (let a of data) {
            brush.beginPath()
            brush.moveTo(this.maxRadius * a, 0)
            brush.arc(0, 0, this.maxRadius * a, 0, 360)
            brush.closePath()

            if (this.option.dynamicColor?.length === 2) {
              let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], a)
              brush.strokeStyle = color
            }

            brush.stroke()
          }
        }
      }
    })
  }
}

export default Circle
export { Option }
