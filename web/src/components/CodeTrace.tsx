import { FileCode2, TerminalSquare } from 'lucide-react';
import { codeReferences, type CodeFocus, type DemoEvent } from '../domain/network-demo';

type CodeTraceProps = {
  focus: CodeFocus;
  events: DemoEvent[];
};

export function CodeTrace({ focus, events }: CodeTraceProps) {
  const reference = codeReferences[focus];

  return (
    <section className="trace-grid">
      <article className="panel panel--terminal">
        <header className="panel__header">
          <div>
            <span className="eyebrow">Rastreabilidade</span>
            <h2>Codigo relacionado</h2>
          </div>
          <FileCode2 aria-hidden="true" size={18} />
        </header>
        <dl className="trace-meta">
          <div>
            <dt>Arquivo</dt>
            <dd>{reference.file}</dd>
          </div>
          <div>
            <dt>Operacao</dt>
            <dd>{reference.operation}</dd>
          </div>
        </dl>
        <pre className="code-window" aria-label="Trecho tecnico relacionado">
          {reference.snippet.map((line) => `> ${line}`).join('\n')}
        </pre>
        <p className="trace-note">{reference.note}</p>
      </article>

      <article className="panel">
        <header className="panel__header">
          <div>
            <span className="eyebrow">Eventos</span>
            <h2>Registro tecnico</h2>
          </div>
          <TerminalSquare aria-hidden="true" size={18} />
        </header>
        <ol className="event-log">
          {events.map((event) => (
            <li key={event.id}>
              <strong>{event.title}</strong>
              <span>{event.detail}</span>
            </li>
          ))}
        </ol>
      </article>
    </section>
  );
}
