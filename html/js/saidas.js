async function carregarProdutos() {
    try{
        const resposta = await fetch('/api/produtos')
        const produtos = await resposta.json()

        const tabela = document.querySelector('tbody')
        tabela.innerHTML = ''

        produtos.forEach( produto => {
            const linha = `
                <tr>${produto.codigo}</tr>
                <tr>${produto.nome}</tr>
                <tr>${produto.validade}</tr>
                <tr>${produto.quantidade}</tr>
            `
        });
    } catch(error){
        console.log('erro ao carregar os produtos')
    }
}