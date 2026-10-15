/**
 * VERDE VIVO · design tokens
 *
 * Tokens tipados del sistema visual verde del ecosistema Belentani.
 * Este modulo no importa React ni CSS: es la unica fuente de verdad y
 * permite validar contraste y jerarquia en los tests, sin navegador.
 *
 * Contraste verificado (WCAG 2.1) con `contrastRatio()` en `design-tokens.test.ts`.
 */

export type ColorScale = {
  50: string; 100: string; 200: string; 300: string;
  400: string; 500: string; 600: string; 700: string;
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
    accent: ColorScale;
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

/** Escala esmeralda: de mas claro (050) a mas profundo (700). */
export const emerald: ColorScale = {
  50: "#EEFFF6",
  100: "#D6FFEA",
  200: "#B9FFDD",
  300: "#6FF5B4",
  400: "#34F58F",
  500: "#00E676",
  600: "#00B85C",
  700: "#00874A",
};

export const verdeVivoDark: Theme = {
  name: "verde-vivo",
  mode: "dark",
  color: {
    background: "#04150D",
    surface: "#08281A",
    surfaceAlt: "#0B2418",
    border: "#00E67633",
    textPrimary: "#EAFBF2",
    textSecondary: "#A9D9C2",
    accent: emerald,
    onAccent: "#04150D",
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
    soft: "0 8px 30px -12px rgb(0 230 118 / 0.25)",
    glow: "0 0 0 1px rgb(0 230 118 / 0.20), 0 18px 50px -20px rgb(0 230 118 / 0.45)",
    glowStrong: "0 0 0 1px rgb(0 230 118 / 0.35), 0 30px 80px -24px rgb(0 230 118 / 0.70)",
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

/**
 * Contraste WCAG 2.1. Acepta `#rgb`, `#rrggbb`.
 * Implementacion propia para no depender de jsdom ni de dependencias.
 */
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

/** Pares de color que deben cumplir WCAG, por uso real en la interfaz. */
export const requiredPairs: Array<{ fg: string; bg: string; min: number; use: string }> = [
  { fg: verdeVivoDark.color.textPrimary, bg: verdeVivoDark.color.background, min: 7, use: "cuerpo de texto sobre fondo" },
  { fg: verdeVivoDark.color.textSecondary, bg: verdeVivoDark.color.background, min: 4.5, use: "texto secundario" },
  { fg: verdeVivoDark.color.accent[500], bg: verdeVivoDark.color.background, min: 4.5, use: "acento sobre fondo (links, iconos)" },
  { fg: verdeVivoDark.color.accent[400], bg: verdeVivoDark.color.background, min: 4.5, use: "acento brillante sobre fondo" },
  { fg: verdeVivoDark.color.onAccent, bg: verdeVivoDark.color.accent[500], min: 4.5, use: "texto sobre boton primario" },
  { fg: verdeVivoDark.color.background, bg: verdeVivoDark.color.accent[500], min: 4.5, use: "texto dentro de un badge de acento" },
  { fg: verdeVivoDark.color.accent[500], bg: verdeVivoDark.color.surface, min: 4.5, use: "acento sobre superficie elevada" },
];

/** Serializa el tema a variables CSS `var(--verde-*)` para pegar en un .css. */
export function toCssVariables(theme: Theme, prefix = "verde"): string {
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
  Object.entries(theme.color.accent).forEach(([k, v]) => push(`accent-${k}`, v));
  return rows.join("\n");
}
