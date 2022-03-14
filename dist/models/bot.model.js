"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const botSchema = new mongoose_1.Schema({
    initialAsk: {
        type: Number,
        required: true,
    },
    ask: {
        type: Number,
        required: true,
    },
    initialBid: {
        type: Number,
        required: true,
    },
    bid: {
        type: Number,
        required: true,
    },
    pair: {
        type: String,
        required: true,
    },
    currency: {
        type: String,
        required: true,
    },
    time: {
        type: String,
        required: true,
    },
    diff: {
        type: Number,
        required: true,
    },
    diffPercent: {
        type: Number,
        required: true,
    },
    type: {
        type: String,
        required: true,
    },
}, {
    timestamps: true,
});
exports.default = (0, mongoose_1.model)("Bot", botSchema);
//# sourceMappingURL=bot.model.js.map