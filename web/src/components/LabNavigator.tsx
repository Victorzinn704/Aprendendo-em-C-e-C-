import { BookOpen, Cpu, FileQuestion, Network, Router, Stethoscope } from 'lucide-react';
import type { ReactNode } from 'react';
import type { LabId, LabModule } from '../domain/exercise-labs';

type LabNavigatorProps = {
  activeLab: LabId;
  labs: LabModule[];
  onSelect: (lab: LabId) => void;
};

const icons: Record<LabId, ReactNode> = {
  ex01: <Stethoscope size={16} />,
  ex02: <Router size={16} />,
  ex03: <FileQuestion size={16} />,
  ex04: <Cpu size={16} />,
  ex05: <Network size={16} />,
  cpp: <BookOpen size={16} />,
};

export function LabNavigator({ activeLab, labs, onSelect }: LabNavigatorProps) {
  return (
    <nav className="lab-nav" aria-label="Questoes do projeto">
      {labs.map((lab) => (
        <button
          aria-pressed={activeLab === lab.id}
          className="lab-nav__item"
          key={lab.id}
          onClick={() => onSelect(lab.id)}
          type="button"
        >
          <span className="lab-nav__icon" aria-hidden="true">
            {icons[lab.id]}
          </span>
          <span>
            <strong>{lab.label}</strong>
            <small>{lab.status}</small>
          </span>
        </button>
      ))}
    </nav>
  );
}
