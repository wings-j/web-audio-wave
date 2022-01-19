/**
 * 图形
 */
/**
 * 类
 */
declare abstract class Graph<Option extends Record<string, any> = {}> {
    c: CanvasRenderingContext2D;
    width: number;
    height: number;
    option: Option;
    /**
     * 构造方法
     * @param c 绘图环境
     * @param width 宽度
     * @param height 高度
     */
    constructor(c: CanvasRenderingContext2D, width?: number, height?: number, option?: Option);
    /**
     * 绘制
     * @param data 数据。归一化
     */
    abstract draw(data: number[]): void;
    /**
     * 配置
     * @param option 选项
     */
    abstract config(option: Record<string, unknown>): void;
}
export default Graph;
