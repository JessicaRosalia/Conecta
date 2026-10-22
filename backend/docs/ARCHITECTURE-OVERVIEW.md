# Architecture Overview

## 1. Stack tecnológica

### Ambiente e ferramentas

| Tecnologia | Versão     | Finalidade                                       |
| ---------- | ---------- | ------------------------------------------------ |
| Node.js    | 24.14.1    | Runtime JavaScript                               |
| Yarn       | 1.22.22    | Gerenciador de pacotes                           |
| TypeScript | `^7.0.2`   | Linguagem e compilação                           |
| tsx        | `^4.23.15` | Execução de TypeScript durante o desenvolvimento |

### Dependências

| Tecnologia        | Versão declarada | Finalidade                             |
| ----------------- | ---------------- | -------------------------------------- |
| Express           | `^5.3.0`         | Framework HTTP                         |
| dotenv            | `^18.0.7`        | Carregamento de variáveis de ambiente  |
| http-status-codes | `^2.3.0`         | Constantes para códigos de status HTTP |
| @types/express    | `^5.0.6`         | Tipagens do Express para TypeScript    |

As versões com `^` representam as faixas declaradas no `package.json`, não necessariamente as versões exatas instaladas. Consulte o `yarn.lock` para identificar as versões resolvidas.

### Tecnologias planejadas

| Tecnologia | Finalidade                        | Status    |
| ---------- | --------------------------------- | --------- |
| PostgreSQL | Banco de dados relacional         | Planejado |
| Prisma     | ORM para acesso ao banco de dados | Planejado |

As versões dessas tecnologias serão definidas quando sua adoção for decidida.

## 2. Módulos JavaScript

O projeto utiliza `"type": "module"` no `package.json`, configurando o uso de ECMAScript Modules (ESM), com `import` e `export`.

## 3. Fluxo da aplicação

O backend segue o fluxo HTTP tradicional:

1. A requisição chega ao servidor Express.
2. A rota direciona a requisição ao controller correspondente.
3. O controller coordena o tratamento da requisição.
4. As regras de negócio são executadas nos componentes apropriados.
5. Quando necessário, ocorre a interação com a camada de persistência.
6. O resultado é retornado ao cliente por meio de uma resposta HTTP.

## 4. Decisões arquiteturais

* Manter Node.js, Express e TypeScript na arquitetura atual.
* Utilizar PostgreSQL e Prisma quando a camada de persistência for implementada.
* Evoluir a arquitetura incrementalmente, conforme as necessidades do projeto.

## 5. Atualização da documentação

Atualize este documento quando houver mudanças relevantes na stack ou nas decisões arquiteturais.

Confirme as versões nas configurações e nos arquivos de dependências antes de atualizar os registros.
