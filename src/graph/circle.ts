/**
 * 圆形
 */

import Graph from '../type/graph'
import GradientColor from '../util/gradient-color'

const option = {
  color: '#000000',
  gradientColor: null as [string, string] | null,
  gradientColorNumber: 10,
  colorType: 'stroke' as 'stroke' | 'fill',
  number: 1,
  strokeWidth: 1,
  gradientStrokeWidth: null as [number, number] | null,
  gradientStrokeWidthNumber: 10
}

type Option = typeof option

/**
 * 类
 */
class Circle extends Graph<Option> {
  private gradientColorList: string[] | null = null
  private gradientStrokeWidthList: number[] | null = null

  /**
   * 构造方法
   * @param root 根元素
   * @param width 宽度
   * @param height 高度
   */
  constructor(root: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(root, width, height, option)
  }

  /**
   * 绘制
   * @param data 数据。归一化
   */
  draw(data: number[]) {
    let groups: number[] = []
    let length = Math.floor(data.length / this.option.number)
    for (let i = 0, n = this.option.number; i < n; i++) {
      groups[i] = data.slice(i * length, (i + 1) * length).reduce((p, c) => p + c, 0) / length
    }

    let radius = Math.min(this.width, this.height) / 2
    this.root
      .selectAll('circle')
      .data(groups)
      .join(
        enter => enter.append('circle').attr('fill', 'none').attr('stroke', 'none').attr('stroke-width', this.option.strokeWidth),
        update =>
          update
            .attr('r', d => radius * d)
            .attr(this.option.colorType, d => {
              if (this.gradientColorList) {
                return this.gradientColorList[Math.floor(d * this.option.gradientColorNumber)]
              } else {
                return this.option.color
              }
            })
            .attr('stroke-width', d => {
              if (this.gradientStrokeWidthList) {
                return this.gradientStrokeWidthList[Math.floor(d * this.option.gradientStrokeWidthNumber)]
              } else {
                return this.option.strokeWidth
              }
            }),
        exit => exit.remove()
      )
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

    if (this.option.colorType === 'fill') {
      this.root.selectAll('circle').attr('stroke', 'none')
    } else {
      this.root.selectAll('circle').attr('fill', 'none')
    }

    if (this.option.gradientStrokeWidth) {
      this.gradientStrokeWidthList = []

      let d = (this.option.gradientStrokeWidth[1] - this.option.gradientStrokeWidth[0]) / this.option.gradientStrokeWidthNumber
      for (let i = 0; i < this.option.gradientStrokeWidthNumber; i++) {
        this.gradientStrokeWidthList.push(this.option.gradientStrokeWidth[0] + i * d)
      }
    } else {
      this.gradientStrokeWidthList = null
    }
  }
}

export default Circle
export { Option }
