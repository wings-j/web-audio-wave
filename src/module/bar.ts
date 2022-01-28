/**
 * 柱形
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'

const option = {
  color: '#000000',
  gap: 0,
  gradientColor: null as string[] | null,
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
   * @param context 上下文
   */
  constructor(c: ConstructorParameters<typeof Graph>[0], context: ConstructorParameters<typeof Graph>[1]) {
    super(c, context, option)
  }

  /**
   * 绘制
   * @name data 数据
   */
  draw(data: number[]) {
    let d = Array.from(data)

    let length = d.length
    let width = this.width / length
    for (let i = 0; i < length; i++) {
      let x = -this.width / 2 + i * width
      let y = this.height / 2
      let w = width - this.option.gap
      let h = -(d[i] * this.height)

      if (this.option.dynamicColor?.length === 2) {
        this.c.fillStyle = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], d[i])
      }

      this.c.fillRect(x, y, w, h)
    }
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option?: Partial<Option>) {
    super.config(option)

    this.c.fillStyle = this.option.color

    if (this.option.gradientColor?.length) {
      let gradient = this.c.createLinearGradient(this.wrap[0], 0, this.wrap[0] + this.wrap[2], 0)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      this.c.fillStyle = gradient
    }
  }
}

export default Bar
export { Option }
