# Entidade: User

## 1. Objetivo

A entidade `User` representa uma pessoa cadastrada na plataforma Conecta.

Uma mesma conta pode contratar serviços e também oferecer serviços. Por isso, o usuário não possui um tipo exclusivo de cliente ou prestador.

Os dados da conta são independentes do perfil profissional. Um usuário pode existir sem possuir um `ProviderProfile`.

## 2. Atributos

| Atributo          | Tipo conceitual  | Obrigatório | Descrição                                                                                                 |
| ----------------- | ---------------- | ----------- | --------------------------------------------------------------------------------------------------------- |
| `id`              | UUID             | Sim         | Identificador único do usuário.                                                                           |
| `name`            | String           | Sim         | Nome do usuário.                                                                                          |
| `email`           | String           | Sim         | E-mail utilizado para identificação e autenticação. Deve ser único.                                       |
| `passwordHash`    | String           | Sim         | Hash da senha do usuário. A senha original nunca deve ser armazenada.                                     |
| `phone`           | String           | Sim         | Telefone do usuário. Deve ser armazenado como texto para preservar códigos de país, DDD e zeros iniciais. |
| `emailVerifiedAt` | DateTime ou nulo | Não         | Data e hora da confirmação do e-mail. Permanece nulo enquanto o e-mail não for confirmado.                |
| `status`          | Enum             | Sim         | Estado atual da conta.                                                                                    |
| `createdAt`       | DateTime         | Sim         | Data e hora de criação do registro.                                                                       |
| `updatedAt`       | DateTime         | Sim         | Data e hora da última atualização do registro.                                                            |

**Observações:**

* Na primeira versão do Conecta, a autenticação será feita por e-mail e senha. Por isso, `passwordHash` é obrigatório.
* Os tipos apresentados são conceituais. Os tipos concretos serão definidos durante a implementação do banco de dados.
* O campo `email` deve ser normalizado de forma consistente para evitar cadastros duplicados causados por diferenças de espaços ou capitalização.

## 3. Status da conta

O atributo `status` representa a situação atual da conta do usuário.

| Status                 | Significado                                                                 |
| ---------------------- | --------------------------------------------------------------------------- |
| `PENDING_VERIFICATION` | Conta criada, mas com e-mail ainda não confirmado.                          |
| `ACTIVE`               | Conta com e-mail confirmado e habilitada para as operações permitidas.      |
| `SUSPENDED`            | Conta suspensa, impedida de realizar as operações restritas pela suspensão. |

O fluxo de cadastro e confirmação deverá atualizar o status conforme as regras de negócio.

## 4. Relacionamentos

### User e ProviderProfile

Um usuário pode possuir zero ou um perfil profissional.

| Entidade relacionada | Cardinalidade                     | Descrição                                                              |
| -------------------- | --------------------------------- | ---------------------------------------------------------------------- |
| `ProviderProfile`    | `User` 1 : 0..1 `ProviderProfile` | O usuário pode não ter perfil profissional ou possuir um único perfil. |

O `ProviderProfile` é uma entidade separada de `User`. Ele representa as informações profissionais necessárias para oferecer serviços na plataforma.

A ausência de um perfil profissional não impede o usuário de contratar serviços.

## 5. Regras de negócio

### RN-017 — E-mail único

O e-mail deve ser único entre as contas cadastradas.

A validação deve ocorrer no backend, e o banco de dados também deve possuir uma restrição de unicidade para evitar duplicidades.

### RN-018 — Armazenamento seguro da senha

A senha original nunca deve ser armazenada no banco de dados.

O sistema deve armazenar somente um hash seguro da senha, utilizando um algoritmo apropriado, como Argon2id ou bcrypt.

### RN-019 — Dados obrigatórios no cadastro

Para criar uma conta na primeira versão, o usuário deve informar:

* Nome;
* E-mail;
* Senha;
* Telefone.

O backend deve validar os dados antes de criar a conta.

### RN-020 — Edição dos dados pessoais

O usuário pode editar os dados pessoais que forem permitidos pela aplicação: nome, e-mail, senha, telefone.

As alterações devem passar pelas validações correspondentes.

* A alteração do e-mail deve seguir o fluxo de confirmação definido na RN-025.
* A alteração da senha deve seguir o fluxo definido na RN-027.
* A recuperação de uma senha esquecida deve seguir o fluxo definido na RN-026.

### RN-021 — Proteção dos dados pessoais

Um usuário não pode consultar ou alterar os dados privados de outra conta sem a devida autorização.

O backend deve verificar a identidade e as permissões do solicitante.

### RN-022 — Restrições para contas suspensas

Uma conta com status `SUSPENDED` não pode realizar as operações que forem restritas pela suspensão.

As operações permitidas e bloqueadas deverão ser definidas pela aplicação.

### RN-023 — Confirmação do e-mail

O usuário deve confirmar o e-mail antes de ter a conta considerada ativa.

Até a confirmação, a conta permanece com status `PENDING_VERIFICATION` e não pode executar as operações que exigem uma conta ativa.

### RN-024 — Método de autenticação inicial

