import express from "express"
// import db from '../db.json' assert {type: 'json'} ;
// import { v4 } from "uuid";
import ProcessoModel from "../model/processo.model.js";

const processoRoute = express.Router();

processoRoute.get('/all', async (req, res) => {
    // console.log(req.rawHeaders);
    try {
        const processos = await ProcessoModel.find();
        return res.status(200).json(processos)  
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Erro ao recuperar os processos!"})
    }
})

processoRoute.get('/getone/:id', async (req, res) => {
    const { id } = req.params;
    if ( !id) {
        return res.status(400).json(`Bad request!`);
    }
    try {
        const processo = await ProcessoModel.findById(id);
        if (processo) {
            return res.status(200).json(processo);
        } else {
            return res.status(404).json("Not found !");
        }
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Erro ao recuperar o processo!"})
    }
});

processoRoute.get('/status/open', async (req, res) => {
    try {
        const filter = { status : "em andamento"};
        //const projection = { documentName: 1};
        //const sort = {};
        // const processos = await ProcessoModel.find(filter, {projection}).sort(sort);
        const processos = await ProcessoModel.find(filter);
        return res.status(200).json(processos);        
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao realizar a consulta!");
    }
});

processoRoute.get('/status/close', async (req, res) => {
    try {
        const filter = { status : "finalizado"};
        const processos = await ProcessoModel.find(filter);
        return res.status(200).json(processos);        
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao realizar a consulta!");
    }
});

processoRoute.get('/setor/:nomeSetor', async (req, res) => {
    const { nomeSetor } = req.params;
    if ( !nomeSetor) {
        return res.status(400).json(`Bad request!`);
    }
    try {
        const filter = { setor : nomeSetor };
        const processos = await ProcessoModel.find(filter);
        return res.status(200).json(processos);        
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao realizar a consulta!");
    }
});

processoRoute.get('/random', async (req, res) => {
    try {
        const processos = await ProcessoModel.find({});
        const index = Math.floor(Math.random() * processos.length);
        return res.status(200).json(processos[index]);
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Erro ao recuperar os processos!"})
    }
});

processoRoute.post('/create', async (req, res) => {
    // const id = v4();
    // db.push({id: id, ...req.body});
    try {
        const process = { ...req.body, dateInit: new Date(req.body.dateInit), dateEnd: new Date(req.body.dateEnd)};
        // console.log(process);
        const newProcess = await ProcessoModel.create(process);
        return res.status(201).json(newProcess)  
    } catch (e) {
        console.log(e);
        return res.status(500).json({ msg: "Erro ao criar processo!"})
    }
});

processoRoute.put('/edit/:id', async (req, res) => {
    const {id} = req.params;
    try {
        const updatedProcess = await ProcessoModel.findByIdAndUpdate(
            id,
            { ...req.body, dateInit: new Date(req.body.dateInit), dateEnd: new Date(req.body.dateEnd) },
            { new: true, runValidators: true }
        );
        return res.status(200).json(updatedProcess);
    } catch(e) {
        console.log(e);
        return res.status(500).json("Erro ao atualizar processo!");
    } 
})

processoRoute.put('/addComment/:id', async (req, res) => {
    const { id } = req.params;
    const { comment } = req.body;
    if ( !comment) {
        return res.status(400).json(`Bad request!`);
    }

    try {
        const updatedProcess = await ProcessoModel.findByIdAndUpdate(
            id,
            { $push: {comments: comment} },
            { new: true, runValidators: true }
        );
        return res.status(200).json(updatedProcess);   
    } catch (e) {
        console.log(e);
        return res.status(500).json("Erro ao incluir comentario!")
    }
});

processoRoute.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const deletedProcess = await ProcessoModel.findByIdAndDelete(id);
        if (!deletedProcess) {
            return res.status(400).json({ msg: "Usuário não encontrado!" });
        }
        return res.status(200).json(deletedProcess);
    } catch(e) {
        console.log(e);
        return res.status(500).json("Erro ao deletar processo!");
    }
});

export default processoRoute;