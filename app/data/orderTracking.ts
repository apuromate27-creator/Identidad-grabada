
export type OrderStep = {
  id: string;
  label: string;
  description: string;
  completed: boolean;
  current?: boolean;
  date?: string;
};

export type TrackingOrder = {
  orderNumber: string;
  accessEmail: string;
  customerName: string;
  productName: string;
  orderDate: string;
  estimatedDelivery: string;
  statusLabel: string;
  carrier?: "andreani" | "correo-argentino";
  trackingCode?: string;
  carrierUrl?: string;
  steps: OrderStep[];
};

export const demoTrackingOrders: TrackingOrder[] = [
  {
    orderNumber: "IG-1032",
    accessEmail: "cliente@ejemplo.com",
    customerName: "Cliente de prueba",
    productName: "Mate Torpedo Cincelado",
    orderDate: "24/07/2026",
    estimatedDelivery: "Entre 30/07 y 02/08",
    statusLabel: "En producción",
    carrier: "andreani",
    trackingCode: "AND-IG1032-DEMO",
    carrierUrl: "https://www.andreani.com/",
    steps: [
      {
        id: "received",
        label: "Pedido recibido",
        description: "Registramos tu compra correctamente.",
        completed: true,
        date: "24/07",
      },
      {
        id: "design",
        label: "Diseño confirmado",
        description: "El diseño fue aprobado antes de grabar.",
        completed: true,
        date: "25/07",
      },
      {
        id: "production",
        label: "En producción",
        description: "Estamos preparando y grabando tu producto.",
        completed: false,
        current: true,
      },
      {
        id: "dispatch",
        label: "Preparando despacho",
        description: "Embalaje, control final y asignación de transporte.",
        completed: false,
      },
      {
        id: "shipped",
        label: "En camino",
        description: "El transportista ya recibió el paquete.",
        completed: false,
      },
      {
        id: "delivered",
        label: "Entregado",
        description: "El pedido llegó a destino.",
        completed: false,
      },
    ],
  },
];
