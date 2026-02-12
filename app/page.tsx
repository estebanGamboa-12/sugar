import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuChapters from "@/components/MenuChapters";
import SmoothScroll from "@/components/SmoothScroll";
import Visit from "@/components/Visit";

export default function Page() {
  return (
    <SmoothScroll>
      <main className="overflow-x-clip bg-cream text-cocoa">
        <Hero />
        <MenuChapters />
        <BentoGrid />
        <Visit />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
