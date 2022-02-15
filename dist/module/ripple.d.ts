/**
 * 波纹
 */
import Graph from '../type/graph';
import { FilterType } from '../core/audio';
declare const preset: {
    color: string;
    dynamicColor: [string, string] | null;
    width: number;
    fill: boolean;
    threshold: number;
    period: number;
    interval: number;
    minRadius: number;
    maxRadius: number;
    timeFunction: (v: number) => number;
    filter: "" | FilterType;
    filterFrequency: number;
    filterQ: number;
    filterGain: number;
};
declare type Option = typeof preset;
/**
 * 类
 */
declare class Ripple extends Graph<Option> {
    private units;
    private count;
    /**
     * 构造方法
     * @param context 上下文
     * @param audio 音频
     * @param visualize 可视化
     */
    constructor(context: ConstructorParameters<typeof Graph>[0], visualize: ConstructorParameters<typeof Graph>[1], audio: ConstructorParameters<typeof Graph>[2], option: Option);
    /**
     * 配置
     * @param option 选项
     */
    protected config(option?: Partial<Option>): void;
    /**
     * 更新
     */
    update(): void;
}
export default Ripple;
export { Option };
