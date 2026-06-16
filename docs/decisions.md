# Decisoes Tecnicas

## Separar Um Arquivo Por Exercicio

Foi escolhido um arquivo C por exercicio porque o PDF mistura dominios diferentes: clinica, suporte de TI, sistema operacional e redes. Separar os arquivos reduz confusao durante a apresentacao e permite compilar apenas o tema discutido.

Alternativa rejeitada: um menu unico com todos os exercicios. Ele deixaria a demonstracao maior, mais poluida e mais dificil de revisar.

## Usar Demos Automaticas

Cada `main` roda os dados do PDF automaticamente. Isso reduz risco de erro de digitacao em apresentacao e deixa o resultado reproduzivel.

Alternativa rejeitada: entrada interativa obrigatoria. Ela e util em sistemas finais, mas atrapalha a verificacao rapida dos requisitos do PDF.

## Vetor Para Fila E Pilha

As filas e pilhas usam vetor fixo porque o objetivo academico e demonstrar comportamento FIFO e LIFO com clareza. O limite tambem ajuda a mostrar controle de capacidade.

Alternativa rejeitada: fila/pilha dinamica para todos os casos. Seria mais flexivel, mas adicionaria ruido para exercicios curtos.

## Lista Encadeada Com `malloc` E `free`

As listas usam alocacao dinamica porque o PDF pede cadastro/equipamento/processo/pacote ativo com insercao, busca, remocao e listagem.

Alternativa rejeitada: vetor para cadastro dinamico. O vetor exige tamanho previo ou realocacao; isso enfraquece a justificativa teorica pedida no PDF.

## Sem Rede Real No Exercicio 5

O Exercicio 5 simula pacotes, erros e estado. Ele nao abre socket real porque o PDF pede estruturas de dados, nao comunicacao TCP/IP verdadeira.

Alternativa rejeitada: socket local. Seria uma expansao interessante, mas aumentaria dependencia de ambiente e permissao de rede.

## C++ Como Trilha Separada

O arquivo C++ mostra topologia e menor caminho com grafo. Ele foi separado para nao misturar requisitos do PDF com uma expansao de portfolio.

Alternativa rejeitada: converter tudo para C++. Isso perderia o foco principal de demonstrar C e ponteiros.
