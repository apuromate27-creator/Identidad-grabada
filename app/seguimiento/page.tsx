
import { Header, Footer, WhatsAppFloat } from "../components/ui";
import { PrivateOrderTracking } from "../components/Sections/PrivateOrderTracking";
import { InternalPageHero } from "../components/InternalPageHero";

export default function SeguimientoPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-seguimiento v184-internal-page">
      <Header />

      <section className="v184-page-shell">
        <InternalPageHero
          eyebrow="Seguimiento privado"
          title="Seguimiento de pedidos"
          text="Cada cliente accede únicamente a su compra y puede consultar producción, despacho y envío desde un solo lugar."
        />

        <div className="v184-tracking-wrap">
          <PrivateOrderTracking />
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
