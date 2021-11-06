/**
 * 圆形
 */

import Graph from '../type/graph'

const option = {
  color: '#000000',
  number: 1,
  strokeWidth: 1
}

type Option = typeof option

/**
 * 类
 */
class Circle extends Graph<Option> {
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
        enter => enter.append('circle').attr('fill', 'none').attr('stroke', this.option.color).attr('stroke-width', this.option.strokeWidth),
        update => update.attr('r', d => radius * d),
        exit => exit.remove()
      )
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    Object.assign(this.option, option)

    this.root.selectAll('circle').attr('stroke-width', this.option.strokeWidth)
  }
}

export default Circle
export { Option }
