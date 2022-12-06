import express from "express";
import * as dotenv from "dotenv";
import processoRoute from "./routes/processo.routes.js";
import connect from "./config/db.config.js";
import userRoute from "./routes/user.routes.js";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT;
const dbName = "enap92";
const corsOptions = {
    origin: "*",
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'],
    preflightContinue: false,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use("/processo", processoRoute);
app.use("/user", userRoute);

connect(dbName);

app.listen(port, () => {
    console.log(`Express server is UP in port ${port}`);
})