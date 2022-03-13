import File from "./file";
import { getTickerPair, getTickerByCurrency } from "./../services/ticker";
import { saveBot } from "./../controllers/bot.controller";
import { IBot } from "../models/bot.model";
const Bot = {
  /**
   * @name calculateDiff
   * @description Calculate difference between initial param and current param.
   * @param {number} initial
   * @param {number} current
   * @returns {number} Return result percent difference.
   */
  calculateDiff: (initial: number, current: number): number => {
    return (100 * (initial - current)) / ((initial + current) / 2);
  },
  /**
   * @name writeLog
   * @description Write in log file difference between initial and current param.
   * @param {number} diff Difference in percent
   * @param {number} percentDiff Value rate limit
   * @returns {void} End when write file.
   */
  writeLog: (diff: number, percentDiff: number): void => {
    if (diff < -percentDiff) {
      File.appendFile(
        "./logs.txt",
        `[Decreasing] Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
    } else if (diff > percentDiff) {
      File.appendFile(
        "./logs.txt",
        `[Increasing] Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
    }
  },
  /**
   * @name writeLogAll
   * @description Write in log file difference between initial and current param.
   * @param {number} diff Difference in percent
   * @param {number} percentDiff Value rate limit
   * @param {object} actual Object with all params (ask,bid,currency,pair)
   * @returns {void} End when write file.
   */
  writeLogAll: (diff: number, percentDiff: number, actual: object): void => {
    if (diff < -percentDiff) {
      File.appendFile(
        "./logs.txt",
        ` [Decreasing] Pair ${
          actual["pair"]
        } Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
    } else if (diff > percentDiff) {
      File.appendFile(
        "./logs.txt",
        `[Increasing] Pair ${
          actual["pair"]
        } Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
    }
  },
  /**
   * @name writeLogAllAndDB
   * @description Write in log and DB file difference between initial and current param.
   * @param {number} diff Difference in percent
   * @param {number} percentDiff Value rate limit
   * @param {object} initial Object with all initial params (ask,bid,currency,pair)
   * @param {object} actual Object with all current params (ask,bid,currency,pair)
   * @returns {void} End when write data in database.
   */
  writeLogAllAndDB: (
    diff: number,
    percentDiff: number,
    initial: object,
    actual: object
  ): void => {
    if (diff < -percentDiff) {
      File.appendFile(
        "./logs.txt",
        ` [Decreasing] Pair ${
          actual["pair"]
        } Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`
      );

      const newBot: IBot = {
        initialAsk: +initial["ask"],
        ask: +actual["ask"],
        initialBid: +initial["bid"],
        bid: +actual["bid"],
        pair: actual["pair"],
        currency: actual["currency"],
        time: new Date().toLocaleString(),
        diff: diff,
        diffPercent: percentDiff,
        type: "Decreasing",
      };

      saveBot(newBot);
    } else if (diff > percentDiff) {
      File.appendFile(
        "./logs.txt",
        `[Increasing] Pair ${
          actual["pair"]
        } Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
      const newBot: IBot = {
        initialAsk: +initial["ask"],
        ask: +actual["ask"],
        initialBid: +initial["bid"],
        bid: +actual["bid"],
        pair: actual["pair"],
        currency: actual["currency"],
        time: new Date().toLocaleString(),
        diff: diff,
        diffPercent: percentDiff,
        type: "Increasing",
      };

      saveBot(newBot);
    }
  },
  /**
   * @name interval
   * @description Run all functions of bot just one pair in arguments.
   * @param {number} percentDiff Difference in percent
   * @param {string} pair name of pair
   * @param {boolean} isFirstTime helper to check first time
   * @param {number} initialValue initialValue of ask
   * @param {number} intervalMilSec Miliseconds of interval
   * @returns {void} Run all functions of bot.
   */
  interval: (
    percentDiff: number,
    pair: string,
    isFirstTime: boolean = true,
    initialValue: number = 0,
    intervalMilSec: number = 5000
  ): void => {
    // if API was a WebSocket or SSE i won't use a setInterval
    setInterval(async () => {
      const { data } = await getTickerPair(pair);

      if (isFirstTime && data) {
        const initialValueString = JSON.parse(data).ask;
        initialValue = +initialValueString;
        isFirstTime = false;
      } else if (!isFirstTime && data) {
        const actualValueString: string = JSON.parse(data).ask;
        const actualValue: number = +actualValueString;

        const diff = Bot.calculateDiff(initialValue, actualValue);

        Bot.writeLog(diff, percentDiff);
      }
    }, intervalMilSec);
  },
  /**
   * @name intervalAllTickerByCurrency
   * @description Run all functions of bot with all currencies.
   * @param {number} percentDiff Difference in percent
   * @param {string} pair name of pair
   * @param {boolean} isFirstTime helper to check first time
   * @param {number} initialValue initialValue of ask
   * @param {number} intervalMilSec Miliseconds of interval
   * @returns {void} Run all functions of bot.
   */
  intervalAllTickerByCurrency: (
    percentDiff: number,
    currency: string,
    isFirstTime: boolean = true,
    initialValue: [] = [],
    intervalMilSec: number = 5000
  ): void => {
    // if API was a WebSocket or SSE i won't use a setInterval
    setInterval(async () => {
      const { data } = await getTickerByCurrency(currency);

      if (isFirstTime && data) {
        initialValue = JSON.parse(data);
        isFirstTime = false;
      } else if (!isFirstTime && data) {
        let actualValue = JSON.parse(data);

        initialValue.map((i) => {
          actualValue.map((a) => {
            if (i["pair"] === a["pair"]) {
              //check diff
              const diff = Bot.calculateDiff(+i["ask"], +a["ask"]);
              Bot.writeLogAllAndDB(diff, percentDiff, i, a);
            }
          });
        });
      }
    }, intervalMilSec);
  },
};

export default Bot;
