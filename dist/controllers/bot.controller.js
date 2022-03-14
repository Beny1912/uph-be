"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.saveBot = void 0;
const bot_model_1 = __importDefault(require("../models/bot.model"));
const validations_1 = require("../validations");
const saveBot = async (bot) => {
    const { error } = (0, validations_1.botValidation)(bot);
    if (error)
        throw new Error(error.details[0].message);
    try {
        return await bot_model_1.default.create(bot);
    }
    catch (e) {
        throw new Error(e);
    }
};
exports.saveBot = saveBot;
//# sourceMappingURL=bot.controller.js.map