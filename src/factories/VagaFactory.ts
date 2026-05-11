import type { Vaga } from '../models/Vaga.js'

export class VagaFactory {
    static criar(dados: Omit<Vaga, 'id'>): Vaga {
        return {
            id: Math.random().toString(36).substring(2, 9),
            ...dados
        }
    }
}
