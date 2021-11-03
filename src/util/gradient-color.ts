/**
 * 渐变颜色
 */

/**
 * 方法
 * @param start 起始颜色
 * @param end 停止颜色
 * @param n 阶段数量
 * @return 颜色数组
 */
function gradientColor(start: string, end: string, n: number) {
  n--

  let sr = parseInt(start.slice(1, 3), 16)
  let sg = parseInt(start.slice(3, 5), 16)
  let sb = parseInt(start.slice(5, 7), 16)
  let er = parseInt(end.slice(1, 3), 16)
  let eg = parseInt(end.slice(3, 5), 16)
  let eb = parseInt(end.slice(5, 7), 16)

  let dr = (er - sr) / n
  let dg = (eg - sg) / n
  let db = (eb - sb) / n
  let result: string[] = []
  for (let i = 0; i < n; i++) {
    let r = Math.round(sr + i * dr)
      .toString(16)
      .padStart(2, '0')
    let g = Math.round(sg + i * dg)
      .toString(16)
      .padStart(2, '0')
    let b = Math.round(sb + i * db)
      .toString(16)
      .padStart(2, '0')

    result.push(`#${r}${g}${b}`)
  }
  result.push(end)

  return result
}

export default gradientColor
