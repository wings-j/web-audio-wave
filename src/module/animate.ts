/**
 * 动画控制
 */

import { Context } from '../type/context'

/**
 * 状态
 */
enum State {
  stop,
  play,
  pause
}

/**
 * 类
 */
class Animate {
  private callback: (time: number) => void
  private duration: number
  private currentTime = 0
  private accumulateTime = 0
  private lastTime = 0
  private state: State = State.stop
  private timer: number = 0

  /**
   * 构造方法
   * @param callback 回调
   * @param option 选项
   */
  constructor(callback: (time: number) => void, context: Context) {
    this.callback = callback
    this.duration = Math.floor(1000 / context.rate)
  }

  /**
   * 运行
   */
  private run() {
    if (this.state === State.play) {
      this.timer = window.requestAnimationFrame(time => {
        if (this.lastTime !== 0) {
          let delta = time - this.lastTime
          this.currentTime += delta
          this.accumulateTime += delta

          if (this.accumulateTime >= this.duration) {
            this.accumulateTime %= this.duration

            this.callback(this.currentTime)
          }
        }

        this.lastTime = time
        this.run()
      })
    }
  }

  /**
   * 开始
   */
  play() {
    this.state = State.play
    this.run()
  }
  /**
   * 暂停
   */
  pause() {
    this.state = State.pause
    window.cancelAnimationFrame(this.timer)
  }
  /**
   * 停止
   */
  stop() {
    this.state = State.stop
    window.cancelAnimationFrame(this.timer)

    this.currentTime = 0
    this.accumulateTime = 0
    this.lastTime = 0
  }
}

export default Animate
