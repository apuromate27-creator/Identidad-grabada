
import { NextResponse } from "next/server";

type CartItem = {
  name: string;
  quantity: number;
  priceValue?: number;
  price?: string;
  personalization?: string;
};

export async function POST(request: Request) {
  try {
    const accessToken = process.env.MERCADO_PAGO_ACCESS_TOKEN;
    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000";

    if (!accessToken) {
      return NextResponse.json(
        { error: "Falta configurar MERCADO_PAGO_ACCESS_TOKEN en Vercel." },
        { status: 500 }
      );
    }

    const body = await request.json();
    const items = (body.items || []) as CartItem[];
    const customer = body.customer || {};

    if (!items.length) {
      return NextResponse.json({ error: "El carrito está vacío." }, { status: 400 });
    }

    const mpItems = items.map((item) => ({
      title: item.name,
      description: item.personalization
        ? `Grabado: ${item.personalization}`
        : "Producto personalizado",
      quantity: Number(item.quantity || 1),
      currency_id: "ARS",
      unit_price: Number(item.priceValue && item.priceValue > 0 ? item.priceValue : 1),
    }));

    const preference = {
      items: mpItems,
      payer: {
        name: customer.name || "",
        phone: {
          number: customer.phone || "",
        },
        address: {
          street_name: customer.address || "",
        },
      },
      back_urls: {
        success: `${siteUrl}/pago/exito`,
        failure: `${siteUrl}/pago/error`,
        pending: `${siteUrl}/pago/pendiente`,
      },
      auto_return: "approved",
      external_reference: `IG-${Date.now()}`,
      statement_descriptor: "IDENTIDAD GRABADA",
      metadata: {
        customer,
        note: "Pedido creado desde la tienda Identidad Grabada",
      },
    };

    const response = await fetch("https://api.mercadopago.com/checkout/preferences", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${accessToken}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(preference),
    });

    const data = await response.json();

    if (!response.ok) {
      return NextResponse.json(
        {
          error: "Mercado Pago rechazó la preferencia.",
          detail: data,
        },
        { status: response.status }
      );
    }

    return NextResponse.json({
      id: data.id,
      init_point: data.init_point,
      sandbox_init_point: data.sandbox_init_point,
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: "No se pudo crear la preferencia de pago.",
        detail: String(error),
      },
      { status: 500 }
    );
  }
}
