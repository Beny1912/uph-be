"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const assets_1 = require("./../services/assets");
const Currency = {
    getInArray: async (assets) => {
        let response;
        if (assets.statusCode === 200) {
            response = JSON.parse(assets.data).map((e) => e.code);
        }
        else {
            response = [];
        }
        return response;
    },
    checkIfExists: async (currencies, currency) => {
        let response;
        if (currencies.length > 0) {
            response = currencies.some((e) => e === currency);
        }
        else {
            response = false;
        }
        return response;
    },
    validate: async (currency) => {
        let array = await Currency.getInArray(await (0, assets_1.getAssets)());
        let exist = await Currency.checkIfExists(array, currency);
        return exist;
    },
};
exports.default = Currency;
//# sourceMappingURL=currency.js.map