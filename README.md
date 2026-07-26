# Identidad Grabada V16.4 — Seguimiento privado

Esta versión parte de V16.3 y reemplaza la página de seguimiento pública por una consulta privada.

## Incluye

- Número de compra + email.
- Cada cliente ve únicamente su pedido.
- Estado actual.
- Línea de avance completa.
- Fecha estimada de entrega.
- Transportista.
- Código de seguimiento.
- Botón externo para Andreani o Correo Argentino.
- Diseño transparente y consistente con la V16.

## Datos de prueba

- Pedido: `IG-1032`
- Email: `cliente@ejemplo.com`

## Importante

Esta versión implementa la interfaz y el flujo de prueba. Para usar pedidos reales todavía hace falta:

- base de datos;
- panel administrativo;
- autenticación o token seguro;
- integración oficial con los transportistas.

## Archivos principales

- `app/seguimiento/page.tsx`
- `app/components/Sections/PrivateOrderTracking.tsx`
- `app/data/orderTracking.ts`

## Probar localmente

```bash
npm install
npm run dev
```

Abrir:

`http://localhost:3000/seguimiento`
