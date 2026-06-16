# Arquitetura

## Decisao Principal

Cada exercicio do PDF fica em um arquivo C independente. Essa decisao evita acoplamento prematuro e facilita apresentacao em sala: o avaliador pode compilar e rodar somente o tema desejado.

## Estrutura

```text
src/c
  common.h
  ex01_clinica.c
  ex02_suporte_ti.c
  ex04_escalonamento.c
  ex05_rede_pacotes.c

src/cpp
  network_topology_lab.cpp
```

## Padrao De Codigo

- `struct` para entidades principais;
- vetor fixo para fila e pilha quando o limite ajuda a demonstracao;
- lista encadeada com `malloc` e `free` quando o PDF pede cadastro dinamico;
- `common.h` somente para utilidades pequenas de texto e saida;
- funcoes pequenas com responsabilidade unica;
- demos automaticas em `main` para reduzir erro de apresentacao.

## Portabilidade

Os exercicios C usam apenas biblioteca padrao de C. Nao ha socket real, arquivo externo, banco de dados, pacote de terceiros ou necessidade de administrador. A unica dependencia de execucao e ter permissao para abrir o terminal e executar um binario compilado.

## Porque Nao Criar Um Unico Programa

Um unico menu gigante misturaria clinica, TI, processos e rede. Como o objetivo e portfolio, a separacao por exercicio deixa o dominio mais claro e reduz risco de regressao.

## Expansao C++

A trilha C++ fica separada porque usa outra linguagem e outro objetivo: evoluir de estruturas manuais em C para modelagem de grafo, rotas e redes com recursos da STL.
