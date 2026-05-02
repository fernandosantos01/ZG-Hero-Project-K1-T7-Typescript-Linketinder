export function mascaraCPF(valor: string): string {
    valor = valor.replace(/\D/g, ""); 
    if (valor.length > 11) valor = valor.slice(0, 11);
    return valor
        .replace(/(\d{3})(\d)/, "$1.$2")      
        .replace(/(\d{3})(\d)/, "$1.$2")       
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); 
}

export function mascaraCNPJ(valor: string): string {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 14) valor = valor.slice(0, 14);

    return valor
        .replace(/^(\d{2})(\d)/, "$1.$2")      
        .replace(/^(\d{2})\.(\d{3})(\d)/, "$1.$2.$3") 
        .replace(/\.(\d{3})(\d)/, ".$1/$2")    
        .replace(/(\d{4})(\d)/, "$1-$2");      
}

export function mascaraTelefone(valor: string): string {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 11) valor = valor.slice(0, 11);

    return valor
        .replace(/^(\d{2})(\d)/g, "($1) $2") 
        .replace(/(\d)(\d{4})$/, "$1-$2"); 
}

export function mascaraCEP(valor: string): string {
    valor = valor.replace(/\D/g, "");
    if (valor.length > 8) valor = valor.slice(0, 8);
    return valor.replace(/^(\d{5})(\d)/, "$1-$2");
}