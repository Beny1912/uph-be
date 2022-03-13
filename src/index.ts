import Bot from "./helpers/bot";
import connect from "./connect";
import { db } from "./config/config";
import path from "path";
import Environment from "./helpers/tools/environment";
import app from "./app";

//Config Env
Environment.config({
  path: path.join(__dirname, "../.env"),
});
//Connect Database
connect(db);

if (process.env.BOT === "YES") {
  // if API was a WebSocket or SSE i won't use a setInterval
  Bot.intervalAllTickerByCurrency(0.01, "USD", true, [], 5000);
} else {
  const PORT = process.env.PORT || 3000;
  // start the express server
  app.listen(PORT, (): void => {
    // tslint:disable-next-line:no-console
    console.log(`server started at http://localhost:${PORT}`);
  });
}
