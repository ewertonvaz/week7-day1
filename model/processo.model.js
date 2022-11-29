import { Schema, model } from "mongoose";

const processoSchema = new Schema(
    {
        documentName: {
            type:String,
            required: true,
            trim: true,
            min: 5,
            max: 255,
            lowercase: true
        },
        status: {
            type: String,
            required: true,
            enum: ["em andamento", "finalizado"]
        },
        details: { 
            type: String,

        },
        comments : [ {type: String} ],
        dateInit: {
            type: Date,
            default: Date.now
        },
        dateEnd: {
            type: Date
        },
        setor: { 
            type: String,
            trim: true,
            required: true,
            min: 3,
            max: 128
        }
    },
    {timestamps: true}
);

const ProcessoModel = model("Processo", processoSchema);

export default ProcessoModel;