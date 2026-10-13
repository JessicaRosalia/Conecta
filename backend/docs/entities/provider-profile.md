# Entidade: ProviderProfile

## 1. Objetivo

A entidade `ProviderProfile` representa o perfil profissional de uma pessoa que deseja oferecer serviços na plataforma Conecta.

A entidade `User` representa a conta da pessoa, enquanto `ProviderProfile` contém as informações utilizadas para sua apresentação como profissional.

Um usuário pode contratar serviços sem possuir um perfil profissional. Para oferecer serviços, deverá possuir um perfil profissional ativo.

No MVP, o proprietário poderá ativar e desativar seu perfil profissional, mas não poderá excluí-lo definitivamente pela aplicação.

## 2. Atributos

| Atributo                 | Tipo conceitual  | Obrigatório | Descrição                                                                                           |
| ------------------------ | ---------------- | ----------- | --------------------------------------------------------------------------------------------------- |
| `id`                     | UUID             | Sim         | Identificador único do perfil profissional.                                                         |
| `userId`                 | UUID             | Sim         | Identificador do usuário proprietário. Deve referenciar `User.id` e ser único em `ProviderProfile`. |
| `professionalTitle`      | String           | Sim         | Título que resume a atuação profissional. Limite de 100 caracteres.                                 |
| `bio`                    | String           | Sim         | Apresentação do profissional. Limite de 300 caracteres.                                             |
| `photoUrl`               | String ou nulo   | Não         | Referência à foto do perfil profissional.                                                           |
| `city`                   | String ou nulo   | Não         | Cidade informada pelo profissional.                                                                 |
| `state`                  | String ou nulo   | Não         | Estado informado pelo profissional.                                                                 |
| `professionalExperience` | String ou nulo   | Não         | Descrição da experiência profissional. Limite de 3.000 caracteres.                                  |
| `status`                 | Enum             | Sim         | Estado atual do perfil profissional.                                                                |
| `deactivatedAt`          | DateTime ou nulo | Não         | Data e hora da última desativação voluntária do perfil.                                             |
| `createdAt`              | DateTime         | Sim         | Data e hora de criação do perfil.                                                                   |
| `updatedAt`              | DateTime         | Sim         | Data e hora da última atualização do perfil.                                                        |

**Observações:**

* Os tipos apresentados são conceituais. Os tipos concretos serão definidos durante a implementação do banco de dados.
* `professionalTitle` e `bio` são obrigatórios para a criação do perfil.
* `photoUrl`, `city`, `state` e `professionalExperience` são opcionais.
* Cidade e estado devem ser tratados como campos separados para facilitar buscas e filtros por localização.
* `photoUrl` representa uma referência à imagem, não necessariamente o arquivo armazenado diretamente no banco de dados.
* O campo `userId` deve possuir uma restrição de unicidade, garantindo que um usuário não tenha mais de um perfil profissional.
* `deactivatedAt` deverá ser utilizado para controlar o período de espera antes da reativação após uma desativação voluntária.

## 3. Status do perfil

O atributo `status` representa a situação atual do perfil profissional.

| Status     | Significado                                                                                   |
| ---------- | --------------------------------------------------------------------------------------------- |
| `ACTIVE`   | Perfil profissional ativo, sujeito às demais regras da plataforma.                            |
| `INACTIVE` | Perfil profissional desativado. Seus serviços associados também devem permanecer desativados. |

O perfil deve ser criado com status `ACTIVE` quando todos os campos obrigatórios estiverem preenchidos e válidos.

No MVP, a desativação e a reativação serão controladas pelo proprietário, respeitando as regras de segurança e o período de espera definido neste documento.

## 4. Relacionamentos

### ProviderProfile e User

Um perfil profissional pertence a exatamente um usuário. Um usuário pode possuir zero ou um perfil profissional.

| Entidade relacionada | Cardinalidade                     | Descrição                                                                 |
| -------------------- | --------------------------------- | ------------------------------------------------------------------------- |
| `User`               | `User` 1 : 0..1 `ProviderProfile` | Um usuário pode não possuir perfil profissional ou possuir exatamente um. |

O perfil profissional não substitui a conta do usuário. As informações de autenticação, como e-mail e senha, permanecem na entidade `User`.

