
import Link from "next/link";
import { Title } from "./ui";

export function CommercialSections() {
  return (
    <>
      <section id="como-trabajamos" className="border-y border-white/10 bg-[#2a1b12] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Title
            eyebrow="Experiencia personalizada"
            title="De tu idea al producto terminado"
            text="Un proceso claro para que puedas aprobar el diseño antes de la producción."
          />

          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            <Step n="01" title="Elegís el producto" text="Seleccionás el modelo que mejor se adapta a tu idea." />
            <Step n="02" title="Nos enviás el diseño" text="Nombre, frase, logo o imagen de referencia." />
            <Step n="03" title="Aprobás la vista previa" text="Confirmamos posición, tamaño y terminación." />
            <Step n="04" title="Grabamos y enviamos" text="Control de calidad y despacho coordinado." />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-24">
        <div className="grid gap-8 lg:grid-cols-[1.05fr_.95fr]">
          <div className="rounded-[3rem] border border-white/10 bg-[#2d1d13] p-10 md:p-14">
            <p className="text-sm uppercase tracking-[0.3em] text-[#d6b17a]">Confianza</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">Comprá con tranquilidad.</h2>
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              <Trust title="Diseño confirmado" text="No grabamos hasta que apruebes la propuesta." />
              <Trust title="Producción cuidada" text="Terminaciones revisadas antes del despacho." />
              <Trust title="Atención directa" text="Contacto por WhatsApp durante todo el proceso." />
              <Trust title="Envíos nacionales" text="Coordinamos entregas a toda Argentina." />
            </div>
          </div>

          <div className="rounded-[3rem] bg-[#b68b52] p-10 text-black md:p-14">
            <p className="text-sm font-bold uppercase tracking-[0.3em]">Empresas</p>
            <h2 className="mt-4 text-4xl font-black md:text-6xl">Regalos corporativos con identidad.</h2>
            <p className="mt-5 text-lg text-black/70">
              Productos personalizados para clientes, equipos, eventos y acciones de marca.
            </p>
            <Link
              href="/empresas"
              className="mt-8 inline-block rounded-2xl bg-[#1d130d] px-8 py-5 font-black text-white"
            >
              Solicitar cotización
            </Link>
          </div>
        </div>
      </section>

      <section className="border-y border-white/10 bg-[#281a11] py-24">
        <div className="mx-auto max-w-7xl px-6">
          <Title
            eyebrow="Preguntas frecuentes"
            title="Todo lo que necesitás saber"
            text="Respuestas rápidas antes de realizar tu pedido."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2">
            <Faq q="¿Puedo enviar mi propio logo?" a="Sí. Podés enviarlo junto con el pedido y coordinamos la adaptación para grabado." />
            <Faq q="¿Cuánto demora la producción?" a="Habitualmente entre 2 y 5 días hábiles después de aprobar el diseño." />
            <Faq q="¿Hacen envíos a todo el país?" a="Sí. Coordinamos el medio de envío según tu localidad." />
            <Faq q="¿Puedo ver el diseño antes de grabar?" a="Sí. Siempre enviamos una vista previa para confirmar los detalles." />
          </div>
        </div>
      </section>
    </>
  );
}

function Step({ n, title, text }: { n: string; title: string; text: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#1d130d]/40 p-6">
      <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#b68b52] font-black">
        {n}
      </div>
      <h3 className="mt-5 text-2xl font-black">{title}</h3>
      <p className="mt-3 text-zinc-500">{text}</p>
    </div>
  );
}

function Trust({ title, text }: { title: string; text: string }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-[#1d130d]/40 p-5">
      <p className="font-black text-[#d6b17a]">✓ {title}</p>
      <p className="mt-2 text-sm text-zinc-500">{text}</p>
    </div>
  );
}

function Faq({ q, a }: { q: string; a: string }) {
  return (
    <div className="rounded-[2rem] border border-white/10 bg-[#2d1d13] p-6">
      <h3 className="text-xl font-black">{q}</h3>
      <p className="mt-3 text-zinc-500">{a}</p>
    </div>
  );
}
