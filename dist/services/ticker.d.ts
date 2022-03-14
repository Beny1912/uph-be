import RequestResponse from "../types/request-response";
export declare const getTickerPair: (pair?: string) => Promise<RequestResponse>;
export declare const getTickerByCurrency: (currency?: string) => Promise<RequestResponse>;
