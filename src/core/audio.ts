/**
 * 分析
 */

import { Context } from '../type/context'

const max = 256 // 2**8

type FilterType = 'highpass' | 'bandpass' | 'lowshelf' | 'highshelf' | 'peaking' | 'notch' | 'allpass'

/**
 * 类
 */
class Audio {
  private _context: Context
  private context: AudioContext
  private source: MediaElementAudioSourceNode // 头结点
  private analyser: AnalyserNode // 尾结点
  private second: AudioNode // 最后第二个结点
  private last: AudioNode // 最后第一个结点

  /**
   * 构造方法
   * @param context 上下文
   */
  constructor(context: Context) {
    this._context = context
    this.context = new AudioContext()
    this.source = this.context.createMediaElementSource(context.audio)
    this.source.connect(this.context.destination)
    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = context.size
    this.source.connect(this.analyser)

    this.second = this.source
    this.last = this.analyser

    if (context.gain !== 1) {
      this.addGain()
    }
  }

  /**
   * 获取数据
   * @return 数据
   */
  get() {
    let data = new Uint8Array(this.analyser.fftSize)
    this.analyser.getByteFrequencyData(data)
    let d = Array.from(data)
      .map(a => a / max)
      .slice(0, Math.floor(data.length / 2))

    if (this._context.db) {
      d = d.map(a => Math.min(1 + Math.log10(a), 1))
    }

    return d
  }
  /**
   * 添加结点
   * @param node 结点
   */
  private add(node: AudioNode) {
    this.second.disconnect(this.last)
    this.second.connect(node)
    node.connect(this.last)
    this.second = node
  }
  /**
   * 添加增益
   * @param value 值
   */
  addGain(value = this._context.gain) {
    let gain = this.context.createGain()
    gain.gain.value = value

    this.add(gain)
  }
  /**
   * 添加滤波器
   */
  addFilter(type: 'highpass' | 'bandpass' | 'lowshelf' | 'highshelf' | 'peaking' | 'notch' | 'allpass', frequency: number, q: number, gain = 1) {
    let filter = this.context.createBiquadFilter()
    filter.type = type
    filter.frequency.value = frequency
    filter.Q.value = q
    filter.gain.value = gain

    this.add(filter)
  }
}

export default Audio
export { FilterType }
