/**
 * 画曲线
 */

type Point = [number, number]
/**
 * 控制点
 */
interface Control {
  pa: Point
  pb: Point
}

/**
 * 计算控制点
 * @param points 点数组，[{x:float,y:float}]
 * @param i 点索引
 * @param a 系数a
 * @param b 系数b
 * @return 控制点，{pa:{x:float,y:float},pb:{x:float,y:float}}
 */
function calcControlPoint(points: Point[], i: number, a: number, b: number): Control {
  let pax
  let pay
  if (i < 1) {
    //处理极端情形
    pax = points[0][0] + (points[1][0] - points[0][0]) * a
    pay = points[0][1] + (points[1][1] - points[0][1]) * a
  } else {
    pax = points[i][0] + (points[i + 1][0] - points[i - 1][0]) * a
    pay = points[i][1] + (points[i + 1][1] - points[i - 1][1]) * a
  }
  let pbx
  let pby
  if (i > points.length - 3) {
    //处理极端情形
    let last = points.length - 1
    pbx = points[last][0] - (points[last][0] - points[last - 1][0]) * b
    pby = points[last][1] - (points[last][1] - points[last - 1][1]) * b
  } else {
    pbx = points[i + 1][0] - (points[i + 2][0] - points[i][0]) * b
    pby = points[i + 1][1] - (points[i + 2][1] - points[i][1]) * b
  }

  return { pa: [pax, pay], pb: [pbx, pby] }
}

/**
 * 函数
 * @param points 点数组
 * @param type 类型
 * @param a 系数a。可省略
 * @param b 系数b。可省略
 * @return 路径
 */
function generatePath(points: Point[], type?: 'bezier', { a = 0.25, b = 0.25 } = {}) {
  let path = new Path2D()

  path.moveTo(points[0][0], points[0][1])
  for (let i = 1, l = points.length; i < l; i++) {
    if (type === 'bezier') {
      let ctrlPoint = calcControlPoint(points, i - 1, a, b)
      path.bezierCurveTo(ctrlPoint.pa[0], ctrlPoint.pa[1], ctrlPoint.pb[0], ctrlPoint.pb[1], points[i][0], points[i][1])
    } else {
      path.lineTo(points[i][0], points[i][1])
    }
  }

  return path
}

export default generatePath
