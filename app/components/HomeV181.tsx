
import Link from "next/link";
import { products } from "../data/products";

const categories = [
  {
    title: "Mates personalizados",
    text: "Imperiales, camioneros y torpedos preparados para grabar nombres, frases o logos.",
    href: "/productos",
    image: "/hero/hero-productos-limpio.jpg",
    icon: "◉",
  },
  {
    title: "Regalos únicos",
    text: "Diseños pensados para cumpleaños, aniversarios, empresas y momentos especiales.",
    href: "/trabajos",
    image: "/backgrounds/trabajos.jpg",
    icon: "✦",
  },
  {
    title: "Empresas",
    text: "Regalos corporativos y producciones por cantidad con identidad de marca.",
    href: "/empresas",
    image: "/backgrounds/empresas.jpg",
    icon: "◇",
  },
];

const benefits = [
  ["▤", "6 cuotas sin interés", "Con tarjetas seleccionadas"],
  ["⌁", "Pagos seguros", "Mercado Pago"],
  ["✎", "Diseño personalizado", "Aprobación antes de grabar"],
  ["□", "Regalo listo", "Presentación cuidada"],
  ["AR", "Hecho en Argentina", "Producción nacional"],
];

export function HomeV181() {
  const featured = products.filter((product) => product.featured).slice(0, 3);

  return (
    <section className="v181-home">
      <div className="v181-home-bg" />
      <div className="v181-home-overlay" />

      <div className="v181-shell">
        <div className="v181-section-heading">
          <span />
          <div>
            <p>Elegí lo que más te representa</p>
            <h2>Categorías destacadas</h2>
          </div>
          <span />
        </div>

        <div className="v181-category-grid">
          {categories.map((category) => (
            <Link
              key={category.title}
              href={category.href}
              className="v181-category-card"
            >
              <div
                className="v181-category-photo"
                style={{ backgroundImage: `url("${category.image}")` }}
              />
              <div className="v181-category-shade" />

              <span className="v181-category-icon">{category.icon}</span>

              <div className="v181-category-copy">
                <h3>{category.title}</h3>
                <p>{category.text}</p>
                <span className="v181-category-cta">
                  Ver productos <b>→</b>
                </span>
              </div>
            </Link>
          ))}
        </div>

        <div className="v181-benefit-strip">
          {benefits.map(([icon, title, text]) => (
            <div key={title} className="v181-benefit-item">
              <span>{icon}</span>
              <div>
                <strong>{title}</strong>
                <small>{text}</small>
              </div>
            </div>
          ))}
        </div>

        <div className="v181-section-heading v181-products-heading">
          <span />
          <div>
            <p>Selección premium</p>
            <h2>Productos destacados</h2>
          </div>
          <span />
        </div>

        <div className="v181-products-grid">
          {featured.map((product, index) => (
            <Link
              href={`/productos/${product.slug}`}
              key={product.slug}
              className="v181-product-card"
            >
              <div
                className="v181-product-photo"
                style={{
                  backgroundImage: `url("${
                    index === 0
                      ? "/hero/hero-productos-limpio.jpg"
                      : index === 1
                      ? "/backgrounds/categorias.jpg"
                      : "/backgrounds/laser.jpg"
                  }")`,
                }}
              />
              <div className="v181-product-shade" />

              <div className="v181-product-top">
                <span>{product.badge}</span>
                {product.bestSeller && <b>Más vendido</b>}
              </div>

              <div className="v181-product-copy">
                <p>{product.categoryLabel}</p>
                <h3>{product.name}</h3>
                <small>{product.shortDescription}</small>

                <div>
                  <strong>{product.price}</strong>
                  <span>Ver producto →</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="v181-story-panel">
          <div>
            <p className="v181-kicker">Identidad Grabada</p>
            <h2>Diseñamos piezas que cuentan historias.</h2>
            <p>
              Cada producto se prepara con atención personalizada, materiales
              seleccionados y una propuesta de grabado aprobada antes de producir.
            </p>
          </div>

          <div className="v181-story-actions">
            <Link href="/nosotros">Conocé nuestra historia</Link>
            <Link href="/contacto">Diseñá tu producto</Link>
          </div>
        </div>
      </div>
    </section>
  );
}
