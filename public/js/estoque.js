document.addEventListener("DOMContentLoaded", function () {
    const modal = document.getElementById("modal");
    const observacoesDiv = modal.querySelector(".observacoes-modal");
    const fecharModalBtn = modal.querySelector(".fechar-modal");

    if (!modal || !observacoesDiv || !fecharModalBtn) {
        console.error("Erro: Elementos do modal não encontrados.");
        return;
    }

    // Seleciona todas as linhas da tabela
    document.querySelectorAll("tbody tr").forEach((row) => {
        const olhoIcon = row.querySelector(".bi-eye-fill");

        if (olhoIcon) {
            olhoIcon.addEventListener("click", function () {
                const observacoes = row.dataset.observacoes || "Sem observações.";
                observacoesDiv.textContent = observacoes;
                modal.showModal();
            });
        }
    });

    // Evento para fechar o modal
    fecharModalBtn.addEventListener("click", function () {
        modal.close();
    });


    const deleteIcons = document.querySelectorAll(".delete-icon");

      deleteIcons.forEach(icon => {
        icon.addEventListener("click", async function () {
        const row = this.closest("tr"); // Obtém a linha da tabela
        const codigo = row.dataset.codigo; // Obtém o código do produto

        if (!codigo) return;

        const confirmDelete = confirm(`Tem certeza que deseja excluir o item com código ${codigo}?`);
        if (!confirmDelete) return;

        try {
            const response = await fetch(`/${codigo}`, {
                method: "DELETE",
            });

            if (response.ok) {
                row.remove(); // Remove a linha da tabela
                alert("Produto removido com sucesso!");
            } else {
                alert("Erro ao remover o produto.");
            }
        } catch (error) {
            console.error("Erro ao remover produto:", error);
        }
    });
});
});