import {
  canonTheme,
  contrastRatio,
  gold,
  neon,
  relativeLuminance,
  requiredPairs,
  toCssVariables,
  violet,
} from "./canon-tokens.js";

describe("CANON · tokens del sistema visual", () => {
  it("cumple WCAG en cada par de color de uso real", () => {
    const fallos = requiredPairs
      .map((p) => ({ ...p, ratio: contrastRatio(p.fg, p.bg) }))
      .filter((p) => p.ratio < p.min);
    expect(fallos).toEqual([]);
  });

  it("mantiene el cuerpo de texto en nivel AAA", () => {
    expect(
      contrastRatio(canonTheme.color.textPrimary, canonTheme.color.background),
    ).toBeGreaterThanOrEqual(7);
  });

  it("respeta el orden de cada escala de acento", () => {
    for (const escala of [neon, violet, gold]) {
      const claves = [100, 200, 300, 400, 500, 600] as const;
      const luminancias = claves.map((k) => relativeLuminance(escala[k]));
      for (let i = 1; i < luminancias.length; i += 1) {
        expect(luminancias[i]).toBeLessThan(luminancias[i - 1]);
      }
    }
  });

  it("exporta las tres variables de acento del canon", () => {
    const css = toCssVariables(canonTheme);
    expect(css).toContain("--canon-neon-500");
    expect(css).toContain("--canon-violet-400");
    expect(css).toContain("--canon-gold-400");
    expect(css.split("\n").length).toBeGreaterThanOrEqual(24);
  });

  it("declara tipografia y movimiento sin valores vacios", () => {
    expect(canonTheme.typography.display).toBeTruthy();
    expect(canonTheme.motion.duration.base).toMatch(/ms$/);
    expect(canonTheme.motion.easing.emphasized).toContain("cubic-bezier");
  });
});
