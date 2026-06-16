import { CheckCircle2, FileCode2, ListChecks, Workflow } from 'lucide-react';
import type { LabModule, LabTone } from '../domain/exercise-labs';

type ExerciseWorkspaceProps = {
  lab: LabModule;
};

const toneClass: Record<LabTone, string> = {
  neutral: 'lab-chip--neutral',
  success: 'lab-chip--success',
  warning: 'lab-chip--warning',
  danger: 'lab-chip--danger',
  info: 'lab-chip--info',
};

export function ExerciseWorkspace({ lab }: ExerciseWorkspaceProps) {
  return (
    <section className="exercise-workspace" aria-label={`Aplicacao web de ${lab.label}`}>
      <aside className="exercise-sidebar">
        <section className="panel">
          <header className="panel__header">
            <div>
              <span className="eyebrow">Fonte</span>
              <h2>Implementacao</h2>
            </div>
            <FileCode2 aria-hidden="true" size={18} />
          </header>
          <p className="source-path">{lab.source}</p>
        </section>

        <section className="panel">
          <header className="panel__header">
            <div>
              <span className="eyebrow">Metricas</span>
              <h2>Resumo</h2>
            </div>
            <ListChecks aria-hidden="true" size={18} />
          </header>
          <dl className="lab-metrics">
            {lab.metrics.map((metric) => (
              <div key={metric.label}>
                <dt>{metric.label}</dt>
                <dd>{metric.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </aside>

      <section className="exercise-main">
        <div className="structure-grid">
          {lab.groups.map((group) => (
            <article className="structure-panel" key={group.label}>
              <header>
                <span>{group.label}</span>
                <strong>{group.structure}</strong>
              </header>
              <p>{group.role}</p>
              <div className="structure-items">
                {group.items.map((item) => (
                  <div className={`lab-chip ${toneClass[item.tone ?? 'neutral']}`} key={`${group.label}-${item.primary}`}>
                    <strong>{item.primary}</strong>
                    <span>{item.secondary}</span>
                    <small>{item.meta}</small>
                  </div>
                ))}
              </div>
              <footer>{group.result}</footer>
            </article>
          ))}
        </div>
      </section>

      <aside className="exercise-sidebar">
        <section className="panel">
          <header className="panel__header">
            <div>
              <span className="eyebrow">Fluxo</span>
              <h2>Historico</h2>
            </div>
            <Workflow aria-hidden="true" size={18} />
          </header>
          <ol className="exercise-events">
            {lab.events.map((event) => (
              <li key={event}>{event}</li>
            ))}
          </ol>
        </section>

        <section className="panel">
          <header className="panel__header">
            <div>
              <span className="eyebrow">Decisao</span>
              <h2>Arquitetura</h2>
            </div>
            <CheckCircle2 aria-hidden="true" size={18} />
          </header>
          <ul className="decision-list">
            {lab.decisions.map((decision) => (
              <li key={decision}>{decision}</li>
            ))}
          </ul>
        </section>
      </aside>
    </section>
  );
}
