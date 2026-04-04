import { linearTheme } from './themes/linear';

export const themes = {
  linear: linearTheme,
  // stripe: stripeTheme, // Future
  // vercel: vercelTheme, // Future
} as const;

export type ThemeName = keyof typeof themes;

export function getThemeVariables(themeName: ThemeName = 'linear') {
  const theme = themes[themeName] || themes.linear;
  return Object.entries(theme).map(([key, value]) => `${key}: ${value};`).join('\n');
}
