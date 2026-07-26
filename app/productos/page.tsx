
import { Header, Footer, WhatsAppFloat } from "../components/ui";
import { ProductCatalog } from "../components/ProductCatalog";
import { StoreBenefits } from "../components/Sections/StoreBenefits";

export default function ProductsPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-productos">
      <Header />

      <section className="mx-auto max-w-[1500px] px-6 pb-20 pt-16 md:pt-20">
        <nav className="text-sm text-stone-300" aria-label="Migas de pan">
          <a href="/" className="transition hover:text-[#e2b46d]">
            Inicio
          </a>
          <span className="mx-3">›</span>
          <span>Productos</span>
        </nav>

        <div className="mt-6 max-w-3xl">
          <p className="text-sm uppercase tracking-[0.32em] text-[#e2b46d]">
            Catálogo completo
          </p>

          <h1 className="mt-4 font-serif text-5xl leading-tight text-white md:text-7xl">
            Nuestros productos
          </h1>

          <p className="mt-5 max-w-2xl text-lg leading-relaxed text-stone-200">
            Explorá mates y regalos personalizados preparados para grabar nombres, frases, fechas o logos con precisión láser.
          </p>
        </div>

        <ProductCatalog />
      </section>

      <section className="mx-auto max-w-[1500px] px-6 pb-20">
        <StoreBenefits />
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
