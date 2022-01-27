/**
 * 图形
 */
import { Context } from './context';
/**
 * 类
 */
declare abstract class Graph<Option extends Record<string, any> = {}> {
    c: CanvasRenderingContext2D;
    context: Context;
    option: Option;
    get width(): number;
    get height(): number;
    get wrap(): [number, number, number, number];
    /**
     * 构造方法
     * @param c 绘图环境
     * @param width 宽度
     * @param height 高度
     */
    constructor(c: CanvasRenderingContext2D, context: Context, option?: Option);
    /**
     * 绘制
     * @param data 数据。归一化
     */
    abstract draw(data: number[]): void;
    /**
     * 配置
     * @param option 选项
     */
    config(option?: Record<string, unknown>): void;
}
export default Graph;
