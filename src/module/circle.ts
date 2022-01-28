/**
 * 圆形
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'

const option = {
  color: '#000000',
  width: 1,
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null,
  fill: false,
  average: false
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
   * @param context 上下文
   */
  constructor(c: ConstructorParameters<typeof Graph>[0], context: ConstructorParameters<typeof Graph>[1]) {
    super(c, context, option)
  }

  /**
   * 绘制
   * @param data 数据。归一化
   */
  draw(data: number[]) {
    if (this.option.average) {
      let average = mean(data)
      this.c.beginPath()
      this.c.moveTo(this.maxRadius * average, 0)
      this.c.arc(0, 0, this.maxRadius * average, 0, 360)
      this.c.closePath()

      if (this.option.dynamicColor?.length === 2) {
        let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
        this.c.fillStyle = color
      }
      if (this.option.fill) {
        this.c.fill()
      } else {
        this.c.stroke()
      }
    } else {
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
        for (let a of data) {
          this.c.beginPath()
          this.c.moveTo(this.maxRadius * a, 0)
          this.c.arc(0, 0, this.maxRadius * a, 0, 360)
          this.c.closePath()

          if (this.option.dynamicColor?.length === 2) {
            let average = mean(data)
            let color = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], a)
            this.c.strokeStyle = color
          }

          this.c.stroke()
        }
      }
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
