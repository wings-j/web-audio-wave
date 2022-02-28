/**
 * index
 */

import context, { Context, Option } from './type/context'
import Graph from './type/graph'
import Bar, { Option as BarOption } from './module/bar'
import Curve, { Option as CurveOption } from './module/curve'
import Circle, { Option as CircleOption } from './module/circle'
import Ripple, { Option as RippleOption } from './module/ripple'
import { merge } from 'lodash-es'
import { Animate } from '@wings-j/web-sdk'
import Visualize from './core/visualize'
import Audio from './core/audio'

type GraphOption = Partial<BarOption | CurveOption | CircleOption>

/**
 * 类
 */
class WebAudioWave {
  private context: Context
  private animate: Animate
  private visualize: Visualize
  private audio: Audio
  private graph?: Graph

  get canvas() {
    return this.visualize.canvas
  }

  /**
   * 构造方法
   * @param type 类型
   * @param audio 音频组件
   * @param option 选项
   */
  constructor(type: string, audio: HTMLAudioElement, option?: Option, graphOption?: GraphOption) {
    if (!type) {
      throw new Error('Missing parameter: type')
    }
    if (!type) {
      throw new Error('Missing parameter: audio')
    }

    this.context = merge({}, context, option)
    this.context.type = type
    this.context.audio = audio

    this.animate = new Animate(this.callback.bind(this), this.context.rate)
    this.visualize = new Visualize(this.context)
    this.audio = new Audio(this.context)

    if (this.context.filter.type) {
      this.audio.addFilter(this.context.filter.type, this.context.filter.frequency, this.context.filter.q, this.context.filter.gain)
    }

    if (this.context.type === 'bar') {
      this.graph = new Bar(this.context, this.visualize, this.audio, graphOption as BarOption)
    } else if (this.context.type === 'curve') {
      this.graph = new Curve(this.context, this.visualize, this.audio, graphOption as CurveOption)
    } else if (this.context.type === 'circle') {
      this.graph = new Circle(this.context, this.visualize, this.audio, graphOption as CircleOption)
    } else if (this.context.type === 'ripple') {
      this.graph = new Ripple(this.context, this.visualize, this.audio, graphOption as RippleOption)
    }

    audio.addEventListener('play', () => {
      this.play()
    })
    audio.addEventListener('pause', () => {
      this.stop()
    })
  }

  /**
   * 回调方法
   */
  private callback() {
    this.graph?.update()
  }

  /**
   * 播放
   */
  play() {
    this.audio._context.resume()
    this.animate.play()
  }
  /**
   * 停止
   */
  stop() {
    this.animate.stop()
  }
}

export default WebAudioWave
