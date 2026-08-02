
import { Header, Footer, WhatsAppFloat } from "../components/ui";
import { ProductCatalog } from "../components/ProductCatalog";
import { StoreBenefits } from "../components/Sections/StoreBenefits";
import { InternalPageHero } from "../components/InternalPageHero";

export default function ProductsPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-productos v184-internal-page">
      <Header />

      <section className="v184-page-shell">
        <InternalPageHero
          eyebrow="Catálogo completo"
          title="Nuestros productos"
          text="Explorá mates y regalos personalizados preparados para grabar nombres, frases, fechas o logos con precisión láser."
        />

        <ProductCatalog />
      </section>

      <section className="v184-page-shell v184-benefits-section">
        <StoreBenefits />
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
