/**
 * 曲线
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'

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
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  constructor(c: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(c, width, height, option)
  }

  /**
   * 绘制
   * @param data 数据。归一化
   */
  draw(data: number[]) {
    let d = Array.from(data)

    if (this.option.reverse) {
      d.reverse()
    }
    if (this.option.mirror) {
      d = d.concat(Array.from(d).reverse())
    }

    if (this.option.dynamicColor?.length === 2) {
      let average = data.reduce((p, c) => p + c, 0) / data.length
      this.c.strokeStyle = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
    }

    let dw = this.width / d.length
    let startX = -this.width / 2
    let direction = 1
    let path2D = `M ${startX},0`
    let sum = 0
    for (let i = 0, l = d.length; i < l; i++) {
      let x = startX + dw * i
      let y = (direction * d[i] * this.height) / 2

      path2D += ` L ${x},${y}`
      direction *= -1
      sum += d[i]
    }

    this.c.stroke(new Path2D(path2D))
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    super.config(option)

    this.c.strokeStyle = this.option.color
    this.c.lineWidth = this.option.width

    if (this.option.gradientColor?.length) {
      let gradient = this.c.createLinearGradient(this.wrap[0], 0, this.wrap[0] + this.wrap[2], 0)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      this.c.strokeStyle = gradient
    }
  }
}

export default Curve
export { Option }
