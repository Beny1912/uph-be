import app from "./app";
import connect from "./connect";
import { db } from "./config/config";

const PORT = process.env.PORT || 3000;

//connect(db);

// start the express server
app.listen(PORT, (): void => {
  // tslint:disable-next-line:no-console
  console.log(`server started at http://localhost:${PORT}`);
});
