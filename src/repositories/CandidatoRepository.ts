import type { Candidato } from '../models/Candidato.js'
import type { ICandidatoRepository } from './ICandidatoRepository.js'

const CHAVE = 'linketinder_candidatos';

export class CandidatoRepository implements ICandidatoRepository {
    private static instance: CandidatoRepository

    private constructor() {}

    static getInstance(): CandidatoRepository {
        if (!CandidatoRepository.instance) {
            CandidatoRepository.instance = new CandidatoRepository()
        }
        return CandidatoRepository.instance
    }

    listar(): Candidato[] {
        const data = localStorage.getItem(CHAVE);
        return data ? JSON.parse(data) : [];
    }

    salvar(c: Candidato): void {
        const lista = this.listar();
        lista.push(c);
        localStorage.setItem(CHAVE, JSON.stringify(lista));
    }

    deletar(id: string): void {
        const lista = this.listar().filter(c => c.id !== id);
        localStorage.setItem(CHAVE, JSON.stringify(lista));
    }
}