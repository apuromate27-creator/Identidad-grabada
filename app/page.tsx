
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
    <main className="min-h-screen overflow-hidden bg-[#050505] text-white">
      <Header />
      <PremiumHero />

      <BackgroundSection image="/backgrounds/categorias.jpg" overlay="bg-black/62">
        <TrustStrip />
        <CategoryShowcase />
      </BackgroundSection>

      <BackgroundSection image="/backgrounds/productos.jpg" overlay="bg-black/74">
        <PremiumHomeSections />
      </BackgroundSection>

      <BackgroundSection image="/backgrounds/historia.jpg" overlay="bg-black/64">
        <BrandStory />
      </BackgroundSection>

      <BackgroundSection image="/backgrounds/testimonios.jpg" overlay="bg-black/72">
        <SocialProof />
      </BackgroundSection>

      <BackgroundSection image="/backgrounds/laser.jpg" overlay="bg-black/68">
        <CommercialSections />
      </BackgroundSection>

      <BackgroundSection image="/backgrounds/footer.jpg" overlay="bg-black/80">
        <Footer />
      </BackgroundSection>

      <WhatsAppFloat />
    </main>
  );
}
