import SmoothScroll from "../app/components/ui/SmoothScroll";
import Experience from "../app/components/sections/Experience";

export default function Home() {
  return (
    <SmoothScroll>
      <main className="bg-black">
        {/* Espacio inicial para que el usuario empiece a scrollear */}
        <section className="h-screen flex items-center justify-center">
          <h1 className="text-white text-4xl font-serif italic text-center">
            Bienvenidos a la Experiencia <br/> 
            <span className="text-orange-500 not-italic uppercase tracking-widest text-sm">Desliza para comenzar</span>
          </h1>
        </section>

        <Experience />

        {/* Espacio final para que la última animación se vea completa */}
        <section className="h-screen bg-black" />
      </main>
    </SmoothScroll>
  );
}