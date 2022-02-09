/**
 * 画曲线
 */
declare type Point = [number, number];
/**
 * 函数
 * @param context Canvas绘图环境
 * @param points 点数组。[{x,y}]
 * @param a 系数a。可省略
 * @param b 系数b。可省略
 * @return 路径
 */
declare function drawDerivableCurve(points: Point[], a?: number, b?: number): Path2D;
export default drawDerivableCurve;
