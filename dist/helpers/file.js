"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs_1 = __importDefault(require("fs"));
const File = {
    appendFile: async (path, data) => {
        try {
            fs_1.default.writeFileSync(path, data + "\n", { flag: "a" });
        }
        catch (error) {
            throw new Error("Error Append File: " + error);
        }
    },
};
exports.default = File;
//# sourceMappingURL=file.js.map