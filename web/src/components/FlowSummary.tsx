import { Activity } from 'lucide-react';
import type { DemoState } from '../domain/network-demo';

type FlowSummaryProps = {
  progress: number;
  state: DemoState;
};

type SummaryItem = {
  label: string;
  value: number;
};

export function FlowSummary({ progress, state }: FlowSummaryProps) {
  const items = createSummaryItems(state);

  return (
    <section className="panel flow-summary" aria-label="Resumo operacional do fluxo">
      <header className="panel__header">
        <div>
          <span className="eyebrow">Telemetria</span>
          <h2>Resumo do ciclo</h2>
        </div>
        <Activity aria-hidden="true" size={18} />
      </header>

      <div className="summary-progress">
        <div>
          <span>Conclusao</span>
          <strong>{progress}%</strong>
        </div>
        <span className="summary-progress__track">
          <span style={{ width: `${progress}%` }} />
        </span>
      </div>

      <dl className="summary-grid">
        {items.map((item) => (
          <div className="summary-cell" key={item.label}>
            <dt>{item.label}</dt>
            <dd>{item.value}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}

function createSummaryItems(state: DemoState): SummaryItem[] {
  const delivered = state.active.filter((packet) => packet.status === 'entregue' || packet.status === 'retransmitido').length;
  const retransmitted = state.active.filter((packet) => packet.status === 'retransmitido').length;
  const handledFailures = state.errorStack.length + retransmitted;

  return [
    { label: 'Total', value: state.active.length },
    { label: 'Fila', value: state.queue.length },
    { label: 'Concluidos', value: delivered },
    { label: 'Falhas', value: handledFailures },
  ];
}
