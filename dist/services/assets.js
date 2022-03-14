"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getAssets = void 0;
const request_1 = __importDefault(require("../helpers/request"));
const getAssets = async () => {
    return new Promise(async (resolve, reject) => {
        const options = {
            hostname: "api.uphold.com",
            path: `/v0/assets`,
        };
        try {
            let response = await request_1.default.send(options);
            resolve(response);
        }
        catch (e) {
            reject(e);
        }
    });
};
exports.getAssets = getAssets;
//# sourceMappingURL=assets.js.map