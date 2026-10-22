# Resilience and Observability
* Como a aplicação lida com falhas e como acompanhamos seu funcionamento.

<!-- Esse documento pode registrar decisões sobre:
* Erros: como tratar falhas e retornar respostas HTTP adequadas.
* Status HTTP: como representar o resultado de uma requisição.
* Logs: quais informações registrar para investigar problemas.
* Falhas inesperadas: como evitar que detalhes internos sejam expostos ao cliente.
* Monitoramento: quais métricas ou mecanismos de diagnóstico adotar, quando houver necessidade. -->

## 1. Códigos de status HTTP

* Utilize a biblioteca `http-status-codes` para representar códigos de status HTTP nas respostas.
* Prefira constantes como `StatusCodes.OK`, `StatusCodes.CREATED`, `StatusCodes.BAD_REQUEST`, `StatusCodes.NOT_FOUND` e `StatusCodes.INTERNAL_SERVER_ERROR` em vez de números literais.
* Consulte os recursos disponíveis na versão instalada antes de utilizar constantes específicas.

Exemplo:

```ts
import { StatusCodes } from 'http-status-codes';

res.status(StatusCodes.NOT_FOUND).json({
  message: 'Recurso não encontrado.',
});
```

## 2. Tratamento de erros

* O projeto deverá utilizar um middleware centralizado de tratamento de erros do Express.
* Até que esse middleware seja implementado, não presuma que exista um mecanismo centralizado.
* Ao implementar o middleware, considere o comportamento do Express 5 para encaminhamento de erros em handlers assíncronos.
* Respostas de erro em produção não devem expor stack traces, credenciais ou detalhes internos da aplicação.
* O tratamento de erros deverá retornar códigos de status HTTP adequados ao tipo de falha.
* Evite ignorar erros ou retornar sucesso quando uma operação falhar.

## 3. Logging e monitoramento

* Logging estruturado e ferramentas de monitoramento ainda não fazem parte da implementação atual.
<!-- * Não introduza bibliotecas ou serviços para essas finalidades sem avaliar a necessidade e obter autorização para adicionar dependências. -->
* Não registre senhas, tokens de autenticação ou outras credenciais nos logs.
* Não adicione logs de depuração permanentes ao código de produção.

