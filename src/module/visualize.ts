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
  context: Context
  wrap: [number, number, number, number]
  canvas: HTMLCanvasElement
  c: CanvasRenderingContext2D
  offscreen: HTMLCanvasElement
  o: CanvasRenderingContext2D
  graph?: Graph

  /**
   * 构造方法
   * @param context 上下文
   */
  constructor(context: Context) {
    this.context = context
    this.wrap = [-context.width / 2, -context.height / 2, context.width, context.height]
    this.canvas = document.createElement('canvas')
    this.c = this.canvas.getContext('2d')!
    this.offscreen = document.createElement('canvas')
    this.o = this.offscreen.getContext('2d')!

    this.canvas.setAttribute('width', context.width.toString())
    this.canvas.setAttribute('height', context.height.toString())
    this.c.translate(context.width / 2, context.height / 2)
    this.offscreen.setAttribute('width', context.width.toString())
    this.offscreen.setAttribute('height', context.height.toString())
    this.o.translate(context.width / 2, context.height / 2)

    if (context.type === 'bar') {
      this.graph = new Bar(this.o, context.width, context.height)
    } else if (context.type === 'curve') {
      this.graph = new Curve(this.o, context.width, context.height)
    } else if (context.type === 'circle') {
      this.graph = new Circle(this.o, context.width, context.height)
    }
  }

  /**
   * 更新
   * @param data 数据
   */
  update(data: number[]) {
    this.o.clearRect(...this.wrap)

    if (this.context.effect.trace < 1) {
      this.o.globalAlpha = this.context.effect.trace
      this.o.drawImage(this.canvas, ...this.wrap)
      this.o.globalAlpha = 1
    }

    this.graph?.draw(data.slice(0, Math.floor(data.length / 2)))

    this.c.clearRect(...this.wrap)
    this.c.drawImage(this.offscreen, ...this.wrap)
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
