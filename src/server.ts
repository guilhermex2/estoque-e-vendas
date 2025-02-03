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

server.get('/', home)


server.listen(3000, () => {
    console.log('http://localhost:3000')
})