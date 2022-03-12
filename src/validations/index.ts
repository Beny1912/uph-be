import Currency from "../helpers/currency";
import { IBot } from "../models/bot.model";
import Joi from "joi";

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
