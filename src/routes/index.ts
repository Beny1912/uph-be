import express, { Request, Response } from "express";

const router = express.Router();

// define a route handler for the check server
router.get("/health", (req: Request, res: Response, next: Function): void => {
  // response OK
  res.status(200).send("Server OK");
});

export default router;
