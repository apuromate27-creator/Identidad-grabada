
import {
  Header,
  Footer,
  WhatsAppFloat,
} from "../components/ui";
import { CheckoutForm } from "./CheckoutForm";

export default function CheckoutPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-checkout">
      <Header />

      <section className="mx-auto max-w-[1320px] px-5 pb-20 pt-12 md:px-6 md:pt-16">
        <p className="text-xs uppercase tracking-[0.3em] text-[#e2b46d]">
          Compra segura
        </p>
        <h1 className="mt-3 font-serif text-4xl text-white md:text-6xl">
          Finalizar compra
        </h1>
        <p className="mt-4 max-w-2xl leading-relaxed text-stone-300">
          Revisá tu pedido, completá los datos de entrega y elegí la forma de pago.
        </p>

        <div className="mt-10">
          <CheckoutForm />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
