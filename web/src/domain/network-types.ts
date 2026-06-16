export type PacketStatus = 'em_transito' | 'entregue' | 'falha_registrada' | 'retransmitido';

export type PacketPhase = 'idle' | 'pc' | 'switch' | 'router' | 'dns' | 'server' | 'error';

export type CodeFocus = 'load' | 'deliver' | 'fail' | 'stack' | 'retransmit' | 'done';

export type Packet = {
  id: number;
  sizeKb: number;
  estimatedMs: number;
  origin: string;
  destination: string;
};

export type ActivePacket = Packet & {
  status: PacketStatus;
};

export type DemoEvent = {
  id: number;
  title: string;
  detail: string;
  focus: CodeFocus;
};

export type DemoState = {
  queue: Packet[];
  active: ActivePacket[];
  errorStack: Packet[];
  events: DemoEvent[];
  cursor: number;
  phase: PacketPhase;
  currentPacket: Packet | null;
  focus: CodeFocus;
};

export type CodeReference = {
  title: string;
  file: string;
  operation: string;
  note: string;
  snippet: string[];
};
