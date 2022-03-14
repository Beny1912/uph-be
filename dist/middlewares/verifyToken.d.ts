import { Request, Response, NextFunction } from "express";
export interface IPayload {
    _id: string;
    iat: number;
}
export declare const TokenValidation: (req: Request, res: Response, next: NextFunction) => Response<any, Record<string, any>>;
