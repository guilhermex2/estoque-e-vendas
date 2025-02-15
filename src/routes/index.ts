import { Router } from "express";
import * as pageController from "../controllers/pageController"


const router = Router()

router.get('/', pageController.home) //Rota para pagina de estoque
router.delete('/limpar-entradas', pageController.limpaRegistros) //Rota para limpar os registros
router.delete("/:codigo", pageController.deletaProduto) //Rota para deletar produto do estoque
router.get('/cadastro', pageController.renderizaCadastro)
router.post('/cadastro', pageController.cadastro) //Rota para cadastro do produto
router.get('/entrada&saidas', pageController.renderEeS)
router.get('/entradas', pageController.entrada)

router.get('/saidas', pageController.saidas)
router.get('/vendas', pageController.vendas)

export default router