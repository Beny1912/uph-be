import Bot, { IBot } from "../models/bot.model";
import { botValidation } from "../validations";

/**
 * @name saveBot
 * @description Save data of each bot lines in database.
 * @param {IBot} bot Object with all necesary params ( initialAsk: number;ask: number;initialBid: number;bid: number;pair: string;currency: string;time: string;diff: number;diffPercent: number;type: string;).
 * @returns {Promise<RequestResponse | Error>} Return promise with the response received or error.
 */
export const saveBot = async (bot: IBot) => {
  const { error } = botValidation(bot);
  if (error) throw new Error(error.details[0].message);

  try {
    return await Bot.create(bot);
  } catch (e) {
    throw new Error(e);
  }
};
