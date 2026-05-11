import type { Candidato } from '../models/Candidato.js'

export class CandidatoFactory {
    static criar(dados: Omit<Candidato, 'id'>): Candidato {
        return {
            id: Math.random().toString(36).substring(2, 9),
            ...dados
        }
    }
}
