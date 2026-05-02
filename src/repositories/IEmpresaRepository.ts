import type { Empresa } from '../models/Empresa.js';

export interface IEmpresaRepository {
    listar():          Empresa[]
    salvar(e: Empresa): void
    deletar(id: string):  void
}