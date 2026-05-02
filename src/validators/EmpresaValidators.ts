import type { Empresa } from "../models/Empresa.js";

const REGEX = {
    nome:  /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    cnpj:  /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/,
    cep:   /^\d{5}-\d{3}$/
} as const

export class EmpresaValidator {
    validar(e: Empresa): void {
        if (!REGEX.nome.test(e.nome)) {
            throw new Error('Nome deve conter pelo menos 3 caracteres e apenas letras e espaços')
        }
        if (!REGEX.email.test(e.email)) {
            throw new Error('Email inválido')
        }
        if (!REGEX.cnpj.test(e.cnpj)) {
            throw new Error('CNPJ deve estar no formato XX.XXX.XXX/XXXX-XX')
        }
        if (!REGEX.cep.test(e.cep)) {
            throw new Error('CEP deve estar no formato XXXXX-XXX')
        }
    }
}