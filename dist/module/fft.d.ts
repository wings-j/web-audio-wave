/**
 * FFT
 */
import { Context } from '../type/context';
/**
 * 类
 */
declare class Fft {
    private size;
    private pow;
    private analyser;
    /**
     * 构造方法
     * @param audio 音频组件
     * @param size 采样宽度。2的幂
     */
    constructor(context: Context);
    /**
     * 获取数据
     */
    get(): number[];
}
export default Fft;
