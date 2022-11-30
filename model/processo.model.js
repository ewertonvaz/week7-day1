import { Schema, model } from "mongoose";

const processoSchema = new Schema(
    {
        documentName: {
            type:String,
            required: true,
            trim: true,
            minLength: 5,
            maxLength: 255,
            lowercase: true
        },
        status: {
            type: String,
            required: true,
            enum: ["aberto", "em andamento", "finalizado"],
            default: "aberto"
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
            enum: ['TRE', 'TRJ', 'ENAP', 'NUTEC'],
            default: 'ENAP'
        }
    },
    {timestamps: true}
);

const ProcessoModel = model("Processo", processoSchema);

export default ProcessoModel;