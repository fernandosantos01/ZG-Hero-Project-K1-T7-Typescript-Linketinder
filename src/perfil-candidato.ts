import { Empresa } from './models/Empresa.js';
import { Vaga } from './models/Vaga.js';
import { EmpresaRepository } from './repositories/EmpresaRepository.js';
import { VagaRepository } from './repositories/VagaRepository.js';

const vagaRepo    = VagaRepository.getInstance();
const empresaRepo = EmpresaRepository.getInstance();


const tabelaBody = document.querySelector('#tabela-vagas tbody') as HTMLTableSectionElement;
const tooltip = document.getElementById('tooltip-vaga') as HTMLDivElement;

function renderizarTabelaVagas() {
    tabelaBody.innerHTML = ''; 
    const empresas: Empresa[] = empresaRepo.listar();
    const vagas : Vaga[] = vagaRepo.listar();

    const empresaMap = new Map(empresas.map(e => [e.id, e]))

    tabelaBody.innerHTML = ''

    if (empresas.length === 0) {
        tabelaBody.innerHTML = '<tr><td colspan="3" style="text-align:center;">Nenhuma vaga na pista ainda.</td></tr>';
        return;
    }

    vagas.forEach(vaga => {
        const empresa = empresaMap.get(vaga.empresaId)
        const tr = document.createElement('tr');

        tr.innerHTML = `
            <td>${vaga.titulo}</td>
            <td>${vaga.competencias.join(', ')}</td>
            <td>${vaga.local}</td>
        `;

        tr.addEventListener('mouseenter', () => {
            tooltip.classList.add('visivel');
            tooltip.innerHTML = `
                <strong>Descrição:</strong> ${vaga.descricao}<br>
                <strong>Local:</strong> ${vaga.local}<br>
                <strong>Competências:</strong> ${vaga.competencias.join(' | ')}<br>
                ${empresa ? `<strong>Estado:</strong> ${empresa.estado} - ${empresa.pais}<br>` : ''}
                <hr style="border:0;border-top:1px solid #555;margin:8px 0">
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