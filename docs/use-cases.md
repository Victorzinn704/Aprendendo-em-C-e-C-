# Casos De Uso

## Objetivo

Mostrar onde as estruturas e simulacoes deste projeto aparecem em situacoes reais.

O projeto nao tenta substituir sistemas profissionais. Ele usa dominios conhecidos para explicar fila, pilha, lista encadeada, prioridade e grafo.

## Visao Geral

| Tema | Estrutura | Exemplo no projeto | Onde aparece no dia a dia |
| --- | --- | --- | --- |
| Atendimento | Fila | Recepcao da clinica | Ordem de chegada em hospital, banco, suporte e caixa. |
| Desfazer | Pilha | Historico de atendimento | Ctrl+Z, log recente, rollback simples. |
| Cadastro dinamico | Lista encadeada | Pacientes, equipamentos, pacotes ativos | Itens que entram e saem sem tamanho fixo. |
| Prioridade | Fila com prioridade | Escalonamento de CPU | Sistema operacional decide o que roda primeiro. |
| Rede | Fila, pilha e lista | Pacotes aguardando, erros e ativos | Trafego entre PC, roteador, DNS e servidor. |
| Rotas | Grafo | Topologia C++ | Caminho entre dispositivos de rede. |

## Exercicio 1: Clinica

A clinica foi usada porque qualquer pessoa entende o fluxo:

1. paciente chega;
2. paciente entra na fila;
3. proximo paciente e chamado;
4. atendimento pode ser registrado;
5. ultimo registro pode ser desfeito;
6. cadastro precisa permitir busca e remocao.

O objetivo tecnico e mostrar FIFO, LIFO e lista encadeada em um dominio simples.

## Exercicio 2: Suporte De TI

O suporte de TI aproxima o projeto da area de tecnologia.

- Chamados entram em fila.
- Logs recentes funcionam como pilha.
- Equipamentos ficam em lista encadeada.

Esse fluxo aparece em empresas quando um time precisa registrar problema, atender por ordem de chegada e manter inventario de maquinas.

## Exercicio 4: CPU

Nem todo trabalho pode ser atendido apenas por ordem de chegada. Um processo critico precisa passar na frente.

No projeto, o antivirus tem prioridade maior que navegador e editor. A regra mostra por que sistemas operacionais usam prioridade para decidir o que recebe CPU primeiro.

## Exercicio 5: Rede

A rede foi modelada como uma situacao de transmissao:

- pacotes entram em fila;
- pacotes com erro entram em pilha;
- pacotes ativos ficam em lista encadeada;
- pacotes entregues saem da lista.

Esse fluxo fica visivel quando um computador tenta acessar um site:

1. o dispositivo de origem cria uma requisicao;
2. a rede encaminha o pacote;
3. um DNS pode ser consultado para resolver nome;
4. o roteador decide o caminho;
5. o servidor responde;
6. falhas podem exigir retransmissao.

O projeto simplifica essa cadeia para ensinar estrutura de dados. Ele nao implementa TCP/IP real.

## Expansao C++: Grafo De Rede

A trilha C++ usa grafo porque redes sao bem representadas por vertices e ligacoes.

| Elemento do grafo | Significado na rede |
| --- | --- |
| Vertice | PC, switch, roteador, DNS ou servidor. |
| Aresta | Ligacao entre dispositivos. |
| Peso | Custo ou latencia da rota. |
| Menor caminho | Rota mais barata entre origem e destino. |

Essa parte serve como ponte entre estruturas basicas em C e modelagem de redes em C++.

## Como Apresentar

Uma ordem defensavel:

1. Mostrar `README.md` para explicar escopo.
2. Rodar `ex01_clinica` para introduzir fila, pilha e lista.
3. Rodar `ex02_suporte_ti` para aproximar do contexto tecnico.
4. Rodar `ex04_escalonamento` para explicar prioridade.
5. Rodar `ex05_rede_pacotes` para fechar a questao de redes.
6. Abrir a interface web em `#ex05` para mostrar o fluxo visual.
7. Explicar que C++ expande a ideia para grafo e rotas.
