/**
 * 图形
 */

import Context from './context'

/**
 * 类
 */
abstract class Graph<Option extends Record<string, any> = {}> {
  c: CanvasRenderingContext2D
  width: number = Context.width
  height: number = Context.height
  option = {} as Option
  wrap: [number, number, number, number]

  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  constructor(c: CanvasRenderingContext2D, width?: number, height?: number, option?: Option) {
    this.c = c
    width && (this.width = width)
    height && (this.height = height)
    this.wrap = [-this.width / 2, -this.height / 2, this.width, this.height]

    this.config(option)
  }

  /**
   * 绘制
   * @param data 数据。归一化
   */
  abstract draw(data: number[]): void
  /**
   * 配置
   * @param option 选项
   */
  config(option?: Record<string, unknown>): void {
    Object.assign(this.option, option)
  }
}

export default Graph
