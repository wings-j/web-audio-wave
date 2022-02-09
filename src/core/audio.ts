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
  /**
   * 获取数据
   * @param analyser 分析器
   * @return 数据
   */
  static get(analyser: AnalyserNode) {
    let data = new Uint8Array(analyser.fftSize)
    analyser.getByteFrequencyData(data)
    let output = Array.from(data)
      .map(a => a / max)
      .slice(0, Math.floor(data.length / 2))

    return output
  }

  context: AudioContext
  source: MediaElementAudioSourceNode // 头结点
  analyser: AnalyserNode // 尾结点

  /**
   * 构造方法
   * @param context 上下文
   */
  constructor(context: Context) {
    this.context = new AudioContext()
    this.source = this.context.createMediaElementSource(context.audio)
    this.source.connect(this.context.destination)
    this.analyser = this.context.createAnalyser()
    this.analyser.fftSize = context.size

    let nodes: AudioNode[] = []
    nodes.push(this.source)
    let gain = this.context.createGain()
    gain.gain.value = context.gain
    nodes.push(gain)
    nodes.push(this.analyser)
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].connect(nodes[i + 1])
    }
  }

  /**
   * 获取数据
   */
  get() {
    return Audio.get(this.analyser)
  }
}

export default Audio
