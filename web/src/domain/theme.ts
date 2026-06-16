export type ThemeMode = 'light' | 'dark';

const storageKey = 'estruturas-lab:theme';

export function readInitialTheme(): ThemeMode {
  const requestedTheme = new URLSearchParams(window.location.search).get('theme');
  if (requestedTheme === 'light' || requestedTheme === 'dark') {
    return requestedTheme;
  }

  const savedTheme = window.localStorage.getItem(storageKey);
  if (savedTheme === 'light' || savedTheme === 'dark') {
    return savedTheme;
  }

  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
}

export function applyTheme(theme: ThemeMode) {
  document.documentElement.dataset.theme = theme;
  window.localStorage.setItem(storageKey, theme);
}

export function nextTheme(theme: ThemeMode): ThemeMode {
  return theme === 'light' ? 'dark' : 'light';
}
