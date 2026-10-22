# State Isolation

## 1. Objetivo

Garantir que dados e estados específicos de uma requisição ou usuário não interfiram indevidamente em outras requisições.

## 2. Diretrizes

* Mantenha dados específicos de uma requisição no escopo dessa requisição sempre que possível.
* Evite armazenar dados de usuários, tokens ou informações de requisições em variáveis globais ou objetos compartilhados mutáveis.
* Não utilize variáveis compartilhadas para guardar temporariamente dados que pertencem a usuários diferentes.
* Não presuma que requisições serão processadas uma de cada vez.
* Ao compartilhar dados entre componentes, considere se eles podem ser alterados durante o processamento de outras requisições.

## 3. Dados e persistência

* Garanta que consultas e operações de persistência respeitem o contexto e as permissões do usuário.
* Não confie apenas em identificadores enviados pelo cliente para autorizar o acesso a um recurso.
* Quando o Prisma for implementado, utilize operações e transações adequadas para preservar a integridade dos dados.
* Não mantenha dados de uma operação em variáveis compartilhadas para reutilizá-los indevidamente em outra.

## 4. Verificação

Ao implementar funcionalidades que envolvam usuários, autenticação, dados compartilhados ou operações concorrentes, avalie se duas requisições simultâneas poderiam causar vazamento, alteração indevida ou inconsistência de dados.

Implemente mecanismos adicionais de isolamento apenas quando necessários ao comportamento da funcionalidade e às garantias exigidas pelo banco de dados.
