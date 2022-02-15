/**
 * index
 */
import { Option } from './type/context';
import { Option as BarOption } from './module/bar';
import { Option as CurveOption } from './module/curve';
import { Option as CircleOption } from './module/circle';
declare type GraphOption = Partial<BarOption | CurveOption | CircleOption>;
/**
 * 类
 */
declare class WebAudioWave {
    private context;
    private animate;
    private visualize;
    private audio;
    private graph?;
    get canvas(): HTMLCanvasElement;
    /**
     * 构造方法
     * @param type 类型
     * @param audio 音频组件
     * @param option 选项
     */
    constructor(type: string, audio: HTMLAudioElement, option?: Option, graphOption?: GraphOption);
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
}
export default WebAudioWave;
