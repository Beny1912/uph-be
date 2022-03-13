import Bot, { IBot } from "../models/bot.model";
import { botValidation } from "../validations";

export const saveBot = async (bot: IBot) => {
  const { error } = botValidation(bot);
  if (error) throw new Error(error.details[0].message);

  try {
    const result = await Bot.create(bot);
    return result;
  } catch (e) {
    throw new Error(e);
  }
};
