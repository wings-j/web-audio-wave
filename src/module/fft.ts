/**
 * FFT
 */

import { Context } from '../core/context'

/**
 * 类
 */
class Fft {
  private size: number
  private analyser: AnalyserNode

  /**
   * 构造方法
   * @param audio 音频组件
   * @param size 采样宽度。2的幂
   */
  constructor(context: Context) {
    this.size = context.fftSize

    let audioContext = new AudioContext()
    let source = audioContext.createMediaElementSource(context.audio!)
    let analyser = audioContext.createAnalyser()
    this.analyser = analyser
    source.connect(analyser)
    analyser.connect(audioContext.destination)
    analyser.fftSize = context.fftSize
  }

  /**
   * 获取数据
   */
  get() {
    let data = new Uint8Array(this.size)
    this.analyser.getByteFrequencyData(data)

    const max = 256 // 2**8
    let output = Array.from(data).map(a => a / max)

    return output
  }
}

export default Fft
