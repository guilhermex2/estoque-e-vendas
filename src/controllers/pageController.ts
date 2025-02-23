import {Request, Response} from 'express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import produto from '../models/produto'
import Entrada from '../models/entrada'

dotenv.config()
mongoose.connect(process.env.MONGO_URI as string)

export const home = async (req: Request, res: Response) => {
    try {
        const produtos = await produto.find({},
            "nome validade lote preco codigo estoqueInicial"
        )
        
        console.log("Produtos encontrados:", produtos); // Verifica se os dados estão sendo carregados

        res.render('pages/estoque', { produtos });
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        res.status(500).send("Erro ao buscar os produtos");
    }
}

export const cadastro = async(req: Request, res: Response) => {
    const {codigo, nome, validade, lote, observacoes, preco, estoqueInicial} = req.body
    try {
        const novoProduto = new produto({
            codigo,
            nome, 
            validade, 
            lote, 
            observacoes, 
            preco, 
            estoqueInicial
        })
        await novoProduto.save()
        
        const novaEntrada = new Entrada({
            codigo,
            nome, 
            validade, 
            lote, 
            preco, 
            quantidade: estoqueInicial
        })
        await novaEntrada.save()

        res.redirect('/')
    } catch (err){
        console.log("Erro ao salvar o produto:", err)
    }

}

export const entrada = async (req: Request, res: Response) => {
    try{
        const entradas = await Entrada.find().lean()

        
        console.log("Registros de entrada encontrados:", entradas)

        res.render('pages/entrada', { entradas })
    } catch (error) {
        console.error("Erro ao buscar os registros de entrada:", error);
        res.status(500).send("Erro ao buscar os registros de entrada");
    }
}

export const renderizaCadastro = (req: Request, res: Response) => {
    res.render('pages/cadastro')
}

export const renderEeS = (req: Request, res: Response) => {
    res.render('pages/entrada&saidas')
}

export const saidas = (req: Request, res: Response) => {
    res.render('pages/saidas')
}

export const vendas = async (req: Request, res: Response) => {
    res.render('pages/vendas', {produto: null})
}

export const vender = async (req: Request, res: Response) => {
    const nomeProduto = req.body.nome;  // Pegando o nome enviado pelo frontend
    console.log("Produto buscado:", nomeProduto);

    try {
        const item = await produto.findOne({ nome: nomeProduto });

        if (item) {
            console.log("Produto encontrado:", item);
            res.json({ sucesso: true, produto: item }); // Retorna o produto encontrado
        } else {
            console.log("Produto não encontrado!");
            res.status(404).json({ sucesso: false, erro: "Produto não encontrado!" }); // Retorna erro 404
        }
    } catch (err) {
        console.error("Erro ao buscar produto:", err);
        res.status(500).json({ sucesso: false, erro: "Erro ao buscar produto" }); // Retorna erro 500
    }
}

export const retirarProdutos = async (req: Request, res: Response): Promise<void> => {
    try {
        const { produtos } = req.body; // Recebe os produtos e quantidades a serem retiradas

        for (const item of produtos) {
            const { id, quantidade } = item;
            console.log(`Atualizando produto ID: ${id}, Removendo: ${quantidade}`);

            // Busca o produto antes de atualizar
            const produtoExistente = await produto.findById(id);
            if (!produtoExistente) {
                console.log(`Produto com ID ${id} não encontrado.`);
                res.status(404).json({ sucesso: false, erro: `Produto com ID ${id} não encontrado!` });
                return
            }

            // Atualiza o estoque subtraindo a quantidade vendida
            const produtoAtualizado = await produto.updateOne(
                { _id: id }, 
                { $inc: { estoqueInicial: -quantidade } }
            );

            console.log("Resultado da atualização:", produtoAtualizado);

            if (produtoAtualizado.modifiedCount === 0) {
                res.status(500).json({ sucesso: false, erro: "Falha ao atualizar estoque." });
                return 
            }
        }

        res.json({ sucesso: true, mensagem: "Produtos retirados com sucesso!" });

    } catch (error) {
        console.error("Erro ao retirar produtos:", error);
        res.status(500).json({ sucesso: false, erro: "Erro ao processar a venda." });
    }
}

export const deletaProduto = async (req: Request, res: Response): Promise<void> => {
    try {
        const codigo = req.params.codigo;

        // Verificar se o código é válido
        if (!codigo) {
            res.status(400).json({ message: 'Código inválido' });
            return;
        }

        // Remover o item
        const deletedItem = await produto.findOneAndDelete({ codigo });

        if (!deletedItem) {
            res.status(404).json({ message: 'Item não encontrado' });
            return;
        }

        res.status(200).json({ message: 'Item removido com sucesso', deletedItem });
    } catch (error) {
        res.status(500).json({ message: 'Erro ao remover o item', error });
    }
}

export const limpaRegistros = async (req: Request, res: Response) => {
    try {
        await Entrada.deleteMany({}); // Remove todos os registros da coleção "entradas"
        console.log("Todas as entradas foram removidas.");
        res.status(200).json({ message: "Entradas removidas com sucesso." });
    } catch (error) {
        console.error("Erro ao limpar entradas:", error);
        res.status(500).json({ message: "Erro ao limpar entradas." });
    }
}