import Bot from "./helpers/bot";
import connect from "./connect";
import { db } from "./config/config";

connect(db);

// if API was a WebSocket or SSE i won't use a setInterval
Bot.intervalAllTickerByCurrency(0.01, "USD", true, [], 5000);
