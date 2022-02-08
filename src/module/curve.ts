/**
 * 曲线
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'

const option = {
  color: '#000000',
  width: 1,
  mirror: false,
  reverse: false,
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null
}

type Option = typeof option

/**
 * 类
 */
class Curve extends Graph<Option> {
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
  }

  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    super.config(option)

    let brush = this.visualize.brush
    brush.strokeStyle = this.option.color
    brush.lineWidth = this.option.width

    if (this.option.gradientColor?.length) {
      let gradient = brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      brush.strokeStyle = gradient
    }
  }
  /**
   * 绘制
   */
  update() {
    let data = Array.from(this.audio?.get() ?? [])
    let d = Array.from(data)
    if (this.option.reverse) {
      d.reverse()
    }
    if (this.option.mirror) {
      d = d.concat(Array.from(d).reverse())
    }
    let brush = this.visualize.brush

    this.visualize.update(() => {
      if (this.option.dynamicColor?.length === 2) {
        let average = mean(data)
        brush.strokeStyle = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
      }

      let dw = this.context.width / d.length
      let startX = -this.context.width / 2
      let direction = 1
      let path2D = `M ${startX},0`
      let sum = 0
      for (let i = 0, l = d.length; i < l; i++) {
        let x = startX + dw * i
        let y = (direction * d[i] * this.context.height) / 2

        path2D += ` L ${x},${y}`
        direction *= -1
        sum += d[i]
      }

      brush.stroke(new Path2D(path2D))
    })
  }
}

export default Curve
export { Option }
