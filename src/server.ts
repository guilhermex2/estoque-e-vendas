import { Request, Response } from "express"
import express from 'express'
import path from 'path'
import mustache from 'mustache-express'


const server = express()

server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())

server.use(express.static(path.join(__dirname, '../public')))

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

server.get('/', home)
server.get('/cadastro', cad)
server.get('/entrada&saidas', entradaEsaida)
server.get('/entradas', entrada)
server.get('/saidas', saidas)
server.get('/vendas', vendas)

server.listen(3000, () => {
    console.log('http://localhost:3000')
})