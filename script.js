// Array de objetivos
let objetivos = JSON.parse(localStorage.getItem('objetivos')) || [
    { id: 1, texto: "Estudar cursos na Alura", concluido: false },
    { id: 2, texto: "Criar projetos em Javascript", concluido: false },
    { id: 3, texto: "Criar um portfolio", concluido: false },
    { id: 4, texto: "Atualizar meu currículo", concluido: false }
];

let objetivoAtual = 1; // ID do objetivo exibido no card

const listaTabs = document.getElementById('tabs');
const textoObjetivoAtivo = document.getElementById('texto-objetivo-ativo');
const btnAdicionar = document.getElementById('btn-adicionar');
const modal = document.getElementById('modal');
const inputObjetivo = document.getElementById('input-objetivo');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const modalTitulo = document.getElementById('modal-titulo');

let modoEdicao = null;

// Renderiza as tabs
function renderizarTabs() {
    listaTabs.innerHTML = '';
    
    objetivos.forEach(obj => {
        const tab = document.createElement('button');
        tab.className = `tab ${obj.id === objetivoAtual ? 'ativo' : ''}`;
        tab.textContent = obj.texto.length > 25 ? obj.texto.substring(0, 22) + '...' : obj.texto;
        
        tab.addEventListener('click', () => {
            objetivoAtual = obj.id;
            renderizarTabs();
            atualizarCardObjetivo();
        });
        
        listaTabs.appendChild(tab);
    });
}

// Atualiza o card central
function atualizarCardObjetivo() {
    const obj = objetivos.find(o => o.id === objetivoAtual);
    if (obj) {
        textoObjetivoAtivo.textContent = obj.texto;
    }
}

// Toggle concluído (mantém funcionalidade original)
function toggleConcluido(id) {
    objetivos = objetivos.map(obj => {
        if (obj.id === id) obj.concluido = !obj.concluido;
        return obj;
    });
    salvarEAtualizar();
}

// Modal
function abrirModal() {
    modal.style.display = 'flex';
    inputObjetivo.value = '';
    modalTitulo.textContent = 'Novo Objetivo';
    modoEdicao = null;
    inputObjetivo.focus();
}

function salvarObjetivo() {
    const texto = inputObjetivo.value.trim();
    if (!texto) return;

    if (modoEdicao) {
        objetivos = objetivos.map(obj => {
            if (obj.id === modoEdicao) obj.texto = texto;
            return obj;
        });
    } else {
        objetivos.push({
            id: Date.now(),
            texto: texto,
            concluido: false
        });
    }

    modal.style.display = 'none';
    salvarEAtualizar();
}

function editarObjetivo(id) {
    const obj = objetivos.find(o => o.id === id);
    if (!obj) return;
    modoEdicao = id;
    inputObjetivo.value = obj.texto;
    modalTitulo.textContent = 'Editar Objetivo';
    modal.style.display = 'flex';
    inputObjetivo.focus();
}

function salvarEAtualizar() {
    localStorage.setItem('objetivos', JSON.stringify(objetivos));
    renderizarTabs();
    atualizarCardObjetivo();
}

// Countdown
const dataFinal = new Date('2026-12-31T23:59:59').getTime();

function atualizarCountdown() {
    const agora = Date.now();
    let distancia = dataFinal - agora;

    if (distancia < 0) {
        document.getElementById('countdown-timer').innerHTML = `<div style="font-size:28px;color:var(--verde)">Objetivo do Ano Concluído! 🎉</div>`;
        return;
    }

    const dias = Math.floor(distancia / (1000*60*60*24));
    const horas = Math.floor((distancia % (1000*60*60*24)) / (1000*60*60));
    const minutos = Math.floor((distancia % (1000*60*60)) / (1000*60));
    const segundos = Math.floor((distancia % (1000*60)) / 1000);

    document.getElementById('days').textContent = String(dias).padStart(2, '0');
    document.getElementById('hours').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutos).padStart(2, '0');
    document.getElementById('seconds').textContent = String(segundos).padStart(2, '0');
}

// Eventos
btnAdicionar.addEventListener('click', abrirModal);
btnSalvar.addEventListener('click', salvarObjetivo);
btnCancelar.addEventListener('click', () => modal.style.display = 'none');

document.addEventListener('keydown', e => {
    if (e.key === 'Escape' && modal.style.display === 'flex') modal.style.display = 'none';
    if (e.key === 'Enter' && modal.style.display === 'flex') salvarObjetivo();
});

// Inicialização
renderizarTabs();
atualizarCardObjetivo();
setInterval(atualizarCountdown, 1000);
atualizarCountdown();
