import { Activity, Code2, Gauge, Signal, TerminalSquare } from 'lucide-react';
import type { ReactNode } from 'react';

export function RuntimePanel() {
  return (
    <section className="panel runtime-panel">
      <header className="panel__header">
        <div>
          <span className="eyebrow">Base tecnica</span>
          <h2>Limites da publicacao</h2>
        </div>
        <TerminalSquare aria-hidden="true" size={18} />
      </header>
      <div className="contract-list">
        <RuntimeLine icon={<Signal size={16} />} label="Runtime" value="Navegador" />
        <RuntimeLine icon={<Code2 size={16} />} label="Fonte nativa" value="src/c/ex05" />
        <RuntimeLine icon={<Gauge size={16} />} label="Validacao" value="Build local" />
        <RuntimeLine icon={<Activity size={16} />} label="Interacao" value="Ciclo automatico" />
      </div>
    </section>
  );
}

type RuntimeLineProps = {
  icon: ReactNode;
  label: string;
  value: string;
};

function RuntimeLine({ icon, label, value }: RuntimeLineProps) {
  return (
    <div className="runtime-line">
      <span>{icon}</span>
      <small>{label}</small>
      <strong>{value}</strong>
    </div>
  );
}
