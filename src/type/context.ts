/**
 * 上下文
 */

const context = {
  type: '',
  audio: document.createElement('audio'),
  rate: 60,
  size: 512,
  gain: 1,
  pow: 1,
  width: 1024,
  height: 1024,
  effect: {
    trace: 1
  }
}

Object.freeze(context)

type Context = typeof context
type Option = {
  rate?: Context['rate']
  size?: Context['size']
  width?: Context['width']
  height?: Context['height']
  effect?: Partial<Context['effect']>
}

export default context
export { Context, Option }
