# Auditoria De Cobertura Web - 2026-06-16

## Objetivo

Verificar se a interface web representa o escopo completo do PDF e se o projeto continua organizado para manutencao.

## Resultado Da Auditoria

| Area | Antes | Depois | Status |
| --- | --- | --- | --- |
| Questao 1 | Sem tela propria no Pages | Bancada de clinica com fila, pilha e lista | Corrigido |
| Questao 2 | Sem tela propria no Pages | Bancada de suporte com chamados, logs e inventario | Corrigido |
| Questao 3 | Lacuna apenas em documento | Lacuna tambem visivel na interface | Corrigido |
| Questao 4 | Sem tela propria no Pages | Bancada de CPU com prioridade, ativos e encerrados | Corrigido |
| Questao 5 | Demo visual profunda | Mantida como simulacao principal | Mantido |
| C++ redes | Documentado fora da interface | Incluido como trilha de grafo e menor caminho | Corrigido |

## Problema Encontrado

A interface web estava boa para a Questao 5, mas nao mostrava as outras questoes no GitHub Pages. Isso criava uma diferenca entre o PDF, o README e a apresentacao visual.

O risco pratico era o avaliador abrir o Pages e concluir que apenas redes tinha sido trabalhado, mesmo com os arquivos C das outras questoes versionados.

## Decisao Aplicada

Foi criada uma navegacao unica dentro da aplicacao:

| Rota | Conteudo |
| --- | --- |
| `#ex01` | Atendimento de clinica |
| `#ex02` | Suporte de TI |
| `#ex03` | Lacuna documentada do PDF |
| `#ex04` | Escalonamento de processos |
| `#ex05` | Simulacao de pacotes |
| `#cpp` | Topologia e menor caminho em C++ |

A Questao 5 continua com animacao automatica. As outras questoes usam uma bancada de estruturas para mostrar dados, regras e decisao tecnica sem afirmar execucao nativa no navegador.

## Arquivos Criados

| Arquivo | Papel |
| --- | --- |
| `web/src/domain/exercise-labs.ts` | Tipos e indice das questoes da web. |
| `web/src/domain/labs/foundation-labs.ts` | Dados das questoes 1, 2 e lacuna 3. |
| `web/src/domain/labs/system-labs.ts` | Dados das questoes 4, 5 e trilha C++. |
| `web/src/components/LabNavigator.tsx` | Navegacao entre questoes. |
| `web/src/components/ExerciseWorkspace.tsx` | Bancada reutilizavel para questoes sem animacao profunda. |
| `web/src/styles/labs.css` | Estilo da bancada das questoes. |
| `web/src/styles/lab-responsive.css` | Ajustes responsivos da bancada. |

## Criterios De Qualidade

| Criterio | Verificacao |
| --- | --- |
| Fonte do PDF preservada | Questao 3 segue como lacuna, sem requisito inventado. |
| Separacao de regra e tela | Dados ficam em `web/src/domain/labs`; componentes apenas renderizam. |
| Arquivos pequenos | Maiores arquivos de `web/src` ficaram abaixo de 240 linhas. |
| Mobile | Titulo da Questao 5 recebeu quebra controlada para evitar corte. |
| Evidencia visual | Captura geral adicionada em `pages-demo-questions.png`. |

## Pontos Que Continuam Como Risco Controlado

- A web ainda e demonstrativa; o GitHub Pages nao executa os binarios C/C++.
- Ainda nao ha teste visual automatizado por screenshot.
- A interacao profunda existe na Questao 5; as demais usam leitura guiada por estrutura, porque o objetivo e apresentar o PDF inteiro sem criar comportamento que nao existe no C.
- A trilha C++ foi mantida na interface, mas nao foi recompilada nesta sessao porque nao havia compilador C++ no PATH.

## Validacao Executada

| Comando | Resultado |
| --- | --- |
| `npm run build` em `web/` | Passou. |
| `npm audit --audit-level=high` em `web/` | 0 vulnerabilidades altas. |
| `scripts/build-all.ps1` com TinyCC e `-WarningsAsErrors` | Exercicios C compilaram. |
| `scripts/run-demos.ps1 -OnlyC` | Demos C executaram sem erro. |

## Conclusao

O gap principal foi corrigido. O Pages agora mostra o projeto inteiro em uma unica aplicacao, preservando a Questao 5 como a simulacao mais completa e tornando as outras questoes visiveis para avaliacao.
