import type { Candidato } from '../models/Candidato.js'

declare const Chart: any

export class CandidatoListView {
    private readonly tabelaBody: HTMLTableSectionElement
    private readonly tooltip:    HTMLDivElement

    constructor() {
        this.tabelaBody = document.querySelector('#tabela-candidatos tbody') as HTMLTableSectionElement
        this.tooltip    = document.getElementById('tooltip') as HTMLDivElement
    }

    renderizar(candidatos: Candidato[]): void {
        this.tabelaBody.innerHTML = ''

        if (candidatos.length === 0) {
            this.tabelaBody.innerHTML =
                '<tr><td colspan="2" style="text-align:center;">Nenhum candidato na pista ainda.</td></tr>'
            return
        }

        candidatos.forEach(cand => {
            const tr = document.createElement('tr')
            tr.innerHTML = `
                <td>${cand.habilidades.join(', ')}</td>
                <td>${cand.estado}</td>
            `
            this.configurarTooltip(tr, cand)
            this.tabelaBody.appendChild(tr)
        })
    }

    renderizarGrafico(candidatos: Candidato[]): void {
        const contagem: Record<string, number> = {}
        candidatos.forEach(cand => {
            cand.habilidades.forEach(hab => {
                const key = hab.trim().toUpperCase()
                contagem[key] = (contagem[key] ?? 0) + 1
            })
        })

        const labels = Object.keys(contagem)
        const dados  = labels.map(l => contagem[l] ?? 0)

        if (labels.length === 0) return

        const canvas = document.getElementById('grafico-skills') as HTMLCanvasElement
        new Chart(canvas, {
            type: 'bar',
            data: {
                labels,
                datasets: [{
                    label:           'Número de Candidatos',
                    data:            dados,
                    backgroundColor: '#704c4d',
                    borderColor:     '#79494a',
                    borderWidth:     1,
                    borderRadius:    4
                }]
            },
            options: {
                responsive: true,
                scales: { y: { beginAtZero: true, ticks: { stepSize: 1 } } },
                plugins: {
                    tooltip: {
                        callbacks: {
                            label: (ctx: any) => ` ${ctx.raw} candidato(s) manja(m) disso`
                        }
                    }
                }
            }
        })
    }

    private configurarTooltip(tr: HTMLTableRowElement, cand: Candidato): void {
        tr.addEventListener('mouseenter', () => {
            this.tooltip.classList.add('visivel')
            this.tooltip.innerHTML = `
                <strong>Idade:</strong> ${cand.idade} anos<br>
                <strong>Resumo:</strong> ${cand.descricao}<br>
                <strong>Habilidades:</strong> ${cand.habilidades.join(' | ')}<br>
                <hr style="border:0;border-top:1px solid #555;margin:8px 0">
                <em><small>Nome e CPF ocultos aguardando match 🔒</small></em>
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
