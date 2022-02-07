/**
 * 分析
 */

import { Context } from '../type/context'

/**
 * 滤波类型
 */
enum Type {
  lowpass = 'lowpass',
  highpass = 'highpass',
  bandpass = 'bandpass',
  lowshelf = 'lowshelf',
  highshelf = 'highshelf',
  peaking = 'peaking',
  notch = 'notch',
  allpass = 'allpass'
}
/**
 * 滤波器
 */
type Filter = [Type, number, number, number] // 类型，频率，Q，增益

const max = 256 // 2**8

/**
 * 类
 */
class Audio {
  private size: number
  private context: AudioContext
  private source: MediaElementAudioSourceNode // 头结点
  private analyser: AnalyserNode // 尾结点
  private nodes: AudioNode[]

  /**
   * 构造方法
   * @param context 上下文
   * @param filters 滤波
   */
  constructor(context: Context, filters?: Filter[]) {
    this.size = context.size
    this.context = new AudioContext()

    this.source = this.context.createMediaElementSource(context.audio)
    this.source.connect(this.context.destination)
    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = this.size

    this.nodes = [this.source]

    if (context.gain !== 1) {
      let gain = this.context.createGain()
      gain.gain.value = context.gain
      this.nodes.push(gain)
    }
    if (filters) {
      for (let a of filters) {
        let filter = this.context.createBiquadFilter()
        filter.type = a[0]
        filter.frequency.value = a[1]
        filter.Q.value = a[2]
        filter.gain.value = a[3]
        this.nodes.push(filter)
      }
    }

    this.nodes.push(this.analyser)
    for (let i = 0; i < this.nodes.length - 1; i++) {
      this.nodes[i].connect(this.nodes[i + 1])
    }
  }

  /**
   * 获取数据
   */
  get() {
    let data = new Uint8Array(this.size)
    this.analyser.getByteFrequencyData(data)
    let output = Array.from(data).map(a => a / max)

    return output
  }
}

export default Audio
