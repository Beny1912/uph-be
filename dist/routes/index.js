"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controllers/auth.controller");
const start_controller_1 = require("../controllers/start.controller");
const verifyToken_1 = require("../middlewares/verifyToken");
const router = express_1.default.Router();
router.get("/health", (req, res, next) => {
    res.status(200).send("Server OK");
});
router.post("/start-pair", start_controller_1.startBotPair);
router.get("/stop-pair", start_controller_1.stopBotPair);
router.post("/start-currencies", start_controller_1.startBotAllCurrencies);
router.get("/stop-currencies", start_controller_1.stopBotAllCurrencies);
router.post("/signup", auth_controller_1.signup);
router.post("/signin", auth_controller_1.signin);
router.get("/profile", verifyToken_1.TokenValidation, auth_controller_1.profile);
exports.default = router;
//# sourceMappingURL=index.js.map