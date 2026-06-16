import { foundationLabs } from './labs/foundation-labs';
import { systemLabs } from './labs/system-labs';

export type LabId = 'ex01' | 'ex02' | 'ex03' | 'ex04' | 'ex05' | 'cpp';

export type LabTone = 'neutral' | 'success' | 'warning' | 'danger' | 'info';

export type LabMetric = {
  label: string;
  value: string;
};

export type LabItem = {
  primary: string;
  secondary: string;
  meta: string;
  tone?: LabTone;
};

export type LabGroup = {
  label: string;
  structure: string;
  role: string;
  result: string;
  items: LabItem[];
};

export type LabModule = {
  id: LabId;
  label: string;
  eyebrow: string;
  title: string;
  summary: string;
  status: string;
  source: string;
  metrics: LabMetric[];
  groups: LabGroup[];
  events: string[];
  decisions: string[];
};

export const exerciseLabs: LabModule[] = [...foundationLabs, ...systemLabs];

export const labsById = Object.fromEntries(exerciseLabs.map((lab) => [lab.id, lab])) as Record<LabId, LabModule>;
