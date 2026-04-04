# The Moments - Frontend

O **The Moments** é uma aplicação para registrar e compartilhar experiências gastronômicas utilizando **tags dinâmicas**, permitindo descrever o contexto de cada momento (ex: barato, instagramável, fim de mês).

Diferente de plataformas tradicionais baseadas apenas em notas, o The Moments propõe uma abordagem mais flexível e expressiva, onde o contexto da experiência é o principal elemento de avaliação.

## Stack Tecnológica

### Core
- React 19
- Vite
- TypeScript

### Roteamento
- React Router v7

### Estado e dados
- TanStack React Query v5
- Axios

### UI e Estilização
- Tailwind CSS v4
- Shadcn UI (Radix UI)
- Lucide React
- tailwind-merge
- Framer Motion

### Formulários e validação
- react-hook-form
- zod
- @hookform/resolvers


## Arquitetura

O projeto segue princípios de **separação de responsabilidades** combinados com **Atomic Design**, visando escalabilidade e manutenibilidade.

### Estrutura

```
src/
├── api/ # Configuração HTTP (Axios), interceptors e chamadas diretas
├── services/ # Regras de negócio, transformação de dados e tratamento de erros
├── hooks/ # Hooks customizados com React Query (useQuery, useMutation)
├── components/ # Componentes organizados em Atomic Design
│ ├── atoms/ # Componentes básicos e reutilizáveis (ex: Button, Input)
│ ├── molecules/ # Combinação de atoms (ex: FormField, CardHeader)
│ ├── organisms/ # Componentes complexos (ex: PostList, TagSelector)
│ ├── templates/ # Estrutura de layout (ex: PageLayout)
├── pages/ # Páginas da aplicação (camada de roteamento)
├── schemas/ # Validação e tipagem com Zod
│ ├── shared/ # Schemas reutilizáveis (ex: id, paginação, campos comuns)
```

## Diagrama conceitual da atomic design

<img width="1400" height="788" alt="image" src="https://github.com/user-attachments/assets/6b92cb5c-3c22-4a67-858a-0eeb8f425471" />


Doc: https://atomicdesign-bradfrost-com.translate.goog/chapter-2/?_x_tr_sl=en&_x_tr_tl=pt&_x_tr_hl=pt&_x_tr_pto=tc

## Fluxo de Dados

A comunicação com o backend segue um fluxo padronizado em três camadas:

1. **API**
   - Responsável por requisições HTTP (Axios)

2. **Service**
   - Regras de negócio
   - Transformação de dados
   - Tratamento de erros

3. **Hook**
   - Integração com React Query
   - Exposição de dados para os componentes

Regra fundamental:  
Componentes **não acessam API diretamente**, apenas via hooks.

## Formulários e Validação

Os schemas são utilizados tanto para **validação de formulários** quanto para **tipagem e mapeamento de dados** (entrada e saída da aplicação), garantindo consistência entre frontend e backend.

- Uso obrigatório de `react-hook-form` integrado com `zod`
- Schemas reutilizáveis centralizados em `/schemas/shared`
- Schemas específicos por feature organizados em `/schemas`
- Reaproveitamento dos schemas para:
  - Validação de formulários
  - Tipagem de requests (input)
  - Tipagem de responses (output)

  
## Pipeline de Deploy 

```
Build
  ↓
Code Security 
  ↓
Deploy Vercel

```


### Como rodar o projeto

### Pré-requisitos
Node.js 22+ <br>
pnpm

### Instalação

```
pnpm install
```
Execução

```
pnpm dev
```

### A aplicação estará disponível em:

```
http://localhost:5173
```


## Contribuição

Contribuições são bem-vindas e incentivadas. Este projeto também tem como objetivo aprendizado em boas práticas de arquitetura e desenvolvimento frontend.

### Como contribuir

1. Faça um fork do projeto

2. Crie uma branch seguindo o padrão:
   ```bash
   git checkout -b feature/nome-da-feature

3. Abra um Pull Request utilizando o template definido em:
     ```bash
    .github/PULL_REQUEST_TEMPLATE.md     

- Preencha corretamente:
- Descrição da mudança
- Contexto de negócio
- Passos para teste

