# VERDE VIVO · sistema de diseno

Propuesta y base de implementacion del sistema visual del ecosistema: **verde, luminoso,
positivo y premium**, en sustitucion del neon rojo original (que se conserva intacto bajo
`data-theme="neon"`).

---

## 1. Principio

> El mismo cuidado artistico, con la energia de un estudio abierto en vez de una habitacion
> a oscuras.

El neon rojo comunica urgencia pero agota. El esmeralda comunica **sistema vivo**: crecimiento,
senal clara, confianza. Se mantiene la referencia Cyberpunk/retro-futuro (scanlines, rejilla,
CRT) pero sobre una paleta que se puede mirar dos horas.

## 2. Fundamentos

| Fundamento | decision | Por que |
|---|---|---|
| **Materia** | Fondo `#04150D` (verde casi negro), no `#050505` | Evita el gris puro y da vida al negro |
| **Color** | Esmeralda `#00E676` como unico acento | Un acento = jerarquia sin ruido |
| **Luz** | Dos gradientes radiales fijos, como luz de estudio | Da profundidad sin coste de render |
| **Superficie** | Vidrio esmeralda `rgb(8 40 26 / .72)` + blur | Continuidad con el language glass existente |
| **Tipografia** | Sora (display) + Inter (cuerpo) + JetBrains Mono | Sora es geometrica y distintiva; no es la default del stack |
| **Movimiento** | 180 / 420 / 900 ms + `cubic-bezier(.16,1,.3,1)` | Curva de salida rapida: respuesta inmediata, llegada suave |
| **Forma** | 10 / 18 / 28 px + full | Radios generosos = lenguaje blando frente al neon duro |

## 3. Tokens

Fuente de verdad: **`src/design-tokens.ts`** (tipado). Espejo CSS: **`src/app/verde-vivo.css`**.

```
--verde-bg        #04150D      --verde-accent-500  #00E676
--verde-surface   #08281A      --verde-accent-600  #00B85C
--verde-text      #EAFBF2      --verde-accent-400  #34F58F
--verde-text-muted #A9D9C2     --verde-on-accent   #04150D
```

## 4. Contraste verificado (WCAG 2.1)

Los ratios estan **calculados y comprobados por test** (`src/design-tokens.test.ts`), no estimados:

| Uso | fg / bg | Ratio | Minimo |
|---|---|---|---|
| Cuerpo de texto | `#EAFBF2` / `#04150D` | **17.51:1** | 7 (AAA) |
| Texto secundario | `#A9D9C2` / `#04150D` | **11.98:1** | 4.5 (AA) |
| Acento sobre fondo | `#00E676` / `#04150D` | **11.25:1** | 4.5 (AA) |
| Texto en boton | `#04150D` / `#00E676` | **11.25:1** | 4.5 (AA) |
| Acento sobre superficie | `#00E676` / `#08281A` | **9.47:1** | 4.5 (AA) |

**Decision clave:** texto del boton `#04150D` (11.25:1). La trampa tipica del "verde sobre blanco"
da 2.62:1 — por eso el boton primario es **relleno esmeralda con texto oscuro**, no al reves.

## 5. Accesibilidad

- `focus-visible` con anillo de 2px en `--accent-400` en enlaces, botones y elementos con tabindex
- Targets >= 44px de area interactiva
- `prefers-reduced-motion` desactiva animaciones y transiciones por completo
- Modo claro definido en `prefers-color-scheme: light` con los mismos tokens invertidos
- El contraste se **testea**, no se supone: si alguien cambia un token, el CI lo detecta

## 6. Presupuesto de rendimiento

| Recurso | Presupuesto | Como se cumple |
|---|---|---|
| JS de la escena 3D | lazy + `ssr: false` | Ya en `page.tsx` con `next/dynamic` |
| CSS del tema | < 6 KB sin comprimir | Solo variables y 6 componentes |
| Fuentes | subset latino, `display: swap` | Sin webfont bloqueante |
| Sombras | solo `filter`/`box-shadow`, nunca `filter: blur` en大面积 | `backdrop-filter` limitado a superficies |
| Impresion | 0 request de red adicional | Tokens en CSS puro |

## 7. Como activar / revertir

```html
<!-- layout.tsx -->
<html lang="es" data-theme="verde">   <!-- tema nuevo -->
<html lang="es" data-theme="neon">    <!-- tema original -->
```

Cambiar un atributo revierte todo el sistema visual. Los tokens en TS siguen sirviendo para
validar contraste en ambos temas.

## 8. Siguientes pasos

1. Migrar `Hero.tsx`, `Missions.tsx`, `Arsenal.tsx` y `Portals.tsx` a clases `.btn-primary`, `.badge` y `.glass-panel`
2. Reescribir `NeuralCore.tsx` con paleta esmeralda y bloom selectivo (`@react-three/postprocessing`)
3. Anadir transiciones de scroll con `ScrollTrigger` respetando `prefers-reduced-motion`
4. Budget de Lighthouse en CI (`lighthouserc`) con objetivo >= 95
