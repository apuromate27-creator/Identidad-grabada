
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { PremiumHero } from "./components/PremiumHero";
import { PremiumHomeSections } from "./components/PremiumSections";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { BrandStory } from "./components/BrandStory";
import { SocialProof } from "./components/SocialProof";
import { TrustStrip } from "./components/TrustStrip";
import { CommercialSections } from "./components/CommercialSections";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Header />
      <PremiumHero />
      <TrustStrip />
      <CategoryShowcase />
      <PremiumHomeSections />
      <BrandStory />
      <SocialProof />
      <CommercialSections />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
