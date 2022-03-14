"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const file_1 = __importDefault(require("./file"));
const ticker_1 = require("./../services/ticker");
const bot_controller_1 = require("./../controllers/bot.controller");
const Bot = {
    listIntervalPair: [],
    listIntervalCurrencies: [],
    calculateDiff: (initial, current) => {
        return (100 * (initial - current)) / ((initial + current) / 2);
    },
    writeLog: (diff, percentDiff) => {
        if (diff < -percentDiff) {
            file_1.default.appendFile("./logs.txt", `[Decreasing] Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`);
        }
        else if (diff > percentDiff) {
            file_1.default.appendFile("./logs.txt", `[Increasing] Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`);
        }
    },
    writeLogAll: (diff, percentDiff, actual) => {
        if (diff < -percentDiff) {
            file_1.default.appendFile("./logs.txt", ` [Decreasing] Pair ${actual["pair"]} Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`);
        }
        else if (diff > percentDiff) {
            file_1.default.appendFile("./logs.txt", `[Increasing] Pair ${actual["pair"]} Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`);
        }
    },
    writeLogAllAndDB: (diff, percentDiff, initial, actual) => {
        if (diff < -percentDiff) {
            file_1.default.appendFile("./logs.txt", ` [Decreasing] Pair ${actual["pair"]} Ask < -${percentDiff}% on time: ${new Date().toLocaleString()}`);
            const newBot = {
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
            (0, bot_controller_1.saveBot)(newBot);
        }
        else if (diff > percentDiff) {
            file_1.default.appendFile("./logs.txt", `[Increasing] Pair ${actual["pair"]} Ask > +${percentDiff}% on time: ${new Date().toLocaleString()}`);
            const newBot = {
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
            (0, bot_controller_1.saveBot)(newBot);
        }
    },
    interval: (percentDiff, pair, isFirstTime = true, initialValue = 0, intervalMilSec = 5000) => {
        return new Promise((resolve, reject) => {
            let idIntervalPair = setInterval(async () => {
                try {
                    const { data, statusCode } = await (0, ticker_1.getTickerPair)(pair);
                    if (isFirstTime && statusCode === 200) {
                        const initialValueString = JSON.parse(data).ask;
                        initialValue = +initialValueString;
                        isFirstTime = false;
                    }
                    else if (!isFirstTime && statusCode === 200) {
                        const actualValueString = JSON.parse(data).ask;
                        const actualValue = +actualValueString;
                        const diff = Bot.calculateDiff(initialValue, actualValue);
                        Bot.writeLog(diff, percentDiff);
                    }
                }
                catch (e) {
                    reject(e);
                }
            }, intervalMilSec);
            Bot.listIntervalPair.push(idIntervalPair);
            resolve();
        });
    },
    intervalAllTickerByCurrency: (percentDiff, currency, isFirstTime = true, initialValue = [], intervalMilSec = 5000) => {
        return new Promise((resolve, reject) => {
            let idIntervalCurrencies = setInterval(async () => {
                try {
                    const { data, statusCode } = await (0, ticker_1.getTickerByCurrency)(currency);
                    if (isFirstTime && statusCode === 200) {
                        initialValue = JSON.parse(data);
                        isFirstTime = false;
                    }
                    else if (!isFirstTime && statusCode === 200) {
                        let actualValue = JSON.parse(data);
                        initialValue.map((i) => {
                            actualValue.map((a) => {
                                if (i["pair"] === a["pair"]) {
                                    const diff = Bot.calculateDiff(+i["ask"], +a["ask"]);
                                    Bot.writeLogAllAndDB(diff, percentDiff, i, a);
                                }
                            });
                        });
                    }
                }
                catch (e) {
                    reject(e);
                }
            }, intervalMilSec);
            Bot.listIntervalCurrencies.push(idIntervalCurrencies);
            resolve();
        });
    },
    cleanIntervalPair: (intervalPair) => {
        return new Promise((resolve, reject) => {
            try {
                if (intervalPair) {
                    Bot.listIntervalPair.forEach((e) => {
                        if (e === intervalPair)
                            clearInterval(e);
                    });
                    resolve();
                }
                else {
                    Bot.listIntervalPair.forEach((e) => clearInterval(e));
                    resolve();
                }
            }
            catch (e) {
                reject(e);
            }
        });
    },
    cleanIntervalCurrencies: (intervalCurrency) => {
        return new Promise((resolve, reject) => {
            try {
                if (intervalCurrency) {
                    Bot.listIntervalCurrencies.forEach((e) => {
                        if (e === intervalCurrency)
                            clearInterval(e);
                    });
                    resolve();
                }
                else {
                    Bot.listIntervalCurrencies.forEach((e) => clearInterval(e));
                    resolve();
                }
            }
            catch (e) {
                reject(e);
            }
        });
    },
};
exports.default = Bot;
//# sourceMappingURL=bot.js.map