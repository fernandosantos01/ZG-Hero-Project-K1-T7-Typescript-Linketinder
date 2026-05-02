import type { Vaga } from '../models/Vaga.js'

export interface IVagaRepository {
    listar():          Vaga[]
    salvar(v: Vaga): void
    deletar(id: string): void
    listarPorEmpresa(empresaId: string): Vaga[]
}