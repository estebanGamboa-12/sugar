import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuChapters from "@/components/MenuChapters";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/SmoothScroll";
import Visit from "@/components/Visit";

export default function Page() {
  return (
    <SmoothScroll>
      <Preloader />
      <main className="overflow-x-clip bg-black text-[#F1F1F1]">
        <Hero />
        <MenuChapters />
        <BentoGrid />
        <Visit />
        <Footer />
      </main>
    </SmoothScroll>
  );
}
