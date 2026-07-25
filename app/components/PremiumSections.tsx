
import Link from "next/link";
import { ProductCard } from "./ProductCard";
import { ImageSlot, Title } from "./ui";
import { products } from "../data/products";

export function PremiumHomeSections() {
  const featured = products.filter((product) => product.featured).slice(0, 3);
  return (
    <>
      <section className="border-b border-white/10 bg-transparent">
        <div className="max-w-7xl mx-auto px-6 py-5 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 text-center text-sm text-zinc-300">
          <p>🎁 Personalizados a tu medida</p>
          <p>✦ Grabados de alta precisión</p>
          <p>🏅 Materiales premium</p>
          <p>🚚 Envíos a toda Argentina</p>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="flex items-end justify-between gap-6 mb-12">
          <Title eyebrow="Colección destacada" title="Mates elegidos para regalar" text="Modelos premium preparados para personalizar con nombres, frases, iniciales o logos." />
          <Link href="/productos" className="hidden md:block border border-white/10 px-6 py-4 rounded-2xl font-bold hover:border-[#b68b52] transition">Ver catálogo completo</Link>
        </div>
        <div className="grid md:grid-cols-3 gap-8">{featured.map((product) => <ProductCard key={product.slug} product={product} />)}</div>
      </section>

      <section className="border-y border-white/10 bg-[#2a1a10]/45 py-24">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div className="min-h-[560px] rounded-[3rem] overflow-hidden border border-white/10 bg-[#1d130d]/45"><ImageSlot title="Proceso de grabado láser" /></div>
          <div className="space-y-7">
            <p className="text-[#d6b17a] uppercase tracking-[0.3em] text-sm">Cómo trabajamos</p>
            <h2 className="text-5xl md:text-6xl font-black leading-tight">Cada detalle se confirma antes de grabar.</h2>
            <p className="text-zinc-400 text-lg leading-relaxed">El cliente elige el producto, nos envía su idea y recibe una vista previa antes de la producción.</p>
            <div className="grid gap-4">
              <Step n="01" title="Elegís el producto" text="Seleccionás el modelo que querés personalizar." />
              <Step n="02" title="Nos enviás la idea" text="Nombre, frase, logo o imagen de referencia." />
              <Step n="03" title="Aprobás el diseño" text="Coordinamos todos los detalles antes de grabar." />
              <Step n="04" title="Grabamos y enviamos" text="Producción cuidada y entrega coordinada." />
            </div>
            <Link href="/trabajos" className="inline-block bg-[#b68b52] px-8 py-5 rounded-2xl font-black">Ver trabajos realizados</Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <Title eyebrow="Materiales" title="Elegí el mate ideal para vos" text="Cada material tiene una estética, un peso y una experiencia de uso diferente." />
        <div className="grid lg:grid-cols-2 gap-8 mt-12">
          <Material title="Calabaza natural" text="El clásico argentino. Cada pieza es única y desarrolla su propio carácter con el uso." items={["Aspecto tradicional","Pieza única","Ideal para regalo premium"]} />
          <Material title="Algarrobo" text="Madera resistente, cálida y durable, ideal para quienes buscan bajo mantenimiento." items={["Alta durabilidad","Fácil cuidado","Terminación artesanal"]} />
        </div>
      </section>

      <section className="bg-[#2a1a10]/45 border-y border-white/10 py-24">
        <div className="max-w-7xl mx-auto px-6">
          <Title eyebrow="Comparador" title="¿Qué modelo elegir?" text="Una guía simple para encontrar el mate que mejor se adapte al uso y al tipo de regalo." />
          <div className="overflow-x-auto mt-12 border border-white/10 rounded-[2rem]">
            <table className="w-full min-w-[760px] text-left">
              <thead className="bg-[#1d130d]/45/60"><tr>{["Modelo","Material","Tamaño","Ideal para","Personalización"].map(x=><th key={x} className="px-6 py-5 text-[#d6b17a]">{x}</th>)}</tr></thead>
              <tbody className="divide-y divide-white/10">
                <Row model="Imperial" material="Calabaza o algarrobo" size="Grande" use="Regalo premium" />
                <Row model="Camionero" material="Calabaza o algarrobo" size="Mediano" use="Uso diario" />
                <Row model="Torpedo" material="Liso o cincelado" size="Compacto" use="Diseño moderno" />
                <Row model="Ranchero" material="Algarrobo" size="Mediano" use="Estilo artesanal" />
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-[#b68b52] text-black rounded-[3rem] p-10 md:p-14">
            <p className="uppercase tracking-[0.3em] text-sm font-bold">Empresas</p>
            <h2 className="text-5xl font-black mt-4">Regalos corporativos con identidad.</h2>
            <p className="text-black/70 text-lg mt-5">Mates, souvenirs y productos personalizados con logo para clientes, equipos y eventos.</p>
            <Link href="/empresas" className="inline-block mt-8 bg-[#1d130d]/45 text-white px-8 py-5 rounded-2xl font-black">Ver propuestas para empresas</Link>
          </div>
          <div className="bg-[#2a1a10]/45 border border-white/10 rounded-[3rem] p-10 md:p-14">
            <p className="uppercase tracking-[0.3em] text-sm text-[#d6b17a]">Seguimiento</p>
            <h2 className="text-5xl font-black mt-4">Consultá el avance de tu pedido.</h2>
            <p className="text-zinc-400 text-lg mt-5">Revisá si el diseño está en preparación, producción o listo para despacho.</p>
            <Link href="/seguimiento" className="inline-block mt-8 border border-white/10 px-8 py-5 rounded-2xl font-black hover:border-[#b68b52]">Seguir mi pedido</Link>
          </div>
        </div>
      </section>
    </>
  );
}

function Step({n,title,text}:{n:string;title:string;text:string}) {
  return <div className="grid grid-cols-[64px_1fr] gap-4 border border-white/10 rounded-2xl p-5 bg-[#1d130d]/45/30"><div className="w-12 h-12 rounded-full bg-[#b68b52] flex items-center justify-center font-black">{n}</div><div><h3 className="font-black text-xl">{title}</h3><p className="text-zinc-500 mt-1">{text}</p></div></div>;
}
function Material({title,text,items}:{title:string;text:string;items:string[]}) {
  return <div className="bg-[#2a1a10]/45 border border-white/10 rounded-[3rem] overflow-hidden"><div className="h-80"><ImageSlot title={title} /></div><div className="p-8"><h3 className="text-4xl font-black">{title}</h3><p className="text-zinc-400 text-lg mt-4">{text}</p><div className="grid gap-3 mt-6">{items.map(i=><p key={i} className="text-zinc-300"><span className="text-[#d6b17a] mr-3">✓</span>{i}</p>)}</div></div></div>;
}
function Row({model,material,size,use}:{model:string;material:string;size:string;use:string}) {
  return <tr className="bg-[#2a1a10]/45"><td className="px-6 py-5 font-black">{model}</td><td className="px-6 py-5 text-zinc-400">{material}</td><td className="px-6 py-5 text-zinc-400">{size}</td><td className="px-6 py-5 text-zinc-400">{use}</td><td className="px-6 py-5 text-[#d6b17a]">Disponible</td></tr>;
}
