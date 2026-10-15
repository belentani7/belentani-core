/**
 * CANON · tokens del sistema visual del universo Belentani.
 *
 * Paleta canonica: **rojo neon, oro viejo, negro y violeta**, sobre cristal
 * facetado. Estos tokens son la fuente de verdad: el CSS los refleja y los
 * tests comprueban el contraste, de modo que cambiar un color no puede romper
 * la accesibilidad sin que el CI lo detecte.
 *
 * No importa React ni CSS a proposito: asi el contraste se verifica en Node,
 * sin navegador y sin dependencias.
 */

export type CanonScale = {
  100: string; 200: string; 300: string; 400: string; 500: string; 600: string;
};

export type Theme = {
  name: string;
  mode: "dark" | "light";
  color: {
    background: string;
    surface: string;
    surfaceAlt: string;
    border: string;
    textPrimary: string;
    textSecondary: string;
    neon: CanonScale;
    violet: CanonScale;
    gold: CanonScale;
    onAccent: string;
    danger: string;
    warning: string;
    info: string;
  };
  radius: { sm: string; md: string; lg: string; full: string };
  space: Record<1 | 2 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 16, string>;
  shadow: { soft: string; glow: string; glowStrong: string };
  motion: {
    duration: { fast: string; base: string; slow: string };
    easing: { standard: string; emphasized: string; spring: string };
  };
  typography: { display: string; body: string; mono: string };
};

/** Rojo neon: el acento de mayor energia. */
export const neon: CanonScale = {
  100: "#FFE1E7", 200: "#FFB3C2", 300: "#FF8FA8",
  400: "#FF4D70", 500: "#FF073A", 600: "#D4052F",
};

/** Violeta: segundo acento, para superficies, grid y estados. */
export const violet: CanonScale = {
  100: "#F0E7FF", 200: "#D6C0FF", 300: "#B79BFF",
  400: "#9B5CFF", 500: "#7A2BFF", 600: "#5F17CC",
};

/** Oro viejo: acento calido para detalle y valor. */
export const gold: CanonScale = {
  100: "#FBF0CF", 200: "#F3DDA0", 300: "#E4C670",
  400: "#D4AF37", 500: "#B8902A", 600: "#8C6B1C",
};

export const canonTheme: Theme = {
  name: "canon",
  mode: "dark",
  color: {
    background: "#050505",
    surface: "#0E0A16",
    surfaceAlt: "#150D24",
    border: "#9B5CFF33",
    textPrimary: "#F5F0FF",
    textSecondary: "#B9A8D9",
    neon,
    violet,
    gold,
    onAccent: "#050505",
    danger: "#FF6B6B",
    warning: "#FFC46B",
    info: "#6BC5FF",
  },
  radius: { sm: "10px", md: "18px", lg: "28px", full: "9999px" },
  space: {
    1: "0.25rem", 2: "0.5rem", 3: "0.75rem", 4: "1rem", 5: "1.5rem",
    6: "2rem", 8: "3rem", 10: "4rem", 12: "6rem", 16: "8rem",
  },
  shadow: {
    soft: "0 8px 30px -12px rgb(155 92 255 / 0.28)",
    glow: "0 0 0 1px rgb(255 7 58 / 0.22), 0 18px 50px -20px rgb(255 7 58 / 0.45)",
    glowStrong: "0 0 0 1px rgb(255 7 58 / 0.40), 0 30px 80px -24px rgb(155 92 255 / 0.60)",
  },
  motion: {
    duration: { fast: "180ms", base: "420ms", slow: "900ms" },
    easing: {
      standard: "cubic-bezier(0.2, 0, 0, 1)",
      emphasized: "cubic-bezier(0.16, 1, 0.3, 1)",
      spring: "linear(0, 0.2, 0.8, 1.1)",
    },
  },
  typography: {
    display: '"Sora", "Inter", system-ui, sans-serif',
    body: '"Inter", system-ui, -apple-system, sans-serif',
    mono: '"JetBrains Mono", ui-monospace, "SFMono-Regular", monospace',
  },
};

/** Contraste WCAG 2.1. Acepta `#rgb` y `#rrggbb`. Implementacion propia. */
export function relativeLuminance(hex: string): number {
  const clean = hex.trim().replace("#", "");
  const full = clean.length === 3
    ? clean.split("").map((c) => c + c).join("")
    : clean;
  const channels = [0, 2, 4].map((i) => parseInt(full.slice(i, i + 2), 16) / 255);
  const linear = channels.map((c) =>
    c <= 0.03928 ? c / 12.92 : Math.pow((c + 0.055) / 1.055, 2.4),
  );
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

export function contrastRatio(a: string, b: string): number {
  const la = relativeLuminance(a);
  const lb = relativeLuminance(b);
  const ratio = (Math.max(la, lb) + 0.05) / (Math.min(la, lb) + 0.05);
  return Math.round(ratio * 100) / 100;
}

/** Pares que existen en la interfaz real, con su minimo WCAG. */
export const requiredPairs: Array<{ fg: string; bg: string; min: number; use: string }> = [
  { fg: canonTheme.color.textPrimary, bg: canonTheme.color.background, min: 7, use: "cuerpo de texto sobre fondo" },
  { fg: canonTheme.color.textSecondary, bg: canonTheme.color.background, min: 4.5, use: "texto secundario" },
  { fg: canonTheme.color.textPrimary, bg: canonTheme.color.surface, min: 4.5, use: "texto sobre superficie" },
  { fg: canonTheme.color.neon[500], bg: canonTheme.color.background, min: 4.5, use: "neon sobre fondo" },
  { fg: canonTheme.color.neon[500], bg: canonTheme.color.surface, min: 4.5, use: "neon sobre superficie" },
  { fg: canonTheme.color.violet[400], bg: canonTheme.color.background, min: 4.5, use: "violeta sobre fondo" },
  { fg: canonTheme.color.gold[400], bg: canonTheme.color.background, min: 4.5, use: "oro viejo sobre fondo" },
  { fg: canonTheme.color.onAccent, bg: canonTheme.color.gold[400], min: 4.5, use: "texto sobre boton de oro" },
  { fg: canonTheme.color.onAccent, bg: canonTheme.color.neon[500], min: 4.5, use: "texto sobre boton neon" },
];

/** Serializa el tema a variables CSS `--canon-*`. */
export function toCssVariables(theme: Theme, prefix = "canon"): string {
  const rows: string[] = [];
  const push = (name: string, value: string) => rows.push(`  --${prefix}-${name}: ${value};`);
  push("bg", theme.color.background);
  push("surface", theme.color.surface);
  push("surface-alt", theme.color.surfaceAlt);
  push("border", theme.color.border);
  push("text", theme.color.textPrimary);
  push("text-muted", theme.color.textSecondary);
  push("on-accent", theme.color.onAccent);
  push("danger", theme.color.danger);
  push("warning", theme.color.warning);
  push("info", theme.color.info);
  Object.entries(theme.color.neon).forEach(([k, v]) => push(`neon-${k}`, v));
  Object.entries(theme.color.violet).forEach(([k, v]) => push(`violet-${k}`, v));
  Object.entries(theme.color.gold).forEach(([k, v]) => push(`gold-${k}`, v));
  return rows.join("\n");
}
