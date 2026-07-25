# Identidad Grabada V15.5 — Fondos individuales transparentes

Esta versión conserva el Hero y la Home aprobados, y aplica el mismo lenguaje transparente a todas las páginas internas.

## Funcionamiento

Cada página toma su fondo desde un archivo distinto en:

`public/backgrounds/`

Archivos editables:

- `inicio.jpg`
- `productos.jpg`
- `producto-detalle.jpg`
- `trabajos.jpg`
- `empresas.jpg`
- `nosotros.jpg`
- `seguimiento.jpg`
- `contacto.jpg`
- `checkout.jpg`
- `pago.jpg`

Para cambiar un fondo:

1. Prepará una imagen JPG horizontal.
2. Poné exactamente el mismo nombre del archivo correspondiente.
3. Reemplazá el archivo dentro de `public/backgrounds`.
4. Subí el cambio a GitHub.
5. Vercel hará el nuevo despliegue automáticamente.

## Diseño

- Fondos a pantalla completa.
- Paneles marrones translúcidos.
- Efecto de vidrio.
- Degradado cálido común.
- Textos legibles sin ocultar el paisaje.
- Fondo fijo en computadora.
- Adaptación para celular.
- El Hero conserva su imagen independiente.

## Probar localmente

```bash
npm install
npm run dev
```

Abrir:

`http://localhost:3000`
