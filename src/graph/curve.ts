/**
 * 曲线
 */

import Graph from '../type/graph'
import * as D3 from 'd3'
import GradientColor from '../util/gradient-color'

const option = {
  color: '#000000',
  gradientColor: null as [string, string] | null,
  gradientNumber: 10,
  gradientType: 'amplitude' as 'frequency' | 'amplitude',
  reverse: false,
  strokeWidth: 1
}
const linearGradientId = 'web-audio-wave_curve_linear-gradient'

type Option = typeof option

/**
 * 类
 */
class Curve extends Graph<Option> {
  private path: D3.Selection<SVGPathElement, any, any, any>
  private linearGradient: D3.Selection<SVGLinearGradientElement, any, any, any>
  private gradientColorList: string[] | null = null

  /**
   * 构造方法
   * @param root 根元素
   * @param width 宽度
   * @param height 高度
   */
  constructor(root: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(root, width, height, option)

    this.path = root.append('path').attr('fill', 'none').attr('stroke-width', this.option.strokeWidth)
    this.linearGradient = root
      .append('defs')
      .append('linearGradient')
      .attr('id', linearGradientId)
      .attr('x1', '0%')
      .attr('y1', '0%')
      .attr('x2', '100%')
      .attr('y2', '0%')
  }

  /**
   * 绘制
   * @param data 数据。归一化
   */
  draw(data: number[]) {
    let d
    if (this.option.reverse) {
      d = Array.from(data).concat(data.reverse())
    } else {
      let origin = Array.from(data)
      d = data.reverse().concat(origin)
    }

    let dw = this.width / d.length
    let halfHeight = this.height / 2
    let startX = -this.width / 2
    let direction = 1
    let pathD = `M ${startX},0`
    let sum = 0
    for (let i = 0, l = d.length; i < l; i++) {
      let x = startX + dw * i
      let y = direction * d[i] * halfHeight

      pathD += ` L ${x},${y}`
      direction *= -1
      sum += d[i]
    }

    this.path.attr('d', pathD)
    if (this.option.gradientType === 'amplitude' && this.gradientColorList) {
      this.path.attr('stroke', this.gradientColorList[Math.floor((sum / d.length) * this.option.gradientNumber)])
    }
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    Object.assign(this.option, option)

    if (this.option.gradientColor) {
      this.gradientColorList = GradientColor(...this.option.gradientColor, this.option.gradientNumber)

      this.linearGradient.selectChildren().remove()
      this.linearGradient
        .append('stop')
        .attr('stop-color', this.option.gradientColor?.[0] ?? this.option.color)
        .attr('offset', '0%')
      this.linearGradient
        .append('stop')
        .attr('stop-color', this.option.gradientColor?.[1] ?? this.option.color)
        .attr('offset', '100%')
    }

    this.path.attr('stroke', this.option.color) // default

    if (this.option.gradientColor && this.option.gradientType === 'frequency') {
      this.path.attr('stroke', `url(#${linearGradientId})`)
    }

    this.path.attr('stroke-width', this.option.strokeWidth)
  }
}

export default Curve
export { Option }
