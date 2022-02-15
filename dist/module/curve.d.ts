/**
 * 曲线
 */
import Graph from '../type/graph';
declare const preset: {
    color: string;
    gradientColor: string[] | null;
    dynamicColor: [string, string] | null;
    width: number;
    mirror: boolean;
    reverse: boolean;
    backforth: boolean;
    smooth: boolean;
};
declare type Option = typeof preset;
/**
 * 类
 */
declare class Curve extends Graph<Option> {
    /**
     * 构造方法
     * @param context 上下文
     * @param audio 音频
     * @param visualize 可视化
     */
    constructor(context: ConstructorParameters<typeof Graph>[0], visualize: ConstructorParameters<typeof Graph>[1], audio: ConstructorParameters<typeof Graph>[2], option?: Option);
    /**
     * 配置
     * @param option 选项
     */
    protected config(option: Partial<Option>): void;
    /**
     * 绘制
     */
    update(): void;
}
export default Curve;
export { Option };
