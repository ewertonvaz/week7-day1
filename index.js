import express from "express";
import * as dotenv from "dotenv";
import uuid from "uuidv4";

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.listen(port, () => {
    console.log(`Express server is UP in port ${port}`);
})