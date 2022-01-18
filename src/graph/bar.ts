/**
 * 柱形
 */

import Graph from '../type/graph'
import GradientColor from '../util/gradient-color'

const option = {
  color: '#000000',
  gap: 0,
  mirrorX: false,
  mirrorY: false,
  reverseX: false,
  reverseY: false,
  gradientColor: null as [string, string] | null,
  gradientColorNumber: 10
}

type Option = typeof option

/**
 * 类
 */
class Bar extends Graph<Option> {
  /**
   * 构造方法
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  constructor(c: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(c, width, height, option)
  }

  /**
   * 绘制
   * @name data 数据
   */
  draw(data: number[]) {}
  /**
   * 配置
   * @param option 选项
   */
  config(option: Partial<Option>) {
    Object.assign(this.option, option)
  }
}

export default Bar
export { Option }
