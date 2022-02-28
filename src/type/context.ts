/**
 * 上下文
 */

const context = {
  type: '',
  audio: document.createElement('audio'),
  width: 1024,
  height: 1024,
  rate: 60,
  time: false,
  size: 512,
  gain: 1,
  pow: 1,
  db: false,
  effect: {
    trace: 1
  },
  filter: {
    type: '' as '' | BiquadFilterType,
    frequency: 0,
    q: 0,
    gain: 1
  }
}

Object.freeze(context)

type Context = typeof context
type Option = {
  width?: Context['width']
  height?: Context['height']
  rate?: Context['rate']
  size?: Context['size']
  gain?: Context['gain']
  pow?: Context['pow']
  db?: Context['db']
  effect?: Partial<Context['effect']>
}

export default context
export { Context, Option }
