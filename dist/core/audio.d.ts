/**
 * 分析
 */
import { Context } from '../type/context';
/**
 * 类
 */
declare class Audio {
    /**
     * 获取数据
     * @param analyser 分析器
     * @return 数据
     */
    static get(analyser: AnalyserNode): number[];
    context: AudioContext;
    source: MediaElementAudioSourceNode;
    analyser: AnalyserNode;
    /**
     * 构造方法
     * @param context 上下文
     */
    constructor(context: Context);
    /**
     * 获取数据
     */
    get(): number[];
}
export default Audio;
