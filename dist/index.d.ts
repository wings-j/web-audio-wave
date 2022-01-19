import { Option } from './type/context';
import { Option as VisualizeOption } from './module/visualize';
/**
 * 类
 */
declare class WebAudioWave {
    private context;
    private animate;
    private visualize;
    private fft;
    get canvas(): HTMLCanvasElement;
    /**
     * 构造方法
     * @param type 类型
     * @param audio 音频组件
     * @param option 选项
     */
    constructor(type: string, audio: HTMLAudioElement, option?: Option);
    /**
     * 回调方法
     */
    private callback;
    /**
     * 播放
     */
    play(): void;
    /**
     * 停止
     */
    stop(): void;
    /**
     * 配置
     * @param option 选项
     */
    config(option: VisualizeOption): void;
}
export default WebAudioWave;
