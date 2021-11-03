/**
 * 可视化
 */

import { Context } from '../core/context'
import * as D3 from 'd3'
import Graph from '../type/graph'
import Bar, { Option as BarOption } from '../graph/bar'

type Option = Partial<BarOption>

/**
 * 类
 */
class Visualize {
  graph?: Graph
  svg: SVGSVGElement
  root: D3.Selection<SVGGElement, any, any, any>

  /**
   * 构造方法
   * @param type 类型
   * @param width 宽度
   * @param height 高度
   */
  constructor(context: Context) {
    let svg = D3.create('svg')
    this.svg = svg.node()!
    let root = svg.append('g').attr('transform', 'scale(1,-1)')
    this.root = root

    svg.attr('width', context.svgWidth)
    svg.attr('height', context.svgHeight)
    svg.attr('viewBox', `${-context.viewBoxWidth / 2} ${-context.viewBoxHeight / 2} ${context.viewBoxWidth} ${context.viewBoxHeight}`)

    if (context.type === 'bar') {
      this.graph = new Bar(this.root, context.viewBoxWidth, context.viewBoxHeight)
    }
  }

  /**
   * 更新
   * @param data 数据
   */
  update(data: number[]) {
    this.graph?.draw(data.slice(0, Math.floor(data.length / 2)))
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Option) {
    this.graph?.config(option)
  }
}

export default Visualize
export { Option }
