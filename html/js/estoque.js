//Puxando todos os dados para o estoque
function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || []

    let tbody = document.querySelector('tbody')
    tbody.innerHTML = ''

    produtos.forEach(produto => {
        let tr = document.createElement('tr')
        tr.setAttribute("data-codigo", produto.codigo)
        
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.validade}</td>
            <td>${produto.estoqueInicial}</td>
            <td><svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" color="grey" class="bi bi-eye-fill" viewBox="0 0 16 16">
                <path d="M10.5 8a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0"/>
                <path d="M0 8s3-5.5 8-5.5S16 8 16 8s-3 5.5-8 5.5S0 8 0 8m8 3.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7"/>
                </svg> | <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" color="red" class="bi bi-x-circle-fill delete-icon" viewBox="0 0 16 16">
                <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0M5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293z"/>
                </svg>
            </td>
        `;
           
        tbody.appendChild(tr);
    });
    adicionarEventosDeClique()
}
document.addEventListener('DOMContentLoaded', carregarProdutos);

function adicionarEventosDeClique() {
    const modal = document.getElementById("modal");
    const closeModalBtn = document.querySelector(".fechar-modal");

    // Evento para abrir o modal (visualização)
    document.querySelectorAll(".view-icon").forEach(eyeIcon => {
        eyeIcon.addEventListener("click", function () {
            const tr = this.closest("tr");
            const codigoProduto = tr.getAttribute("data-codigo");

            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];
            let produto = produtos.find(p => p.codigo == codigoProduto); // Comparação ajustada

            if (produto) {
                document.querySelector('.nome-modal').textContent = `Nome: ${produto.nome}`;
                document.querySelector('.validade-modal').textContent = `Validade: ${produto.validade}`;
                document.querySelector('.lote-modal').textContent = `Lote: ${produto.lote || 'Não informado'}`;
                document.querySelector('.tipo-modal').textContent = `Tipo: ${produto.tipo || 'Não informado'}`;
                document.querySelector('.preco-modal').textContent = `Preço: R$ ${produto.preco || 'Não informado'}`;
                document.querySelector('.observacoes-modal').textContent = `Observações: ${produto.observacoes || 'Sem observações'}`;
                document.querySelector('.estoque-modal').textContent = `Estoque: ${produto.estoqueInicial}`;

                modal.showModal();
            }
        });
    });

    // Evento para excluir o item
    document.querySelectorAll(".delete-icon").forEach(deleteIcon => {
        deleteIcon.addEventListener("click", function () {
            const tr = this.closest("tr");
            const codigoProduto = tr.getAttribute("data-codigo");

            let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

            // Filtra a lista para remover o produto com esse código
            let novosProdutos = produtos.filter(p => p.codigo != codigoProduto); // Comparação ajustada

            // Atualiza o localStorage
            localStorage.setItem('produtos', JSON.stringify(novosProdutos));

            // Remove a linha da tabela sem recarregar
            tr.remove();
        });
    });

    // Fechar o modal ao clicar no botão "Fechar"
    closeModalBtn.addEventListener("click", function () {
        modal.close();
    });
}

document.addEventListener("DOMContentLoaded", carregarProdutos)


