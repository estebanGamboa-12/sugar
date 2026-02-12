export default function Dock() {
  return (
    <nav className="fixed bottom-4 left-1/2 z-50 w-[min(96vw,560px)] -translate-x-1/2 rounded-full border border-white/20 bg-black/70 p-2 backdrop-blur-md">
      <ul className="grid grid-cols-3 gap-2 text-center text-[10px] uppercase tracking-[0.22em] text-white/86">
        <li>
          <a data-cursor="link" data-magnet href="#about" className="block rounded-full py-3 transition hover:bg-white/10">
            Brand
          </a>
        </li>
        <li>
          <a data-cursor="link" data-magnet href="#faq" className="block rounded-full py-3 transition hover:bg-white/10">
            Reservar
          </a>
        </li>
        <li>
          <a data-cursor="link" data-magnet href="#menu" className="block rounded-full py-3 transition hover:bg-white/10">
            Carta / Encargar
          </a>
        </li>
      </ul>
    </nav>
  );
}
