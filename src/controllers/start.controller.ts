import { Request, Response } from "express";
import Bot from "../helpers/bot";
import BotCurrency from "../types/bot-currency-request";
import BotPair from "../types/bot-pair-request";
import { pairValidation, currencyValidation } from "../validations";

export const startBotPair = async (req: Request, res: Response) => {
  //Validation
  const { error } = pairValidation(req.body);
  if (error) return res.status(400).json(error.message);

  const bot: BotPair = req.body;

  const percentDiff: number = bot.percentDiff || 0.01;
  const pair: string = bot.pair || "BTC-USD";
  const intervalMilSec: number = bot.intervalMilSec || 5000;

  try {
    Bot.interval(percentDiff, pair, true, 0, intervalMilSec);
    res.status(200).send({ message: "Bot Pair started" });
  } catch (e) {
    res.status(400).json(e);
  }
};

export const startBotAllCurrencies = async (req: Request, res: Response) => {
  //Validation
  const { error } = currencyValidation(req.body);
  if (error) return res.status(400).json(error.message);

  const bot: BotCurrency = req.body;

  const percentDiff: number = bot.percentDiff || 0.01;
  const currency: string = bot.currency || "USD";
  const intervalMilSec: number = bot.intervalMilSec || 5000;

  try {
    Bot.intervalAllTickerByCurrency(
      percentDiff,
      currency,
      true,
      [],
      intervalMilSec
    );
    res.status(200).send({ message: "Bot all currencies started" });
  } catch (e) {
    res.status(400).json(e);
  }
};

export const stopBotPair = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (id) await Bot.cleanIntervalPair(+id);
    else await Bot.cleanIntervalPair();
    res.status(200).send({ message: "Stop Bot pair" });
  } catch (e) {
    res.status(400).json(e);
  }
};

export const stopBotAllCurrencies = async (req: Request, res: Response) => {
  const { id } = req.query;

  try {
    if (id) await Bot.cleanIntervalCurrencies(+id);
    else await Bot.cleanIntervalCurrencies();
    res.status(200).send({ message: "Stop Bot currency" });
  } catch (e) {
    res.status(400).json(e);
  }
};
