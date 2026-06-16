import { CheckCircle2, Clock3, Layers, RotateCcw, XCircle } from 'lucide-react';
import type { ReactNode } from 'react';
import type { CodeFocus, DemoEvent } from '../domain/network-demo';

type TransmissionHistoryProps = {
  events: DemoEvent[];
  isClosed: boolean;
};

const historyLabels: Record<CodeFocus, string> = {
  load: 'Carga',
  deliver: 'Entrega',
  fail: 'Falha',
  stack: 'Pilha',
  retransmit: 'Retransmissao',
  done: 'Fechamento',
};

const historyIcon: Record<CodeFocus, ReactNode> = {
  load: <Clock3 size={15} />,
  deliver: <CheckCircle2 size={15} />,
  fail: <XCircle size={15} />,
  stack: <Layers size={15} />,
  retransmit: <RotateCcw size={15} />,
  done: <CheckCircle2 size={15} />,
};

export function TransmissionHistory({ events, isClosed }: TransmissionHistoryProps) {
  return (
    <section className="panel transmission-history" aria-label="Historico da transmissao">
      <header className="panel__header">
        <div>
          <span className="eyebrow">Historico</span>
          <h2>Registro do fluxo</h2>
        </div>
        <Clock3 aria-hidden="true" size={18} />
      </header>

      <ol className="history-list">
        {events.length === 0 ? <p className="empty-state">Nenhum evento encontrado.</p> : null}
        {events.map((event) => (
          <HistoryItem event={event} key={event.id} />
        ))}
      </ol>

      <div className="process-closeout" data-finished={isClosed}>
        <strong>{isClosed ? 'Processo fechado' : 'Processo em andamento'}</strong>
        <span>
          {isClosed
            ? 'Fila lida, falhas empilhadas, retransmissao executada e ciclo encerrado.'
            : 'A proxima etapa atualiza fila, lista ativa ou pilha de erros.'}
        </span>
      </div>
    </section>
  );
}

type HistoryItemProps = {
  event: DemoEvent;
};

function HistoryItem({ event }: HistoryItemProps) {
  return (
    <li className="history-item" data-focus={event.focus}>
      <span className="history-item__icon" aria-hidden="true">
        {historyIcon[event.focus]}
      </span>
      <div>
        <strong>{historyLabels[event.focus]}</strong>
        <span>{event.title}</span>
        <em>{event.detail}</em>
        <small>Etapa {event.id}</small>
      </div>
    </li>
  );
}
