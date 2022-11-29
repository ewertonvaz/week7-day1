npm init -y

Editar package.json
...
    "type": "module",
...
    "scripts": {
        "dev" : "nodemon index.js"
    }

npm install express
npm install dotenv
npm install nodemon -D

Criar index.js :

import express from "express";
import * as dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

app.listen( 8080, () => { console.log("App up and running on http://localhost:8080") })