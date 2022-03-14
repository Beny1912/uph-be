"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const https_1 = __importDefault(require("./tools/https"));
const http_1 = __importDefault(require("./tools/http"));
const Request = {
    send: async (options) => {
        const { protocol } = options;
        const result = !protocol || protocol === "https"
            ? await https_1.default.request(options)
            : await http_1.default.request(options);
        return result;
    },
};
exports.default = Request;
//# sourceMappingURL=request.js.map