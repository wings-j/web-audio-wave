/**
 * 柱形
 */

import Graph from '../type/graph'

const option = {
  color: '#000000',
  gap: 0,
  mirrorX: false,
  mirrorY: false,
  reverseX: false,
  reverseY: false,
  gradientColor: null as [string, string] | null,
  gradientNumber: 10
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
    if (this.option.reverseX) {
      data.reverse()
    }
    if (this.option.mirrorX) {
      data = data.concat(Array.from(data).reverse())
    }

    let length = data.length
    let width = Math.floor(this.width / length)
    for (let i = 0; i < length; i++) {
      let x = -this.width / 2 + i * width
      let y = 0
      let w = width - this.option.gap
      let h = -(data[i] * this.height) / 2

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
  }
}

export default Bar
export { Option }
