
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { HeroV176 } from "./components/Sections/HeroV176";
import { PremiumHomeSections } from "./components/PremiumSections";
import { BrandStory } from "./components/BrandStory";
import { SocialProof } from "./components/SocialProof";
import { CommercialSections } from "./components/CommercialSections";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#100b08] text-white">
      <Header overlay />
      <HeroV176 />

      <div className="v15-home-continuity">
        <div className="v15-home-overlay" />
        <div className="relative z-10">
          <PremiumHomeSections />
          <BrandStory />
          <SocialProof />
          <CommercialSections />
          <Footer />
        </div>
      </div>

      <WhatsAppFloat />
    </main>
  );
}
