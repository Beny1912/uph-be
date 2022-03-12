import app from "./app";
import connect from "./connect";
import { db } from "./config/config";
import { getTickerPair, getTickerByCurrency } from "./services/ticker";
import { getAssets } from "./services/assets";
import Currency from "./helpers/currency";
import { existCurrency } from "./validations";

const PORT = process.env.PORT || 3000;

//connect(db);

// start the express server
app.listen(PORT, async (): Promise<void> => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
