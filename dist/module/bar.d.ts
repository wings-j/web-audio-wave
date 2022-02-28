/**
 * 柱形
 */
import Graph from '../type/graph';
declare const preset: {
    color: string;
    gradientColor: string[] | null;
    dynamicColor: [string, string] | null;
    gap: number;
};
declare type Option = typeof preset;
/**
 * 类
 */
declare class Bar extends Graph<Option> {
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
    config(option?: Partial<Option>): void;
    /**
     * 更新
     */
    update(): void;
}
export default Bar;
export { Option };
