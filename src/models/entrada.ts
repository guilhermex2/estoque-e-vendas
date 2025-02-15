import mongoose, {mongo, Schema} from "mongoose";

const EntradaSchema = new Schema({
    codigo: { type: String, required: true },
    nome: { type: String, required: true },
    validade: { type: String, required: false },
    lote: { type: String, required: false },
    preco: { type: Number, required: true },
    quantidade: { type: Number, required: true },
    dataEntrada: { type: Date, default: Date.now }
})

export default mongoose.model("Entrada", EntradaSchema)