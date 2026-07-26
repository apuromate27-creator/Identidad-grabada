
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  Header,
  Footer,
  WhatsAppFloat,
} from "../../components/ui";
import { ProductCard } from "../../components/ProductCard";
import { ProductDetailExperience } from "../../components/ProductDetailExperience";
import {
  getProductBySlug,
  getRelatedProducts,
  products,
} from "../../data/products";

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  return product
    ? {
        title: `${product.name} | Identidad Grabada`,
        description: product.shortDescription,
      }
    : {};
}

export default function ProductPage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug);

  if (!product) notFound();

  const related = getRelatedProducts(product.related);

  return (
    <main className="min-h-screen text-white ig-page-background ig-page-producto">
      <Header />

      <section className="mx-auto max-w-[1320px] px-5 pb-16 pt-10 md:px-6 md:pt-12">
        <nav className="mb-7 flex flex-wrap items-center gap-2 text-sm text-stone-400">
          <Link href="/" className="transition hover:text-[#e2b46d]">
            Inicio
          </Link>
          <span>›</span>
          <Link
            href="/productos"
            className="transition hover:text-[#e2b46d]"
          >
            Productos
          </Link>
          <span>›</span>
          <span className="text-stone-200">{product.name}</span>
        </nav>

        <ProductDetailExperience product={product} />
      </section>

      {related.length > 0 && (
        <section className="mx-auto max-w-[1320px] px-5 pb-20 md:px-6">
          <div className="mb-8 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="text-xs uppercase tracking-[0.28em] text-[#e2b46d]">
                Recomendados
              </p>
              <h2 className="mt-2 font-serif text-3xl text-white md:text-4xl">
                También te puede gustar
              </h2>
            </div>

            <Link
              href="/productos"
              className="font-bold text-[#e8c58f] transition hover:text-white"
            >
              Ver catálogo completo →
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {related.map((item) => (
              <ProductCard key={item.slug} product={item} />
            ))}
          </div>
        </section>
      )}

      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
