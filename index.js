import express from "express";
import * as dotenv from "dotenv";
import processoRoute from "./routes/processo.routes.js";
import connect from "./config/db.config.js";
import userRoute from "./routes/user.routes.js";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbName = "enap92";

app.use(express.json());
app.use("/processo", processoRoute);
app.use("/user", userRoute);

connect(dbName);

app.listen(port, () => {
    console.log(`Express server is UP in port ${port}`);
})