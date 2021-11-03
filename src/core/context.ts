/**
 * 上下文
 */

import { Type } from '../type/graph'

const context = {
  type: '' as Type,
  audio: null as HTMLAudioElement | null,
  frameRate: 60,
  fftSize: 512,
  svgWidth: '100%',
  svgHeight: '100%',
  viewBoxWidth: 1000,
  viewBoxHeight: 1000
}

Object.freeze(context)

type Context = typeof context

export default context
export { Context }
