
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { PremiumHero } from "./components/PremiumHero";
import { PremiumHomeSections } from "./components/PremiumSections";

export default function Home() {
  return (
    <main className="min-h-screen bg-[#050505] text-white overflow-hidden">
      <Header />
      <PremiumHero />
      <PremiumHomeSections />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
