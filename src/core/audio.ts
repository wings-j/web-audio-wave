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
 * 获取数据
 * @param analyser 分析器
 * @return 数据
 */
function get(analyser: AnalyserNode) {
  let data = new Uint8Array(analyser.fftSize)
  analyser.getByteFrequencyData(data)
  let output = Array.from(data)
    .map(a => a / max)
    .slice(0, Math.floor(data.length / 2))

  return output
}

/**
 * 分析器
 */
class Analyser {
  private analyser: AnalyserNode

  /**
   * 构造方法
   * @param context 上下文
   * @param analyser 源分析器
   * @param filters 滤波器
   */
  constructor(context: AudioContext, analyser: AnalyserNode, filters?: Filter[]) {
    let nodes: AudioNode[] = []
    nodes.push(analyser)

    if (filters) {
      for (let a of filters) {
        let filter = context.createBiquadFilter()
        filter.type = a[0]
        filter.frequency.value = a[1]
        filter.Q.value = a[2]
        filter.gain.value = a[3]
        nodes.push(filter)
      }
    }

    this.analyser = context.createAnalyser()
    nodes.push(this.analyser)
    for (let i = 0; i < nodes.length - 1; i++) {
      nodes[i].connect(nodes[i + 1])
    }
  }
  /**
   * 获取数据
   */
  get() {
    return get(this.analyser)
  }
}

/**
 * 类
 */
class Audio {
  private context: AudioContext
  private source: MediaElementAudioSourceNode // 头结点
  private analyser: AnalyserNode // 尾结点

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
    return get(this.analyser)
  }
  /**
   * 创建分析器
   * @param filters 滤波器
   * @return 分析器
   */
  create(filters?: Filter[]) {
    return new Analyser(this.context, this.analyser, filters)
  }
}

export default Audio
