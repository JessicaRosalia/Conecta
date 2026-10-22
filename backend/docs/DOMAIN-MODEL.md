# Modelo de Domínio — Conecta

## 1. Objetivo

Este documento apresenta a visão geral das principais entidades do Conecta e seus relacionamentos.

A especificação detalhada de cada entidade deve ser mantida em seu próprio documento, dentro de `docs/entities/`.

As regras que afetam várias entidades devem ser documentadas em `docs/BUSINESS-RULES.md`.

## 2. Entidades


| Entidade          | Responsabilidade                                                      | Especificação               |
| ----------------- | --------------------------------------------------------------------- | --------------------------- |
| `User`            | Representar a conta de uma pessoa na plataforma.                      | [user.md](entities/user.md) |
| `ProviderProfile` | Representar o perfil profissional de uma pessoa que oferece serviços. | A definir                   |
| `Service`         | Representar um serviço anunciado na plataforma.                       | A definir                   |
| `Booking`         | Representar uma solicitação de contratação de um serviço.             | A definir                   |
| `Review`          | Representar uma avaliação relacionada a um serviço concluído.         | A definir                   |


As entidades listadas sem link possuem apenas uma definição inicial de responsabilidade. Seus atributos, relacionamentos, estados e regras ainda deverão ser especificados.

## 3. Relacionamentos conceituais



### User e ProviderProfile

- Um `User` pode não possuir um `ProviderProfile` ou possuir um.
- A criação de um perfil profissional é opcional.
- Um usuário pode contratar serviços sem possuir um perfil profissional.
- O perfil profissional está associado à conta do usuário e não a substitui.



### ProviderProfile e Service

- Um `ProviderProfile` poderá estar associado a vários `Service`.
- Cada `Service` deverá estar associado ao perfil profissional responsável por oferecê-lo.



### Service e Booking

- Um `Service` poderá receber solicitações de contratação.
- Cada `Booking` representará a solicitação referente a um serviço.
- O fluxo de solicitação, aceitação, rejeição e conclusão será especificado no documento de `Booking`.



### Booking e Review

- Uma avaliação deverá estar relacionada a uma contratação concluída.
- As regras de autoria, quantidade e conteúdo das avaliações serão definidas nos documentos correspondentes.

Os relacionamentos acima são conceituais e deverão ser detalhados antes da implementação do banco de dados.

## 4. Princípios do domínio

1. Uma única conta pode contratar e oferecer serviços.
2. Não existem tipos exclusivos de conta para contratantes e prestadores.
3. O perfil profissional é opcional.
4. Um serviço é uma oferta publicada por um perfil profissional.
5. Uma solicitação de contratação precisa passar pelo fluxo de decisão do prestador.
6. Na primeira versão, o pagamento será realizado fora da plataforma, diretamente entre as partes.
7. As avaliações estarão disponíveis somente após a conclusão do serviço.



## 5. Escopo futuro

Integração de pagamentos, mensagens, agenda avançada e outros recursos poderão exigir entidades adicionais.

Essas entidades não devem ser consideradas parte do modelo inicial até que seus requisitos sejam definidos.