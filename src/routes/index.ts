import { Router } from "express";
import * as pageController from "../controllers/pageController"


const router = Router()

router.get('/', pageController.home) //Rota para pagina de estoque
router.delete('/limpar-entradas', pageController.limpaRegistros) //Rota para limpar os registros
router.delete('/limpar-saidas', pageController.limparSaidas) //Rota para limpar os registros
router.delete("/:codigo", pageController.deletaProduto) //Rota para deletar produto do estoque
router.get('/cadastro', pageController.renderizaCadastro)
router.post('/cadastro', pageController.cadastro) //Rota para cadastro do produto
router.get('/entrada&saidas', pageController.renderEeS)
router.get('/entradas', pageController.entrada)
router.get('/vendas', pageController.vendas)
router.post('/vender', pageController.vender)
router.post('/retirar-produtos', pageController.retirarProdutos)
router.get('/saidas', pageController.saidas)

export default router