/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
export interface IBot {
    initialAsk: number;
    ask: number;
    initialBid: number;
    bid: number;
    pair: string;
    currency: string;
    time: string;
    diff: number;
    diffPercent: number;
    type: string;
}
declare const _default: import("mongoose").Model<IBot, {}, {}, {}>;
export default _default;
