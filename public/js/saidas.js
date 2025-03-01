async function limparSaidas() {
    if (confirm("Tem certeza que deseja limpar todas as entradas?")) {
        const response = await fetch('/limpar-saidas', { method: 'DELETE' });
        if (response.ok) {
            alert("Saídas removidas com sucesso!");
            location.reload();
        } else {
            alert("Erro ao limpar as saídas.");
        }
    }
}