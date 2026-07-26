
export type HeroSlide = {
  id: string;
  image: string;
  eyebrow: string;
  title: string;
  accent: string;
  description: string;
  note?: string;
  primaryLabel: string;
  primaryHref: string;
  secondaryLabel?: string;
  secondaryHref?: string;
  imagePosition?: string;
};

export const heroSlides: HeroSlide[] = [
  {
    id: "principal",
    image: "/banners/hero-principal.png",
    eyebrow: "Grabados láser premium",
    title: "Tu historia,",
    accent: "grabada para siempre.",
    description:
      "Regalos personalizados con tecnología láser y materiales de primera calidad.",
    note: "Hecho en Argentina, para regalar o regalarte.",
    primaryLabel: "Ver catálogo",
    primaryHref: "/productos",
    secondaryLabel: "Diseñar mi producto",
    secondaryHref: "/contacto",
    imagePosition: "center",
  },
  {
    id: "oferta-kit",
    image: "/banners/oferta-01.png",
    eyebrow: "Promoción destacada",
    title: "Kits materos",
    accent: "listos para regalar.",
    description:
      "Combiná mate, termo y accesorios con personalización incluida.",
    note: "Promoción por tiempo limitado.",
    primaryLabel: "Ver kits",
    primaryHref: "/productos",
    secondaryLabel: "Consultar oferta",
    secondaryHref: "/contacto",
    imagePosition: "center",
  },
  {
    id: "personalizacion",
    image: "/banners/oferta-02.png",
    eyebrow: "Diseños únicos",
    title: "Personalizá",
    accent: "cada detalle.",
    description:
      "Elegí nombres, frases, fechas o logos y aprobá el diseño antes de grabar.",
    note: "Vista previa antes de producir.",
    primaryLabel: "Elegir producto",
    primaryHref: "/productos",
    secondaryLabel: "Hablar por WhatsApp",
    secondaryHref: "/contacto",
    imagePosition: "center",
  },
  {
    id: "empresas",
    image: "/banners/empresas.png",
    eyebrow: "Regalos empresariales",
    title: "Tu marca,",
    accent: "grabada con identidad.",
    description:
      "Propuestas personalizadas para clientes, equipos, eventos y empresas.",
    note: "Atención para pedidos corporativos.",
    primaryLabel: "Ver empresas",
    primaryHref: "/empresas",
    secondaryLabel: "Solicitar propuesta",
    secondaryHref: "/contacto",
    imagePosition: "center",
  },
];
