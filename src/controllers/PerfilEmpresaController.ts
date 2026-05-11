import { CandidatoService  } from '../services/CandidatoService.js'
import { CandidatoListView } from '../views/CandidatoListView.js'

export class PerfilEmpresaController {
    constructor(
        private readonly candidatoService: CandidatoService,
        private readonly view:             CandidatoListView
    ) {}

    init(): void {
        const candidatos = this.candidatoService.listar()
        this.view.renderizar(candidatos)
        this.view.renderizarGrafico(candidatos)
    }
}
