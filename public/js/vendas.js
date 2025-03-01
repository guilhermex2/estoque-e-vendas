const produtosBuscados = [] // Array para armazenar os produtos buscados

document.getElementById("form-busca-produto").addEventListener("submit", async function (event) {
    event.preventDefault()  // Impede o reload da página

    const inputNome = document.getElementById("termo-busca").value
    const resultadoDiv = document.getElementById("resultado-busca")  

    try {
        const response = await fetch("/vender", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ nome: inputNome })
        })

        if (!response.ok) {
            throw new Error(`Erro na requisição: ${response.statusText}`)
        }

        const data = await response.json()
        
        if (data.sucesso) {
            // Verifica se o produto já está na lista
            const produtoJaAdicionado = produtosBuscados.some(produto => produto._id === data.produto._id)

            if (!produtoJaAdicionado) {
                // Adiciona o novo produto à lista apenas se não estiver presente
                produtosBuscados.push(data.produto)

                // Limpa a div e exibe todos os produtos armazenados
                resultadoDiv.innerHTML = "" // Limpa o conteúdo anterior
                produtosBuscados.forEach(produto => {
                    resultadoDiv.innerHTML += `
                        <tr class="produto" data-id="${produto._id}">
                            <td>${produto.nome}</td>
                            <td>R$ ${produto.preco}</td>
                            <td>${produto.validade}</td>
                            <td>${produto.estoqueInicial}</td>
                            <td>
                                <button class="menos">-</button>
                                <span class="quantidade-selecionada">0</span>
                                <button class="mais">+</button>
                            </td>
                        </tr>
                    `
                })

                // Chama a função para adicionar eventos aos botões após a inserção
                adicionarEventosBotoes()

                // Atualiza o valor total
                atualizarValorTotal()
            } else {
                alert("Este produto já foi adicionado.")
            }
        } else {
            resultadoDiv.innerHTML = `<p style="color: red">${data.erro}</p>`
        }
    } catch (error) {
        console.error("Erro:", error)
        resultadoDiv.innerHTML = `<p style="color: red">Erro ao processar a busca.</p>`
    }
})

document.getElementById("vender").addEventListener("click", function () {
    const produtosSelecionados = []

    document.querySelectorAll(".produto").forEach(produto => {
        const id = produto.dataset.id
        const quantidade = parseInt(produto.querySelector(".quantidade-selecionada").textContent)

        if (quantidade > 0) {
            produtosSelecionados.push({ id, quantidade })
        }
    })

    // Envia para o backend via fetch
    fetch("/retirar-produtos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ produtos: produtosSelecionados }),
    })
    .then(response => response.json())
    .then(data => alert("Retirada confirmada!"))
    .catch(error => console.error("Erro ao retirar produtos:", error))
})
function adicionarEventosBotoes() {
    document.querySelectorAll(".produto").forEach(produto => {
        const btnMais = produto.querySelector(".mais")
        const btnMenos = produto.querySelector(".menos")
        const spanQuantidade = produto.querySelector(".quantidade-selecionada")

        let quantidade = 0 // Quantidade inicial selecionada

        btnMais.addEventListener("click", function () {
            quantidade++
            spanQuantidade.textContent = quantidade
            atualizarValorTotal()
        })

        btnMenos.addEventListener("click", function () {
            if (quantidade > 0) {
                quantidade--
                spanQuantidade.textContent = quantidade
                atualizarValorTotal()
            }
        })
    })
}
function atualizarValorTotal() {
    let total = 0

    document.querySelectorAll(".produto").forEach(produto => {
        const preco = parseFloat(produto.querySelector("td:nth-child(2)").textContent.replace("R$ ", ""))
        const quantidade = parseInt(produto.querySelector(".quantidade-selecionada").textContent)
        total += preco * quantidade
    })

    document.getElementById("valor-total").textContent = `Total: R$ ${total.toFixed(2)}`
}