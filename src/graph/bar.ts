/**
 * 柱形
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'

const option = {
  color: '#000000',
  gap: 0,
  mirrorX: false,
  mirrorY: false,
  reverseX: false,
  reverseY: false,
  gradientColor: [] as string[],
  dynamicColor: null as [string, string] | null
}

type Option = typeof option

/**
 * 类
 */
class Bar extends Graph<Option> {
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
   * @name data 数据
   */
  draw(data: number[]) {
    let d = Array.from(data)
    if (this.option.reverseX) {
      d.reverse()
    }
    if (this.option.mirrorX) {
      d = d.concat(Array.from(d).reverse())
    }

    if (this.option.dynamicColor) {
      let average = data.reduce((p, c) => p + c, 0) / data.length
      this.c.fillStyle = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], average)
    }

    let length = d.length
    let width = Math.floor(this.width / length)
    for (let i = 0; i < length; i++) {
      let x = -this.width / 2 + i * width
      let y = 0
      let w = width - this.option.gap
      let h = -(d[i] * this.height) / 2

      if (this.option.reverseY) {
        h = -h
      }
      if (this.option.mirrorY) {
        y -= h
        h *= 2
      }

      this.c.fillRect(x, y, w, h)
    }
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    Object.assign(this.option, option)

    this.c.fillStyle = this.option.color

    if (this.option.gradientColor.length) {
      let linearGradient = this.c.createLinearGradient(this.wrap[0], 0, this.wrap[0] + this.wrap[2], 0)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        linearGradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      this.c.fillStyle = linearGradient
    }
  }
}

export default Bar
export { Option }
