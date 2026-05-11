import { ServiceFactory    } from './factories/ServiceFactory.js'
import { CandidatoFactory  } from './factories/CandidatoFactory.js'
import { EmpresaFactory    } from './factories/EmpresaFactory.js'
import { VagaFactory       } from './factories/VagaFactory.js'

import type { Empresa } from './models/Empresa.js'

import { mascaraCPF, mascaraCNPJ, mascaraTelefone, mascaraCEP } from './validators/mascaras.js'

const candidatoService = ServiceFactory.criarCandidatoService()
const empresaService   = ServiceFactory.criarEmpresaService()
const vagaService      = ServiceFactory.criarVagaService()

function aplicarMascara(id: string, fn: (v: string) => string): void {
    const input = document.getElementById(id) as HTMLInputElement
    input?.addEventListener('input', e => {
        const t = e.target as HTMLInputElement
        t.value = fn(t.value)
    })
}

aplicarMascara('cpf-cand',      mascaraCPF)
aplicarMascara('telefone-cand', mascaraTelefone)
aplicarMascara('cnpj-emp',      mascaraCNPJ)
aplicarMascara('cep-cand',      mascaraCEP)
aplicarMascara('cep-emp',       mascaraCEP)

function obterValor(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value
}

document.getElementById('form-candidato')
    ?.addEventListener('submit', (e) => {
        e.preventDefault()
        try {
            const candidato = CandidatoFactory.criar({
                nome:        obterValor('nome-cand'),
                email:       obterValor('email-cand'),
                cpf:         obterValor('cpf-cand'),
                telefone:    obterValor('telefone-cand'),
                linkedin:    obterValor('linkedin-cand'),
                cep:         obterValor('cep-cand'),
                idade:       parseInt(obterValor('idade-cand'), 10),
                estado:      obterValor('estado-cand'),
                descricao:   obterValor('descricao-cand'),
                habilidades: obterValor('habilidades-cand').split(',').map(s => s.trim())
            })
            candidatoService.cadastrar(candidato)
            alert('Candidato cadastrado com sucesso!')
            ;(e.target as HTMLFormElement).reset()
        } catch (erro: unknown) {
            alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
        }
    })

document.getElementById('form-empresa')
    ?.addEventListener('submit', (e) => {
        e.preventDefault()
        try {
            const empresa = EmpresaFactory.criar({
                nome:      obterValor('nome-emp'),
                email:     obterValor('email-emp'),
                cnpj:      obterValor('cnpj-emp'),
                pais:      obterValor('pais-emp'),
                estado:    obterValor('estado-emp'),
                cep:       obterValor('cep-emp'),
                descricao: obterValor('descricao-emp'),
            })
            empresaService.cadastrar(empresa)
            alert('Empresa cadastrada com sucesso!')
            ;(e.target as HTMLFormElement).reset()
        } catch (erro: unknown) {
            alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
        }
    })

const buscaEmpresaInput = document.getElementById('busca-empresa-vaga') as HTMLInputElement
const sugestoesLista    = document.getElementById('sugestoes-empresa')   as HTMLUListElement
const empresaIdOculto   = document.getElementById('empresa-id-vaga')     as HTMLInputElement

function renderizarSugestoes(empresas: Empresa[]): void {
    sugestoesLista.innerHTML = ''
    if (empresas.length === 0) {
        sugestoesLista.classList.remove('visivel')
        return
    }
    empresas.forEach(e => {
        const li = document.createElement('li')
        li.textContent = e.nome
        li.addEventListener('click', () => {
            buscaEmpresaInput.value  = e.nome
            empresaIdOculto.value    = e.id
            sugestoesLista.innerHTML = ''
            sugestoesLista.classList.remove('visivel')
        })
        sugestoesLista.appendChild(li)
    })
    sugestoesLista.classList.add('visivel')
}

buscaEmpresaInput.addEventListener('input', () => {
    empresaIdOculto.value = ''
    const termo = buscaEmpresaInput.value.trim().toLowerCase()
    if (termo.length === 0) {
        sugestoesLista.innerHTML = ''
        sugestoesLista.classList.remove('visivel')
        return
    }
    const filtradas = empresaService.listar().filter(e =>
        e.nome.toLowerCase().includes(termo)
    )
    renderizarSugestoes(filtradas)
})

document.addEventListener('click', (e) => {
    if (!buscaEmpresaInput.contains(e.target as Node) &&
        !sugestoesLista.contains(e.target as Node)) {
        sugestoesLista.innerHTML = ''
        sugestoesLista.classList.remove('visivel')
    }
})

document.getElementById('form-vaga')
    ?.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!empresaIdOculto.value) {
            alert('Selecione uma empresa válida na lista de sugestões.')
            return
        }
        try {
            const vaga = VagaFactory.criar({
                empresaId:    empresaIdOculto.value,
                titulo:       obterValor('titulo-vaga'),
                descricao:    obterValor('descricao-vaga'),
                local:        obterValor('local-vaga'),
                competencias: obterValor('competencias-vaga').split(',').map(s => s.trim())
            })
            vagaService.cadastrar(vaga)
            alert('Vaga publicada com sucesso!')
            ;(e.target as HTMLFormElement).reset()
            buscaEmpresaInput.value = ''
        } catch (erro: unknown) {
            alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
        }
    })
