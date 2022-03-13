import Bot from "./helpers/bot";
import connect from "./connect";
import { db } from "./config/config";
import path from "path";
import Environment from "./helpers/tools/environment";

Environment.config({
  path: path.join(__dirname, "../.env"),
});

connect(db);

// if API was a WebSocket or SSE i won't use a setInterval
Bot.intervalAllTickerByCurrency(0.01, "USD", true, [], 5000);
