import { Database, Monitor, Router, Server, TriangleAlert, Waypoints } from 'lucide-react';
import type { DemoState, PacketPhase } from '../domain/network-demo';

type TopologyPanelProps = {
  state: DemoState;
};

type RouteId = 'pc-switch' | 'switch-router' | 'router-server' | 'router-dns' | 'router-error';

type Route = {
  id: RouteId;
  path: string;
};

const routes: Route[] = [
  { id: 'pc-switch', path: 'M95 170 H250' },
  { id: 'switch-router', path: 'M310 170 H470' },
  { id: 'router-server', path: 'M530 170 H700' },
  { id: 'router-dns', path: 'M500 145 L610 70' },
  { id: 'router-error', path: 'M500 190 L610 265' },
];

export function TopologyPanel({ state }: TopologyPanelProps) {
  const activeRoutes = routeByPhase(state.phase);

  return (
    <div className="topology-panel" aria-label="Topologia demonstrativa">
      <div className="topology-map">
        <svg className="topology-lines" viewBox="0 0 820 330" aria-hidden="true">
          <defs>
            <marker id="route-arrow" markerHeight="8" markerWidth="8" orient="auto" refX="7" refY="4">
              <path d="M0,0 L8,4 L0,8 Z" />
            </marker>
          </defs>
          {routes.map((route) => (
            <path
              className="topology-line"
              d={route.path}
              data-active={activeRoutes.includes(route.id)}
              key={route.id}
              markerEnd={activeRoutes.includes(route.id) ? 'url(#route-arrow)' : undefined}
            />
          ))}
          {routes
            .filter((route) => activeRoutes.includes(route.id))
            .map((route) => (
              <path className="topology-beam" d={route.path} key={`${route.id}-beam`} />
            ))}
        </svg>

        <NetworkNode className="node-pc" icon={<Monitor size={18} />} label="PC-01" detail="origem" />
        <NetworkNode className="node-switch" icon={<Waypoints size={18} />} label="Switch" detail="LAN" />
        <NetworkNode className="node-router" icon={<Router size={18} />} label="Roteador" detail="decisao" />
        <NetworkNode className="node-dns" icon={<Database size={18} />} label="DNS" detail="nome" />
        <NetworkNode className="node-server" icon={<Server size={18} />} label="Servidor" detail="destino" />
        <NetworkNode className="node-error" icon={<TriangleAlert size={18} />} label="Erro" detail="pilha" />

        {state.currentPacket ? (
          <div className={`packet-token packet-token--${state.phase}`} aria-live="polite">
            <span>{`P${state.currentPacket.id}`}</span>
          </div>
        ) : null}
      </div>
    </div>
  );
}

function routeByPhase(phase: PacketPhase): RouteId[] {
  if (phase === 'server') {
    return ['pc-switch', 'switch-router', 'router-server'];
  }

  if (phase === 'dns') {
    return ['pc-switch', 'switch-router', 'router-dns'];
  }

  if (phase === 'error') {
    return ['pc-switch', 'switch-router', 'router-error'];
  }

  if (phase === 'switch') {
    return ['pc-switch'];
  }

  if (phase === 'router') {
    return ['pc-switch', 'switch-router'];
  }

  return [];
}

type NetworkNodeProps = {
  className: string;
  icon: React.ReactNode;
  label: string;
  detail: string;
};

function NetworkNode({ className, icon, label, detail }: NetworkNodeProps) {
  return (
    <div className={`network-node ${className}`}>
      <span className="network-node__icon">{icon}</span>
      <strong>{label}</strong>
      <small>{detail}</small>
    </div>
  );
}
