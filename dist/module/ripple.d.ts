/**
 * 波纹
 */
import Graph from '../type/graph';
import { FilterType } from '../core/audio';
declare const option: {
    color: string;
    gradientColor: string[] | null;
    dynamicColor: [string, string] | null;
    width: number;
    fill: boolean;
    filter: "" | FilterType;
    filterFrequency: number;
    filterQ: number;
    filterGain: number;
    threshold: number;
    period: number;
    interval: number;
};
declare type Option = typeof option;
/**
 * 类
 */
declare class Ripple extends Graph<Option> {
    get maxRadius(): number;
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
export default Ripple;
export { Option };
