/**
 * 波纹
 */

import Graph from '../type/graph'
import CalcDeltaColor from '../util/calc-delta-color'
import { mean } from 'lodash-es'
import { FilterType } from '../core/audio'

const option = {
  color: '#000000',
  gradientColor: null as string[] | null,
  dynamicColor: null as [string, string] | null,
  width: 1,
  fill: false,
  filter: '' as '' | FilterType,
  filterFrequency: 0,
  filterQ: 0,
  filterGain: 1,
  threshold: 0,
  period: 2, // 扩散时间
  interval: 1 // 时间间隔
}

type Option = typeof option

/**
 * 类
 */
class Ripple extends Graph<Option> {
  get maxRadius() {
    return Math.min(this.context.width, this.context.height) / 2
  }

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
  }

  /**
   * 配置
   * @param option 选项
   */
  config(option?: Partial<Option>) {
    super.config(option)

    let brush = this.visualize.brush
    brush.strokeStyle = this.option.color
    brush.fillStyle = this.option.color
    brush.lineWidth = this.option.width

    if (this.option.gradientColor?.length) {
      let gradient = brush.createRadialGradient(0, 0, 0, 0, 0, this.maxRadius)
      for (let i = 0, l = this.option.gradientColor.length; i < l; i++) {
        gradient.addColorStop((1 / (l - 1)) * i, this.option.gradientColor[i])
      }

      brush.strokeStyle = gradient
      brush.fillStyle = gradient
    }
  }
  /**
   * 更新
   */
  update() {
    let brush = this.visualize.brush
    let data = this.audio?.get() ?? []
  }
}

export default Ripple
export { Option }
