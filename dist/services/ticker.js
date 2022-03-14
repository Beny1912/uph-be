"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getTickerByCurrency = exports.getTickerPair = void 0;
const request_1 = __importDefault(require("../helpers/request"));
const validations_1 = require("../validations");
const getTickerPair = async (pair = "BTC-USD") => {
    return new Promise(async (resolve, reject) => {
        let response;
        const options = {
            hostname: "api.uphold.com",
            path: `/v0/ticker/${pair}`,
        };
        try {
            response = await request_1.default.send(options);
            resolve(response);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.getTickerPair = getTickerPair;
const getTickerByCurrency = async (currency = "USD") => {
    return new Promise(async (resolve, reject) => {
        if (!(0, validations_1.existCurrency)(currency)) {
            reject("Currency no exist");
        }
        let response;
        const options = {
            hostname: "api.uphold.com",
            path: `/v0/ticker/${currency}`,
        };
        try {
            response = await request_1.default.send(options);
            resolve(response);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.getTickerByCurrency = getTickerByCurrency;
//# sourceMappingURL=ticker.js.map