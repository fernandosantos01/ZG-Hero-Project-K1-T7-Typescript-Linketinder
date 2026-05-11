import type { Empresa } from '../models/Empresa.js'

export class EmpresaFactory {
    static criar(dados: Omit<Empresa, 'id'>): Empresa {
        return {
            id: Math.random().toString(36).substring(2, 9),
            ...dados
        }
    }
}
