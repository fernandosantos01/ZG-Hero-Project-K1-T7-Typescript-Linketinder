import type { Candidato } from '../models/Candidato.js'
import { ICandidatoRepository } from '../repositories/ICandidatoRepository.js'

import { CandidatoValidator } from '../validators/CandidatoValidator.js'

export class CandidatoService {
    constructor(
        private repository: ICandidatoRepository,
        private validator: CandidatoValidator
    ) {}
    salvar(c: Candidato): void {
        this.validator.validar(c)
        this.repository.salvar(c)
    }

    cadastrar(c: Candidato): void {
        this.validator.validar(c)
        this.repository.salvar(c)
    }

    listar(): Candidato[] {
        return this.repository.listar()
    }

    deletar(id: string): void {
        this.repository.deletar(id)
    }
}