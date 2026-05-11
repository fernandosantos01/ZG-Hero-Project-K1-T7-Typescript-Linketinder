import { CandidatoService } from '../services/CandidatoService.js'
import { EmpresaService   } from '../services/EmpresaService.js'
import { VagaService      } from '../services/VagaService.js'
import { CandidatoFactory } from '../factories/CandidatoFactory.js'
import { EmpresaFactory   } from '../factories/EmpresaFactory.js'
import { VagaFactory      } from '../factories/VagaFactory.js'
import { FormularioCadastroView } from '../views/FormularioCadastroView.js'
import { mascaraCPF, mascaraCNPJ, mascaraTelefone, mascaraCEP } from '../validators/mascaras.js'

export class CadastroController {
    constructor(
        private readonly candidatoService: CandidatoService,
        private readonly empresaService:   EmpresaService,
        private readonly vagaService:      VagaService,
        private readonly view:             FormularioCadastroView
    ) {}

    init(): void {
        this.aplicarMascaras()
        this.registrarFormularioCandidato()
        this.registrarFormularioEmpresa()
        this.registrarBuscaEmpresa()
        this.registrarFormularioVaga()
        this.registrarFechamentoDeSugestoes()
    }

    private aplicarMascaras(): void {
        const aplicar = (id: string, fn: (v: string) => string) => {
            const input = document.getElementById(id) as HTMLInputElement
            input?.addEventListener('input', e => {
                (e.target as HTMLInputElement).value = fn((e.target as HTMLInputElement).value)
            })
        }
        aplicar('cpf-cand',      mascaraCPF)
        aplicar('telefone-cand', mascaraTelefone)
        aplicar('cnpj-emp',      mascaraCNPJ)
        aplicar('cep-cand',      mascaraCEP)
        aplicar('cep-emp',       mascaraCEP)
    }

    private registrarFormularioCandidato(): void {
        document.getElementById('form-candidato')?.addEventListener('submit', (e) => {
            e.preventDefault()
            try {
                const candidato = CandidatoFactory.criar({
                    nome:        this.view.obterValor('nome-cand'),
                    email:       this.view.obterValor('email-cand'),
                    cpf:         this.view.obterValor('cpf-cand'),
                    telefone:    this.view.obterValor('telefone-cand'),
                    linkedin:    this.view.obterValor('linkedin-cand'),
                    cep:         this.view.obterValor('cep-cand'),
                    idade:       parseInt(this.view.obterValor('idade-cand'), 10),
                    estado:      this.view.obterValor('estado-cand'),
                    descricao:   this.view.obterValor('descricao-cand'),
                    habilidades: this.view.obterValor('habilidades-cand').split(',').map(s => s.trim())
                })
                this.candidatoService.cadastrar(candidato)
                alert('Candidato cadastrado com sucesso!')
                ;(e.target as HTMLFormElement).reset()
            } catch (erro: unknown) {
                alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
            }
        })
    }

    private registrarFormularioEmpresa(): void {
        document.getElementById('form-empresa')?.addEventListener('submit', (e) => {
            e.preventDefault()
            try {
                const empresa = EmpresaFactory.criar({
                    nome:      this.view.obterValor('nome-emp'),
                    email:     this.view.obterValor('email-emp'),
                    cnpj:      this.view.obterValor('cnpj-emp'),
                    pais:      this.view.obterValor('pais-emp'),
                    estado:    this.view.obterValor('estado-emp'),
                    cep:       this.view.obterValor('cep-emp'),
                    descricao: this.view.obterValor('descricao-emp'),
                })
                this.empresaService.cadastrar(empresa)
                alert('Empresa cadastrada com sucesso!')
                ;(e.target as HTMLFormElement).reset()
            } catch (erro: unknown) {
                alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
            }
        })
    }

    private registrarBuscaEmpresa(): void {
        const inputBusca = document.getElementById('busca-empresa-vaga') as HTMLInputElement
        inputBusca?.addEventListener('input', () => {
            this.view.limparEmpresaIdSelecionado()
            const termo = this.view.obterTermoBusca()
            if (termo.length === 0) {
                this.view.esconderSugestoes()
                return
            }
            const filtradas = this.empresaService.listar().filter(e =>
                e.nome.toLowerCase().includes(termo)
            )
            this.view.renderizarSugestoes(filtradas, (empresa) => {
                this.view.selecionarEmpresa(empresa)
            })
        })
    }

    private registrarFechamentoDeSugestoes(): void {
        document.addEventListener('click', (e) => {
            if (!this.view.contem(e.target as Node)) {
                this.view.esconderSugestoes()
            }
        })
    }

    private registrarFormularioVaga(): void {
        document.getElementById('form-vaga')?.addEventListener('submit', (e) => {
            e.preventDefault()
            if (!this.view.obterEmpresaIdSelecionado()) {
                alert('Selecione uma empresa válida na lista de sugestões.')
                return
            }
            try {
                const vaga = VagaFactory.criar({
                    empresaId:    this.view.obterEmpresaIdSelecionado(),
                    titulo:       this.view.obterValor('titulo-vaga'),
                    descricao:    this.view.obterValor('descricao-vaga'),
                    local:        this.view.obterValor('local-vaga'),
                    competencias: this.view.obterValor('competencias-vaga').split(',').map(s => s.trim())
                })
                this.vagaService.cadastrar(vaga)
                alert('Vaga publicada com sucesso!')
                ;(e.target as HTMLFormElement).reset()
                this.view.limparBuscaEmpresa()
            } catch (erro: unknown) {
                alert(erro instanceof Error ? erro.message : 'Erro desconhecido.')
            }
        })
    }
}
