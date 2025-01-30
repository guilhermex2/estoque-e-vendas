//Puxando todos os dados para o estoque
function carregarProdutos() {
    let produtos = JSON.parse(localStorage.getItem('produtos')) || [];

    let tbody = document.querySelector('tbody'); 
    tbody.innerHTML = ''; 

    produtos.forEach(produto => {
        let tr = document.createElement('tr'); 

        
        tr.innerHTML = `
            <td>${produto.codigo}</td>
            <td>${produto.nome}</td>
            <td>${produto.validade}</td>
            <td>${produto.quantidade}</td>
            <td><a href="#">Visualizar</a></td>
        `;

       
        tbody.appendChild(tr);
    });
}

document.addEventListener('DOMContentLoaded', carregarProdutos);
