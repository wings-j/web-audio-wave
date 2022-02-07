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
 * 类
 */
declare class Audio {
    private size;
    private context;
    private source;
    private analyser;
    private nodes;
    /**
     * 构造方法
     * @param context 上下文
     * @param filters 滤波
     */
    constructor(context: Context, filters?: Filter[]);
    /**
     * 获取数据
     */
    get(): number[];
}
export default Audio;
