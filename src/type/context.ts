/**
 * 上下文
 */

const context = {
  type: '',
  audio: null as HTMLAudioElement | null,
  rate: 60,
  size: 512,
  pow: 1,
  width: 1024,
  height: 1024
}

Object.freeze(context)

type Context = typeof context
type Option = Partial<Context['audio' | 'rate' | 'size' | 'width' | 'height']>

export default context
export { Context, Option }