Na primeira versão, a autenticação será realizada por e-mail e senha.

Login social, como Google, não faz parte do escopo inicial.

Se outros métodos de autenticação forem adicionados futuramente, o modelo de autenticação poderá precisar de ajustes.

### RN-025 — Alteração do e-mail

Quando o usuário solicitar a alteração do e-mail:

1. O sistema deve validar o novo endereço.
2. O sistema deve verificar se o novo e-mail já está em uso.
3. Uma confirmação deve ser enviada para o novo endereço.
4. O e-mail atual deve permanecer associado à conta até que o novo endereço seja confirmado.
5. Após a confirmação válida, o sistema deve atualizar o e-mail da conta.

Se o link expirar, o usuário deverá poder solicitar uma nova confirmação, conforme as regras definidas para esse fluxo.

### RN-026 — Recuperação de senha

O usuário deve poder solicitar a recuperação da senha por e-mail.

O fluxo deve utilizar um token temporário e de uso único. Após a redefinição, o sistema deve armazenar o hash da nova senha e invalidar o token utilizado.

A resposta à solicitação de recuperação não deve revelar se determinado e-mail possui ou não uma conta cadastrada.

### RN-027 — Alteração de senha

O usuário autenticado pode alterar sua senha sem precisar realizar o fluxo de recuperação por e-mail.

Para realizar a alteração:

1. O usuário informa a senha atual e a nova senha.
2. O backend verifica se a senha atual corresponde à senha armazenada.
3. O backend valida os requisitos da nova senha.
4. Se as validações forem bem-sucedidas, o sistema armazena o hash da nova senha, substituindo o anterior.
5. O sistema aplica a política definida para as sessões existentes após a alteração da senha.

Se a senha atual estiver incorreta ou a nova senha não atender aos requisitos, a alteração não deve ser realizada.

## 6. Fluxos principais

### 6.1 Cadastro e confirmação de e-mail

1. O usuário informa nome, e-mail, senha e telefone.
2. O backend valida os dados recebidos.
3. O backend verifica se o e-mail já está cadastrado.
4. O backend armazena a senha como hash.
5. A conta é criada com status `PENDING_VERIFICATION`.
6. O sistema gera um token de confirmação temporário e envia o link por e-mail.
7. O usuário acessa o link de confirmação.
8. O backend valida o token e confirma o e-mail.
9. O sistema atualiza `emailVerifiedAt` e o status para `ACTIVE`.

Se o envio do e-mail falhar, deverá existir uma forma de tentar novamente sem criar contas duplicadas.

### 6.2 Alteração do e-mail

1. O usuário autenticado solicita a alteração do e-mail.
2. O backend valida o novo endereço e verifica sua disponibilidade.
3. O sistema envia um link de confirmação para o novo e-mail.
4. O e-mail atual permanece inalterado enquanto a confirmação estiver pendente.
5. Após validar o token, o sistema atualiza o e-mail e a data de confirmação.

### 6.3 Recuperação de senha

1. O usuário solicita a recuperação de senha.
2. O sistema apresenta uma resposta que não revela se o e-mail está cadastrado.
3. Quando aplicável, o sistema envia um link de recuperação.
4. O usuário acessa o link e informa a nova senha.
5. O backend valida o token e os requisitos da nova senha.
6. O sistema armazena o hash da nova senha e invalida o token.

### 6.4 Alteração de senha

1. O usuário autenticado acessa a opção de alteração de senha.
2. O usuário informa a senha atual e a nova senha.
3. O backend valida a senha atual e os requisitos da nova senha.
4. Se os dados forem válidos, o sistema gera o hash da nova senha e atualiza o registro.
5. O sistema aplica a política definida para as sessões existentes e informa o resultado da operação ao usuário.

## 7. Considerações técnicas

* O banco de dados deve garantir a unicidade do e-mail.
* O backend deve validar os dados recebidos nas operações de cadastro e edição.
* Tokens de confirmação e recuperação devem ser aleatórios, temporários e de uso único.
* Os tokens devem ser armazenados e validados de forma segura.
* Respostas da API não devem incluir `passwordHash` nem tokens secretos.
* As permissões devem ser verificadas no backend, não apenas na interface.
* As operações de cadastro, confirmação de e-mail, autenticação, alteração de e-mail e recuperação de senha devem possuir testes automatizados.

Os tokens de confirmação de e-mail e de recuperação de senha deverão ser modelados separadamente da entidade `User`, por exemplo, nas entidades `EmailVerificationToken` e `PasswordResetToken`.

## 8. Decisões pendentes

Os seguintes pontos ainda precisam ser definidos:

* Requisitos mínimos para a senha.
* Prazo de expiração dos tokens.
* Tratamento de contas que permanecem muito tempo sem confirmar o e-mail.
* Procedimentos de suspensão, reativação e encerramento de contas.
* Comportamento das sessões após a alteração ou recuperação de senha.
* Regras específicas para edição de nome e telefone.


<!-- pendente: definir os requisitos mínimos da senha e o que acontecerá com as sessões já abertas depois da alteração. -->