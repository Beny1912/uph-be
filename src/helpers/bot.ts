import File from "./file";
import { getTickerPair } from "./../services/ticker";
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
  interval: (
    isFirstTime: boolean = true,
    initialValue: number = 0,
    intervalMilSec: number = 5000,
    percentDiff: number,
    pair: string
  ): void => {
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
};

export default Bot;
