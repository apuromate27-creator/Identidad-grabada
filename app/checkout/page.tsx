import {Header,Footer,WhatsAppFloat,Title}from"../components/ui";
import {CheckoutForm}from"./CheckoutForm";
export default function CheckoutPage(){return <main className="min-h-screen bg-[#050505] text-white"><Header/><section className="max-w-7xl mx-auto px-6 py-20"><Title eyebrow="Checkout" title="Finalizar compra" text="Completá tus datos, elegí envío y forma de pago."/><div className="mt-12"><CheckoutForm/></div></section><Footer/><WhatsAppFloat/></main>}
