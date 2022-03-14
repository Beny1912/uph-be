"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.signinValidation = exports.signupValidation = exports.currencyValidation = exports.pairValidation = exports.botValidation = exports.existCurrency = void 0;
const currency_1 = __importDefault(require("../helpers/currency"));
const joi_1 = __importDefault(require("joi"));
const existCurrency = (currency) => {
    return currency_1.default.validate(currency);
};
exports.existCurrency = existCurrency;
const botValidation = (data) => {
    const botSchema = joi_1.default.object({
        initialAsk: joi_1.default.number().required(),
        ask: joi_1.default.number().required(),
        initialBid: joi_1.default.number().required(),
        bid: joi_1.default.number().required(),
        pair: joi_1.default.string().required(),
        currency: joi_1.default.string().required(),
        time: joi_1.default.string().required(),
        diff: joi_1.default.number().required(),
        diffPercent: joi_1.default.number().required(),
        type: joi_1.default.string().required(),
    });
    return botSchema.validate(data);
};
exports.botValidation = botValidation;
const pairValidation = (data) => {
    const pairSchema = joi_1.default.object({
        percentDiff: joi_1.default.number(),
        pair: joi_1.default.string(),
        intervalMilSec: joi_1.default.number(),
    });
    return pairSchema.validate(data);
};
exports.pairValidation = pairValidation;
const currencyValidation = (data) => {
    const pairSchema = joi_1.default.object({
        percentDiff: joi_1.default.number(),
        currency: joi_1.default.string(),
        intervalMilSec: joi_1.default.number(),
    });
    return pairSchema.validate(data);
};
exports.currencyValidation = currencyValidation;
const signupValidation = (data) => {
    const userSchema = joi_1.default.object({
        username: joi_1.default.string().min(4).max(30).required(),
        email: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
    });
    return userSchema.validate(data);
};
exports.signupValidation = signupValidation;
const signinValidation = (data) => {
    const userSchema = joi_1.default.object({
        email: joi_1.default.string().required(),
        password: joi_1.default.string().min(6).required(),
    });
    return userSchema.validate(data);
};
exports.signinValidation = signinValidation;
//# sourceMappingURL=index.js.map