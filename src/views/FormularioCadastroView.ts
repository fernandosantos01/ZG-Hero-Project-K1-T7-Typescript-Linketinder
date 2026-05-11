import type { Empresa } from '../models/Empresa.js'

export class FormularioCadastroView {
    private readonly buscaEmpresaInput: HTMLInputElement
    private readonly sugestoesLista:    HTMLUListElement
    private readonly empresaIdOculto:   HTMLInputElement

    constructor() {
        this.buscaEmpresaInput = document.getElementById('busca-empresa-vaga') as HTMLInputElement
        this.sugestoesLista    = document.getElementById('sugestoes-empresa')   as HTMLUListElement
        this.empresaIdOculto   = document.getElementById('empresa-id-vaga')     as HTMLInputElement
    }

    obterValor(id: string): string {
        return (document.getElementById(id) as HTMLInputElement).value
    }

    obterEmpresaIdSelecionado(): string {
        return this.empresaIdOculto.value
    }

    limparEmpresaIdSelecionado(): void {
        this.empresaIdOculto.value = ''
    }

    limparBuscaEmpresa(): void {
        this.buscaEmpresaInput.value = ''
    }

    obterTermoBusca(): string {
        return this.buscaEmpresaInput.value.trim().toLowerCase()
    }

    selecionarEmpresa(empresa: Empresa): void {
        this.buscaEmpresaInput.value = empresa.nome
        this.empresaIdOculto.value   = empresa.id
        this.esconderSugestoes()
    }

    renderizarSugestoes(empresas: Empresa[], aoSelecionar: (e: Empresa) => void): void {
        this.sugestoesLista.innerHTML = ''
        if (empresas.length === 0) {
            this.sugestoesLista.classList.remove('visivel')
            return
        }
        empresas.forEach(e => {
            const li = document.createElement('li')
            li.textContent = e.nome
            li.addEventListener('click', () => aoSelecionar(e))
            this.sugestoesLista.appendChild(li)
        })
        this.sugestoesLista.classList.add('visivel')
    }

    esconderSugestoes(): void {
        this.sugestoesLista.innerHTML = ''
        this.sugestoesLista.classList.remove('visivel')
    }

    contem(node: Node): boolean {
        return this.buscaEmpresaInput.contains(node) || this.sugestoesLista.contains(node)
    }
}
