import type { Empresa } from "../models/Empresa.js";
import { IEmpresaRepository } from "../repositories/IEmpresaRepository.js";
import { EmpresaValidator } from "../validators/EmpresaValidators.js";

export class EmpresaService {
    constructor(
        private repository: IEmpresaRepository,
        private validator: EmpresaValidator
    ) {}

    cadastrar(e: Empresa): void {
        this.validator.validar(e)
        this.repository.salvar(e)
    }

    listar(): Empresa[] {
        return this.repository.listar()
    }

    deletar(id: string): void {
        this.repository.deletar(id)
    }
}