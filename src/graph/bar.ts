/**
 * 柱形
 */

import Graph from '../type/graph'
import * as D3 from 'd3'
import GradientColor from '../util/gradient-color'

const option = {
  color: '#000000',
  gradientColor: null as [string, string] | null,
  gradientColorNumber: 10,
  gap: 0,
  mirrorX: false,
  mirrorY: false,
  reverseX: false,
  reverseY: false
}

type Option = typeof option

/**
 * 类
 */
class Bar extends Graph<Option> {
  private up: D3.Selection<SVGGElement, any, any, any>
  private down: D3.Selection<SVGGElement, any, any, any>
  private gradientColorList: string[] | null = null

  /**
   * 构造方法
   * @param root 根元素
   * @param width 宽度
   * @param height 高度
   */
  constructor(root: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(root, width, height, option)

    this.up = this.root.append('g').classed('web-audio-wave_bar_up', true)
    this.down = this.root.append('g').classed('web-audio-wave_bar_up', true).attr('transform', 'scale(1,-1)').style('display', 'none')
  }

  /**
   * 绘制
   * @name data 数据
   */
  draw(data: number[]) {
    let d = data
    if (this.option.reverseX) {
      d.reverse()
    }

    if (this.option.mirrorX) {
      let t = Array.from(d)
      d = d.reverse().concat(t)
    }

    let gap = this.option.gap
    let dw = this.width / d.length - gap
    let mh = this.height / 2

    const render = (d: number[], g: D3.Selection<SVGGElement, any, any, any>) => {
      g.selectAll('rect')
        .data(d)
        .join(
          enter =>
            enter
              .append('rect')
              .attr('x', (d, i) => {
                return -this.width / 2 + (dw + gap) * i
              })
              .attr('width', dw)
              .attr('fill', this.option.color),
          update =>
            update
              .attr('height', d => d * mh)
              .attr('fill', d => {
                if (this.gradientColorList) {
                  return this.gradientColorList[Math.floor(d * this.option.gradientColorNumber)]
                } else {
                  return this.option.color
                }
              }),
          exit => exit.remove()
        )
    }

    render(d, this.up)
    if (this.option.mirrorY) {
      render(d, this.down)
    }
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    Object.assign(this.option, option)

    if (this.option.gradientColor) {
      this.gradientColorList = GradientColor(...this.option.gradientColor, this.option.gradientColorNumber)
    } else {
      this.gradientColorList = null
    }

    if (this.option.mirrorY) {
      this.down.style('display', 'block')
    } else {
      this.down.style('display', 'none')
    }
    if (this.option.reverseY) {
      this.up.attr('transform', `translate(0,${this.height / 2}) scale(1,-1)`)
      this.down.attr('transform', `translate(0,${-this.height / 2}) scale(1,1)`)
    } else {
      this.up.attr('transform', `scale(1,1)`)
      this.down.attr('transform', `scale(1,-1)`)
    }
  }
}

export default Bar
export { Option }
