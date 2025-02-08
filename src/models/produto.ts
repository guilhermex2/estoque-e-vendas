import mongoose, {Schema, Document} from "mongoose";

export interface IProduto extends Document{
    codigo: number,
    nome: string,
    validade: string,
    lote: number,
    preco: number,
    observacoes: string,
    estoqueInicial: number
}
const ProdutoSchema: Schema = new Schema({
    codigo: { type: Number, require: true},
    nome: { type: String, required: true },
    validade: { type: String, require: true },
    lote:{ type: Number, require: true},
    preco: { type: Number, required: true },
    observacoes: { type: String },
    estoqueInicial: { type: Number, required: true, default: 0 }
})
export default mongoose.model<IProduto>("Produto", ProdutoSchema)