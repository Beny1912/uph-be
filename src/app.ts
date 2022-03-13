import express, { Application } from "express";
import bodyParser from "body-parser";
import router from "./routes";

const app: Application = express();
//Security disable
app.disable("x-powered-by");
//BodyParser JSON
app.use(bodyParser.json());
//Encode url
app.use(bodyParser.urlencoded({ extended: true }));
//Default route
app.use("/", router);

export default app;
