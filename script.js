// Função para buscar os estados
async function getEstados() {
    const response = await fetch('https://servicodados.ibge.gov.br/api/v1/localidades/estados');
    const estados = await response.json();
    const estadoSelect = document.getElementById('estado');

    // Ordenar os estados em ordem alfabética
    estados.sort((a, b) => a.nome.localeCompare(b.nome));

    estados.forEach(estado => {
        const option = document.createElement('option');
        option.value = estado.id;
        option.textContent = estado.nome;
        estadoSelect.appendChild(option);
    });
}

// Função para buscar as cidades com base no estado selecionado
async function getCidades(estadoId) {
    const response = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${estadoId}/municipios`);
    const cidades = await response.json();
    const cidadeList = document.getElementById('cidadeList');
    
    // Limpa as cidades anteriores
    cidadeList.innerHTML = '';

    // Ordenar as cidades em ordem alfabética
    cidades.sort((a, b) => a.nome.localeCompare(b.nome));

    cidades.forEach(cidade => {
        const li = document.createElement('li');
        li.textContent = cidade.nome;
        cidadeList.appendChild(li);
    });
}

// Event listener para quando o estado for selecionado
document.getElementById('estado').addEventListener('change', function() {
    const estadoId = this.value;
    if (estadoId) {
        getCidades(estadoId);
    } else {
        document.getElementById('cidadeList').innerHTML = '';
    }
});

// Inicializar os estados ao carregar a página
getEstados();
