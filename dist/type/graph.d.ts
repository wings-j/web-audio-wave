/**
 * 图形
 */
import { Context } from './context';
import Visualize from '../core/visualize';
import Audio from '../core/audio';
/**
 * 类
 */
declare abstract class Graph<Option extends Record<string, any> = {}> {
    context: Context;
    option: Option;
    visualize: Visualize;
    audio?: Audio;
    /**
     * 构造方法
     * @param context 上下文
     * @param audio 音频
     * @param visualize 可视化
     * @param option 选项
     */
    constructor(context: Context, visualize: Visualize, audio?: Audio, option?: Option);
    /**
     * 配置
     * @param option 选项
     */
    config(option?: Record<string, unknown>): void;
    /**
     * 更新
     */
    abstract update(): void;
}
export default Graph;
