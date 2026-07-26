
export type ProductSpecification = {
  label: string;
  value: string;
};

export type Product = {
  slug: string;
  name: string;
  category: string;
  categoryLabel: string;
  material: string;
  price: string;
  priceValue: number;
  compareAtPrice?: string;
  installmentText?: string;
  badge: string;
  shortDescription: string;
  description: string;
  features: string[];
  gallery: string[];
  related: string[];
  featured: boolean;
  bestSeller: boolean;
  stock: string;
  tags: string[];

  sku: string;
  brand: string;
  productionTime: string;
  engravingArea: string;
  specifications: ProductSpecification[];
  care: string[];
  shippingNotes: string[];
};

const base = [
  ["imperial-calabaza", "Mate Imperial de Calabaza", "imperiales", "Mates Imperiales", "Calabaza natural con virola premium", "Clásico premium", true, true, ["imperial", "calabaza", "premium"]],
  ["imperial-algarrobo", "Mate Imperial de Algarrobo", "imperiales", "Mates Imperiales", "Algarrobo con terminación premium", "Elegante", true, false, ["imperial", "algarrobo", "madera"]],
  ["camionero-calabaza", "Mate Camionero de Calabaza", "camioneros", "Mates Camioneros", "Calabaza natural", "Tradicional", true, true, ["camionero", "calabaza"]],
  ["camionero-algarrobo", "Mate Camionero de Algarrobo", "camioneros", "Mates Camioneros", "Algarrobo artesanal", "Robusto", false, false, ["camionero", "algarrobo"]],
  ["torpedo-liso", "Mate Torpedo Liso", "torpedos", "Mates Torpedo", "Modelo torpedo liso", "Minimalista", false, false, ["torpedo", "liso"]],
  ["torpedo-cincelado", "Mate Torpedo Cincelado", "torpedos", "Mates Torpedo", "Torpedo con detalles cincelados", "Producto premium", true, true, ["torpedo", "cincelado", "premium"]],
  ["ranchero-algarrobo", "Mate Ranchero de Algarrobo", "rancheros", "Mates Rancheros", "Algarrobo artesanal", "Artesanal", false, false, ["ranchero", "algarrobo"]],
];

export const products: Product[] = base.map(
  ([slug, name, category, categoryLabel, material, badge, featured, bestSeller, tags], index) => ({
    slug,
    name,
    category,
    categoryLabel,
    material,
    price: "Consultar",
    priceValue: 0,
    badge,
    featured,
    bestSeller,
    tags: tags as string[],
    stock: "Disponible a pedido",
    shortDescription: `${name} preparado para grabado láser personalizado.`,
    description: `${name} con terminación premium. Ideal para personalizar con nombres, iniciales, frases o logos mediante grabado láser.`,
    features: [
      "Grabado láser personalizado",
      "Confirmación del diseño antes de grabar",
      "Producción artesanal",
      "Ideal para regalo",
      "Embalaje cuidado",
      "Envíos a toda Argentina",
    ],
    gallery: ["1", "2", "3", "4"],
    related: ["imperial-calabaza", "torpedo-cincelado", "camionero-calabaza"].filter(
      (item) => item !== slug
    ),

    sku: `IG-${String(index + 101).padStart(4, "0")}`,
    brand: "Identidad Grabada",
    productionTime: "2 a 5 días hábiles",
    engravingArea: "A confirmar según diseño y modelo",
    specifications: [
      { label: "Material", value: String(material) },
      { label: "Categoría", value: String(categoryLabel) },
      { label: "Personalización", value: "Nombre, frase, fecha, iniciales o logo" },
      { label: "Técnica", value: "Grabado láser de alta precisión" },
      { label: "Origen", value: "Hecho en Argentina" },
      { label: "Entrega", value: "Embalaje protegido y envío coordinado" },
    ],
    care: [
      "No utilizar productos abrasivos sobre la zona grabada.",
      "Secar completamente después de cada limpieza.",
      "En modelos de calabaza, realizar el curado antes del primer uso.",
      "Evitar golpes directos sobre virolas y terminaciones.",
    ],
    shippingNotes: [
      "Envíos a toda Argentina.",
      "El costo y el plazo dependen del código postal.",
      "El seguimiento se informa cuando el pedido es despachado.",
      "También puede coordinarse retiro, cuando esté disponible.",
    ],
  })
) as Product[];

export const categories = [
  { id: "todos", label: "Todos", href: "/productos" },
  { id: "imperiales", label: "Imperiales", href: "/productos/categoria/imperiales" },
  { id: "camioneros", label: "Camioneros", href: "/productos/categoria/camioneros" },
  { id: "torpedos", label: "Torpedos", href: "/productos/categoria/torpedos" },
  { id: "rancheros", label: "Rancheros", href: "/productos/categoria/rancheros" },
];

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getRelatedProducts(slugs: string[]) {
  return products.filter((product) => slugs.includes(product.slug));
}

export function getCategoryLabel(category: string) {
  return categories.find((item) => item.id === category)?.label || category;
}
