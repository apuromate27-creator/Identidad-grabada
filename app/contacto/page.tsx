
import { Header, Footer, WhatsAppFloat, InfoBox } from "../components/ui";
import { InternalPageHero } from "../components/InternalPageHero";
import { contact, whatsappLink } from "../data/contact";

export default function ContactPage() {
  return (
    <main className="min-h-screen text-white ig-page-background ig-page-contacto v184-internal-page">
      <Header />

      <section className="v184-page-shell">
        <InternalPageHero
          eyebrow="Contacto"
          title="Hablemos de tu diseño"
          text="Escribinos por WhatsApp o seguinos en Instagram para comenzar tu próximo producto personalizado."
        />

        <div className="v184-contact-grid">
          <div className="v184-contact-panel">
            <InfoBox title="Ubicación" text={contact.city} />
            <InfoBox title="WhatsApp" text={contact.whatsappLabel} />
            <InfoBox title="Instagram" text={`@${contact.instagram}`} />
          </div>

          <div className="v184-contact-panel v184-contact-action">
            <p>Consulta rápida</p>
            <h2>Contanos qué querés grabar.</h2>
            <span>
              Podemos ayudarte a elegir producto, tamaño, ubicación y estilo del diseño.
            </span>

            <a
              href={whatsappLink(
                "Hola, vi la página web y quiero consultar por un grabado personalizado."
              )}
            >
              Consultar por WhatsApp →
            </a>
          </div>
        </div>
      </section>

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
