/**
 * 圆形
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'

const option = {
  color: '#000000',
  fill: false,
  width: 1,
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null
}

type Option = typeof option

/**
 * 类
 */
class Circle extends Graph<Option> {
  get maxRadius() {
    return Math.min(this.width, this.height) / 2
  }

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
    if (this.option.fill) {
      for (let a of data) {
        this.c.beginPath()
        this.c.moveTo(this.maxRadius * a, 0)
        this.c.arc(0, 0, this.maxRadius * a, 0, 360)
        this.c.closePath()

        if (this.option.dynamicColor?.length === 2) {
          let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], a)
          this.c.fillStyle = color
        }

        this.c.fill()
      }
    } else {
      if (this.option.dynamicColor?.length === 2) {
        let average = data.reduce((p, c) => p + c, 0) / data.length
        let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
        this.c.strokeStyle = color
      }

      this.c.beginPath()
      for (let a of data) {
        this.c.moveTo(this.maxRadius * a, 0)
        this.c.arc(0, 0, this.maxRadius * a, 0, 360)
      }
      this.c.closePath()
      this.c.stroke()
    }
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option?: Partial<Option>) {
    super.config(option)

    this.c.strokeStyle = this.option.color
    this.c.lineWidth = this.option.width

    if (this.option.gradientColor?.length) {
      let gradient = this.c.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      this.c.strokeStyle = gradient
      this.c.fillStyle = gradient
    }
  }
}

export default Circle
export { Option }
