/**
 * 上下文
 */
declare const context: {
    type: string;
    audio: HTMLAudioElement;
    rate: number;
    size: number;
    gain: number;
    pow: number;
    width: number;
    height: number;
    effect: {
        trace: number;
    };
};
declare type Context = typeof context;
declare type Option = {
    rate?: Context['rate'];
    size?: Context['size'];
    width?: Context['width'];
    height?: Context['height'];
    effect?: Partial<Context['effect']>;
};
export default context;
export { Context, Option };
