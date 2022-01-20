/**
 * 计算中间颜色
 */

/**
 * 方法
 * @param start 起始颜色
 * @param end 停止颜色
 * @param delta 变化比例
 * @return 颜色
 */
function calcDeltaColor(start: string, end: string, delta: number) {
  let sr = parseInt(start.slice(1, 3), 16)
  let sg = parseInt(start.slice(3, 5), 16)
  let sb = parseInt(start.slice(5, 7), 16)
  let er = parseInt(end.slice(1, 3), 16)
  let eg = parseInt(end.slice(3, 5), 16)
  let eb = parseInt(end.slice(5, 7), 16)
  let dr = er - sr
  let dg = eg - sg
  let db = eb - sb

  let result = `#${Math.round(sr + delta * dr)
    .toString(16)
    .padStart(2, '0')}${Math.round(sg + delta * dg)
    .toString(16)
    .padStart(2, '0')}${Math.round(sb + delta * db)
    .toString(16)
    .padStart(2, '0')}`

  return result
}

export default calcDeltaColor
