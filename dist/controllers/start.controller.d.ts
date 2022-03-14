import { Request, Response } from "express";
export declare const startBotPair: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const startBotAllCurrencies: (req: Request, res: Response) => Promise<Response<any, Record<string, any>>>;
export declare const stopBotPair: (req: Request, res: Response) => Promise<void>;
export declare const stopBotAllCurrencies: (req: Request, res: Response) => Promise<void>;
