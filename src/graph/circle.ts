/**
 * 圆形
 */

import Graph from '../type/graph'

const option = {
  color: '#000000',
  colorType: 'stroke' as 'stroke' | 'fill',
  number: 1,
  strokeWidth: 1,
  gradientStrokeWidth: null as [number, number] | null,
  gradientStrokeWidthNumber: 10,
  gradientColor: null as [string, string] | null,
  gradientColorNumber: 10
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
   * @param c 绘图环境
   * @param width 宽度
   * @param height 高度
   */
  constructor(c: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]) {
    super(c, width, height, option)
  }

  /**
   * 绘制
   * @param data 数据。归一化
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

export default Circle
export { Option }
