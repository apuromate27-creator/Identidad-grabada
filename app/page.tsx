
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { PremiumHero } from "./components/PremiumHero";
import { PremiumHomeSections } from "./components/PremiumSections";
import { CommercialSections } from "./components/CommercialSections";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Header />
      <PremiumHero />
      <PremiumHomeSections />
      <CommercialSections />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
