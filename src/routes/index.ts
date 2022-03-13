import express, { Request, Response } from "express";
import { signin, signup, profile } from "../controllers/auth.controller";
import {
  startBotPair,
  startBotAllCurrencies,
  stopBotPair,
  stopBotAllCurrencies,
} from "../controllers/start.controller";
import { TokenValidation } from "../middlewares/verifyToken";

const router = express.Router();

// define a route handler for the check server
router.get("/health", (req: Request, res: Response, next: Function): void => {
  // response OK
  res.status(200).send("Server OK");
});

// router start pair
router.post("/start-pair", startBotPair);
// route stop pair
router.get("/stop-pair", stopBotPair);
// router start all currencies
router.post("/start-currencies", startBotAllCurrencies);
// router stop all currencies
router.get("/stop-currencies", stopBotAllCurrencies);
// define routes related with session
router.post("/signup", signup);
router.post("/signin", signin);
router.get("/profile", TokenValidation, profile);

export default router;
