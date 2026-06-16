import {
  Braces,
  Cpu,
  Github,
  Network,
  Pause,
  Play,
  RotateCcw,
  ShieldCheck,
} from 'lucide-react';
import { useEffect, useMemo, useState } from 'react';
import { CodeTrace } from './components/CodeTrace';
import { ExerciseWorkspace } from './components/ExerciseWorkspace';
import { FlowSummary } from './components/FlowSummary';
import { LabNavigator } from './components/LabNavigator';
import { Metric } from './components/Metric';
import { NetworkInspector, type InspectorFilter } from './components/NetworkInspector';
import { PacketQueue } from './components/PacketQueue';
import { RuntimePanel } from './components/RuntimePanel';
import { RuntimeStep } from './components/RuntimeStep';
import { RouteStrip } from './components/RouteStrip';
import { ThemeToggle } from './components/ThemeToggle';
import { TopologyPanel } from './components/TopologyPanel';
import { advanceDemo, createInitialDemoState, demoProgress, isDemoComplete } from './domain/network-demo';
import { exerciseLabs, labsById, type LabId } from './domain/exercise-labs';
import { applyTheme, nextTheme, readInitialTheme } from './domain/theme';

const demoIntervalMs = 4200;

export function App() {
  const [activeLab, setActiveLab] = useState<LabId>(readInitialLab);
  const [state, setState] = useState(createInitialDemoState);
  const [isRunning, setIsRunning] = useState(true);
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<InspectorFilter>('todos');
  const [theme, setTheme] = useState(readInitialTheme);
  const selectedLab = labsById[activeLab];
  const isNetworkLab = activeLab === 'ex05';
  const progress = useMemo(() => demoProgress(state), [state]);
  const currentEvent = state.events[0];
  const isComplete = isDemoComplete(state);

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (!isNetworkLab || !isRunning || isComplete) {
      return undefined;
    }

    const timer = window.setInterval(() => {
      setState((current) => advanceDemo(current));
    }, demoIntervalMs);

    return () => window.clearInterval(timer);
  }, [isComplete, isNetworkLab, isRunning]);

  useEffect(() => {
    if (isNetworkLab && isComplete && isRunning) {
      setIsRunning(false);
    }
  }, [isComplete, isNetworkLab, isRunning]);

  function restartSimulation() {
    setState(createInitialDemoState());
    setIsRunning(true);
  }

  function selectLab(lab: LabId) {
    setActiveLab(lab);
    window.history.replaceState(null, '', `#${lab}`);
  }

  function toggleTheme() {
    setTheme((current) => nextTheme(current));
  }

  return (
    <main className="app-shell">
      <header className="product-topbar">
        <div className="product-brand">
          <span className="product-mark">
            <Network size={18} aria-hidden="true" />
          </span>
          <div>
            <strong>Estruturas Lab</strong>
            <span>PDF, C/C++ e interface web unica</span>
          </div>
        </div>

        <div className="topbar-actions">
          <div className="topbar-metrics" aria-label="Metricas do projeto">
            <Metric label="Modulo" value={selectedLab.label} tone="info" />
            <Metric label="Fonte" value={selectedLab.source.includes('cpp') ? 'C++' : 'C'} tone="success" />
            <Metric
              label="Ciclo"
              value={isNetworkLab ? (isComplete ? 'Concluido' : isRunning ? 'Rodando' : 'Pausado') : selectedLab.status}
              tone={isNetworkLab && !isRunning && !isComplete ? 'warning' : 'success'}
            />
          </div>
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
        </div>
      </header>

      <section className="command-band" id="lab">
        <article className="command-copy">
          <span className="eyebrow">{selectedLab.eyebrow}</span>
          <h1>
            {isNetworkLab ? (
              <>
                <span>Simulador de fluxo</span>
                <span> de pacotes</span>
              </>
            ) : (
              selectedLab.title
            )}
          </h1>
          <p>{selectedLab.summary}</p>
        </article>

        {isNetworkLab ? (
          <div className="command-controls" aria-label="Controles da simulacao">
            <button
              className="control-button control-button--primary"
              type="button"
              onClick={() => (isComplete ? restartSimulation() : setIsRunning((value) => !value))}
            >
              {isRunning && !isComplete ? <Pause size={17} aria-hidden="true" /> : <Play size={17} aria-hidden="true" />}
              {isComplete ? 'Rodar novamente' : isRunning ? 'Pausar' : 'Continuar'}
            </button>
            <button className="control-button" type="button" onClick={restartSimulation}>
              <RotateCcw size={17} aria-hidden="true" />
              Reiniciar
            </button>
          </div>
        ) : (
          <div className="command-meta" aria-label="Fonte da questao">
            <span className="status-pill status-pill--info">{selectedLab.status}</span>
            <span className="source-badge">{selectedLab.source}</span>
          </div>
        )}
      </section>

      <LabNavigator activeLab={activeLab} labs={exerciseLabs} onSelect={selectLab} />

      {isNetworkLab ? (
        <>
          <section className="simulation-layout">
            <aside className="state-rail state-rail--left">
              <PacketQueue packets={state.queue} />
              <FlowSummary progress={progress} state={state} />
              <RuntimePanel />
            </aside>

            <section className="stage-shell" aria-label="Simulacao automatica">
              <div className="stage-header">
                <div>
                  <span className="eyebrow">Evento atual</span>
                  <h2>{currentEvent.title}</h2>
                  <p>{currentEvent.detail}</p>
                </div>
                <div className="stage-progress" aria-label="Progresso da simulacao">
                  <span>{progress}%</span>
                  <div className="progress-track">
                    <span style={{ width: `${progress}%` }} />
                  </div>
                </div>
              </div>
              <RouteStrip state={state} />
              <TopologyPanel state={state} />
            </section>

            <NetworkInspector
              filter={filter}
              onFilterChange={setFilter}
              onQueryChange={setQuery}
              query={query}
              state={state}
            />
          </section>

          <section className="analysis-section" id="codigo">
            <CodeTrace focus={state.focus} events={state.events} />
          </section>
        </>
      ) : (
        <ExerciseWorkspace lab={selectedLab} />
      )}

      <footer className="product-footer" id="arquitetura">
        <div>
          <span className="eyebrow">Arquitetura publicada</span>
          <h2>Questoes do PDF no Pages; implementacao nativa versionada no repositorio.</h2>
        </div>
        <div className="footer-grid">
          <RuntimeStep icon={<Braces size={18} />} title="TypeScript" detail="Estado visual da interface." />
          <RuntimeStep icon={<Cpu size={18} />} title="C/C++" detail="Regra principal em src." />
          <RuntimeStep icon={<ShieldCheck size={18} />} title="Auditoria" detail="Riscos e hardening rastreados." />
          <RuntimeStep icon={<Github size={18} />} title="Pages" detail="Build estatico em web/dist." />
        </div>
      </footer>
    </main>
  );
}

function readInitialLab(): LabId {
  const requestedLab = window.location.hash.replace('#', '') as LabId;
  return requestedLab in labsById ? requestedLab : 'ex05';
}
