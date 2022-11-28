import express from "express";
import * as dotenv from "dotenv";
import { v4 } from "uuid";
import db from './db.json' assert {type: 'json'} ;

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(express.json());

app.get('/all', (req, res) => {
    // console.log(req.rawHeaders);
    return res.status(200).json(db);
})

app.get('/process/:id', (req, res) => {
    const { id } = req.params;
    const item = db.find((process) => process.id === id);

    if ( !item) {
        return res.status(404).json(`Not found id: ${id}`);
    }
    return res.status(200).json(item);
});

app.get('/status/open', (req, res) => {
    const result = db.filter( process => process.status === "Em andamento");
    return res.status(200).json(result);
});

app.get('/status/close', (req, res) => {
    const result = db.filter( process => process.status === "Finalizado");
    return res.status(200).json(result);
});

app.get('/setor/:nomeSetor', (req, res) => {
    const { nomeSetor } = req.params;
    if ( !nomeSetor) {
        return res.status(400).json(`Bad request!`);
    }
    const result = db.filter( process => process.setor.toLowerCase()  === nomeSetor.toLowerCase());
    return res.status(200).json(result);
});

app.get('/random', (req, res) => {
    const index = Math.floor(Math.random() * db.length);
    return res.status(200).json(db[index]);
});

app.post('/create', (req, res) => {
    const id = v4();
    db.push({id: id, ...req.body});
    return res.status(201).json(db)
});

app.put('/edit/:id', (req, res) => {
    const {id} = req.params;
    const data = req.body;
    const item = db.find((process) => process.id === id);
    const index = db.indexOf(item);
    const process = {...item, ...data};
    
    db.splice(index, 1, process);

    return res.status(200).json(db);
})

app.put('/addComment/:id', (req, res) => {
    const { id } = req.params;
    const item = db.find((process) => process.id === id);

    if ( !item) {
        return res.status(404).json(`Not found id: ${id}`);
    }

    const { comment } = req.body;
    if ( !comment) {
        return res.status(400).json(`Bad request!`);
    }
    item.comments.push(comment);
    return res.status(200).json(db);
});

app.delete('/delete/:id', (req, res) => {
    const { id } = req.params;
    const item = db.find((process) => process.id === id);
    const index = db.indexOf(item);
    db.splice(index, 1);
    return res.status(200).json(db);
});

app.listen(port, () => {
    console.log(`Express server is UP in port ${port}`);
})