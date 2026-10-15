# belentani-core

> Núcleo técnico del ecosistema Belentani: el design system 3D + motion que sirve de
> base a portfolio, landing y producto.

[![CI](https://github.com/belentani7/belentani-core/actions/workflows/ci.yml/badge.svg)](https://github.com/belentani7/belentani-core/actions/workflows/ci.yml)
[![Build](https://github.com/belentani7/belentani-core/actions/workflows/build.yml/badge.svg)](https://github.com/belentani7/belentani-core/actions/workflows/build.yml)
[![Licencia: MIT](https://img.shields.io/badge/License-MIT-00E676.svg)](./LICENSE)
[![Seguridad](https://img.shields.io/badge/security--policy-brightgreen.svg)](./SECURITY.md)

## Qué es

Un paquete de **Next.js 15 + React 19** que concentra el lenguaje visual del ecosistema:

- **Three.js + React Three Fiber + Drei** para superficies 3D reutilizables
- **`@react-three/postprocessing`** para Bloom selectivo y efectos de imagen
- **GSAP** para timelines y microinteracciones
- **Lenis** para scroll suave con control de rendimiento
- **Tailwind** con tokens centralizados

No es una app de ejemplo: es la capa de la que beben los proyectos que necesitan
"algo que se vea bien en 3D sin reescribir el motor".

## Por qué existe

Cada proyecto del ecosistema (portfolio, hub de artista, CAD, campus) necesitaba 3D,
motion y scroll. Duplicarlo en 7 repositorios producía inconsistencia visual y coste
de mantenimiento. `belentani-core` es la respuesta: **una implementación, muchos
consumidores**.

## Puesta en marcha

```bash
pnpm install        # package manager declarado del repo
pnpm dev            # next dev
pnpm build          # next build
pnpm lint           # eslint
pnpm test           # vitest
```

## Estructura

```
src/        componentes, tokens y utilidades (el corazón del design system)
tests/      tests unitarios con Vitest
next.config.ts    configuración de Next.js
tailwind.config.ts tokens y tema
vitest.config.ts  runner de tests
vercel.json / netlify.toml / wrangler.toml   targets de despliegue
```

## Despliegue

El repositorio incluye workflows para **Vercel**, **Netlify** y **Cloudflare Pages**
(`deploy-vercel.yml`, `deploy-netlify.yml`, `deploy-cloudflare.yml`) además del build de
producción. El destino se decide en el entorno, no en el código.

## Variables de entorno

Copia `.env.example` a `.env`. **Nunca se versiona un secreto.** Ver
[`SECURITY.md`](./SECURITY.md).

## Estado

Activo. El CI corre lint + typecheck + tests + build en cada push; los tres targets de
despliegue se ejecutan en `main`.

## Licencia

[MIT](./LICENSE) · [`CONTRIBUTING.md`](./CONTRIBUTING.md) · [`SECURITY.md`](./SECURITY.md)

<sub>El núcleo del ecosistema · by <a href="https://github.com/belentani7">@belentani7</a></sub>
