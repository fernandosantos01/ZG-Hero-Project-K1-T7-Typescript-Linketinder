import { Candidato, Empresa, createCandidato, createEmpresa } from './database.js';

const formCandidato = document.getElementById('form-candidato') as HTMLFormElement;
const formEmpresa = document.getElementById('form-empresa') as HTMLFormElement;

function gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
}

formCandidato.addEventListener('submit', (event) => {
    event.preventDefault();

    const novoCandidato: Candidato = {
        id: gerarId(),
        nome: (document.getElementById('nome-cand') as HTMLInputElement).value,
        email: (document.getElementById('email-cand') as HTMLInputElement).value,
        cpf: (document.getElementById('cpf-cand') as HTMLInputElement).value,
        idade: parseInt((document.getElementById('idade-cand') as HTMLInputElement).value),
        estado: (document.getElementById('estado-cand') as HTMLInputElement).value,
        cep: (document.getElementById('cep-cand') as HTMLInputElement).value,
        descricao: (document.getElementById('descricao-cand') as HTMLTextAreaElement).value,
        habilidades: (document.getElementById('habilidades-cand') as HTMLInputElement).value.split(',').map(s => s.trim())
    };

    createCandidato(novoCandidato);
    alert('Candidato cadastrado com sucesso!');
    formCandidato.reset();
});

formEmpresa.addEventListener('submit', (event) => {
    event.preventDefault();

    const novaEmpresa: Empresa = {
        id: gerarId(),
        nome: (document.getElementById('nome-emp') as HTMLInputElement).value,
        email: (document.getElementById('email-emp') as HTMLInputElement).value,
        cnpj: (document.getElementById('cnpj-emp') as HTMLInputElement).value,
        pais: (document.getElementById('pais-emp') as HTMLInputElement).value,
        estado: (document.getElementById('estado-emp') as HTMLInputElement).value,
        cep: (document.getElementById('cep-emp') as HTMLInputElement).value,
        descricao: (document.getElementById('descricao-emp') as HTMLTextAreaElement).value,
        habilidades: (document.getElementById('habilidades-emp') as HTMLInputElement).value.split(',').map(s => s.trim())
    };

    createEmpresa(novaEmpresa);
    alert('Firma e Vaga cadastradas com sucesso!');
    formEmpresa.reset();
});