import { Header, Footer, WhatsAppFloat } from "./components/ui";
import { HeroV182 } from "./components/Sections/HeroV182";
import { HomeV181 } from "./components/HomeV181";

export default function Home() {
  return (
    <main className="v1811-home-page min-h-screen overflow-hidden text-white">
      <div className="v1811-global-background" aria-hidden="true" />
      <div className="v1811-global-overlay" aria-hidden="true" />
      <div className="relative z-10"><Header overlay /><HeroV182 /><HomeV181 /><Footer /></div>
      <WhatsAppFloat />
    </main>
  );
}
