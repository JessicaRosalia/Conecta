# Implementation Checklist
* Este documento serve para a IA verificar o que precisa ser conferido antes de considerar uma implementação concluída.

## 1. Antes de implementar

* Identifique os arquivos e componentes envolvidos na tarefa.
* Verifique as implementações existentes que possam ser afetadas pela mudança.
* Confirme se as bibliotecas e os recursos necessários já estão disponíveis no projeto.
* Considere os impactos da alteração sobre as funcionalidades existentes.

## 2. Durante a implementação

* Implemente apenas o necessário para atender ao comportamento solicitado.
* Mantenha os tipos TypeScript coerentes com os dados utilizados.
* Considere os cenários de sucesso, entradas inválidas e falhas relevantes para a funcionalidade.
* Atualize os arquivos relacionados quando a mudança exigir ajustes em outras partes do código.

## 3. Após implementar

* Execute as verificações disponíveis e relevantes para a alteração.
* Consulte os scripts definidos no `package.json` antes de executar comandos de teste ou build.
* Verifique se há erros de TypeScript, lint ou testes, conforme as ferramentas configuradas no projeto.
* Se não for possível executar alguma verificação, informe qual não foi executada e o motivo.
* Revise as alterações para identificar arquivos modificados indevidamente, código desnecessário ou problemas evidentes.

## 4. Antes de concluir

* Confirme que os requisitos solicitados foram atendidos.
* Informe resumidamente o que foi implementado e quais verificações foram executadas.
* Diferencie verificações aprovadas, verificações com falha e verificações que não foram executadas.
* Não declare testes, build ou outras verificações como concluídos sem executá-los.
