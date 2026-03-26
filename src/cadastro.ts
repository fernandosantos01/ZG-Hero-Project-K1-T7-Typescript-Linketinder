import { Candidato, Empresa, createCandidato, createEmpresa } from './database.js';
import { mascaraCPF, mascaraCNPJ, mascaraTelefone, mascaraCEP } from './mascaras.js';

const formCandidato = document.getElementById('form-candidato') as HTMLFormElement;
const formEmpresa = document.getElementById('form-empresa') as HTMLFormElement;

const inputCPF = document.getElementById('cpf-cand') as HTMLInputElement;
const inputTelefone = document.getElementById('telefone-cand') as HTMLInputElement;
const inputCNPJ = document.getElementById('cnpj-emp') as HTMLInputElement;
const inputCEP = document.getElementById('cep-cand') as HTMLInputElement;
const inputCEPEmp = document.getElementById('cep-emp') as HTMLInputElement;

inputCPF.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = mascaraCPF(target.value);
});

inputTelefone.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = mascaraTelefone(target.value);
});

inputCNPJ.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = mascaraCNPJ(target.value);
});
inputCEP.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = mascaraCEP(target.value);
});
inputCEPEmp.addEventListener('input', (e) => {
    const target = e.target as HTMLInputElement;
    target.value = mascaraCEP(target.value);
});

function gerarId(): string {
    return Math.random().toString(36).substring(2, 9);
}

const regexNome = /^[A-Za-zÀ-ÖØ-öø-ÿ\s]{3,}$/; 
const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
const regexCPF = /^\d{3}\.\d{3}\.\d{3}-\d{2}$/; 
const regexCNPJ = /^\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}$/; 
const regexTelefone = /^\(\d{2}\)\s\d{4,5}-\d{4}$/; 

const regexLinkedIn = /^(https?:\/\/)?(www\.)?linkedin\.com\/in\/[a-zA-Z0-9_-]+\/?$/; 

const regexCEP = /^\d{5}-\d{3}$/; 
const regexTags = /^[a-zA-Z0-9À-ÖØ-öø-ÿ\s]+(,[a-zA-Z0-9À-ÖØ-öø-ÿ\s]+)*$/; 

formCandidato.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const nome = (document.getElementById('nome-cand') as HTMLInputElement).value;
    const email = (document.getElementById('email-cand') as HTMLInputElement).value;
    const cpf = (document.getElementById('cpf-cand') as HTMLInputElement).value;
    const telefone = (document.getElementById('telefone-cand') as HTMLInputElement).value;
    const linkedin = (document.getElementById('linkedin-cand') as HTMLInputElement).value;
    const cep = (document.getElementById('cep-cand') as HTMLInputElement).value;
    const habilidades = (document.getElementById('habilidades-cand') as HTMLInputElement).value;

    if (!regexNome.test(nome)) return alert('Nome inválido.');
    if (!regexEmail.test(email)) return alert('E-mail inválido.');
    if (!regexCPF.test(cpf)) return alert('CPF inválido. Use o formato automático.');
    if (!regexTelefone.test(telefone)) return alert('Telefone inválido.');
    if (!regexLinkedIn.test(linkedin)) return alert('URL do LinkedIn inválida.'); 
    if (!regexCEP.test(cep)) return alert('CEP inválido.');
    if (!regexTags.test(habilidades)) return alert('Habilidades inválidas. Separe por vírgulas.');

    const novoCandidato: Candidato = {
        id: gerarId(),
        nome: nome,
        email: email,
        cpf: cpf,
        telefone: telefone,
        linkedin: linkedin,
        idade: parseInt((document.getElementById('idade-cand') as HTMLInputElement).value),
        estado: (document.getElementById('estado-cand') as HTMLInputElement).value,
        cep: cep,
        descricao: (document.getElementById('descricao-cand') as HTMLTextAreaElement).value,
        habilidades: habilidades.split(',').map(s => s.trim())
    };

    createCandidato(novoCandidato);
    alert('Candidato cadastrado com sucesso!');
    formCandidato.reset();
});

formEmpresa.addEventListener('submit', (event) => {
    event.preventDefault();

    const nome = (document.getElementById('nome-emp') as HTMLInputElement).value;
    const email = (document.getElementById('email-emp') as HTMLInputElement).value;
    const cnpj = (document.getElementById('cnpj-emp') as HTMLInputElement).value;
    const cep = (document.getElementById('cep-emp') as HTMLInputElement).value;
    const habilidades = (document.getElementById('habilidades-emp') as HTMLInputElement).value;

    if (!regexNome.test(nome)) return alert('Nome da empresa inválido.');
    if (!regexEmail.test(email)) return alert('E-mail corporativo inválido.');
    if (!regexCNPJ.test(cnpj)) return alert('CNPJ inválido.');
    if (!regexCEP.test(cep)) return alert('CEP inválido.');
    if (!regexTags.test(habilidades)) return alert('Habilidades inválidas.');

    const novaEmpresa: Empresa = {
        id: gerarId(),
        nome: nome,
        email: email,
        cnpj: cnpj,
        pais: (document.getElementById('pais-emp') as HTMLInputElement).value,
        estado: (document.getElementById('estado-emp') as HTMLInputElement).value,
        cep: cep,
        descricao: (document.getElementById('descricao-emp') as HTMLTextAreaElement).value,
        habilidades: habilidades.split(',').map(s => s.trim())
    };

    createEmpresa(novaEmpresa);
    alert('Empresa e Vaga cadastradas com sucesso!');
    formEmpresa.reset();
});