
export type StoreCategory = {
  number: string;
  title: string;
  eyebrow: string;
  description: string;
  href: string;
  image: string;
  position: string;
};

export const storeCategories: StoreCategory[] = [
  {
    number: "01",
    title: "Imperiales",
    eyebrow: "Clásicos premium",
    description:
      "Presencia, tradición y una gran superficie para crear grabados únicos.",
    href: "/productos/categoria/imperiales",
    image: "/backgrounds/categorias.jpg",
    position: "center 42%",
  },
  {
    number: "02",
    title: "Camioneros",
    eyebrow: "Tradición cotidiana",
    description:
      "Cómodos, resistentes y pensados para acompañarte todos los días.",
    href: "/productos/categoria/camioneros",
    image: "/backgrounds/categorias.jpg",
    position: "68% 50%",
  },
  {
    number: "03",
    title: "Torpedos",
    eyebrow: "Diseño contemporáneo",
    description:
      "Líneas modernas y terminaciones que resaltan cada personalización.",
    href: "/productos/categoria/torpedos",
    image: "/backgrounds/categorias.jpg",
    position: "38% 55%",
  },
  {
    number: "04",
    title: "Rancheros",
    eyebrow: "Espíritu artesanal",
    description:
      "Madera cálida, carácter argentino y una estética bien tradicional.",
    href: "/productos/categoria/rancheros",
    image: "/backgrounds/categorias.jpg",
    position: "78% 45%",
  },
  {
    number: "05",
    title: "Algarrobo",
    eyebrow: "Madera noble",
    description:
      "Durabilidad, calidez y bajo mantenimiento para disfrutar todos los días.",
    href: "/productos?material=algarrobo",
    image: "/backgrounds/categorias.jpg",
    position: "56% 48%",
  },
  {
    number: "06",
    title: "Calabaza",
    eyebrow: "Tradición argentina",
    description:
      "Piezas únicas, naturales y con carácter propio que mejora con el uso.",
    href: "/productos?material=calabaza",
    image: "/backgrounds/categorias.jpg",
    position: "28% 50%",
  },
];
