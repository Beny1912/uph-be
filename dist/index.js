"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bot_1 = __importDefault(require("./helpers/bot"));
const connect_1 = __importDefault(require("./connect"));
const config_1 = require("./config/config");
const path_1 = __importDefault(require("path"));
const environment_1 = __importDefault(require("./helpers/tools/environment"));
const app_1 = __importDefault(require("./app"));
environment_1.default.config({
    path: path_1.default.join(__dirname, "../.env"),
});
(0, connect_1.default)(config_1.db);
if (process.env.BOT === "YES") {
    bot_1.default.intervalAllTickerByCurrency(0.01, "USD", true, [], 5000)
        .then(() => {
        console.log("All currency bot running");
    })
        .catch((e) => {
        console.log(`All currency bot error: ${e}`);
    });
}
else {
    const PORT = process.env.PORT || 3000;
    app_1.default.listen(PORT, () => {
        console.log(`server started at http://localhost:${PORT}`);
    });
}
//# sourceMappingURL=index.js.map