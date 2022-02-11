/**
 * 柱形
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'

const option = {
  color: '#000000',
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null,
  gap: 0
}

type Option = typeof option

/**
 * 类
 */
class Bar extends Graph<Option> {
  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  constructor(
    context: ConstructorParameters<typeof Graph>[0],
    visualize: ConstructorParameters<typeof Graph>[1],
    audio: ConstructorParameters<typeof Graph>[2]
  ) {
    super(context, visualize, audio)

    this.config(option)
  }

  /**
   * 配置
   * @param option 选项
   */
  config(option?: Partial<Option>) {
    super.config(option)

    this.visualize.brush.fillStyle = this.option.color

    if (this.option.gradientColor?.length) {
      let gradient = this.visualize.brush.createLinearGradient(this.visualize.wrap[0], 0, this.visualize.wrap[0] + this.visualize.wrap[2], 0)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      this.visualize.brush.fillStyle = gradient
    }
  }
  /**
   * 更新
   */
  update() {
    let data = Array.from(this.audio?.get() ?? [])

    this.visualize.update(() => {
      let length = data.length
      let width = this.context.width / length
      for (let i = 0; i < length; i++) {
        let x = -this.context.width / 2 + i * width
        let y = this.context.height / 2
        let w = width - this.option.gap
        let h = -(data[i] * this.context.height)

        if (this.option.dynamicColor?.length === 2) {
          this.visualize.brush.fillStyle = CalcDeltaColor(this.option.dynamicColor[0], this.option.dynamicColor[1], data[i])
        }

        this.visualize.brush.fillRect(x, y, w, h)
      }
    })
  }
}

export default Bar
export { Option }
