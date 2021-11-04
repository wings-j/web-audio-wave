/**
 * 曲线
 */

import Graph from '../type/graph'
import * as D3 from 'd3'

const option = {
  color: 'hsl(0,0%,0%)',
  reverse: false
}

type Option = typeof option

/**
 * 类
 */
class Curve extends Graph {
  option: Option
  path: D3.Selection<SVGPathElement, any, any, any>

  /**
   * 构造方法
   * @param root 根元素
   * @param width 宽度
   * @param height 高度
   */
  constructor(root: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(root, width, height)

    this.path = root.append('path')

    this.option = Object.assign({}, option)
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
    let direction = 1
    let pathD = `M ${-this.width / 2},0`
    for (let a of d) {
      pathD += ` l ${dw},${direction * a * halfHeight}`
      direction *= -1
    }

    this.path.attr('d', pathD)
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Record<string, unknown>) {}
}

export default Curve
export { Option }
