import { VagaService    } from '../services/VagaService.js'
import { EmpresaService } from '../services/EmpresaService.js'
import { VagaListView   } from '../views/VagaListView.js'
import type { Empresa   } from '../models/Empresa.js'

export class PerfilCandidatoController {
    constructor(
        private readonly vagaService:    VagaService,
        private readonly empresaService: EmpresaService,
        private readonly view:           VagaListView
    ) {}

    init(): void {
        const vagas      = this.vagaService.listar()
        const empresas   = this.empresaService.listar()
        const empresaMap = new Map<string, Empresa>(empresas.map(e => [e.id, e]))
        this.view.renderizar(vagas, empresaMap)
    }
}
