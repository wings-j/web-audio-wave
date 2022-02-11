/**
 * 圆形
 */
import Graph from '../type/graph';
declare const option: {
    color: string;
    gradientColor: string[] | null;
    dynamicColor: [string, string] | null;
    width: number;
    fill: boolean;
    average: boolean;
};
declare type Option = typeof option;
/**
 * 类
 */
declare class Circle extends Graph<Option> {
    private get maxRadius();
    /**
     * 构造方法
     * @param context 上下文
     * @param audio 音频
     * @param visualize 可视化
     */
    constructor(context: ConstructorParameters<typeof Graph>[0], visualize: ConstructorParameters<typeof Graph>[1], audio: ConstructorParameters<typeof Graph>[2]);
    /**
     * 配置
     * @param option 选项
     */
    config(option?: Partial<Option>): void;
    /**
     * 更新
     */
    update(): void;
}
export default Circle;
export { Option };
