# Glossario

## Estruturas De Dados

| Termo | Explicacao simples | No projeto |
| --- | --- | --- |
| Fila | Quem entra primeiro sai primeiro. | Recepcao, chamados, CPU e pacotes. |
| Pilha | O ultimo item colocado e o primeiro a sair. | Desfazer atendimento, logs, encerramentos e erros. |
| Lista encadeada | Conjunto de nos ligados por ponteiros. | Cadastros, equipamentos, processos e pacotes ativos. |
| No | Um item da lista encadeada. | Cada cadastro/equipamento/pacote ativo. |
| Ponteiro | Variavel que guarda endereco de memoria. | Ligacao entre nos da lista. |
| `malloc` | Reserva memoria durante a execucao. | Criacao de novos nos. |
| `free` | Libera memoria reservada. | Remocao e limpeza das listas. |
| Vetor | Bloco sequencial de itens. | Base das filas e pilhas com limite didatico. |

## C E Build

| Termo | Explicacao simples | No projeto |
| --- | --- | --- |
| Compilador | Transforma codigo C/C++ em programa executavel. | GCC, Clang ou TinyCC. |
| Executavel | Programa pronto para rodar. | Arquivos em `build/`. |
| `-Wall` | Liga avisos importantes do compilador. | Usado na validacao C. |
| `-Werror` | Faz aviso virar erro. | Usado para evitar codigo duvidoso passar despercebido. |
| Biblioteca padrao | Funcoes basicas da linguagem. | `stdio.h`, `stdlib.h`, `string.h`. |

## Redes

| Termo | Explicacao simples | No projeto |
| --- | --- | --- |
| Pacote | Unidade de dados que trafega na rede. | Exercicio 5. |
| Origem | Dispositivo de onde o pacote sai. | PC-01, PC-02, Notebook. |
| Destino | Dispositivo para onde o pacote vai. | Servidor, DNS, roteador. |
| DNS | Servico que traduz nome para endereco. | Usado como destino didatico. |
| Roteador | Equipamento que encaminha trafego entre redes. | Exercicio 5 e C++. |
| Switch | Equipamento que conecta dispositivos na rede local. | Trilha C++. |
| Latencia | Tempo de resposta estimado entre pontos. | Trilha C++. |
| Rota | Caminho usado para chegar ao destino. | Trilha C++. |
| Grafo | Modelo com pontos e ligacoes. | `network_topology_lab.cpp`. |
| Dijkstra | Algoritmo de menor caminho. | Base conceitual da trilha C++. |
