/**
 * 可视化
 */

import { Context } from '../type/context'

/**
 * 类
 */
class Visualize {
  private context: Context
  private c: CanvasRenderingContext2D
  private offscreen: HTMLCanvasElement
  private o: CanvasRenderingContext2D
  canvas: HTMLCanvasElement

  get wrap(): [number, number, number, number] {
    return [-this.context.width / 2, -this.context.height / 2, this.context.width, this.context.height]
  }
  get brush() {
    return this.o
  }

  /**
   * 构造方法
   * @param context 上下文
   */
  constructor(context: Context) {
    this.context = context
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
  }

  /**
   * 更新
   * @param draw 绘制
   */
  update(draw: () => void) {
    this.o.clearRect(...this.wrap)

    if (this.context.effect.trace < 1) {
      this.o.globalAlpha = this.context.effect.trace
      this.o.drawImage(this.canvas, ...this.wrap)
      this.o.globalAlpha = 1
    }

    draw()

    this.c.clearRect(...this.wrap)
    this.c.drawImage(this.offscreen, ...this.wrap)
  }
}

export default Visualize
