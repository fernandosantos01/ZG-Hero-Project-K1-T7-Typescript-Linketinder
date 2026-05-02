import type { Vaga }  from "../models/Vaga.js";

export class VagaValidator {
    validar(v: Vaga): void {
        if (v.titulo.length < 3 && !v.titulo?.trim()) {
            throw new Error('Título deve conter pelo menos 3 caracteres e não pode ser vazio')
        }
        if(!v.empresaId?.trim()){
            throw new Error('EmpresaId é obrigatório')
        }
        if (!v.competencias || v.competencias.length === 0) {
            throw new Error('Deve haver pelo menos uma competência')
        }
    }
}