A desativação do perfil profissional não desativa a conta do usuário. O usuário poderá continuar utilizando as funcionalidades permitidas pela sua conta.

### ProviderProfile e Service

Um perfil profissional pode estar associado a vários serviços. Cada serviço pertence a um perfil profissional.

| Entidade relacionada | Cardinalidade                        | Descrição                                                                                                            |
| -------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- |
| `Service`            | `ProviderProfile` 1 : 0..N `Service` | Um perfil profissional pode possuir nenhum ou vários serviços. Cada serviço está associado a um perfil profissional. |

Quando o perfil profissional for desativado, todos os serviços associados deverão ser desativados. A reativação do perfil não deverá reativar automaticamente esses serviços.

## 5. Regras de negócio

### RN-028 — Perfil profissional opcional

Um usuário pode possuir uma conta na plataforma sem criar um perfil profissional.

A ausência de um `ProviderProfile` não impede o usuário de contratar serviços.

### RN-029 — Um perfil por usuário

Cada usuário pode possuir, no máximo, um perfil profissional.

O backend deve validar essa condição, e o banco de dados deve garantir a unicidade de `userId`.

### RN-030 — Criação de perfil ativo

O perfil profissional deve ser criado com status `ACTIVE` quando todos os campos obrigatórios estiverem preenchidos e válidos.

Os campos obrigatórios são:

* `professionalTitle`, com até 100 caracteres;
* `bio`, com até 300 caracteres.

Os campos `photoUrl`, `city`, `state` e `professionalExperience` são opcionais. Quando informada, a experiência profissional poderá ter até 3.000 caracteres.

Se os dados obrigatórios forem inválidos ou estiverem incompletos, o sistema não deve criar o perfil.

A criação de perfis incompletos como rascunho não faz parte do MVP.

### RN-031 — Edição do perfil profissional

O proprietário pode editar os seguintes campos do próprio perfil profissional:

* `professionalTitle`;
* `bio`;
* `photoUrl`;
* `city`;
* `state`;
* `professionalExperience`.

As alterações devem passar pelas validações correspondentes.

Os campos `id`, `userId`, `status`, `deactivatedAt`, `createdAt` e `updatedAt` não podem ser alterados livremente pelo usuário por meio da edição dos dados do perfil.

O campo `updatedAt` deve ser atualizado pelo sistema quando houver uma alteração efetiva no registro.

O backend deve verificar se o usuário autenticado é o proprietário do perfil antes de permitir a edição.

### RN-032 — Separação entre conta e perfil profissional

Os dados da conta e os dados profissionais devem permanecer separados.

Alterações nas informações profissionais não devem modificar os dados de autenticação do usuário.

A desativação do perfil profissional não deve suspender nem excluir a conta `User`.

### RN-033 — Desativação voluntária do perfil

O proprietário pode solicitar a desativação do próprio perfil profissional.

Antes de concluir a operação, o sistema deve solicitar confirmação e informar que:

* Todos os serviços associados ao perfil serão desativados.
* Todas as reservas futuras ainda não concluídas serão canceladas, incluindo as que estiverem pendentes ou já tiverem sido aceitas.
* O perfil poderá ser reativado somente após 20 dias da desativação.

Se o proprietário confirmar:

1. O perfil deve passar de `ACTIVE` para `INACTIVE`.
2. O sistema deve registrar a data e hora da desativação em `deactivatedAt`.
3. Todos os serviços associados devem ser desativados.
4. Todas as reservas futuras ainda não concluídas devem ser canceladas, independentemente de estarem pendentes ou aceitas.
5. Os registros e dados do perfil, dos serviços e do histórico de reservas devem ser preservados.

Se o proprietário não confirmar, a operação não deve ser executada.

### RN-034 — Reativação do perfil profissional

O proprietário poderá reativar um perfil desativado voluntariamente após um período mínimo de 20 dias, contado a partir da data e hora registrada em `deactivatedAt`.

O backend deve verificar o prazo antes de permitir a reativação.

Após a reativação:

1. O status do perfil deve passar de `INACTIVE` para `ACTIVE`.
2. Os serviços associados devem permanecer inativos.
3. O proprietário poderá reativar individualmente os serviços que deseja voltar a oferecer.

