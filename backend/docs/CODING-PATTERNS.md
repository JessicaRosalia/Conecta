# Coding Patterns
* Esse documento registra convenções que a IA deve seguir ao escrever ou modificar o código do Conecta.

## 1. TypeScript

* Utilize TypeScript nos arquivos da aplicação.
* Utilize ECMAScript Modules (ESM), com import e export, conforme a configuração "type": "module" do package.json.
* Utilize tipagem explícita quando ela melhorar a clareza ou evitar ambiguidades.
* Evite `any`; prefira tipos adequados ou `unknown` quando o tipo for desconhecido.
* Reutilize tipos e interfaces quando representarem conceitos compartilhados.
* Não duplique definições de tipos desnecessariamente.

## 2. Express e controllers

* Utilize os tipos do Express para requisições, respostas e middlewares.
* Mantenha controllers focados no tratamento HTTP.
* Extraia regras de negócio quando sua complexidade justificar essa separação.
* Evite duplicar a mesma lógica em diferentes controllers.
* Não misture o envio da resposta HTTP com operações desnecessárias de persistência.
* Utilize async/await para operações assíncronas, mantendo o tratamento de erros compatível com o Express 5.
* Envie apenas uma resposta por requisição e evite continuar o processamento depois de encerrar a resposta.

## 3. Services

* Utilize services para concentrar regras de negócio que precisem ser reutilizadas ou separadas dos controllers.
* Mantenha cada service com responsabilidades bem definidas.
* Evite criar services ou abstrações sem necessidade concreta.

## 4. Banco de dados

* Mantenha o acesso ao banco de dados separado do tratamento HTTP.
* Quando o Prisma for implementado, siga os padrões definidos para sua configuração e utilização.
* Não introduza repositories ou outras camadas de persistência sem uma necessidade concreta.
* Valide os dados recebidos antes de utilizá-los em operações de persistência.

## 5. Tratamento de erros

<!-- * Siga o padrão de tratamento de erros já adotado no projeto. -->
* Não silencie erros inesperadamente.
* Não exponha detalhes internos, credenciais ou informações sensíveis nas respostas HTTP.
* Evite repetir tratamentos de erro quando houver um mecanismo compartilhado adequado.

## 6. Consistência

Antes de implementar uma solução, consulte exemplos semelhantes no código existente. Prefira manter os padrões já estabelecidos a introduzir uma nova abordagem sem necessidade.

Quando uma decisão exigir um padrão novo, explique brevemente o motivo e mantenha sua aplicação consistente.
