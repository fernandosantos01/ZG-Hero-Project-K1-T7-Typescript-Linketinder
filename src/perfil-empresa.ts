import { CandidatoRepository } from './repositories/CandidatoRepository.js'
import type { Candidato } from './models/Candidato.js'

declare const Chart: any

const candidatoRepo = new CandidatoRepository()
const candidatos: Candidato[] = candidatoRepo.listar()

const tabelaBody = document.querySelector('#tabela-candidatos tbody') as HTMLTableSectionElement
const tooltip    = document.getElementById('tooltip') as HTMLDivElement

function renderizarTabela(): void {
    tabelaBody.innerHTML = ''

    if (candidatos.length === 0) {
        tabelaBody.innerHTML =
            '<tr><td colspan="2" style="text-align:center;">Nenhum candidato na pista ainda.</td></tr>'
        return
    }

    candidatos.forEach(cand => {
        const tr = document.createElement('tr')
        tr.innerHTML = `
            <td>${cand.habilidades.join(', ')}</td>
            <td>${cand.estado}</td>
        `

        tr.addEventListener('mouseenter', () => {
            tooltip.classList.add('visivel')
            tooltip.innerHTML = `
                <strong>Idade:</strong> ${cand.idade} anos<br>
                <strong>Resumo:</strong> ${cand.descricao}<br>
                <strong>Habilidades:</strong> ${cand.habilidades.join(' | ')}<br>
                <hr style="border:0;border-top:1px solid #555;margin:8px 0">
                <em><small>Nome e CPF ocultos aguardando match 🔒</small></em>
            `
        })

        tr.addEventListener('mousemove', (e: MouseEvent) => {
            tooltip.style.left = `${e.pageX + 15}px`
            tooltip.style.top  = `${e.pageY + 15}px`
        })

        tr.addEventListener('mouseleave', () => {
            tooltip.classList.remove('visivel')
        })

        tabelaBody.appendChild(tr)
    })
}

function renderizarGrafico(): void {
    const contagem: Record<string, number> = {}

    candidatos.forEach(cand => {
        cand.habilidades.forEach(hab => {
            const key = hab.trim().toUpperCase()
            contagem[key] = (contagem[key] ?? 0) + 1
        })
    })

    const labels = Object.keys(contagem)
    const dados  = labels.map(l => contagem[l])

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

renderizarTabela()
renderizarGrafico()