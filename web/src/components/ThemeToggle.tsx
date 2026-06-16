import { Moon, Sun } from 'lucide-react';
import type { ThemeMode } from '../domain/theme';

type ThemeToggleProps = {
  theme: ThemeMode;
  onToggle: () => void;
};

export function ThemeToggle({ theme, onToggle }: ThemeToggleProps) {
  const targetTheme = theme === 'light' ? 'dark' : 'light';
  const Icon = theme === 'light' ? Moon : Sun;

  return (
    <button className="theme-toggle" type="button" onClick={onToggle} aria-label={`Ativar tema ${targetTheme}`}>
      <Icon aria-hidden="true" size={17} />
      <span>Tema {targetTheme}</span>
    </button>
  );
}
