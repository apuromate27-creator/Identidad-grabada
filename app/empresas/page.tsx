
import Link from "next/link";
import { Header, Footer, WhatsAppFloat, InfoBox } from "../components/ui";
import { InternalPageHero } from "../components/InternalPageHero";

export default function EmpresasPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-empresas v184-internal-page">
      <Header />

      <section className="v184-page-shell">
        <InternalPageHero
          eyebrow="Empresas"
          title="Regalos empresariales personalizados"
          text="Soluciones para pedidos por cantidad, regalos corporativos, souvenirs y productos con logo."
          actionHref="/contacto"
          actionLabel="Solicitar cotización"
        />

        <div className="v184-info-grid">
          <InfoBox title="Logos empresariales" text="Grabado de marca en mates y regalos." />
          <InfoBox title="Pedidos por cantidad" text="Cotización personalizada según volumen." />
          <InfoBox title="Presentación premium" text="Ideal para clientes, equipos y eventos." />
        </div>

        <div className="v184-cta-panel">
          <div>
            <p>Propuestas corporativas</p>
            <h2>¿Querés cotizar para tu empresa?</h2>
            <span>Enviá tu idea, logo y cantidad aproximada.</span>
          </div>

          <Link href="/contacto">Solicitar cotización →</Link>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
