# Identidad Grabada — Plan maestro V16

## Implementado en V16.1

- Base modular para componentes `Cards` y `Sections`.
- Datos de categorías separados del diseño.
- Carrusel horizontal de tipos de mates.
- Flechas laterales en computadora.
- Deslizamiento táctil en celular.
- Scroll con ajuste automático por tarjeta.
- Preparado para agregar categorías sin rediseñar la sección.

## Próximas mejoras registradas

1. Página Productos con:
   - encabezado premium;
   - beneficios superiores;
   - filtros por categoría;
   - ordenamiento;
   - franja inferior de confianza.

2. Hero con carrusel automático de promociones:
   - imágenes editables;
   - textos, botones y enlaces configurables;
   - avance automático;
   - controles manuales;
   - adaptación para celular.

3. Seguimiento privado:
   - número de compra + email o código seguro;
   - sin pedidos de ejemplo visibles;
   - transportista y código de seguimiento;
   - enlace a Andreani o Correo Argentino;
   - arquitectura preparada para integración por API.

4. Panel privado de administración de pedidos.

## Principio de la V16

Mantener todas las funciones estables y reemplazar progresivamente la presentación por componentes reutilizables, sin rehacer la tienda completa en cada fase.


## Implementado en V16.2

- Encabezado premium en la página Productos.
- Beneficios superiores.
- Buscador de productos.
- Filtros por categoría.
- Ordenamiento.
- Contador de resultados.
- Grilla adaptable de hasta cuatro columnas.
- Franja inferior de confianza.
- Estados vacíos y controles adaptados a celular.


## Implementado en V16.3

- Hero con carrusel automático.
- Cuatro diapositivas configurables.
- Avance automático cada siete segundos.
- Flechas laterales.
- Indicadores inferiores y barra de progreso.
- Botón para pausar y reanudar.
- Pausa al apoyar el mouse o enfocar controles.
- Deslizamiento táctil en celular.
- Compatibilidad con reducción de movimiento.
- Banners editables desde `public/banners`.
- Textos y enlaces configurables desde `app/data/heroSlides.ts`.
