import type { Vaga   } from '../models/Vaga.js'
import type { Empresa } from '../models/Empresa.js'

export class VagaListView {
    private readonly tabelaBody: HTMLTableSectionElement
    private readonly tooltip:    HTMLDivElement

    constructor() {
        this.tabelaBody = document.querySelector('#tabela-vagas tbody') as HTMLTableSectionElement
        this.tooltip    = document.getElementById('tooltip-vaga') as HTMLDivElement
    }

    renderizar(vagas: Vaga[], empresaMap: Map<string, Empresa>): void {
        this.tabelaBody.innerHTML = ''

        if (vagas.length === 0) {
            this.tabelaBody.innerHTML =
                '<tr><td colspan="3" style="text-align:center;">Nenhuma vaga na pista ainda.</td></tr>'
            return
        }

        vagas.forEach(vaga => {
            const empresa = empresaMap.get(vaga.empresaId)
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${vaga.titulo}</td>
                <td>${vaga.competencias.join(', ')}</td>
                <td>${vaga.local}</td>
            `
            this.configurarTooltip(tr, vaga, empresa)
            this.tabelaBody.appendChild(tr)
        })
    }

    private configurarTooltip(tr: HTMLTableRowElement, vaga: Vaga, empresa?: Empresa): void {
        tr.addEventListener('mouseenter', () => {
            this.tooltip.classList.add('visivel')
            this.tooltip.innerHTML = `
                <strong>Descrição:</strong> ${vaga.descricao}<br>
                <strong>Local:</strong> ${vaga.local}<br>
                <strong>Competências:</strong> ${vaga.competencias.join(' | ')}<br>
                ${empresa ? `<strong>Estado:</strong> ${empresa.estado} - ${empresa.pais}<br>` : ''}
                <hr style="border:0;border-top:1px solid #555;margin:8px 0">
                <em><small>Nome da firma oculto aguardando match 🔒</small></em>
            `
        })
        tr.addEventListener('mousemove', (e: MouseEvent) => {
            this.tooltip.style.left = `${e.pageX + 15}px`
            this.tooltip.style.top  = `${e.pageY + 15}px`
        })
        tr.addEventListener('mouseleave', () => {
            this.tooltip.classList.remove('visivel')
        })
    }
}
