
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { PremiumHero } from "./components/PremiumHero";
import { PremiumHomeSections } from "./components/PremiumSections";
import { CategoryShowcase } from "./components/CategoryShowcase";
import { BrandStory } from "./components/BrandStory";
import { SocialProof } from "./components/SocialProof";
import { TrustStrip } from "./components/TrustStrip";
import { CommercialSections } from "./components/CommercialSections";
import { BackgroundSection } from "./components/BackgroundSection";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#21150e] text-white">
      <Header overlay />
      <PremiumHero />

      <BackgroundSection
        image="/backgrounds/categorias.jpg"
        overlay="bg-[#2b1b11]/34"
        position="center"
      >
        <TrustStrip />
        <CategoryShowcase />
      </BackgroundSection>

      <BackgroundSection
        image="/backgrounds/productos.jpg"
        overlay="bg-[#21140d]/48"
        position="center"
      >
        <PremiumHomeSections />
      </BackgroundSection>

      <BackgroundSection
        image="/backgrounds/historia.jpg"
        overlay="bg-[#1d130d]/38"
        position="center"
      >
        <BrandStory />
      </BackgroundSection>

      <BackgroundSection
        image="/backgrounds/testimonios.jpg"
        overlay="bg-[#2a1b12]/44"
        position="center"
      >
        <SocialProof />
      </BackgroundSection>

      <BackgroundSection
        image="/backgrounds/laser.jpg"
        overlay="bg-[#24150d]/42"
        position="center"
      >
        <CommercialSections />
      </BackgroundSection>

      <BackgroundSection
        image="/backgrounds/footer.jpg"
        overlay="bg-[#1d130d]/48"
        position="center"
      >
        <Footer />
      </BackgroundSection>

      <WhatsAppFloat />
    </main>
  );
}
