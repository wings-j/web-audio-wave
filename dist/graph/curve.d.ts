/**
 * 曲线
 */
import Graph from '../type/graph';
declare const option: {
    color: string;
    width: number;
    mirror: boolean;
    reverse: boolean;
    gradientColor: string[] | null;
    dynamicColor: [string, string] | null;
};
declare type Option = typeof option;
/**
 * 类
 */
declare class Curve extends Graph<Option> {
    /**
     * 构造方法
     * @param c 绘图环境
     * @param width 宽度
     * @param height 高度
     */
    constructor(c: ConstructorParameters<typeof Graph>[0], width?: ConstructorParameters<typeof Graph>[1], height?: ConstructorParameters<typeof Graph>[2]);
    /**
     * 绘制
     * @param data 数据。归一化
     */
    draw(data: number[]): void;
    /**
     * 配置
     * @param option 选项
     */
    config(option: Partial<Option>): void;
}
export default Curve;
export { Option };
