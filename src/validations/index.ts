import Currency from "../helpers/currency";
import { IBot } from "../models/bot.model";
import Joi from "joi";
import BotPair from "../types/bot-pair-request";
import BotCurrency from "../types/bot-currency-request";

export const existCurrency = (currency: string) => {
  return Currency.validate(currency);
};

export const botValidation = (data: IBot) => {
  const botSchema = Joi.object({
    initialAsk: Joi.number().required(),
    ask: Joi.number().required(),
    initialBid: Joi.number().required(),
    bid: Joi.number().required(),
    pair: Joi.string().required(),
    currency: Joi.string().required(),
    time: Joi.string().required(),
    diff: Joi.number().required(),
    diffPercent: Joi.number().required(),
    type: Joi.string().required(),
  });
  return botSchema.validate(data);
};

export const pairValidation = (data: BotPair) => {
  const pairSchema = Joi.object({
    percentDiff: Joi.number(),
    pair: Joi.string(),
    intervalMilSec: Joi.number(),
  });
  return pairSchema.validate(data);
};

export const currencyValidation = (data: BotCurrency) => {
  const pairSchema = Joi.object({
    percentDiff: Joi.number(),
    currency: Joi.string(),
    intervalMilSec: Joi.number(),
  });
  return pairSchema.validate(data);
};
