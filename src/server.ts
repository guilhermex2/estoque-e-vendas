import express from 'express'
import path from 'path'
import mustache from 'mustache-express'
import router from './routes'


const server = express()

server.use(express.json()); // Para requisições JSON (API)
server.use(express.urlencoded({ extended: true })); // Para formulários HTML
server.set('view engine', 'mustache')
server.set('views', path.join(__dirname, 'views'))
server.engine('mustache', mustache())
server.use(express.static(path.join(__dirname, '../public')))

server.use(router)

server.listen(3000, () => {
    console.log('http://localhost:3000')
})