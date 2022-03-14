/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose" />
import { IBot } from "../models/bot.model";
export declare const saveBot: (bot: IBot) => Promise<import("mongoose").Document<unknown, any, IBot> & IBot & {
    _id: import("mongoose").Types.ObjectId;
}>;
