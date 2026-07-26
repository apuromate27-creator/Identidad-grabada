
import { Header, Footer, WhatsAppFloat } from "../components/ui";
import { PrivateOrderTracking } from "../components/Sections/PrivateOrderTracking";

export default function SeguimientoPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-seguimiento">
      <Header />

      <section className="mx-auto max-w-7xl px-6 pb-20 pt-16 md:pt-20">
        <p className="text-sm uppercase tracking-[0.32em] text-[#e2b46d]">
          Seguimiento privado
        </p>

        <h1 className="mt-4 font-serif text-5xl leading-tight text-white md:text-7xl">
          Seguimiento de pedidos
        </h1>

        <p className="mt-5 max-w-3xl text-lg leading-relaxed text-stone-200">
          Cada cliente accede únicamente a su compra y puede consultar producción, despacho y envío desde un solo lugar.
        </p>

        <div className="mt-10">
          <PrivateOrderTracking />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
