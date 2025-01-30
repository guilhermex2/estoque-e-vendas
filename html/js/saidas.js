function atualizarEstoque(produtoId, tipo, quantidade) {
    let estoque = JSON.parse(localStorage.getItem("produtos")) || [];
    let historico = JSON.parse(localStorage.getItem("historico")) || [];

    // Converte para os tipos corretos
    produtoId = Number(produtoId);
    quantidade = Number(quantidade);

    // Encontra o produto no estoque
    let produto = estoque.find(p => p.id === produtoId);

    if (!produto) {
        alert("Produto não encontrado!");
        return;
    }

    // Converte a quantidade do produto para número
    produto.quantidade = Number(produto.quantidade);

    // Processa a movimentação
    if (tipo === "entrada") {
        produto.quantidade += quantidade;
    } else if (tipo === "saida") { // Verifique se o valor está sem acento
        if (produto.quantidade >= quantidade) {
            produto.quantidade -= quantidade;
        } else {
            alert("Quantidade insuficiente para saída!");
            return;
        }
    } else {
        alert("Tipo de movimentação inválido!");
        return;
    }

    // Atualiza o LocalStorage
    localStorage.setItem("produtos", JSON.stringify(estoque));

    // Registra a movimentação no histórico
    historico.push({
        id: produtoId,
        tipo: tipo,
        quantidade: quantidade,
        data: new Date().toISOString()
    });

    localStorage.setItem("historico", JSON.stringify(historico));

    // Atualiza a interface
    carregarProdutos();

    alert(`Movimentação registrada: ${tipo} de ${quantidade} unidades`);
}