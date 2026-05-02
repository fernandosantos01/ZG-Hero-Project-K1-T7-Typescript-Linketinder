import type { Candidato } from './models/Candidato.js'
import type { Empresa   } from './models/Empresa.js'
import type { Vaga      } from './models/Vaga.js'

import { CandidatoRepository } from './repositories/CandidatoRepository.js'
import { EmpresaRepository   } from './repositories/EmpresaRepository.js'
import { VagaRepository      } from './repositories/VagaRepository.js'

import { CandidatoValidator } from './validators/CandidatoValidator.js'
import { EmpresaValidator   } from './validators/EmpresaValidators.js'
import { VagaValidator      } from './validators/VagaValidator.js'

import { CandidatoService } from './services/CandidatoService.js'
import { EmpresaService   } from './services/EmpresaService.js'
import { VagaService      } from './services/VagaService.js'

import { mascaraCPF, mascaraCNPJ, mascaraTelefone, mascaraCEP } from './validators/mascaras.js'

const candidatoService = new CandidatoService(
    new CandidatoRepository(), new CandidatoValidator()
)
const empresaService = new EmpresaService(
    new EmpresaRepository(), new EmpresaValidator()
)
const vagaService = new VagaService(
    new VagaRepository(), new VagaValidator()
)

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

function gerarId(): string {
    return Math.random().toString(36).substring(2, 9)
}

function obterValor(id: string): string {
    return (document.getElementById(id) as HTMLInputElement).value
}

function coletarDadosCandidato(): Candidato {
    return {
        id:          gerarId(),
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
    }
}

document.getElementById('form-candidato')
    ?.addEventListener('submit', (e) => {
        e.preventDefault()
        try {
            candidatoService.cadastrar(coletarDadosCandidato())
            alert('Candidato cadastrado com sucesso!')
            ;(e.target as HTMLFormElement).reset()
        } catch (erro: unknown) {
            alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
        }
    })

function coletarDadosEmpresa(): Empresa {
    return {
        id:        gerarId(),
        nome:      obterValor('nome-emp'),
        email:     obterValor('email-emp'),
        cnpj:      obterValor('cnpj-emp'),
        pais:      obterValor('pais-emp'),
        estado:    obterValor('estado-emp'),
        cep:       obterValor('cep-emp'),
        descricao: obterValor('descricao-emp'),
    }
}

document.getElementById('form-empresa')
    ?.addEventListener('submit', (e) => {
        e.preventDefault()
        try {
            empresaService.cadastrar(coletarDadosEmpresa())
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

function coletarDadosVaga(): Vaga {
    return {
        id:           gerarId(),
        empresaId:    empresaIdOculto.value,
        titulo:       obterValor('titulo-vaga'),
        descricao:    obterValor('descricao-vaga'),
        local:        obterValor('local-vaga'),
        competencias: obterValor('competencias-vaga').split(',').map(s => s.trim())
    }
}

document.getElementById('form-vaga')
    ?.addEventListener('submit', (e) => {
        e.preventDefault()
        if (!empresaIdOculto.value) {
            alert('Selecione uma empresa válida na lista de sugestões.')
            return
        }
        try {
            vagaService.cadastrar(coletarDadosVaga())
            alert('Vaga publicada com sucesso!')
            ;(e.target as HTMLFormElement).reset()
            buscaEmpresaInput.value = ''
        } catch (erro: unknown) {
            alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
        }
    })

