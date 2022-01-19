/**
 * 上下文
 */
declare const context: {
    type: string;
    audio: HTMLAudioElement | null;
    rate: number;
    size: number;
    pow: number;
    width: number;
    height: number;
};
declare type Context = typeof context;
declare type Option = Partial<Context['audio' | 'rate' | 'size' | 'width' | 'height']>;
export default context;
export { Context, Option };
