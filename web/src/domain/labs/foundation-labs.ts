import type { LabModule } from '../exercise-labs';

export const foundationLabs: LabModule[] = [
  {
    id: 'ex01',
    label: 'Q1 Clinica',
    eyebrow: 'Exercicio 1',
    title: 'Atendimento de clinica',
    summary: 'Fila de recepcao, pilha de historico e lista encadeada de cadastro.',
    status: 'Implementado',
    source: 'src/c/ex01_clinica.c',
    metrics: [
      { label: 'Fila', value: '4 -> 2' },
      { label: 'Pilha', value: '3 -> 2' },
      { label: 'Lista', value: '3 -> 2' },
    ],
    groups: [
      {
        label: 'Recepcao',
        structure: 'Fila circular',
        role: 'Mantem a ordem real de chegada.',
        result: 'Joao e Maria sao chamados primeiro.',
        items: [
          { primary: 'Joao', secondary: '25 anos', meta: '1o da fila', tone: 'success' },
          { primary: 'Maria', secondary: '40 anos', meta: '2o da fila', tone: 'success' },
          { primary: 'Carlos', secondary: '31 anos', meta: 'permanece aguardando' },
          { primary: 'Ana', secondary: '28 anos', meta: 'permanece aguardando' },
        ],
      },
      {
        label: 'Historico',
        structure: 'Pilha',
        role: 'Permite desfazer o ultimo registro.',
        result: 'Carlos sai primeiro porque foi o ultimo atendimento registrado.',
        items: [
          { primary: 'Carlos', secondary: 'Clinica geral', meta: 'topo removido', tone: 'warning' },
          { primary: 'Maria', secondary: 'Ortopedia', meta: 'fica no historico' },
          { primary: 'Joao', secondary: 'Cardiologia', meta: 'base da pilha' },
        ],
      },
      {
        label: 'Cadastro',
        structure: 'Lista encadeada',
        role: 'Permite inserir, buscar e remover sem tamanho fixo.',
        result: 'CPF de Maria e encontrado; Carlos e removido da lista.',
        items: [
          { primary: 'Maria', secondary: '222.222.222-22', meta: 'busca encontrada', tone: 'success' },
          { primary: 'Carlos', secondary: '333.333.333-33', meta: 'removido', tone: 'danger' },
          { primary: 'Joao', secondary: '111.111.111-11', meta: 'continua cadastrado' },
        ],
      },
    ],
    events: [
      'Quatro pacientes entram na recepcao.',
      'Dois primeiros pacientes sao chamados.',
      'O ultimo atendimento pode ser desfeito.',
      'A lista dinamica permite buscar e remover por CPF.',
    ],
    decisions: [
      'Fila foi usada para respeitar chegada.',
      'Pilha foi usada para rollback do ultimo registro.',
      'Lista evita limite artificial de cadastro.',
    ],
  },
  {
    id: 'ex02',
    label: 'Q2 TI',
    eyebrow: 'Exercicio 2',
    title: 'Suporte de TI',
    summary: 'Chamados em fila, logs em pilha e inventario por lista encadeada.',
    status: 'Implementado',
    source: 'src/c/ex02_suporte_ti.c',
    metrics: [
      { label: 'Tickets', value: '101-103' },
      { label: 'Logs', value: '3 -> 2' },
      { label: 'Atendido', value: '101' },
    ],
    groups: [
      {
        label: 'Chamados',
        structure: 'Fila circular',
        role: 'Evita disputa informal por atendimento.',
        result: 'Ticket 101 e atendido antes dos tickets 102 e 103.',
        items: [
          { primary: 'Ticket 101', secondary: 'Internet caiu', meta: 'atendido', tone: 'success' },
          { primary: 'Ticket 102', secondary: 'Impressora nao funciona', meta: 'pendente' },
          { primary: 'Ticket 103', secondary: 'Computador nao liga', meta: 'pendente' },
        ],
      },
      {
        label: 'Logs',
        structure: 'Pilha',
        role: 'Representa desfazer a ultima acao tecnica.',
        result: 'Resetar switch e desfeito antes das acoes anteriores.',
        items: [
          { primary: 'Resetou switch', secondary: 'acao recente', meta: 'desfeita', tone: 'warning' },
          { primary: 'Alterou IP', secondary: 'configuracao', meta: 'mantida' },
          { primary: 'Reiniciou servidor', secondary: 'manutencao', meta: 'base da pilha' },
        ],
      },
      {
        label: 'Inventario',
        structure: 'Lista encadeada',
        role: 'Controla equipamentos cadastrados.',
        result: 'PAT-002 e encontrado; PAT-003 e removido.',
        items: [
          { primary: 'PAT-001', secondary: 'roteador', meta: 'sala tecnica' },
          { primary: 'PAT-002', secondary: 'switch', meta: 'laboratorio', tone: 'success' },
          { primary: 'PAT-003', secondary: 'computador', meta: 'removido', tone: 'danger' },
        ],
      },
    ],
    events: [
      'Tickets 101, 102 e 103 entram na fila.',
      'Ticket 101 sai primeiro para atendimento.',
      'O log mais recente e retirado da pilha.',
      'O inventario consulta PAT-002 e remove PAT-003.',
    ],
    decisions: [
      'Fila reduz conflito de prioridade manual.',
      'Pilha reproduz rollback operacional.',
      'Lista facilita inventario dinamico.',
    ],
  },
  {
    id: 'ex03',
    label: 'Q3 Lacuna',
    eyebrow: 'Exercicio 3',
    title: 'Lacuna documentada',
    summary: 'O PDF enviado pula do Exercicio 2 para o Exercicio 4.',
    status: 'Nao existe no PDF',
    source: 'docs/pdf-scope.md',
    metrics: [
      { label: 'Codigo', value: '0' },
      { label: 'Motivo', value: 'PDF' },
      { label: 'Risco', value: 'Baixo' },
    ],
    groups: [
      {
        label: 'Controle de escopo',
        structure: 'Registro documental',
        role: 'Evita inventar uma entrega fora da fonte.',
        result: 'A numeracao original foi preservada.',
        items: [
          { primary: 'Questao 1', secondary: 'clinica', meta: 'presente', tone: 'success' },
          { primary: 'Questao 2', secondary: 'suporte de TI', meta: 'presente', tone: 'success' },
          { primary: 'Questao 3', secondary: 'ausente', meta: 'documentada', tone: 'warning' },
          { primary: 'Questao 4', secondary: 'escalonamento', meta: 'presente', tone: 'success' },
        ],
      },
    ],
    events: [
      'PDF foi mapeado antes da implementacao.',
      'A ausencia foi registrada sem criar requisito falso.',
      'A documentacao aponta a lacuna para avaliacao.',
    ],
    decisions: [
      'Nao criar exercicio inexistente.',
      'Manter numeracao igual ao PDF.',
      'Usar a lacuna como evidencia de controle de escopo.',
    ],
  },
];
