import BentoGrid from "@/components/BentoGrid";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import MenuSection from "@/components/MenuSection";
import Preloader from "@/components/Preloader";
import Visit from "@/components/Visit";

export default function Page() {
  return (
    <>
      <Preloader />
      <main className="overflow-x-clip bg-black text-[#F1F1F1]">
        <Hero />
        <MenuSection />
        <BentoGrid />
        <Visit />
        <Footer />
      </main>
    </>
  );
}
