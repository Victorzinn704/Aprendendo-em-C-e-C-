# Auditoria Senior De Codigo C/C++ E Estruturas

Data: 2026-06-15.

Escopo: `src/c`, `src/cpp`, `scripts`, documentacao tecnica e aderencia ao PDF mapeado em `docs/pdf-scope.md`.

## Metodo

- Revisao local de codigo, regras de negocio e scripts.
- Revisao independente com foco senior em C/C++, estruturas de dados e regra de negocio.
- Build C com TinyCC usando `-Wall -Werror`.
- Execucao das quatro demos C com `scripts/run-demos.ps1 -OnlyC`.
- Auditoria estatica da trilha C++, porque nao havia compilador C++ no `PATH`.

## Resumo Executivo

O projeto esta funcional e defensavel para apresentacao academica: cobre os exercicios 1, 2, 4 e 5, documenta a ausencia do exercicio 3, compila os programas C e executa demos reproduziveis.

O principal problema nao e bug de memoria imediato. O principal problema de engenharia e repeticao estrutural: cada exercicio reimplementa pequenas variacoes de fila, pilha e lista. Isso ainda e aceitavel para fins didaticos, mas passa a ser limitacao se o repositorio evoluir para portfolio tecnico mais forte.

Durante esta auditoria, foram corrigidos pontos de baixo risco e alto impacto: verificacao de erro no build, demos obrigatorias no runner, protecao contra texto nulo, calculo de tempo com tipo maior, validacao basica de latencia negativa em C++ e fluxo integrado no exercicio 5.

## Evidencias De Validacao

| Item | Resultado |
| --- | --- |
| Build C | Aprovado com TinyCC e `-Wall -Werror`. |
| Demos C | Aprovadas com `scripts/run-demos.ps1 -OnlyC`. |
| Exercicio 5 | Agora mostra chegada, transmissao, erro e entrega no mesmo fluxo. |
| C++ | Auditado estaticamente; compilacao pendente por falta de compilador C++ local. |
| Git | Alteracoes ainda pendentes de commit no momento desta auditoria. |

## Metricas

| Arquivo | Linhas fisicas | Observacao |
| --- | ---: | --- |
| `src/c/common.h` | 29 | Pequeno e reutilizavel. |
| `src/c/ex01_clinica.c` | 305 | Levemente acima da meta de 300 linhas. |
| `src/c/ex02_suporte_ti.c` | 295 | Dentro da meta. |
| `src/c/ex04_escalonamento.c` | 288 | Dentro da meta. |
| `src/c/ex05_rede_pacotes.c` | 313 | Acima da meta; justificado temporariamente pelo cenario integrado. |
| `src/cpp/network_topology_lab.cpp` | 171 | Adequado para trilha C++ inicial. |

Duplicacoes observadas:

- `demo_respostas`: 4 ocorrencias.
- `fila_iniciar`: 3 ocorrencias.
- `fila_listar`: 3 ocorrencias.
- `ativo_inserir`, `ativo_remover`, `ativo_listar`, `ativo_liberar`: 2 ocorrencias.

## Correcoes Aplicadas Nesta Auditoria

| Status | Area | Correcao |
| --- | --- | --- |
| Corrigido | Build | `scripts/build-all.ps1` agora falha se o compilador retornar codigo diferente de zero. |
| Corrigido | Validacao | `scripts/run-demos.ps1` agora falha quando executavel C obrigatorio nao existe ou retorna erro. |
| Corrigido | Robustez C | `copy_text`, `print_section` e `print_item` passaram a tolerar ponteiros nulos. |
| Corrigido | Exercicio 5 | Fluxo de rede agora integra fila, lista ativa, entrega e pilha de erro no mesmo cenario. |
| Corrigido | Exercicio 5 | Calculo de tempo usa `long long` internamente e satura em `INT_MAX`. |
| Corrigido | C++ | Topologia rejeita latencia negativa. Distancias internas usam `long long`. |

## Achados Abertos Priorizados

### P1 - Truncamento silencioso em campos de negocio

`copy_text` evita overflow, mas ainda nao informa truncamento. Isso e aceitavel para demos fixas, mas fraco para cadastro real.

Impacto: CPF, patrimonio, status ou identificador podem ser cortados sem aviso.

Acao recomendada: transformar `copy_text` em funcao com retorno de status, por exemplo `int copy_text(...)`, e rejeitar campos-chave quando houver truncamento.

### P1 - Insercoes ignoram falha de capacidade ou memoria

As demos usam `(void)` nas insercoes. Se `malloc` falhar ou a capacidade esgotar, a demonstracao segue com estado incompleto.

Impacto: erro fica invisivel e o resultado pode parecer correto sem estar.

