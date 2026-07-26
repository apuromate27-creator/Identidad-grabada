# Identidad Grabada V16.1

Primera etapa de la nueva arquitectura V16.

## Incluye

- Carrusel premium de colecciones en el inicio.
- Imperiales, Camioneros, Torpedos, Rancheros, Algarrobo y Calabaza.
- Flechas laterales en computadora.
- Deslizamiento horizontal con el dedo en celular.
- Tarjetas grandes, fotográficas y enlazadas a cada colección.
- Datos separados en `app/data/categories.ts`.
- Nuevas carpetas:
  - `app/components/Cards`
  - `app/components/Sections`

## Agregar una categoría

Editá:

`app/data/categories.ts`

Copiá un objeto existente y cambiá:

- `number`
- `title`
- `eyebrow`
- `description`
- `href`
- `image`
- `position`

La nueva tarjeta aparecerá automáticamente en el carrusel.

## Probar localmente

```bash
npm install
npm run dev
```

Abrir:

`http://localhost:3000`
