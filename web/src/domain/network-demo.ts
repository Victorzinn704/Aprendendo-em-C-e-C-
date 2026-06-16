import { codeReferences } from './code-references';
import { pdfPackets } from './network-fixtures';
import { appendEvent, demoTransitions } from './network-transitions';
import type { DemoState } from './network-types';

export { codeReferences };
export type { ActivePacket, CodeFocus, DemoEvent, DemoState, Packet, PacketPhase, PacketStatus } from './network-types';

const demoStepCount = 7;

export function createInitialDemoState(): DemoState {
  return {
    queue: [...pdfPackets],
    active: pdfPackets.map((packet) => ({ ...packet, status: 'em_transito' })),
    errorStack: [],
    events: [
      {
        id: 1,
        title: 'Quatro pacotes chegaram',
        detail: 'Pacotes 1, 2, 3 e 4 carregados do PDF.',
        focus: 'load',
      },
    ],
    cursor: 0,
    phase: 'idle',
    currentPacket: null,
    focus: 'load',
  };
}

export function advanceDemo(state: DemoState): DemoState {
  if (isDemoComplete(state)) {
    return state;
  }

  const transition = demoTransitions[state.cursor];
  if (transition) {
    return transition(state);
  }

  return appendEvent(state, {
    title: 'Ciclo demonstrativo concluido',
    detail: 'Ciclo encerrado com a regra nativa registrada.',
    focus: 'done',
    phase: 'idle',
    currentPacket: null,
    cursor: demoStepCount,
  });
}

export function demoProgress(state: DemoState): number {
  return Math.min(100, Math.round((state.cursor / demoStepCount) * 100));
}

export function isDemoComplete(state: DemoState): boolean {
  return state.cursor >= demoStepCount;
}
