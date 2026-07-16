
import Link from "next/link";
import { Header, Footer, WhatsAppFloat } from "../../components/ui";

export default function PaymentStatusPage() {
  return (
    <main className="min-h-screen bg-[#050505] text-white">
      <Header />
      <section className="max-w-4xl mx-auto px-6 py-24 text-center">
        <div className="bg-[#0b0b0b] border border-white/10 rounded-[3rem] p-10">
          <div className="text-6xl mb-6">✅</div>
          <h1 className="text-5xl font-black mb-5">Pago aprobado</h1>
          <p className="text-zinc-400 text-lg mb-8">Tu pago fue procesado correctamente. Coordinaremos el diseño y la producción.</p>
          <Link href="/productos" className="bg-[#b68b52] px-8 py-5 rounded-2xl font-black">
            Volver a la tienda
          </Link>
        </div>
      </section>
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
