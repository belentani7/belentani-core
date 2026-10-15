# CANON · sistema de diseno del universo Belentani

Tokens, jerarquia y reglas de accesibilidad del sistema visual. **Rojo neon, oro viejo, negro y
violeta**, con cristal facetado. Esta paleta es canonica: no se sustituye por otra, se ordena.

---

## 1. Los cuatro materiales

| Material | Token | Valor | Papel |
|---|---|---|---|
| **Negro** | `--canon-bg` | `#050505` | Fondo profundo. Nunca gris puro |
| **Violeta** | `--canon-violet-*` | `#7A2BFF` a `#9B5CFF` | Espiritual y datos: superficies, grid, estados |
| **Rojo neon** | `--canon-neon-*` | `#FF073A` | Energia y accion: CTA, foco, alerta |
| **Oro viejo** | `--canon-gold-*` | `#D4AF37` | Detalle y valor: enlaces, insignias, metricas |

Regla de reparto: **un acento por intencion**. Si dos elementos compiten por la misma atencion, uno
baja a violeta.

## 2. Contraste verificado (WCAG 2.1)

Los ratios estan **calculados y comprobados por test** (`src/canon-tokens.test.ts`), no estimados:

| Uso | fg / bg | Ratio | Minimo |
|---|---|---|---|
| Cuerpo de texto | `#F5F0FF` / `#050505` | **18.24:1** | 7 (AAA) |
| Texto secundario | `#B9A8D9` / `#050505` | **9.38:1** | 4.5 (AA) |
| Texto sobre superficie | `#F5F0FF` / `#0E0A16` | **17.50:1** | 4.5 (AA) |
| Rojo neon sobre fondo | `#FF073A` / `#050505` | **5.19:1** | 4.5 (AA) |
| Rojo neon sobre superficie | `#FF073A` / `#0E0A16` | **4.98:1** | 4.5 (AA) |
| Violeta sobre fondo | `#9B5CFF` / `#050505` | **5.21:1** | 4.5 (AA) |
| Oro viejo sobre fondo | `#D4AF37` / `#050505` | **9.69:1** | 4.5 (AA) |
| Texto sobre boton de oro | `#050505` / `#D4AF37` | **9.69:1** | 4.5 (AA) |
| Texto sobre boton neon | `#050505` / `#FF073A` | **5.19:1** | 4.5 (AA) |

**El dato que hay que recordar**: el rojo neon puro sobre negro da **5.19:1**, justo por encima de
AA. Es un acento de energia, no un color de texto largo. Para texto sobre el neon, el relleno
correcto es el negro: **5.19:1**. El blanco sobre `#FF073A` daria 3.3:1 y suspenderia.

Ese es el mismo tipo de trampa que hace fallar las paletas elegidas por ojo, y por eso aqui lo
comprueba un test en CI.

## 3. Cristal facetado

La superficie no es un cristal redondeado generico, es **facetado**: gradiente diagonal de violeta
profundo a negro, con brillo en la arista superior izquierda y rebote violeta en la inferior
derecha (`.facet::after`). Sin desenfoque en superficies grandes: `backdrop-filter` solo en paneles,
nunca a pantalla completa.

## 4. Movimiento

| Token | Valor | Uso |
|---|---|---|
| `--dur-fast` | `180ms` | Hover, foco, microinteraccion |
| `--dur-base` | `420ms` | Entradas, transiciones de seccion |
| `--dur-slow` | `900ms` | Narrativa de scroll, revelados |

Curva de salida: `cubic-bezier(0.16, 1, 0.3, 1)`: respuesta inmediata, llegada suave.
`prefers-reduced-motion` desactiva animaciones y scroll suave por completo.

## 5. Accesibilidad

- `focus-visible` con anillo violeta de 2px, por encima de AA en contraste y en superficie
- Insignias con fondo translucido y **texto claro**, no color saturado sobre negro
- Targets de 44px o mas
- Modo claro pendiente: el canon es intrinsecamente oscuro, asi que el modo claro se define por
  proyecto en lugar de forzarse aqui

## 6. Como se aplica

```html
<html data-theme="canon">
```

Sin el atributo el sitio usa el tema actual: la adopcion es gradual, componente a componente, y
revertir es quitar un atributo.

## 7. Siguientes pasos

1. Migrar `Hero.tsx`, `Missions.tsx`, `Arsenal.tsx`, `Portals.tsx` y `Repos.tsx` a `.btn-primary`,
   `.badge`, `.glass-panel` y `.facet`
2. Reescribir `NeuralCore.tsx` con la paleta canon y bloom selectivo
3. Transiciones de scroll con `ScrollTrigger` respetando `prefers-reduced-motion`
4. Presupuesto de Lighthouse en CI con objetivo >= 95
