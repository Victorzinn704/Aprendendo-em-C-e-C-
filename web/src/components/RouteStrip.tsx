import { ArrowRight } from 'lucide-react';
import type { DemoState, PacketPhase } from '../domain/network-demo';

type RouteStripProps = {
  state: DemoState;
};

const routeByPhase: Record<PacketPhase, string[]> = {
  idle: ['Origem', 'Fila', 'Aguardando'],
  pc: ['PC-01', 'Switch'],
  switch: ['PC-01', 'Switch'],
  router: ['PC-01', 'Switch', 'Roteador'],
  server: ['PC-01', 'Switch', 'Roteador', 'Servidor'],
  dns: ['PC-01', 'Switch', 'Roteador', 'DNS'],
  error: ['PC-01', 'Switch', 'Roteador', 'Pilha de erro'],
};

const outcomeByPhase: Record<PacketPhase, string> = {
  idle: 'Aguardando entrada',
  pc: 'Pacote na origem',
  switch: 'Comutacao local',
  router: 'Decisao de rota',
  server: 'Entrega ao servidor',
  dns: 'Consulta de nome',
  error: 'Falha registrada',
};

export function RouteStrip({ state }: RouteStripProps) {
  const route = state.focus === 'done' ? ['Fila', 'Falhas', 'Retransmissao', 'Fechamento'] : routeByPhase[state.phase];
  const packetLabel = state.currentPacket ? `Pacote ${state.currentPacket.id}` : 'Fluxo preparado';
  const outcome = state.focus === 'done' ? 'Ciclo concluido' : outcomeByPhase[state.phase];

  return (
    <div className="route-strip" aria-label="Rota ativa">
      <div className="route-strip__summary">
        <span className="eyebrow">Rota ativa</span>
        <strong>{packetLabel}</strong>
        <small>{outcome}</small>
      </div>

      <ol className="route-strip__steps">
        {route.map((step, index) => (
          <li className="route-step" key={`${step}-${index}`} data-current={index === route.length - 1}>
            <span>{step}</span>
            {index < route.length - 1 ? <ArrowRight size={14} aria-hidden="true" /> : null}
          </li>
        ))}
      </ol>
    </div>
  );
}
