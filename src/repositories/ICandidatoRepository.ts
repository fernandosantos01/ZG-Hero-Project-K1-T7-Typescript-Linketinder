import type { Candidato } from '../models/Candidato.js'

export interface ICandidatoRepository {
    listar():              Candidato[]
    salvar(c: Candidato): void
    deletar(id: string):  void
}