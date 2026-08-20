const eventos = [
    {
        id: 1,
        nome: "Feira de Ciências",
        categoria: "Educação",
        data: "2026-08-25",
        horario: "09:00",
        local: "Laboratório de Ciências",
        descricao: "Exposição de experiências e projetos científicos realizados pelos alunos."
    },
    {
        id: 2,
        nome: "Campeonato de Futsal",
        categoria: "Esportes",
        data: "2026-09-02",
        horario: "14:00",
        local: "Ginásio Escolar",
        descricao: "Competição esportiva entre as turmas da escola."
    },
    {
        id: 3,
        nome: "Festival Cultural",
        categoria: "Cultura",
        data: "2026-09-10",
        horario: "19:00",
        local: "Auditório",
        descricao: "Apresentações de música, dança, teatro e outras manifestações culturais."
    },
    {
        id: 4,
        nome: "Semana de Tecnologia",
        categoria: "Tecnologia",
        data: "2026-09-18",
        horario: "08:30",
        local: "Sala de Informática",
        descricao: "Palestras e atividades relacionadas à tecnologia e programação."
    },
    {
        id: 5,
        nome: "Olimpíada de Matemática",
        categoria: "Educação",
        data: "2026-09-25",
        horario: "10:00",
        local: "Salas de Aula",
        descricao: "Desafio de matemática com participação dos alunos."
    },
    {
        id: 6,
        nome: "Torneio de Vôlei",
        categoria: "Esportes",
        data: "2026-10-03",
        horario: "15:00",
        local: "Quadra Esportiva",
        descricao: "Torneio de vôlei entre equipes formadas pelos estudantes."
    },
    {
        id: 7,
        nome: "Mostra de Arte",
        categoria: "Cultura",
        data: "2026-10-12",
        horario: "13:30",
        local: "Galeria da Escola",
        descricao: "Exposição de desenhos, pinturas e trabalhos artísticos dos alunos."
    },
    {
        id: 8,
        nome: "Maratona de Programação",
        categoria: "Tecnologia",
        data: "2026-10-20",
        horario: "09:00",
        local: "Laboratório de Informática",
        descricao: "Competição de programação para os estudantes."
    }
];

let categoriaAtual = "Todos";

const listaEventos = document.getElementById("listaEventos");
const tabelaEventos = document.getElementById("tabelaEventos");
const pesquisa = document.getElementById("pesquisa");

function formatarData(data) {
    const partes = data.split("-");
    return `${partes[2]}/${partes[1]}/${partes[0]}`;
}

function mostrarEventos() {

    const texto = pesquisa.value.toLowerCase();

    const eventosFiltrados = eventos.filter(evento => {

        const correspondeCategoria =
            categoriaAtual === "Todos" ||
            evento.categoria === categoriaAtual;

        const correspondePesquisa =
            evento.nome.toLowerCase().includes(texto) ||
            evento.local.toLowerCase().includes(texto);

        return correspondeCategoria && correspondePesquisa;
    });

    listaEventos.innerHTML = "";

    eventosFiltrados.forEach(evento => {

        const card = document.createElement("article");

        card.className = "card";

        card.innerHTML = `
            <span class="categoria">${evento.categoria}</span>
            <h3>${evento.nome}</h3>
            <p>📅 ${formatarData(evento.data)}</p>
            <p>⏰ ${evento.horario}</p>
            <p>📍 ${evento.local}</p>

            <button class="detalhes" onclick="verDetalhes(${evento.id})">
                👁️ Ver detalhes
            </button>
        `;

        listaEventos.appendChild(card);
    });
}

function mostrarTabela() {

    tabelaEventos.innerHTML = "";

    eventos.forEach(evento => {

        const linha = document.createElement("tr");

        linha.innerHTML = `
            <td>${evento.nome}</td>
            <td>${formatarData(evento.data)}</td>
            <td>${evento.horario}</td>
            <td>${evento.local}</td>
            <td>${evento.categoria}</td>
        `;

        tabelaEventos.appendChild(linha);
    });
}

document.querySelectorAll(".filtro").forEach(botao => {

    botao.addEventListener("click", () => {

        document.querySelectorAll(".filtro")
            .forEach(b => b.classList.remove("ativo"));

        botao.classList.add("ativo");

        categoriaAtual = botao.dataset.categoria;

        mostrarEventos();
    });
});

pesquisa.addEventListener("input", mostrarEventos);

// MODAL

function verDetalhes(id) {

    const evento = eventos.find(e => e.id === id);

    document.getElementById("modalTitulo").textContent = evento.nome;
    document.getElementById("modalDescricao").textContent = evento.descricao;
    document.getElementById("modalData").textContent = formatarData(evento.data);
    document.getElementById("modalHorario").textContent = evento.horario;
    document.getElementById("modalLocal").textContent = evento.local;
    document.getElementById("modalCategoria").textContent = evento.categoria;

    document.getElementById("modal").classList.add("ativo");
}

document.getElementById("fecharModal").addEventListener("click", () => {
    document.getElementById("modal").classList.remove("ativo");
});

document.getElementById("modal").addEventListener("click", (event) => {

    if (event.target.id === "modal") {
        document.getElementById("modal").classList.remove("ativo");
    }
});

// FORMULÁRIO

const selectEvento = document.getElementById("eventoEscolhido");

eventos.forEach(evento => {

    const option = document.createElement("option");

    option.value = evento.id;
    option.textContent = evento.nome;

    selectEvento.appendChild(option);
});

document.getElementById("formInscricao").addEventListener("submit", function(event) {

    event.preventDefault();

    const nome = document.getElementById("nome").value;
    const eventoSelecionado =
        document.getElementById("eventoEscolhido");

    const nomeEvento =
        eventoSelecionado.options[eventoSelecionado.selectedIndex].text;

    document.getElementById("mensagem").textContent =
        `✅ ${nome}, sua inscrição no evento "${nomeEvento}" foi realizada com sucesso!`;

    this.reset();
});

// CONTADOR

function atualizarContador() {

    const agora = new Date();

    const futuros = eventos
        .map(evento => ({
            ...evento,
            dataCompleta: new Date(`${evento.data}T${evento.horario}:00`)
        }))
        .filter(evento => evento.dataCompleta > agora)
        .sort((a, b) => a.dataCompleta - b.dataCompleta);

    if (futuros.length === 0) {
        document.getElementById("nomeProximo").textContent =
            "Não há próximos eventos.";

        document.getElementById("contador").textContent = "--";

        return;
    }

    const proximo = futuros[0];

    document.getElementById("nomeProximo").textContent =
        proximo.nome;

    const diferenca = proximo.dataCompleta - agora;

    const dias = Math.floor(diferenca / (1000 * 60 * 60 * 24));

    const horas = Math.floor(
        (diferenca / (1000 * 60 * 60)) % 24
    );

    const minutos = Math.floor(
        (diferenca / (1000 * 60)) % 60
    );

    const segundos = Math.floor(
        (diferenca / 1000) % 60
    );

    document.getElementById("contador").textContent =
        `${dias}d ${horas}h ${minutos}m ${segundos}s`;
}

mostrarEventos();
mostrarTabela();
atualizarContador();

setInterval(atualizarContador, 1000);
