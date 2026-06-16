import { Boxes } from 'lucide-react';
import type { Packet } from '../domain/network-demo';

type PacketQueueProps = {
  packets: Packet[];
};

export function PacketQueue({ packets }: PacketQueueProps) {
  return (
    <section className="panel packet-queue">
      <header className="panel__header">
        <div>
          <span className="eyebrow">FIFO</span>
          <h2>Fila de transmissao</h2>
        </div>
        <Boxes aria-hidden="true" size={18} />
      </header>

      <div className="packet-list" aria-label="Pacotes aguardando transmissao">
        {packets.length === 0 ? <p className="empty-state">Nenhum pacote aguardando.</p> : null}
        {packets.map((packet, index) => (
          <article className="packet-row" key={packet.id}>
            <span className="packet-row__index">{index + 1}</span>
            <div>
              <strong>Pacote {packet.id}</strong>
              <span>
                {packet.sizeKb} KB / {packet.estimatedMs} ms
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
