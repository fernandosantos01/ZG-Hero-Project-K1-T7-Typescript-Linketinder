export interface Candidato {
    id: string;
    nome: string;
    email: string;
    cpf: string;
    telefone: string;
    linkedin: string;
    idade: number;
    estado: string;
    cep: string;
    descricao: string;
    habilidades: string[];
}

export interface Empresa {
    id: string;
    nome: string;
    email: string;
    cnpj: string;
    pais: string;
    estado: string;
    cep: string;
    descricao: string;
    habilidades: string[];
}

export function getCandidatos(): Candidato[] {
    const data = localStorage.getItem('linketinder_candidatos');
    return data ? JSON.parse(data) : [];
}

export function createCandidato(candidato: Candidato): void {
    const candidatos = getCandidatos();
    candidatos.push(candidato);
    localStorage.setItem('linketinder_candidatos', JSON.stringify(candidatos));
    console.log("Candidato cadastrado com sucesso, parabéns!");
}

export function deleteCandidato(id: string): void {
    let candidatos = getCandidatos();
    candidatos = candidatos.filter(c => c.id !== id);
    localStorage.setItem('linketinder_candidatos', JSON.stringify(candidatos));
    console.log("Candidato deletado da base.");
}

export function getEmpresas(): Empresa[] {
    const data = localStorage.getItem('linketinder_empresas');
    return data ? JSON.parse(data) : [];
}

export function createEmpresa(empresa: Empresa): void {
    const empresas = getEmpresas();
    empresas.push(empresa);
    localStorage.setItem('linketinder_empresas', JSON.stringify(empresas));
    console.log("Empresa cadastrada com sucesso!");
}

export function deleteEmpresa(id: string): void {
    let empresas = getEmpresas();
    empresas = empresas.filter(e => e.id !== id);
    localStorage.setItem('linketinder_empresas', JSON.stringify(empresas));
    console.log("Empresa deletada da base.");
}