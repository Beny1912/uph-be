import File from "./file";
import { getTickerPair, getTickerByCurrency } from "./../services/ticker";
const Bot = {
  calculateDiff: (initial: number, current: number): number => {
    return (100 * (initial - current)) / ((initial + current) / 2);
  },
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
  interval: (
    isFirstTime: boolean = true,
    initialValue: number = 0,
    intervalMilSec: number = 5000,
    percentDiff: number,
    pair: string
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
  intervalAllTickerByCurrency: (
    isFirstTime: boolean = true,
    initialValue: [] = [],
    intervalMilSec: number = 5000,
    percentDiff: number,
    currency: string
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
              Bot.writeLogAll(diff, percentDiff, a);
            }
          });
        });
      }
    }, intervalMilSec);
  },
};

export default Bot;
