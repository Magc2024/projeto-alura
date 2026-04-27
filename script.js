// Array de objetivos (salvo no navegador)
let objetivos = JSON.parse(localStorage.getItem('objetivos')) || [
    { id: 1, texto: "Cursos na Alura", concluido: false },
    { id: 2, texto: "Criar projetos em Javascript", concluido: false },
    { id: 3, texto: "Criar um portfolio", concluido: false },
    { id: 4, texto: "Atualizar meu currículo", concluido: false }
];

// Elementos da página
const listaObjetivos = document.getElementById('lista-objetivos');
const btnAdicionar = document.getElementById('btn-adicionar');
const modal = document.getElementById('modal');
const inputObjetivo = document.getElementById('input-objetivo');
const btnSalvar = document.getElementById('btn-salvar');
const btnCancelar = document.getElementById('btn-cancelar');
const modalTitulo = document.getElementById('modal-titulo');

let modoEdicao = null; // ID do objetivo que está sendo editado

// Renderiza todos os objetivos na tela
function renderizarObjetivos() {
    listaObjetivos.innerHTML = '';

    objetivos.forEach((objetivo) => {
        const div = document.createElement('div');
        div.className = `objetivo ${objetivo.concluido ? 'concluido' : ''}`;
        div.innerHTML = `
            <span>${objetivo.texto}</span>
            <span class="check">✅</span>
        `;

        // Clique simples = marcar como concluído
        div.addEventListener('click', (e) => {
            if (!e.target.closest('.botao-editar')) {
                toggleConcluido(objetivo.id);
            }
        });

        // Duplo clique = editar objetivo
        div.addEventListener('dblclick', () => editarObjetivo(objetivo.id));

        listaObjetivos.appendChild(div);
    });
}

// Marca ou desmarca como concluído
function toggleConcluido(id) {
    objetivos = objetivos.map(obj => {
        if (obj.id === id) {
            obj.concluido = !obj.concluido;
        }
        return obj;
    });
    salvarEAtualizar();
}

// Abre o modal para adicionar novo objetivo
function abrirModal() {
    modal.style.display = 'flex';
    inputObjetivo.value = '';
    modalTitulo.textContent = 'Novo Objetivo';
    modoEdicao = null;
    inputObjetivo.focus();
}

// Salva ou atualiza um objetivo
function salvarObjetivo() {
    const texto = inputObjetivo.value.trim();

    if (texto === '') return;

    if (modoEdicao !== null) {
        // Editando
        objetivos = objetivos.map(obj => {
            if (obj.id === modoEdicao) {
                obj.texto = texto;
            }
            return obj;
        });
    } else {
        // Novo objetivo
        const novo = {
            id: Date.now(),
            texto: texto,
            concluido: false
        };
        objetivos.push(novo);
    }

    modal.style.display = 'none';
    salvarEAtualizar();
}

// Abre o modal para editar um objetivo existente
function editarObjetivo(id) {
    const objetivo = objetivos.find(obj => obj.id === id);
    if (!objetivo) return;

    modoEdicao = id;
    inputObjetivo.value = objetivo.texto;
    modalTitulo.textContent = 'Editar Objetivo';
    modal.style.display = 'flex';
    inputObjetivo.focus();
}

// Salva no localStorage e atualiza a tela
function salvarEAtualizar() {
    localStorage.setItem('objetivos', JSON.stringify(objetivos));
    renderizarObjetivos();
}

// ====================== EVENTOS ======================

btnAdicionar.addEventListener('click', abrirModal);

btnSalvar.addEventListener('click', salvarObjetivo);

btnCancelar.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Fechar com tecla ESC e salvar com Enter
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.style.display === 'flex') {
        modal.style.display = 'none';
    }
    if (e.key === 'Enter' && modal.style.display === 'flex') {
        salvarObjetivo();
    }
});

// Inicializa o projeto
renderizarObjetivos();