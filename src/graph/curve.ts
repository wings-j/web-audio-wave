/**
 * 曲线
 */

import Graph from '../type/graph'
import * as D3 from 'd3'

const option = {
  style: 'line',
  color: 'hsl(0,0%,0%)',
  reverse: false
}

type Option = typeof option

/**
 * 直线
 * @param x 横坐标
 * @param y 纵坐标
 */
function line(x: number, y: number) {
  return `L ${x},${y}`
}
/**
 * 贝赛尔曲线
 * @param x 横坐标
 * @param y 纵坐标
 */
const bezier = (() => {
  let lastX = 0
  let lastY = 0

  return function (x: number, y: number) {
    let s = `Q ${(lastX + x) / 2},${(lastY + y) / 2} ${x},${y}`

    lastX = x
    lastY = y

    return s
  }
})()

/**
 * 类
 */
class Curve extends Graph<Option> {
  private path: D3.Selection<SVGPathElement, any, any, any>
  private styles: { [index: string]: (x: number, y: number) => void } = { line, bezier }

  /**
   * 构造方法
   * @param root 根元素
   * @param width 宽度
   * @param height 高度
   */
  constructor(root: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(root, width, height)

    this.path = root.append('path').attr('fill', 'none')

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
    let startX = -this.width / 2
    let direction = 1
    let pathD = `M ${startX},0`
    let style = this.styles[this.option.style]
    for (let i = 0, l = d.length; i < l; i++) {
      let x = startX + dw * i
      let y = direction * d[i] * halfHeight

      pathD += ` ${style(x, y)}`
      direction *= -1
    }

    this.path.attr('d', pathD)
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Option) {
    Object.assign(this.option, option)

    this.path.attr('stroke', option.color)
  }
}

export default Curve
export { Option }
