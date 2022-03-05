/**
 * 分析
 */
import { Context } from '../type/context';
/**
 * 类
 */
declare class Audio {
    private context;
    _context: AudioContext;
    private source;
    private analyser;
    private second;
    private last;
    /**
     * 构造方法
     * @param context 上下文
     */
    constructor(context: Context);
    /**
     * 获取数据
     * @return 数据
     */
    get(): number[];
    /**
     * 添加结点
     * @param node 结点
     */
    private add;
    /**
     * 添加增益
     * @param value 值
     */
    addGain(value?: number): void;
    /**
     * 添加滤波器
     */
    addFilter(type: BiquadFilterType, frequency: number, q: number, gain?: number): void;
}
export default Audio;
