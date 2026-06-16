import { Filter, Search } from 'lucide-react';
import { ActivePackets } from './ActivePackets';
import { ErrorStack } from './ErrorStack';
import { TransmissionHistory } from './TransmissionHistory';
import type { ActivePacket, CodeFocus, DemoEvent, DemoState, Packet } from '../domain/network-demo';

export type InspectorFilter = 'todos' | 'pacotes' | 'falhas' | 'historico';

type NetworkInspectorProps = {
  state: DemoState;
  query: string;
  filter: InspectorFilter;
  onQueryChange: (query: string) => void;
  onFilterChange: (filter: InspectorFilter) => void;
};

const filters: { id: InspectorFilter; label: string }[] = [
  { id: 'todos', label: 'Todos' },
  { id: 'pacotes', label: 'Pacotes' },
  { id: 'falhas', label: 'Falhas' },
  { id: 'historico', label: 'Historico' },
];

const errorFocus: CodeFocus[] = ['fail', 'stack', 'retransmit'];

export function NetworkInspector({ state, query, filter, onQueryChange, onFilterChange }: NetworkInspectorProps) {
  const activePackets = filterActivePackets(state.active, query, filter);
  const errorPackets = filterPackets(state.errorStack, query);
  const events = filterEvents(state.events, query, filter);
  const hasErrorView = filter === 'todos' || filter === 'falhas';
  const hasPacketView = filter === 'todos' || filter === 'pacotes' || filter === 'falhas';
  const hasHistoryView = filter === 'todos' || filter === 'historico' || filter === 'falhas';

  return (
    <aside className="state-rail state-rail--right inspector-rail">
      <section className="inspector-controls" aria-label="Filtros da simulacao">
        <header className="panel__header">
          <div>
            <span className="eyebrow">Inspecao</span>
            <h2>Buscar no fluxo</h2>
          </div>
          <Filter aria-hidden="true" size={18} />
        </header>

        <label className="search-field">
          <Search aria-hidden="true" size={16} />
          <input
            aria-label="Buscar pacote, rota ou evento"
            onChange={(event) => onQueryChange(event.target.value)}
            placeholder="Pacote, rota, falha..."
            type="search"
            value={query}
          />
        </label>

        <div className="filter-tabs" aria-label="Filtrar dados">
          {filters.map((item) => (
            <button
              aria-pressed={filter === item.id}
              className="filter-tab"
              key={item.id}
              onClick={() => onFilterChange(item.id)}
              type="button"
            >
              {item.label}
            </button>
          ))}
        </div>
      </section>

      {hasPacketView ? <ActivePackets packets={activePackets} /> : null}
      {hasHistoryView ? <TransmissionHistory events={events} isClosed={state.focus === 'done'} /> : null}
      {hasErrorView ? <ErrorStack packets={errorPackets} /> : null}
    </aside>
  );
}

function filterActivePackets(packets: ActivePacket[], query: string, filter: InspectorFilter): ActivePacket[] {
  const scoped = filter === 'falhas' ? packets.filter((packet) => packet.status === 'falha_registrada') : packets;
  return filterPackets(scoped, query);
}

function filterPackets<T extends Packet>(packets: T[], query: string): T[] {
  const term = normalize(query);
  if (!term) {
    return packets;
  }

  return packets.filter((packet) =>
    normalize([packet.id, packet.origin, packet.destination, packet.sizeKb, packet.estimatedMs].join(' ')).includes(term),
  );
}

function filterEvents(events: DemoEvent[], query: string, filter: InspectorFilter): DemoEvent[] {
  const term = normalize(query);
  return events.filter((event) => {
    const matchesScope = filter !== 'falhas' || errorFocus.includes(event.focus);
    const matchesTerm = !term || normalize(`${event.title} ${event.detail} ${event.focus}`).includes(term);
    return matchesScope && matchesTerm;
  });
}

function normalize(value: string | number): string {
  return String(value).trim().toLowerCase();
}
