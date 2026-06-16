import type { LabModule } from '../exercise-labs';

export const systemLabs: LabModule[] = [
  {
    id: 'ex04',
    label: 'Q4 CPU',
    eyebrow: 'Exercicio 4',
    title: 'Escalonamento de processos',
    summary: 'Fila de prioridade, pilha de encerramentos e lista de processos ativos.',
    status: 'Implementado',
    source: 'src/c/ex04_escalonamento.c',
    metrics: [
      { label: 'Prioridade', value: '10' },
      { label: 'Executa', value: '201' },
      { label: 'Ativos', value: '3 -> 2' },
    ],
    groups: [
      {
        label: 'CPU',
        structure: 'Fila de prioridade',
        role: 'Escolhe o maior valor de prioridade antes de executar.',
        result: 'Antivirus executa primeiro por prioridade 10.',
        items: [
          { primary: 'PID 201', secondary: 'antivirus', meta: 'prioridade 10', tone: 'success' },
          { primary: 'PID 202', secondary: 'navegador', meta: 'prioridade 3' },
          { primary: 'PID 203', secondary: 'editor', meta: 'prioridade 2' },
        ],
      },
      {
        label: 'Encerrados',
        structure: 'Pilha',
        role: 'Mantem o historico recente de processos finalizados.',
        result: 'PID 201 entra no historico como processo concluido.',
        items: [{ primary: 'PID 201', secondary: 'processo concluido', meta: 'topo', tone: 'success' }],
      },
      {
        label: 'Ativos',
        structure: 'Lista encadeada',
        role: 'Permite consultar e atualizar estado por PID.',
        result: 'Navegador muda de aguardando para pronto.',
        items: [
          { primary: 'PID 202', secondary: 'navegador', meta: 'pronto', tone: 'success' },
          { primary: 'PID 203', secondary: 'editor', meta: 'aguardando' },
          { primary: 'PID 201', secondary: 'antivirus', meta: 'removido', tone: 'danger' },
        ],
      },
    ],
    events: [
      'Tres processos entram na fila da CPU.',
      'A maior prioridade e selecionada por varredura.',
      'PID 201 sai da lista ativa e entra no historico.',
      'PID 202 recebe atualizacao de estado.',
    ],
    decisions: [
      'Prioridade explicita evita depender da ordem de chegada.',
      'Lista ativa permite alteracao de estado durante o ciclo.',
      'Historico de encerramento preserva a ultima saida.',
    ],
  },
  {
    id: 'ex05',
    label: 'Q5 Redes',
    eyebrow: 'Exercicio 5',
    title: 'Simulador de fluxo de pacotes',
    summary: 'Fila de transmissao, pilha de erros, lista ativa e rota visual.',
    status: 'Demo profunda',
    source: 'src/c/ex05_rede_pacotes.c',
    metrics: [
      { label: 'Pacotes', value: '4' },
      { label: 'Erros', value: '2' },
      { label: 'Taxa', value: '100 KB/s' },
    ],
    groups: [],
    events: [],
    decisions: [],
  },
  {
    id: 'cpp',
    label: 'C++ Grafo',
    eyebrow: 'Trilha C++',
    title: 'Topologia e menor caminho',
    summary: 'Grafo nao direcionado com latencia e menor caminho em C++.',
    status: 'Expansao',
    source: 'src/cpp/network_topology_lab.cpp',
    metrics: [
      { label: 'Nos', value: '6' },
      { label: 'Rota', value: 'PC-01' },
      { label: 'Latencia', value: '9 ms' },
    ],
    groups: [
      {
        label: 'Topologia',
        structure: 'Grafo',
        role: 'Representa equipamentos e enlaces por latencia.',
        result: 'PC-01 chega ao Servidor por Switch-Lab e Roteador.',
        items: [
          { primary: 'PC-01 -> Switch-Lab', secondary: 'entrada', meta: '1 ms' },
          { primary: 'Switch-Lab -> Roteador', secondary: 'agregacao', meta: '2 ms' },
          { primary: 'Roteador -> Servidor', secondary: 'destino', meta: '6 ms', tone: 'success' },
        ],
      },
      {
        label: 'Busca',
        structure: 'Fila de prioridade',
        role: 'Dijkstra expande o menor custo conhecido.',
        result: 'Rota estimada: PC-01 -> Switch-Lab -> Roteador -> Servidor.',
        items: [
          { primary: 'Inicio', secondary: 'PC-01', meta: '0 ms', tone: 'success' },
          { primary: 'Vizinho', secondary: 'Switch-Lab', meta: '1 ms' },
          { primary: 'Destino', secondary: 'Servidor', meta: '9 ms', tone: 'success' },
        ],
      },
    ],
    events: [
      'Topologia e cadastrada com enlaces bidirecionais.',
      'A busca calcula menor custo acumulado.',
      'A rota final soma 9 ms ate o servidor.',
    ],
    decisions: [
      'Grafo aproxima o problema real de roteamento.',
      'C++ organiza a regra em classe e metodos.',
      'A trilha amplia o projeto sem misturar com as questoes C.',
    ],
  },
];
