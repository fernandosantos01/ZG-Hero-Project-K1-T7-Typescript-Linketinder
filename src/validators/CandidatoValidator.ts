import type { Candidato } from '../models/Candidato.js'

const REGEX = {
    nome:     /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/,
    email:    /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    cpf:      /^\d{3}\.\d{3}\.\d{3}-\d{2}$/,
    telefone: /^\(\d{2}\)\s\d{4,5}-\d{4}$/,
    linkedin: /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/,
    cep:      /^\d{5}-\d{3}$/,
    tags:     /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s]+(,[a-zA-Z0-9À-ÖØ-öø-ÿ\s]+)*$/,
} as const

export class CandidatoValidator {
    validar(c: Candidato): void {
        if (!REGEX.nome.test(c.nome)) {
            throw new Error('Nome deve conter pelo menos 3 caracteres e apenas letras e espaços')
        }
        if (!REGEX.email.test(c.email)) {
            throw new Error('Email inválido')
        }
        if (!REGEX.cpf.test(c.cpf)) {
            throw new Error('CPF deve estar no formato XXX.XXX.XXX-XX')
        }
        if (!REGEX.telefone.test(c.telefone)) {
            throw new Error('Telefone deve estar no formato (XX) XXXXX-XXXX ou (XX) XXXX-XXXX')
        }
        if (!REGEX.linkedin.test(c.linkedin)) {
            throw new Error('URL do LinkedIn inválida')
        }
        if (!REGEX.cep.test(c.cep)) {
            throw new Error('CEP deve estar no formato XXXXX-XXX')
        }
        if(c.idade < 14){
            throw new Error('Idade inválida.')
        }
    }
}