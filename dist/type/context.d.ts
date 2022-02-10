/**
 * 上下文
 */
declare const context: {
    type: string;
    audio: HTMLAudioElement;
    width: number;
    height: number;
    rate: number;
    size: number;
    gain: number;
    pow: number;
    db: boolean;
    effect: {
        trace: number;
    };
};
declare type Context = typeof context;
declare type Option = {
    width?: Context['width'];
    height?: Context['height'];
    rate?: Context['rate'];
    size?: Context['size'];
    gain?: Context['gain'];
    pow?: Context['pow'];
    db?: Context['db'];
    effect?: Partial<Context['effect']>;
};
export default context;
export { Context, Option };
