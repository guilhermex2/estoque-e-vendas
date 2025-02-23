import mongoose from "mongoose";

const VendaSchema = new mongoose.Schema({
    codigo: { type: String, required: true },
    produto: { type: mongoose.Schema.Types.ObjectId, ref: "Produto", required: true },
    nomeProduto: { type: String, required: true },
    quantidade: { type: Number, required: true },
    precoUnitario: { type: Number, required: true },
    precoTotal: { type: Number, required: true },
    dataVenda: { type: Date, default: Date.now },
});

const Venda = mongoose.model("Venda", VendaSchema);
export default Venda;
