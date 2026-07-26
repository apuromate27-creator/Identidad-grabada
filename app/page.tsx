
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { HeroCarousel } from "./components/Sections/HeroCarousel";
import { PremiumHomeSections } from "./components/PremiumSections";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { BrandStory } from "./components/BrandStory";
import { SocialProof } from "./components/SocialProof";
import { TrustStrip } from "./components/TrustStrip";
import { CommercialSections } from "./components/CommercialSections";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#21150e] text-white">
      <Header overlay />
      <HeroCarousel />

      <div className="v15-home-continuity">
        <div className="v15-home-overlay" />
        <div className="relative z-10">
          <CategoryShowcase />

          <PremiumHomeSections />

          <BrandStory />

          <SocialProof />

          <CommercialSections />

          <div className="v15-trust-transition v16-trust-bottom">
            <TrustStrip />
          </div>
          <Footer />
        </div>
      </div>

      <WhatsAppFloat />
    </main>
  );
}
