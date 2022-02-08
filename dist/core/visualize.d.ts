/**
 * 可视化
 */
import { Context } from '../type/context';
/**
 * 类
 */
declare class Visualize {
    private context;
    private c;
    private offscreen;
    private o;
    canvas: HTMLCanvasElement;
    get wrap(): [number, number, number, number];
    get brush(): CanvasRenderingContext2D;
    /**
     * 构造方法
     * @param context 上下文
     */
    constructor(context: Context);
    /**
     * 更新
     * @param draw 绘制
     */
    update(draw: () => void): void;
}
export default Visualize;
