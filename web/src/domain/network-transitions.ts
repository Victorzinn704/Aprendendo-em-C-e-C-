import { pdfPackets } from './network-fixtures';
import type { ActivePacket, DemoEvent, DemoState, Packet, PacketPhase, PacketStatus } from './network-types';

export type DemoTransition = (state: DemoState) => DemoState;

export const demoTransitions: DemoTransition[] = [
  deliverFirstPacket,
  failSecondPacket,
  deliverThirdPacket,
  registerFourthPacketError,
  retransmitLastError,
  retransmitRemainingError,
];

function deliverFirstPacket(state: DemoState): DemoState {
  const [packet, ...queue] = state.queue;
  if (!packet) {
    return state;
  }

  return appendEvent(
    { ...state, queue, active: setStatus(state.active, packet.id, 'entregue') },
    {
      title: 'Pacote 1 transmitido e entregue',
      detail: 'Saiu da fila e deixou a lista ativa.',
      focus: 'deliver',
      phase: 'server',
      currentPacket: packet,
      cursor: 1,
    },
  );
}

function failSecondPacket(state: DemoState): DemoState {
  const [packet, ...queue] = state.queue;
  if (!packet) {
    return state;
  }

  return appendEvent(
    {
      ...state,
      queue,
      errorStack: [...state.errorStack, packet],
      active: setStatus(state.active, packet.id, 'falha_registrada'),
    },
    {
      title: 'Pacote 2 falhou',
      detail: 'Transmitido com falha; entrou na pilha de erros.',
      focus: 'fail',
      phase: 'dns',
      currentPacket: packet,
      cursor: 2,
    },
  );
}

function deliverThirdPacket(state: DemoState): DemoState {
  const [packet, ...queue] = state.queue;
  if (!packet) {
    return state;
  }

  return appendEvent(
    { ...state, queue, active: setStatus(state.active, packet.id, 'entregue') },
    {
      title: 'Pacote 3 chegou ao roteador',
      detail: 'Rota interna concluida no equipamento de decisao.',
      focus: 'deliver',
      phase: 'router',
      currentPacket: packet,
      cursor: 3,
    },
  );
}

function registerFourthPacketError(state: DemoState): DemoState {
  const packet = pdfPackets.find((item) => item.id === 4);
  if (!packet || state.errorStack.some((item) => item.id === packet.id)) {
    return state;
  }

  return appendEvent(
    {
      ...state,
      queue: state.queue.filter((item) => item.id !== packet.id),
      errorStack: [...state.errorStack, packet],
      active: setStatus(state.active, packet.id, 'falha_registrada'),
    },
    {
      title: 'Pacote 4 entrou na pilha',
      detail: 'Regra LIFO: o ultimo erro deve sair primeiro.',
      focus: 'stack',
      phase: 'error',
      currentPacket: packet,
      cursor: 4,
    },
  );
}

function retransmitLastError(state: DemoState): DemoState {
  const packet = state.errorStack[state.errorStack.length - 1];
  if (!packet) {
    return state;
  }

  return retransmitPacket(state, packet, 'Saiu do topo da pilha e voltou ao fluxo.', 'server', 5);
}

function retransmitRemainingError(state: DemoState): DemoState {
  const packet = state.errorStack[state.errorStack.length - 1];
  if (!packet) {
    return state;
  }

  return retransmitPacket(state, packet, 'A pilha de erros foi esvaziada em ordem LIFO.', 'dns', 6);
}

function retransmitPacket(state: DemoState, packet: Packet, detail: string, phase: PacketPhase, cursor: number): DemoState {
  return appendEvent(
    {
      ...state,
      errorStack: state.errorStack.slice(0, -1),
      active: setStatus(state.active, packet.id, 'retransmitido'),
    },
    {
      title: `Pacote ${packet.id} retransmitido`,
      detail,
      focus: 'retransmit',
      phase,
      currentPacket: packet,
      cursor,
    },
  );
}

export function appendEvent(
  state: DemoState,
  event: Omit<DemoEvent, 'id'> & {
    phase: PacketPhase;
    currentPacket: Packet | null;
    cursor: number;
  },
): DemoState {
  return {
    ...state,
    cursor: event.cursor,
    phase: event.phase,
    currentPacket: event.currentPacket,
    focus: event.focus,
    events: [{ id: state.events.length + 1, title: event.title, detail: event.detail, focus: event.focus }, ...state.events],
  };
}

function setStatus(active: ActivePacket[], id: number, status: PacketStatus): ActivePacket[] {
  return active.map((packet) => (packet.id === id ? { ...packet, status } : packet));
}
