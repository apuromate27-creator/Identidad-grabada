
"use client";
import {useCart}from"./CartContext";
import {whatsappLink}from"../data/contact";
export function SmartWhatsAppButton(){const{items,totalItems,totalValue}=useCart();const text=items.length===0?"Hola, quiero consultar por un grabado personalizado.":`Hola, quiero consultar por este pedido:\n\n${items.map(i=>`• ${i.name}\nCantidad: ${i.quantity}${i.personalization?`\nGrabado: ${i.personalization}`:""}`).join("\n\n")}\n\nTotal: ${totalValue>0?`$${totalValue.toLocaleString("es-AR")}`:"A coordinar"}`;return <a href={whatsappLink(text)} className="block text-center bg-green-700 text-white rounded-2xl py-4 font-black hover:bg-green-600">Consultar por WhatsApp {totalItems>0?`(${totalItems})`:""}</a>}
