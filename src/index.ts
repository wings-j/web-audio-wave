/**
 * index
 */

import context, { Context, Option } from './type/context'
import { merge } from 'lodash-es'
import { Animate } from '@wings-j/web-sdk'
import Visualize, { Option as VisualizeOption } from './core/visualize'
import Audio from './core/audio'

/**
 * 类
 */
class WebAudioWave {
  private context: Context
  private animate: Animate
  private visualize: Visualize
  private audio: Audio | null = null

  get canvas() {
    return this.visualize.canvas
  }

  /**
   * 构造方法
   * @param type 类型
   * @param audio 音频组件
   * @param option 选项
   */
  constructor(type: string, audio: HTMLAudioElement, option?: Option) {
    if (!type) {
      throw new Error('Missing parameter: type')
    }
    if (!type) {
      throw new Error('Missing parameter: audio')
    }

    this.context = merge({}, context, option)
    this.context.type = type
    this.context.audio = audio

    this.visualize = new Visualize(this.context)
    this.animate = new Animate(this.callback.bind(this), 60)
  }

  /**
   * 回调方法
   */
  private callback() {
    this.visualize.update(this.audio?.get() ?? [])
  }

  /**
   * 播放
   */
  play() {
    if (!this.audio && this.context.audio) {
      this.audio = new Audio(this.context) // 因为浏览器的音频权限策略，延迟初始化
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
