import Option from './type/option'
import context, { Context } from './core/context'
import { Type } from './type/graph'
import Fft from './module/fft'
import Animate from './module/animate'
import Visualize, { Option as VisualizeOption } from './module/visualize'

/**
 * 类
 */

class WebAudioWave {
  private context: Context
  private animate: Animate
  private visualize: Visualize
  private fft: Fft | null = null

  get svg() {
    return this.visualize.svg
  }

  /**
   * 构造方法
   * @param type 类型
   * @param audio 音频组件
   * @param option 选项
   */
  constructor(type: Type, audio: HTMLAudioElement, option?: Option) {
    if (!type) {
      throw new Error('Missing parameter: type')
    }
    if (!type) {
      throw new Error('Missing parameter: audio')
    }

    this.context = Object.assign({}, context, option)
    this.context.type = type
    this.context.audio = audio

    this.visualize = new Visualize(this.context)
    this.animate = new Animate(this.callback.bind(this), this.context)
  }

  /**
   * 回调方法
   */
  private callback() {
    this.visualize.update(this.fft?.get() ?? [])
  }

  /**
   * 播放
   */
  play() {
    if (!this.fft) {
      this.fft = new Fft(this.context) // 因为浏览器的音频权限策略，延迟初始化
    }

    this.animate.play()
  }
  /**
   * 停止
   */
  stop() {
    this.animate.stop()
  }
  /**
   * 配置
   * @param option 选项
   */
  config(option: VisualizeOption) {
    this.visualize.config(option)
  }
}

export default WebAudioWave
