async function limparEntradas() {
    if (confirm("Tem certeza que deseja limpar todas as entradas?")) {
        const response = await fetch('/limpar-entradas', { method: 'DELETE' });
        if (response.ok) {
            alert("Entradas removidas com sucesso!");
            location.reload();
        } else {
            alert("Erro ao limpar as entradas.");
        }
    }
}