
import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { HeroV176 } from "./components/Sections/HeroV176";
import { HomeV181 } from "./components/HomeV181";

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#080706] text-white">
      <Header overlay />
      <HeroV176 />
      <HomeV181 />
      <Footer />
      <WhatsAppFloat />
    </main>
  );
}
