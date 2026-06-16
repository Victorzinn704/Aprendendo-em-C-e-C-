# Escopo Real Do PDF

Fonte: `Revisao - Implementacao Parte1.pdf`.

## Exercicio 1 - Sistema De Atendimento De Clinica

Requisitos extraidos:

- fila de recepcao com `nome` e `idade`;
- cadastrar paciente na fila;
- chamar proximo paciente;
- exibir fila de espera;
- situacao de teste com Joao, Maria, Carlos e Ana;
- chamar dois pacientes;
- pilha de historico de atendimentos com `nome` e `especialidade`;
- registrar atendimento;
- desfazer ultimo registro;
- exibir historico;
- lista encadeada de cadastro com `nome`, `CPF` e `telefone`;
- cadastrar, buscar, remover e listar pacientes.

Perguntas:

1. Por que fila e ideal para recepcao?
2. Por que pilha serve para desfazer acoes?
3. Por que lista encadeada e melhor que vetor para cadastros dinamicos?

## Exercicio 2 - Sistema De Rede / TI

Requisitos extraidos:

- fila de chamados com `numero do ticket` e `descricao`;
- abrir chamado;
- atender proximo chamado;
- listar chamados pendentes;
- exemplos: tickets 101, 102 e 103;
- pilha de logs com acoes recentes;
- registrar acao;
- desfazer ultima acao;
- mostrar historico;
- lista encadeada de equipamentos com `patrimonio`, `tipo` e `localizacao`;
- adicionar, buscar, remover e listar equipamentos.

Observacao: o PDF repete "Parte 3" em duas secoes deste exercicio. A implementacao preserva o conteudo, mas organiza como fila, pilha e lista.

## Exercicio 3

Nao existe Exercicio 3 no PDF enviado. O documento pula do Exercicio 2 para o Exercicio 4.

Decisao do repositorio:

- nao inventar uma questao ausente;
- documentar a lacuna;
- manter numeracao igual ao PDF.

## Exercicio 4 - Sistema De Escalonamento De Processos

Requisitos extraidos:

- fila de processos aguardando CPU;
- dados: `PID` e `nome do processo`;
- pilha de historico de processos encerrados;
- dados: `PID` e `motivo do encerramento`;
- lista encadeada de processos ativos;
- dados: `PID`, `nome` e `estado`;
- implementar fila de prioridade;
- processos criticos tem prioridade maior;
- exemplo: antivirus prioridade 10, navegador prioridade 3, editor prioridade 2;
- executar primeiro o processo mais prioritario.

## Exercicio 5 - Simulacao De Redes De Computadores

Requisitos extraidos:

- pacote com numero, tamanho em KB e tempo estimado de transmissao;
- fila de pacotes aguardando transmissao;
- adicionar pacote;
- transmitir proximo pacote;
- mostrar fila;
- pacotes: 1 com 500 KB, 2 com 300 KB, 3 com 700 KB e 4 com 200 KB;
- pergunta: qual pacote sera transmitido primeiro?
- pilha de pacotes com erro;
- registrar pacote com erro;
- retransmitir ultimo pacote com erro;
- mostrar pilha;
- exemplo: Pacote 2 falhou, Pacote 4 falhou;
- lista encadeada de pacotes ativos com ID, origem, destino e status;
- inserir, buscar, remover entregue e listar;
- situacao pratica: chegada de 4 pacotes, transmissao de 2, um erro na pilha, um entregue removido.

Perguntas:

1. Por que a fila representa bem a transmissao de pacotes?
2. Por que a pilha pode representar retransmissao?
3. Por que a lista encadeada ajuda no controle de pacotes ativos?
4. Qual estrutura melhor representa atraso de fila?
