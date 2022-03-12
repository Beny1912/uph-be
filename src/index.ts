import { getTickerPair, getTickerByCurrency } from "./services/ticker";
import Bot from "./helpers/bot";

let isFirstTime: boolean = true;

// Maybe you can request first time here, but inside interval clean code and we can wait 5seg
let initialValue: number = 0;

// if API was a WebSocket or SSE i won't use a setInterval
// setInterval(async () => {
//   const { data } = await getTickerPair("BTC-USD");

//   if (isFirstTime && data) {
//     const initialValueString = JSON.parse(data).ask;
//     initialValue = +initialValueString;
//     isFirstTime = false;
//   } else if (!isFirstTime && data) {
//     const actualValueString: string = JSON.parse(data).ask;
//     const actualValue: number = +actualValueString;

//     const diff = Bot.calculateDiff(initialValue, actualValue);

//     Bot.writeLog(diff,0.01);
//   }
// }, 5000);

Bot.interval(true, 0, 5000, 0.01, "BTC-USD");
