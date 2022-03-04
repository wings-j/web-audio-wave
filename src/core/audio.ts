/**
 * 分析
 */

import { Context } from '../type/context'

const max = 256 // 2**8

/**
 * 类
 */
class Audio {
  private context: Context
  _context: AudioContext
  private source: MediaElementAudioSourceNode // 头结点
  private analyser: AnalyserNode // 尾结点
  private second: AudioNode // 最后第二个结点
  private last: AudioNode // 最后第一个结点

  /**
   * 构造方法
   * @param context 上下文
   */
  constructor(context: Context) {
    this.context = context
    this._context = new AudioContext()
    this.source = this._context.createMediaElementSource(context.audio)
    this.source.connect(this._context.destination)
    this.analyser = this._context.createAnalyser()
    this.analyser.fftSize = context.size * 2 // *2
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

    if (this.context.time) {
      this.analyser.getByteTimeDomainData(data)
    } else {
      this.analyser.getByteFrequencyData(data)
    }

    let d = Array.from(data)
      .slice(0, Math.floor(data.length / 2)) // /2
      .slice(...this.context.slice)
      .map(a => a / max)

    if (this.context.db) {
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
  addGain(value = this.context.gain ?? 1) {
    let gain = this._context.createGain()
    gain.gain.value = value

    this.add(gain)
  }
  /**
   * 添加滤波器
   */
  addFilter(type: BiquadFilterType, frequency: number, q: number, gain = 1) {
    let filter = this._context.createBiquadFilter()
    filter.type = type
    filter.frequency.value = frequency
    filter.Q.value = q
    filter.gain.value = gain

    this.add(filter)
  }
}

export default Audio
