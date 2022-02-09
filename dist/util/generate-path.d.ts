/**
 * 画曲线
 */
declare type Point = [number, number];
/**
 * 函数
 * @param points 点数组
 * @param type 类型
 * @param a 系数a。可省略
 * @param b 系数b。可省略
 * @return 路径
 */
declare function generatePath(points: Point[], type?: 'bezier', { a, b }?: {
    a?: number | undefined;
    b?: number | undefined;
}): Path2D;
export default generatePath;
