import { getEmpresas, Empresa } from './database.js';

const tabelaBody = document.querySelector('#tabela-vagas tbody') as HTMLTableSectionElement;
const tooltip = document.getElementById('tooltip-vaga') as HTMLDivElement;

const empresas: Empresa[] = getEmpresas();

function renderizarTabelaVagas() {
    tabelaBody.innerHTML = ''; 

    if (empresas.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="2" style="text-align:center;">Nenhuma vaga na pista ainda.</td></tr>';
        return;
    }

    empresas.forEach(empresa => {
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${empresa.descricao}</td>
            <td>${empresa.habilidades.join(', ')}</td>
        `;

        tr.addEventListener('mouseenter', () => {
            tooltip.classList.add('visivel');
            tooltip.innerHTML = `
                <strong>Local:</strong> ${empresa.estado} - ${empresa.pais}<br>
                <strong>Habilidades Exigidas:</strong> ${empresa.habilidades.join(' | ')}<br>
                <hr style="border: 0; border-top: 1px solid #555; margin: 8px 0;">
                <em><small>Nome da firma oculto aguardando match 🔒</small></em>
            `;
        });

        tr.addEventListener('mousemove', (e: MouseEvent) => {
            tooltip.style.left = `${e.pageX + 15}px`;
            tooltip.style.top = `${e.pageY + 15}px`;
        });

        tr.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visivel');
        });

        tabelaBody.appendChild(tr);
    });
}

renderizarTabelaVagas();