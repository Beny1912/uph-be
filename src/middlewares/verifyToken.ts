import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface IPayload {
  _id: string;
  iat: number;
}

export const TokenValidation = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    let token = req.get("authorization");
    if (!token) return res.status(401).json("Access Denied");
    // Clear Berear
    token = token.replace(/^Bearer\s+/, "");

    const payload = jwt.verify(
      token,
      process.env["TOKEN_SECRET"] || "uphold"
    ) as IPayload;
    req.params.id = payload._id;
    next();
  } catch (e) {
    res.status(400).send("Invalid Token");
  }
};
