/**
 * 图形
 */

import * as D3 from 'd3'
import Context from '../core/context'

/**
 * 类
 */
abstract class Graph<O extends Record<string, any> = {}> {
  root: D3.Selection<SVGGElement, any, any, any>
  width: number = Context.viewBoxWidth
  height: number = Context.viewBoxHeight
  option = {} as O

  /**
   * 构造方法
   * @param 根元素
   */
  constructor(root: D3.Selection<SVGGElement, any, any, any>, width?: number, height?: number) {
    this.root = root
    width && (this.width = width)
    height && (this.height = height)
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
  abstract config(option: Record<string, unknown>): void
}

/**
 * 类型
 */
enum Type {
  bar = 'bar'
}

export default Graph
export { Type }
