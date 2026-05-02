import type { Vaga } from "../models/Vaga.js";
import type { IVagaRepository } from "./IVagaRepository.js";

export class VagaRepository implements IVagaRepository{
    CHAVE = "linketinder_vagas"
    listar(): Vaga[] {
        const data = localStorage.getItem(this.CHAVE)
        return data ? JSON.parse(data) : [];
    }
    salvar(v: Vaga): void {
        const lista = this.listar();
        lista.push(v);
        localStorage.setItem(this.CHAVE, JSON.stringify(lista))
    }
    deletar(id: string): void {
        const lista = this.listar().filter(v => v.id !== id);
        localStorage.setItem(this.CHAVE, JSON.stringify(lista))
    }
    listarPorEmpresa(empresaId: string): Vaga[] {
        return this.listar().filter(v => v.empresaId === empresaId)
    }
    
}