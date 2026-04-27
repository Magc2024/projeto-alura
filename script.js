// ====================== COUNTDOWN ======================

const dataFinal = new Date('2026-12-31T23:59:59').getTime(); // ← Mude aqui a data desejada

function atualizarCountdown() {
    const agora = new Date().getTime();
    let distancia = dataFinal - agora;

    if (distancia < 0) {
        document.getElementById('countdown-timer').innerHTML = `
            <div style="font-size: 28px; color: var(--verde); font-weight: 700;">
                Objetivo do Ano Concluído! 🎉
            </div>
        `;
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutos = Math.floor((distancia % (1000 * 60 * 60)) / (1000 * 60));
    const segundos = Math.floor((distancia % (1000 * 60)) / 1000);

    document.getElementById('days').textContent = String(dias).padStart(2, '0');
    document.getElementById('hours').textContent = String(horas).padStart(2, '0');
    document.getElementById('minutes').textContent = String(minutos).padStart(2, '0');
    document.getElementById('seconds').textContent = String(segundos).padStart(2, '0');
}

// Atualiza o countdown a cada segundo
setInterval(atualizarCountdown, 1000);
atualizarCountdown(); // Primeira execução imediata
