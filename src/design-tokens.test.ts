import { describe, expect, it } from "vitest";
import {
  contrastRatio,
  emerald,
  relativeLuminance,
  requiredPairs,
  toCssVariables,
  verdeVivoDark,
} from "./design-tokens.js";

describe("VERDE VIVO · design tokens", () => {
  it("cumple WCAG en cada par de color de uso real", () => {
    const fallos = requiredPairs
      .map((p) => ({ ...p, ratio: contrastRatio(p.fg, p.bg) }))
      .filter((p) => p.ratio < p.min);

    expect(fallos).toEqual([]);
  });

  it("mantiene el cuerpo de texto en nivel AAA", () => {
    expect(contrastRatio(verdeVivoDark.color.textPrimary, verdeVivoDark.color.background)).toBeGreaterThanOrEqual(7);
  });

  it("respeta el orden de la escala esmeralda", () => {
    const claves = [50, 100, 200, 300, 400, 500, 600, 700] as const;
    const luminancias = claves.map((k) => relativeLuminance(emerald[k]));
    for (let i = 1; i < luminancias.length; i += 1) {
      expect(luminancias[i]).toBeLessThan(luminancias[i - 1]);
    }
  });

  it("exporta variables CSS completas", () => {
    const css = toCssVariables(verdeVivoDark);
    expect(css).toContain("--verde-accent-500");
    expect(css).toContain("--verde-bg");
    expect(css.split("\n").length).toBeGreaterThanOrEqual(15);
  });

  it("declara escala tipografica y de movimiento sin valores vacios", () => {
    expect(verdeVivoDark.typography.display).toBeTruthy();
    expect(verdeVivoDark.motion.duration.base).toMatch(/ms$/);
    expect(verdeVivoDark.motion.easing.emphasized).toContain("cubic-bezier");
  });
});
