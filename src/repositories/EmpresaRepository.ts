import type { Empresa } from '../models/Empresa.js';
import type { IEmpresaRepository } from './IEmpresaRepository.js';

const CHAVE = 'linketinder_empresas';

export class EmpresaRepository implements IEmpresaRepository{
    private static instance: EmpresaRepository

    private constructor() {}

    static getInstance(): EmpresaRepository {
        if (!EmpresaRepository.instance) {
            EmpresaRepository.instance = new EmpresaRepository()
        }
        return EmpresaRepository.instance
    }

    listar(): Empresa[] {
        const data = localStorage.getItem(CHAVE)
        return data ? JSON.parse(data) : []
    }
    salvar(e: Empresa): void {
        const lista = this.listar();
        lista.push(e);
        localStorage.setItem(CHAVE, JSON.stringify(lista))

    }
    deletar(id: string): void {
        const novaLista = this.listar().filter(e => e.id !== id);
        localStorage.setItem(CHAVE, JSON.stringify(novaLista))
    }
    
}