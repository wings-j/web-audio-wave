/**
 * 柱形
 */

import Graph from '../type/graph'
import * as D3 from 'd3'
import GradientColor from '../util/gradient-color'

const option = {
  color: 'hsl(0,0%,0%)',
  gradientColor: null as [string, string] | null,
  gradientNumber: 10,
  gap: 0,
  height: 0,
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
  up: D3.Selection<SVGGElement, any, any, any>
  down: D3.Selection<SVGGElement, any, any, any>
  gradientColorList: string[] | null = null

  /**
   * 构造方法
   */
  constructor(root: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(root, width, height)

    this.up = this.root.append('g').classed('web-audio-wave_bar_up', true)
    this.down = this.root.append('g').classed('web-audio-wave_bar_up', true).attr('transform', 'scale(1,-1)').style('display', 'none')

    this.option = Object.assign({}, option)
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
    let mh = this.option.height || this.height / 2

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
                  return this.gradientColorList[Math.floor(d * this.option.gradientNumber)]
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

    if (option.gradientColor) {
      this.gradientColorList = GradientColor(...option.gradientColor, this.option.gradientNumber)
    } else {
      this.gradientColorList = null
    }

    if (option.mirrorY) {
      this.down.style('display', 'block')
    } else {
      this.down.style('display', 'none')
    }
    if (option.reverseY) {
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
