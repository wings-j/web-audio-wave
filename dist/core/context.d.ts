/**
 * 上下文
 */
import { Type } from '../type/graph';
declare const context: {
    type: Type;
    audio: HTMLAudioElement | null;
    frameRate: number;
    fftSize: number;
    pow: number;
    svgWidth: string;
    svgHeight: string;
    viewBoxWidth: number;
    viewBoxHeight: number;
};
declare type Context = typeof context;
export default context;
export { Context };
