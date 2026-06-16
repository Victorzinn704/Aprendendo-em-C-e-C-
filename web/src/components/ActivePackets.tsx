import { Activity } from 'lucide-react';
import type { ActivePacket, PacketStatus } from '../domain/network-demo';
import { StatusPill } from './StatusPill';

const statusLabel: Record<PacketStatus, string> = {
  em_transito: 'em transito',
  entregue: 'entregue',
  falha_registrada: 'falha registrada',
  retransmitido: 'retransmitido',
};

const statusTone: Record<PacketStatus, 'neutral' | 'success' | 'warning' | 'danger' | 'info'> = {
  em_transito: 'info',
  entregue: 'success',
  falha_registrada: 'danger',
  retransmitido: 'warning',
};

type ActivePacketsProps = {
  packets: ActivePacket[];
};

export function ActivePackets({ packets }: ActivePacketsProps) {
  return (
    <section className="panel">
      <header className="panel__header">
        <div>
          <span className="eyebrow">Lista encadeada</span>
          <h2>Estado dos pacotes</h2>
        </div>
        <Activity aria-hidden="true" size={18} />
      </header>

      <div className="active-table" role="table" aria-label="Estado dos pacotes">
        <div className="active-table__row active-table__row--head" role="row">
          <span>ID</span>
          <span>Rota</span>
          <span>Status</span>
        </div>
        {packets.length === 0 ? <p className="empty-state">Nenhum pacote encontrado.</p> : null}
        {packets.map((packet) => (
          <div className="active-table__row" role="row" key={packet.id}>
            <span>#{packet.id}</span>
            <span>
              {packet.origin} {'->'} {packet.destination}
            </span>
            <StatusPill tone={statusTone[packet.status]}>{statusLabel[packet.status]}</StatusPill>
          </div>
        ))}
      </div>
    </section>
  );
}
