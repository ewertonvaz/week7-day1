import express from "express";
import * as dotenv from "dotenv";
import { v4 } from "uuid";
import processoRoute from "./routes/processo.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());
app.use("/processo", processoRoute);

app.listen(port, () => {
    console.log(`Express server is UP in port ${port}`);
})