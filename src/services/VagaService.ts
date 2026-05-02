import type { Vaga } from "../models/Vaga.js";
import type { IVagaRepository } from "../repositories/IVagaRepository.js";
import { VagaValidator } from "../validators/VagaValidator.js";

export class VagaService{
    constructor(
        private readonly repository: IVagaRepository,
        private readonly validator: VagaValidator
    ){}

    cadastrar(vaga: Vaga):void{
        this.validator.validar(vaga)
        this.repository.salvar(vaga)
    }
    listar():Vaga[]{
        return this.repository.listar()
    }
    deletar(idVaga: string):void{
        return this.repository.deletar(idVaga)
    }
    listarPorEmpresa(idEmpresa: string):Vaga[]{
        return this.repository.listarPorEmpresa(idEmpresa)
    }
}