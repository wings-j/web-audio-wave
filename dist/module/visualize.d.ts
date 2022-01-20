/**
 * 可视化
 */
import { Context } from '../type/context';
import Graph from '../type/graph';
import { Option as BarOption } from '../graph/bar';
import { Option as CurveOption } from '../graph/curve';
import { Option as CircleOption } from '../graph/circle';
declare type Option = Partial<BarOption | CurveOption | CircleOption>;
/**
 * 类
 */
declare class Visualize {
    context: Context;
    wrap: [number, number, number, number];
    canvas: HTMLCanvasElement;
    c: CanvasRenderingContext2D;
    offscreen: HTMLCanvasElement;
    o: CanvasRenderingContext2D;
    graph?: Graph;
    /**
     * 构造方法
     * @param context 上下文
     */
    constructor(context: Context);
    /**
     * 更新
     * @param data 数据
     */
    update(data: number[]): void;
    /**
     * 配置
     * @param option 选项
     */
    config(option: Option): void;
}
export default Visualize;
export { Option };
