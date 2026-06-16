import { Layers } from 'lucide-react';
import type { Packet } from '../domain/network-demo';

type ErrorStackProps = {
  packets: Packet[];
};

export function ErrorStack({ packets }: ErrorStackProps) {
  const topPacket = packets[packets.length - 1];

  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <span className="eyebrow">LIFO</span>
          <h2>Pilha de erros</h2>
        </div>
        <Layers aria-hidden="true" size={18} />
      </header>

      <div className="stack" aria-label="Pilha de pacotes com erro">
        {packets.length === 0 ? <p className="empty-state">Sem erros registrados.</p> : null}
        {[...packets].reverse().map((packet) => (
          <article className="stack__item" data-top={topPacket?.id === packet.id} key={packet.id}>
            <span>Pacote {packet.id}</span>
            <strong>{topPacket?.id === packet.id ? 'topo' : 'aguardando'}</strong>
          </article>
        ))}
      </div>
    </section>
  );
}
