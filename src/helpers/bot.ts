import File from "./file";
import { getTickerPair, getTickerByCurrency } from "./../services/ticker";
import { saveBot } from "./../controllers/bot.controller";
import { IBot } from "../models/bot.model";
const Bot = {
  listIntervalPair: [],
  listIntervalCurrencies: [],
  /**
   * @name calculateDiff
   * @description Calculate difference between initial param and current param.
   * @param {number} initial
   * @param {number} current
   * @returns {number} Return result percent difference.
   */
  calculateDiff: (initial: number, current: number): number => {
    //Calculate Diff in percent
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
    // Check percent diff
    if (diff < -percentDiff) {
      // Write in file
      File.appendFile(
        "./logs.txt",
        `[Decreasing] Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
    } else if (diff > percentDiff) {
      // Write in file
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
    // Check percent diff
    if (diff < -percentDiff) {
      // Write in file
      File.appendFile(
        "./logs.txt",
        ` [Decreasing] Pair ${
          actual["pair"]
        } Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
    } else if (diff > percentDiff) {
      // Write in file
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
    // Check percent diff
    if (diff < -percentDiff) {
      // Write in file
      File.appendFile(
        "./logs.txt",
        ` [Decreasing] Pair ${
          actual["pair"]
        } Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
      // Create object Bot to save in DB
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
      // Save in db
      saveBot(newBot);
    } else if (diff > percentDiff) {
      // Write in file
      File.appendFile(
        "./logs.txt",
        `[Increasing] Pair ${
          actual["pair"]
        } Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`
      );
      // Create object Bot to save in DB
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
      // Save in db
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
    // Create interval
    let idIntervalPair = setInterval(async () => {
      // Get data of request service ticker
      const { data, statusCode } = await getTickerPair(pair);
      // Check if firstTime and no error in request
      if (isFirstTime && statusCode === 200) {
        // Save first value of ask
        const initialValueString = JSON.parse(data).ask;
        // Convert string to number
        initialValue = +initialValueString;
        // helper firstTime to false
        isFirstTime = false;
      } else if (!isFirstTime && statusCode === 200) {
        // Save current ask in var
        const actualValueString: string = JSON.parse(data).ask;
        // Convert string to false
        const actualValue: number = +actualValueString;
        // Calculate diff
        const diff = Bot.calculateDiff(initialValue, actualValue);
        // Write log
        Bot.writeLog(diff, percentDiff);
      }
    }, intervalMilSec);
    Bot.listIntervalPair.push(idIntervalPair);
  },
  /**
   * @name intervalAllTickerByCurrency
   * @description Run all functions of bot with all currencies.
   * @param {number} percentDiff Difference in percent
   * @param {string} currency name of pair
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
    // Create Interval
    let idIntervalCurrencies = setInterval(async () => {
      // Get data of service tickerByCurrency
      const { data, statusCode } = await getTickerByCurrency(currency);
      // Check if firstTime and no error in request
      if (isFirstTime && statusCode === 200) {
        // Save first value
        initialValue = JSON.parse(data);
        // helper firsTime to false
        isFirstTime = false;
      } else if (!isFirstTime && statusCode === 200) {
        // Save actual value
        let actualValue = JSON.parse(data);
        // Loop to check difference between initial and current values
        initialValue.map((i) => {
          actualValue.map((a) => {
            // if pair name is same
            if (i["pair"] === a["pair"]) {
              //check diff
              const diff = Bot.calculateDiff(+i["ask"], +a["ask"]);
              // Write log and DB
              Bot.writeLogAllAndDB(diff, percentDiff, i, a);
            }
          });
        });
      }
    }, intervalMilSec);
    Bot.listIntervalCurrencies.push(idIntervalCurrencies);
  },
  /**
   * @name cleanIntervalPair
   * @description Clear intervalPair opened.
   * @param {number} intervalPair id interval
   * @returns {void} Eject.
   */

  cleanIntervalPair: (intervalPair?: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        if (intervalPair) {
          Bot.listIntervalPair.forEach((e) => {
            if (e === intervalPair) clearInterval(e);
          });
          resolve();
        } else {
          Bot.listIntervalPair.forEach((e) => clearInterval(e));
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  },
  /**
   * @name cleanIntervalCurrencies
   * @description Clear intervalCurrency opened.
   * @param {number} intervalCurrency id interval
   * @returns {void} Eject.
   */
  cleanIntervalCurrencies: (intervalCurrency?: number): Promise<void> => {
    return new Promise<void>((resolve, reject) => {
      try {
        if (intervalCurrency) {
          Bot.listIntervalCurrencies.forEach((e) => {
            if (e === intervalCurrency) clearInterval(e);
          });
          resolve();
        } else {
          Bot.listIntervalCurrencies.forEach((e) => clearInterval(e));
          resolve();
        }
      } catch (e) {
        reject(e);
      }
    });
  },
};

export default Bot;
