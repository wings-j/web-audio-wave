/**
 * 图形
 */

import { Context } from './context'
import Visualize from '../core/visualize'
import Audio from '../core/audio'

/**
 * 类
 */
abstract class Graph<Option extends Record<string, any> = {}> {
  context: Context
  option: Option = {} as Option
  visualize: Visualize
  audio: Audio

  /**
   * 构造方法
   * @param context 上下文
   * @param audio 音频
   * @param visualize 可视化
   */
  constructor(context: Context, visualize: Visualize, audio: Audio) {
    this.context = context
    this.visualize = visualize
    this.audio = audio
  }

  /**
   * 配置
   * @param option 选项
   */
  config(option?: Record<string, unknown>): void {
    Object.assign(this.option, option)
  }
  /**
   * 更新
   */
  abstract update(): void
}

export default Graph
