class Musica {
    constructor(titulo, artista, ano) {
        this.titulo = titulo;
        this.artista = artista;
        this.ano = ano;
    }
}

class CadastroMusica {
    constructor() {
        this.musicas = [];
    }

    adicionarMusica(musica) {
        this.musicas.push(musica);
        this.atualizarTabela();
    }

    editarMusica(index, musicaAtualizada) {
        this.musicas[index] = musicaAtualizada;
        this.atualizarTabela();
    }

    removerMusica(index) {
        this.musicas.splice(index, 1);
        this.atualizarTabela();
    }

    atualizarTabela() {
        const tabela = document.getElementById("musicTable");
        tabela.innerHTML = "";

        this.musicas.forEach((musica, index) => {
            const linha = document.createElement("tr");
            linha.innerHTML = `
                <td>${musica.titulo}</td>
                <td>${musica.artista}</td>
                <td>${musica.ano}</td>
                <td>
                    <button class="btn btn-warning btn-sm" onclick="editarMusica(${index})">Editar</button>
                    <button class="btn btn-danger btn-sm" onclick="cadastro.removerMusica(${index})">Excluir</button>
                </td>
            `;
            tabela.appendChild(linha);
        });
    }
}

const cadastro = new CadastroMusica();

document.getElementById("musicForm").addEventListener("submit", function (evento) {
    evento.preventDefault();

    const titulo = document.getElementById("titulo").value;
    const artista = document.getElementById("artista").value;
    const ano = document.getElementById("ano").value;
    const editIndex = document.getElementById("musicIndex");

    const musica = new Musica(titulo, artista, ano);

    if (!editIndex.value) {
        cadastro.adicionarMusica(musica);
    } else {
        cadastro.editarMusica(parseInt(editIndex.value, 10), musica);
        editIndex.value = "";  
    }

    this.reset(); 
});

function editarMusica(index) {
    const musica = cadastro.musicas[index];

    document.getElementById("titulo").value = musica.titulo;
    document.getElementById("artista").value = musica.artista;
    document.getElementById("ano").value = musica.ano;
    document.getElementById("musicIndex").value = index; 
}
