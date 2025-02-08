import { Request, Response } from "express"
import express from 'express'
import path from 'path'
import mustache from 'mustache-express'
import dotenv from 'dotenv'
import mongoose from "mongoose"
import produto from "./models/produto"
import { MongoClient } from "mongodb"

dotenv.config()
const server = express()

server.use(express.json()); // Para requisições JSON (API)
server.use(express.urlencoded({ extended: true })); // Para formulários HTML
server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

//Conectando ao mongodb
mongoose.connect(process.env.MONGO_URI as string)

server.use(express.static(path.join(__dirname, '../public')))

//Renderizando as paginas
const home = (req: Request, res: Response) => {
    res.render('pages/estoque')
}
const cad = (req: Request, res: Response) => {
    res.render('pages/cadastro')
}
const entradaEsaida = (req: Request, res: Response) => {
    res.render('pages/entrada&saidas')
}
const entrada = (req: Request, res: Response) => {
    res.render('pages/entrada')
}
const saidas = (req: Request, res: Response) => {
    res.render('pages/saidas')
}
const vendas = (req: Request, res: Response) => {
    res.render('pages/vendas')
}

const client = new MongoClient(process.env.MONGO_URI as string)


server.get('/', home)
server.get('/cadastro', cad)
server.get('/', async (req: Request, res: Response) => {
    try {
        await client.connect();
        const database = client.db("amostra_mflix");
        const collection = database.collection("produtos");

        // Buscar apenas os campos necessários
        const produtos = await collection.find({}, { projection: { 
            nome: 1, 
            validade: 1, 
            lote: 1, 
            codigo: 1, 
            quantidade: 1, 
            _id: 0 
        }}).toArray();

        console.log("Produtos encontrados:", produtos); // Verifica se os dados estão sendo carregados

        res.render('pages/estoque', { produtos });
    } catch (error) {
        console.error("Erro ao buscar os produtos:", error);
        res.status(500).send("Erro ao buscar os produtos");
    } finally {
        await client.close();
    }
});

server.post('/cadastro', async(req, res) => {
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
        console.log(novoProduto)
        res.redirect('/')
    } catch (err){
        console.log("Erro ao salvar o produto:", err)
    }

})
server.get('/entrada&saidas', entradaEsaida)
server.get('/entradas', entrada)
server.get('/saidas', saidas)
server.get('/vendas', vendas)

server.listen(3000, () => {
    console.log('http://localhost:3000')
})