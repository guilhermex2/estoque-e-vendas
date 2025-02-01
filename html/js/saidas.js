let produto = JSON.parse(localStorage.getItem('produtos')) || []
let tbody = document.querySelector('tbody')

produto.forEach(produto => {
    let tr = document.createElement('tr'); 

    
    tr.innerHTML = `
        <td>${produto.codigo}</td>
        <td>${produto.nome}</td>
        <td>${produto.validade}</td>
        <td>${produto.estoqueInicial}</td>
        <td>${produto.metodo}</td>
        <td><a href="#">Visualizar</a></td>
    `;

   
    tbody.appendChild(tr);
});