/**
 * 分析
 */
import { Context } from '../type/context';
/**
 * 滤波类型
 */
declare enum Type {
    lowpass = "lowpass",
    highpass = "highpass",
    bandpass = "bandpass",
    lowshelf = "lowshelf",
    highshelf = "highshelf",
    peaking = "peaking",
    notch = "notch",
    allpass = "allpass"
}
/**
 * 滤波器
 */
declare type Filter = [Type, number, number, number];
/**
 * 分析器
 */
declare class Analyser {
    private analyser;
    /**
     * 构造方法
     * @param context 上下文
     * @param analyser 源分析器
     * @param filters 滤波器
     */
    constructor(context: AudioContext, analyser: AnalyserNode, filters?: Filter[]);
    /**
     * 获取数据
     */
    get(): number[];
}
/**
 * 类
 */
declare class Audio {
    private context;
    private source;
    private analyser;
    /**
     * 构造方法
     * @param context 上下文
     */
    constructor(context: Context);
    /**
     * 获取数据
     */
    get(): number[];
    /**
     * 创建分析器
     * @param filters 滤波器
     * @return 分析器
     */
    create(filters?: Filter[]): Analyser;
}
export default Audio;
export { Analyser };
