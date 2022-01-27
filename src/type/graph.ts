/**
 * 图形
 */

import { Context } from './context'

/**
 * 类
 */
abstract class Graph<Option extends Record<string, any> = {}> {
  c: CanvasRenderingContext2D
  context: Context
  option = {} as Option

  get width() {
    return this.context.width
  }
  get height() {
    return this.context.height
  }
  get wrap(): [number, number, number, number] {
    return [-this.width / 2, -this.height / 2, this.width, this.height]
  }

  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  constructor(c: CanvasRenderingContext2D, context: Context, option?: Option) {
    this.c = c
    this.context = context

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