A reativação não deve recriar nem restaurar automaticamente as reservas que foram canceladas durante a desativação.

### RN-035 — Exclusão definitiva fora do MVP

A exclusão definitiva do perfil profissional não estará disponível no MVP.

A desativação preserva os dados do perfil e dos serviços associados.

Uma futura funcionalidade de exclusão deverá definir como tratar os serviços, as reservas, as avaliações e os demais registros relacionados antes de permitir a remoção definitiva.

## 6. Fluxos principais

### 6.1 Criação do perfil profissional

1. O usuário autenticado acessa a opção de criar perfil profissional.
2. O backend verifica se já existe um perfil associado ao usuário.
3. O usuário informa o título profissional e a apresentação.
4. Opcionalmente, informa foto, cidade, estado e experiência profissional.
5. O backend valida os campos obrigatórios, os limites de caracteres e os demais dados fornecidos.
6. Se os dados forem válidos, o sistema cria o perfil associado ao usuário autenticado, com status `ACTIVE`.
7. O sistema retorna os dados permitidos do perfil criado.

Se o usuário já possuir um perfil profissional, uma nova criação não deve gerar um segundo perfil.

### 6.2 Edição do perfil profissional

1. O usuário autenticado solicita a edição de seu perfil.
2. O backend verifica a existência do perfil e a autorização do usuário.
3. O usuário envia os campos que deseja alterar entre os campos editáveis definidos na RN-031.
4. O backend valida os novos dados.
5. Se os dados forem válidos, o sistema atualiza o perfil e o campo `updatedAt`.
6. O sistema retorna os dados atualizados permitidos.

Se o usuário não for o proprietário do perfil, a alteração deve ser negada.

### 6.3 Desativação voluntária do perfil profissional

1. O usuário autenticado solicita a desativação do perfil.
2. O sistema apresenta uma confirmação informando que os serviços associados serão desativados, todas as reservas futuras ainda não concluídas serão canceladas e a reativação só poderá ser solicitada após 20 dias.
3. Se o usuário cancelar a confirmação, nenhuma alteração será realizada.
4. Se confirmar, o backend verifica a autorização e a situação atual do perfil.
5. O sistema desativa o perfil e os serviços associados, registra `deactivatedAt` e cancela todas as reservas futuras ainda não concluídas.
6. O sistema informa que o perfil foi desativado e apresenta a data a partir da qual a reativação poderá ser solicitada.

As alterações relacionadas à desativação devem ser executadas de maneira consistente. Se uma das operações falhar, o sistema não deve deixar o perfil desativado com serviços ativos ou concluir apenas parte dos cancelamentos necessários.

### 6.4 Reativação do perfil profissional

1. O usuário autenticado acessa o perfil desativado.
2. O backend verifica se o prazo mínimo de 20 dias foi cumprido.
3. Se o prazo não tiver sido cumprido, a reativação deve ser negada e o sistema deve informar a data permitida.
4. Se o prazo tiver sido cumprido, o sistema atualiza o status do perfil para `ACTIVE`.
5. Os serviços associados permanecem inativos até que o proprietário os reative individualmente.

## 7. Considerações técnicas

* O banco de dados deve garantir a integridade do relacionamento entre `ProviderProfile.userId` e `User.id`.
* O banco de dados deve garantir que `userId` seja único em `ProviderProfile`.
* O backend deve validar os campos obrigatórios e os limites de caracteres antes de criar ou atualizar o perfil.
* A autorização deve ser verificada no backend.
* As respostas da API devem incluir apenas os campos apropriados para cada operação.
* A desativação do perfil, dos serviços associados e o cancelamento das reservas afetadas devem preservar a consistência dos dados.
* A regra de visibilidade dos serviços deve considerar o status do perfil profissional ao qual estão associados.
* O período de reativação deve ser validado no backend, independentemente do comportamento do controle na interface.

## 8. Decisões pendentes

Os seguintes pontos ainda precisam ser definidos:

* Formato, tamanho máximo e solução de armazenamento da foto do perfil.
* Forma de preenchimento da localização: informação digitada pelo usuário ou seleção em uma lista de cidades e estados.

Essas decisões poderão ser definidas antes da implementação das funcionalidades correspondentes.
