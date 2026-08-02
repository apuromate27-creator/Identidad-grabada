
import { Header, Footer, WhatsAppFloat, InfoBox } from "../components/ui";
import { InternalPageHero } from "../components/InternalPageHero";

export default function Nosotros() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-nosotros v184-internal-page">
      <Header />

      <section className="v184-page-shell">
        <InternalPageHero
          eyebrow="Nosotros"
          title="Grabados personalizados con identidad"
          text="Creamos mates y regalos personalizados con tecnología láser, cuidando cada detalle del diseño y la terminación."
          actionHref="/trabajos"
          actionLabel="Ver trabajos"
        />

        <div className="v184-info-grid">
          <InfoBox title="Ubicación" text="General Las Heras, Buenos Aires" />
          <InfoBox title="Especialidad" text="Mates personalizados" />
          <InfoBox title="Alcance" text="Envíos a toda Argentina" />
        </div>

        <div className="v184-story-grid">
          <article>
            <p>Nuestra forma de trabajar</p>
            <h2>Diseño aprobado antes de grabar.</h2>
            <span>
              Cada pieza comienza con una idea. Preparamos una propuesta,
              confirmamos el diseño con el cliente y recién después iniciamos la producción.
            </span>
          </article>

          <article>
            <p>Nuestro diferencial</p>
            <h2>Atención directa en todo el proceso.</h2>
            <span>
              Acompañamos cada pedido desde la elección del producto hasta la entrega final.
            </span>
          </article>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
