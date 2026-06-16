import type { ReactNode } from 'react';

type RuntimeStepProps = {
  icon: ReactNode;
  title: string;
  detail: string;
};

export function RuntimeStep({ icon, title, detail }: RuntimeStepProps) {
  return (
    <div className="runtime-step">
      <span>{icon}</span>
      <div>
        <strong>{title}</strong>
        <small>{detail}</small>
      </div>
    </div>
  );
}
