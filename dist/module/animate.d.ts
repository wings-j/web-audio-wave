/**
 * 动画控制
 */
import { Context } from '../type/context';
/**
 * 类
 */
declare class Animate {
    private callback;
    private duration;
    private currentTime;
    private accumulateTime;
    private lastTime;
    private state;
    private timer;
    /**
     * 构造方法
     * @param callback 回调
     * @param option 选项
     */
    constructor(callback: (time: number) => void, context: Context);
    /**
     * 运行
     */
    private run;
    /**
     * 开始
     */
    play(): void;
    /**
     * 暂停
     */
    pause(): void;
    /**
     * 停止
     */
    stop(): void;
}
export default Animate;
