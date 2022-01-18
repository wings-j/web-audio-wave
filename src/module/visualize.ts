/**
 * 可视化
 */

import { Context } from '../type/context'
import Graph from '../type/graph'
import Bar, { Option as BarOption } from '../graph/bar'
import Curve, { Option as CurveOption } from '../graph/curve'
import Circle, { Option as CircleOption } from '../graph/circle'

type Option = Partial<BarOption | CurveOption | CircleOption>

/**
 * 类
 */
class Visualize {
  graph?: Graph
  canvas: HTMLCanvasElement
  c: CanvasRenderingContext2D

  /**
   * 构造方法
   * @param context 上下文
   */
  constructor(context: Context) {
    this.canvas = document.createElement('canvas')
    this.c = this.canvas.getContext('2d')!

    this.canvas.setAttribute('width', context.width.toString())
    this.canvas.setAttribute('height', context.height.toString())

    if (context.type === 'bar') {
      this.graph = new Bar(this.c, context.width, context.height)
    } else if (context.type === 'curve') {
      this.graph = new Curve(this.c, context.width, context.height)
    } else if (context.type === 'circle') {
      this.graph = new Circle(this.c, context.width, context.height)
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
