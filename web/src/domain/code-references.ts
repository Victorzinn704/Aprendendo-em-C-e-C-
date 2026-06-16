import type { CodeFocus, CodeReference } from './network-types';

export const codeReferences: Record<CodeFocus, CodeReference> = {
  load: {
    title: 'Carga inicial do PDF',
    file: 'src/c/ex05_rede_pacotes.c',
    operation: 'fila_adicionar + ativo_inserir',
    note: 'A interface TypeScript carrega os mesmos quatro pacotes do PDF para visualizacao no GitHub Pages.',
    snippet: [
      'fila_adicionar(&fila, 1, 500);',
      'fila_adicionar(&fila, 2, 300);',
      'ativo_inserir(&ativos, 1, "PC-01", "Servidor", "em transito");',
    ],
  },
  deliver: {
    title: 'Transmissao com entrega',
    file: 'src/c/ex05_rede_pacotes.c',
    operation: 'fila_transmitir + ativo_remover',
    note: 'O pacote sai da fila e, ao ser entregue, deixa de aparecer na lista ativa.',
    snippet: [
      'fila_transmitir(&fila, &transmitido);',
      'ativo_buscar(ativos, transmitido.numero);',
      'ativo_remover(&ativos, transmitido.numero);',
    ],
  },
  fail: {
    title: 'Erro de transmissao',
    file: 'src/c/ex05_rede_pacotes.c',
    operation: 'fila_transmitir + erros_registrar',
    note: 'A falha vai para a pilha para mostrar o comportamento LIFO de retransmissao.',
    snippet: [
      'fila_transmitir(&fila, &transmitido);',
      'erros_registrar(&pilha, transmitido);',
      'status = "falha registrada";',
    ],
  },
  stack: {
    title: 'Exemplo de pilha LIFO',
    file: 'src/c/ex05_rede_pacotes.c',
    operation: 'erros_registrar',
    note: 'O pacote 4 entra depois do pacote 2, por isso deve sair primeiro na retransmissao.',
    snippet: [
      'erros_registrar(&pilha, pacote2);',
      'erros_registrar(&pilha, pacote4);',
      'topo aponta para o ultimo erro;',
    ],
  },
  retransmit: {
    title: 'Retransmissao',
    file: 'src/c/ex05_rede_pacotes.c',
    operation: 'erros_retransmitir',
    note: 'O ultimo pacote com erro e removido da pilha e marcado como retransmitido na interface.',
    snippet: [
      'erros_retransmitir(&pilha, &retransmitido);',
      'pilha->topo--;',
      'pacote 4 sai antes do pacote 2;',
    ],
  },
  done: {
    title: 'Cenario concluido',
    file: 'docs/audit/senior-code-audit-2026-06-15.md',
    operation: 'invariantes de regra',
    note: 'O fluxo termina sem afirmar que o backend C roda no Pages.',
    snippet: [
      'GitHub Pages: interface TypeScript',
      'Repositorio: codigo C/C++ versionado',
      'Execucao nativa: build local',
    ],
  },
};
