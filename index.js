import express from "express";
import * as dotenv from "dotenv";
import processoRoute from "./routes/processo.routes.js";
import connect from "./config/db.config.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbName = "enap92";

app.use(express.json());
app.use("/processo", processoRoute);

connect(dbName);

app.listen(port, () => {
    console.log(`Express server is UP in port ${port}`);
})