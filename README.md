# LinkeTinder TypeScript

![TypeScript](https://img.shields.io/badge/TypeScript-5.x-3178C6?logo=typescript&logoColor=white)
![Status](https://img.shields.io/badge/status-MVP-orange)
![Frontend](https://img.shields.io/badge/frontend-Vanilla_TS%2FHTML%2FCSS-0A7EA4)
![Backend](https://img.shields.io/badge/backend-Mockado_(LocalStorage)-6B7280)

MVP do LinkeTinder para conectar talentos e empresas, com foco em fundamentos de TypeScript, arquitetura simples e evolução futura para backend real.

## 🎬 Demonstração

> Dica: mantenha esta seção no topo para facilitar a avaliação rápida por recrutadores.

Adicione aqui as mídias principais do projeto:

- Tela de cadastro
- Visão da empresa com gráfico de competências (Chart.js)
- Tooltip flutuante com anonimato dos dados sensíveis

Exemplo de estrutura (substitua pelos seus arquivos reais):

```md
![Tela de Cadastro](./docs/assets/cadastro.gif)
![Visão da Empresa com Gráfico](./docs/assets/perfil-empresa-chart.png)
![Tooltip de Anonimato](./docs/assets/tooltip-anonimato.png)
```

## 🧠 Contexto do Projeto

O objetivo deste MVP é simular uma plataforma de match entre candidatos e empresas:

- Candidato e empresa se cadastram com dados e habilidades
- Empresa visualiza candidatos com dados sensíveis anonimizados
- Competências dos candidatos são apresentadas em gráfico para tomada de decisão rápida

## 💻 Tecnologias

### Frontend

- TypeScript + HTML + CSS em abordagem Vanilla (sem frameworks)
  - Escolha intencional para consolidar fundamentos de linguagem, tipagem, manipulação de DOM e organização por módulos ES6
- Chart.js integrado via CDN
  - Utilizado para plotagem do gráfico de competências dos candidatos na visão da empresa
- Módulos ES6 (`import`/`export`)
  - Código separado por responsabilidades, com build para `dist/` via TypeScript

### Backend (MVP atual)

- Backend simulado (mockado) usando LocalStorage do navegador
  - Operações de Create e Delete persistem dados localmente no browser
- Camada de serviço isolada em `src/database.ts`
  - Centraliza acesso aos dados e reduz acoplamento da interface
  - Facilita migração futura para API REST + banco de dados real sem reescrever a camada de telas

## 🧱 Estrutura do Projeto

```text
.
├── cadastro.html
├── perfil-candidato.html
├── perfil-empresa.html
├── tsconfig.json
├── css/
│   └── style.css
├── src/
│   ├── cadastro.ts
│   ├── database.ts
│   ├── perfil-candidato.ts
│   └── perfil-empresa.ts
└── dist/
```

## 🚀 Como Executar

### Pré-requisitos

- Node.js instalado
- TypeScript instalado globalmente
- Extensão Live Server no VS Code (ou outro servidor local HTTP)

Instalação global do TypeScript (se necessário):

```bash
npm install -g typescript
```

### Passo a passo

1. Clone o repositório:

```bash
git clone <URL_DO_SEU_REPOSITORIO>
```

2. Acesse a pasta do projeto:

```bash
cd LinkeTinderTypeScript
```

3. Compile os arquivos TypeScript para JavaScript:

```bash
tsc
```

4. Inicie um servidor local na raiz do projeto:

```bash
# opção recomendada no VS Code
# clique com botão direito em cadastro.html e use "Open with Live Server"
```

5. Acesse no navegador (pela URL do servidor local):

- `cadastro.html`
- `perfil-empresa.html`
- `perfil-candidato.html`

### ⚠️ Importante: "Pulo do CORS"

Este projeto usa módulos ES6 (`type="module"`, `import` e `export`).

Por isso, os arquivos HTML **não devem** ser abertos com duplo clique (`file://...`), pois o navegador bloqueará carregamento de módulos por política de segurança (CORS).

Use sempre um servidor local HTTP (ex.: Live Server).

## ✅ Funcionalidades MVP

- Cadastro de candidatos
- Cadastro de empresas/vagas
- Listagem de candidatos para empresas
- Tooltip com anonimização de dados sensíveis (nome e CPF ocultos)
- Gráfico de competências com Chart.js
- Persistência local via LocalStorage

## 🛣️ Próximos Passos

- Substituir camada mockada por API real
- Adicionar banco de dados relacional ou NoSQL
- Criar autenticação/autorização
- Implementar testes automatizados (unitários e integração)
- Evoluir UX com feedback visual de sucesso/erro e validações mais robustas

## 👨‍💻 Autor

José Fernando.
