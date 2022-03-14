"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.stopBotAllCurrencies = exports.stopBotPair = exports.startBotAllCurrencies = exports.startBotPair = void 0;
const bot_1 = __importDefault(require("../helpers/bot"));
const validations_1 = require("../validations");
const startBotPair = async (req, res) => {
    const { error } = (0, validations_1.pairValidation)(req.body);
    if (error)
        return res.status(400).json(error.message);
    const bot = req.body;
    const percentDiff = bot.percentDiff || 0.01;
    const pair = bot.pair || "BTC-USD";
    const intervalMilSec = bot.intervalMilSec || 5000;
    try {
        await bot_1.default.interval(percentDiff, pair, true, 0, intervalMilSec);
        res.status(200).send({ message: "Bot Pair started" });
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.startBotPair = startBotPair;
const startBotAllCurrencies = async (req, res) => {
    const { error } = (0, validations_1.currencyValidation)(req.body);
    if (error)
        return res.status(400).json(error.message);
    const bot = req.body;
    const percentDiff = bot.percentDiff || 0.01;
    const currency = bot.currency || "USD";
    const intervalMilSec = bot.intervalMilSec || 5000;
    try {
        await bot_1.default.intervalAllTickerByCurrency(percentDiff, currency, true, [], intervalMilSec);
        res.status(200).send({ message: "Bot all currencies started" });
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.startBotAllCurrencies = startBotAllCurrencies;
const stopBotPair = async (req, res) => {
    const { id } = req.query;
    try {
        if (id)
            await bot_1.default.cleanIntervalPair(+id);
        else
            await bot_1.default.cleanIntervalPair();
        res.status(200).send({ message: "Stop Bot pair" });
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.stopBotPair = stopBotPair;
const stopBotAllCurrencies = async (req, res) => {
    const { id } = req.query;
    try {
        if (id)
            await bot_1.default.cleanIntervalCurrencies(+id);
        else
            await bot_1.default.cleanIntervalCurrencies();
        res.status(200).send({ message: "Stop Bot currency" });
    }
    catch (e) {
        res.status(400).json(e);
    }
};
exports.stopBotAllCurrencies = stopBotAllCurrencies;
//# sourceMappingURL=start.controller.js.map