Acao recomendada: criar `require_success("descricao", operacao)` para demos e encerrar com mensagem clara quando uma pre-condicao falhar.

### P1 - Unicidade de chaves nao e protegida

Cadastros, equipamentos e pacotes ativos aceitam duplicidade de CPF, patrimonio ou ID.

Impacto: busca e remocao atuam no primeiro item encontrado, deixando duplicatas inconsistentes.

Acao recomendada: antes de inserir, buscar pela chave natural e retornar erro quando ela ja existir.

### P2 - Duplicacao estrutural entre exercicios

As implementacoes de fila, pilha e lista sao parecidas. Isso ajuda a leitura isolada, mas aumenta custo de manutencao.

Impacto: qualquer melhoria de seguranca precisa ser replicada manualmente em varios arquivos.

Acao recomendada: extrair apenas guardrails comuns, sem criar um framework generico: copia validada, validacao de capacidade, helper de demo e talvez remocao por predicado.

### P2 - Ordem de listagem das listas encadeadas

As listas inserem no inicio. Isso e correto tecnicamente, mas a apresentacao lista na ordem inversa de cadastro.

Impacto: pode confundir usuario nao tecnico durante apresentacao.

Acao recomendada: trocar insercao no inicio por insercao no fim quando a ordem de cadastro for importante para leitura humana.

### P2 - C++ sem validacao compilada localmente

A trilha C++ esta escrita para C++17, mas nao foi compilada nesta maquina por falta de compilador no `PATH`.

Impacto: risco residual em portabilidade C++.

Acao recomendada: validar com `g++ -std=c++17 -Wall -Wextra -Werror` ou MSVC com `/std:c++17 /W4`.

### P3 - Arquivos acima da meta de 300 linhas

`ex01_clinica.c` e `ex05_rede_pacotes.c` passaram levemente de 300 linhas fisicas.

Impacto: baixo agora, mas serve como alerta de crescimento.

Acao recomendada: no proximo ciclo, extrair setup de demo e helpers de validacao para reduzir tamanho sem esconder regra de negocio.

## Invariantes De Regra De Negocio

Estas regras devem continuar verdadeiras apos qualquer refatoracao:

| Dominio | Invariante |
| --- | --- |
| Clinica | Fila chama Joao antes de Maria, Carlos e Ana conforme ordem de chegada. |
| Clinica | Pilha desfaz o ultimo atendimento registrado. |
| Suporte TI | Ticket 101 e atendido antes de 102 e 103. |
| Suporte TI | Ultima acao tecnica registrada e a primeira desfeita. |
| Escalonamento | Processo com maior prioridade executa primeiro. |
| Rede | Pacote 1 transmite primeiro por FIFO. |
| Rede | Pacote entregue sai da lista ativa. |
| Rede | Pacote com erro entra na pilha de erro. |
| Rede | No exemplo LIFO, pacote 4 retransmite antes do pacote 2. |

## Complexidade E Desempenho

| Estrutura | Custo atual | Avaliacao |
| --- | --- | --- |
| Fila circular | Inserir/remover em O(1). | Adequado. |
| Pilha em vetor | Push/pop em O(1). | Adequado. |
| Lista encadeada | Buscar/remover em O(n). | Adequado para cadastro didatico pequeno. |
| Fila de prioridade do exercicio 4 | Seleciona maior prioridade em O(n). | Adequado para poucos processos; heap seria melhor em escala. |
| Dijkstra C++ | Aproximadamente O((V + E) log V). | Adequado para topologia pequena. |

## Plano De Refatoracao

### Fase 1 - Hardening De Estado

- Fazer `copy_text` retornar erro em truncamento.
- Criar `require_success` para demos.
- Impedir chaves duplicadas.
- Validar entradas numericas negativas ou zero onde nao fazem sentido.

### Fase 2 - Reducao De Duplicacao

- Extrair helpers pequenos de capacidade e erro.
- Manter structs de dominio nos arquivos dos exercicios.
- Evitar uma lista generica com `void *` neste momento, porque isso aumentaria a complexidade para o nivel academico do projeto.

### Fase 3 - Teste Reproduzivel

- Criar fixtures de saida esperada para cada demo.
- Comparar saida real com saida esperada por script.
- Compilar C++ em ambiente com `g++`, `clang++` ou MSVC.

## Decisao Arquitetural

Nao recomendo transformar o projeto em uma biblioteca generica de estruturas agora. O melhor caminho e manter os exercicios legiveis e extrair somente os guardrails repetidos. Isso reduz complexidade sem perder a defesa academica: o professor ainda ve fila, pilha e lista claramente, mas o repositorio deixa de parecer apenas empilhamento de codigo.
