import { Candidato, Empresa, createCandidato, createEmpresa } from './database.js';
import { mascaraCPF, mascaraCNPJ, mascaraTelefone, mascaraCEP } from './mascaras.js';

const formCandidato = document.getElementById('form-candidato') as HTMLFormElement;
const formEmpresa = document.getElementById('form-empresa') as HTMLFormElement;

const candidatoCPF = document.getElementById('cpf-cand') as HTMLInputElement;
const candidatoTelefone = document.getElementById('telefone-cand') as HTMLInputElement;
const empresaCNPJ = document.getElementById('cnpj-emp') as HTMLInputElement;
const candidatoCEP = document.getElementById('cep-cand') as HTMLInputElement;
const empresaCEP = document.getElementById('cep-emp') as HTMLInputElement;

const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/; 
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 
const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; 
const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; 
const regexLinkedIn = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/; 
const regexCEP = /^\d{5}-\d{3}$/; 
const regexTags = /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s]+(,[a-zA-Z0-9À-ÖØ-öø-ÿ\s]+)*$/; 

aplicarMascara(candidatoCPF, mascaraCPF);
aplicarMascara(candidatoTelefone, mascaraTelefone);
aplicarMascara(empresaCNPJ, mascaraCNPJ);
aplicarMascara(candidatoCEP, mascaraCEP);
aplicarMascara(empresaCEP, mascaraCEP);

function gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
}

formCandidato.addEventListener('submit', (event) => {
    event.preventDefault(); 
    try{
        const dadosCandidato = obterInformacoesCandidato();
        validarInformacoesCandidato(dadosCandidato);
        createCandidato(criarCandidato(dadosCandidato));
        alert('Candidato cadastrado com sucesso!');
        formCandidato.reset();
    }
    catch (erro: unknown) {
        const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido.';
        alert(mensagem);
    }
});

function criarCandidato(dados: {id: string; nome: string; email: string; cpf: string; telefone: string; linkedin: string; cep: string; idade: number; estado: string; descricao: string; habilidades: string }): Candidato {
    return {
        id: dados.id,
        nome: dados.nome,
        email: dados.email,
        cpf: dados.cpf,
        telefone: dados.telefone,
        linkedin: dados.linkedin,
        cep: dados.cep,
        idade: dados.idade,
        estado: dados.estado,
        descricao: dados.descricao,
        habilidades: dados.habilidades.split(',').map(s => s.trim())
    };
}

function validarInformacoesCandidato(candidato: { nome: string; email: string; cpf: string; telefone: string; linkedin: string; cep: string; idade: number; estado: string; descricao: string; habilidades: string }): void {
    if (!regexNome.test(candidato.nome)) throw new Error('Nome inválido.');
    if (!regexEmail.test(candidato.email)) throw new Error('E-mail inválido.');
    if (!regexCPF.test(candidato.cpf)) throw new Error('CPF inválido. Use o formato automático.');
    if (!regexTelefone.test(candidato.telefone)) throw new Error('Telefone inválido.');
    if (!regexLinkedIn.test(candidato.linkedin)) throw new Error('URL do LinkedIn inválida.'); 
    if (!regexCEP.test(candidato.cep)) throw new Error('CEP inválido.');
    if (!regexTags.test(candidato.habilidades)) throw new Error('Habilidades inválidas. Separe por vírgulas.');
    if (candidato.idade <= 14) throw new Error('Idade inválida.');
    }

function obterInformacoesCandidato(): {id: string; nome: string; email: string; cpf: string; telefone: string; linkedin: string; cep: string; idade: number; estado: string; descricao: string; habilidades: string } {
        return {
            id: gerarId(),
            nome: (document.getElementById('nome-cand') as HTMLInputElement).value,
            email: (document.getElementById('email-cand') as HTMLInputElement).value,
            cpf: (document.getElementById('cpf-cand') as HTMLInputElement).value,
            telefone: (document.getElementById('telefone-cand') as HTMLInputElement).value,
            linkedin: (document.getElementById('linkedin-cand') as HTMLInputElement).value,
            cep: (document.getElementById('cep-cand') as HTMLInputElement).value,
            idade: parseInt((document.getElementById('idade-cand') as HTMLInputElement).value, 10),
            estado: (document.getElementById('estado-cand') as HTMLInputElement).value,
            descricao: (document.getElementById('descricao-cand') as HTMLTextAreaElement).value,
            habilidades: (document.getElementById('habilidades-cand') as HTMLInputElement).value
        };
    }

formEmpresa.addEventListener('submit', (event) => {
    event.preventDefault();
    try{
        const dadosEmpresa = (obterInformacoesEmpresa());
        validarInformacoesEmpresa(dadosEmpresa);
        createEmpresa(criarEmpresa(dadosEmpresa));
        alert('Empresa e Vaga cadastradas com sucesso!');
        formEmpresa.reset();
    }catch (erro: unknown) {
        const mensagem = erro instanceof Error ? erro.message : 'Erro desconhecido.';
        alert(mensagem);
    }
    
});

function obterInformacoesEmpresa(): {id: string; nome: string; email: string; cnpj: string; pais: string; estado: string; cep: string; descricao: string; habilidades: string } {
    return {
        id: gerarId(),
        nome: (document.getElementById('nome-emp') as HTMLInputElement).value,
        email: (document.getElementById('email-emp') as HTMLInputElement).value,
        cnpj: (document.getElementById('cnpj-emp') as HTMLInputElement).value,
        pais: (document.getElementById('pais-emp') as HTMLInputElement).value,
        estado: (document.getElementById('estado-emp') as HTMLInputElement).value,
        cep: (document.getElementById('cep-emp') as HTMLInputElement).value,
        descricao: (document.getElementById('descricao-emp') as HTMLTextAreaElement).value,
        habilidades: (document.getElementById('habilidades-emp') as HTMLInputElement).value
    };
}

function criarEmpresa(dados: {id: string; nome: string; email: string; cnpj: string; pais: string; estado: string; cep: string; descricao: string; habilidades: string }): Empresa {
    return {
        id: dados.id,
        nome: dados.nome,
        email: dados.email,
        cnpj: dados.cnpj,
        pais: dados.pais,
        estado: dados.estado,
        cep: dados.cep,
        descricao: dados.descricao,
        habilidades: dados.habilidades.split(',').map(s => s.trim())
    };
}

function validarInformacoesEmpresa(empresa: { nome: string; email: string; cnpj: string; pais: string; estado: string; cep: string; descricao: string; habilidades: string }): void {
    if (!regexNome.test(empresa.nome)) throw new Error('Nome da empresa inválido.');
    if (!regexEmail.test(empresa.email)) throw new Error('E-mail da empresa inválido.');
    if (!regexCNPJ.test(empresa.cnpj)) throw new Error('CNPJ inválido. Use o formato automático.');
    if (!regexCEP.test(empresa.cep)) throw new Error('CEP inválido.');
    if (!regexTags.test(empresa.habilidades)) throw new Error('Habilidades da vaga inválidas. Separe por vírgulas.');
}

function aplicarMascara(input: HTMLInputElement, funcaoMascara: (valor: string) => string) {
    input.addEventListener('input', (e) => {
        const target = e.target as HTMLInputElement;
        target.value = funcaoMascara(target.value);
    });
}