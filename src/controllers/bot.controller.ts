import Bot, { IBot } from "../models/bot.model";
import { botValidation } from "../validations";

export const saveBot = async (bot: IBot) => {
  const { error } = botValidation(bot);
  if (error) throw new Error(error.details[0].message);

  try {
    return await Bot.create(bot);
  } catch (e) {
    throw new Error(e);
  }
};
