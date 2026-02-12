"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 -z-10 bg-[#0a0a0a] px-6 pb-10 pt-14 text-[#f6ecdf] md:px-12 md:pb-14 md:pt-20">
      <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-[1.2fr_0.8fr] md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.36em] text-[#c7a27d]">The Visit</p>
          <h2 className="mt-4 font-[family-name:var(--font-display-serif)] text-[clamp(3.1rem,8vw,7rem)] leading-[0.88]">
            SWEET LAB
            <br />
            BARCELONA
          </h2>
          <p className="mt-5 max-w-xl text-sm text-[#f6ecdf]/72 md:text-base">
            Carrer de la Brisa 21 · Born District · Miércoles a Domingo · 08:00 — 21:00.
          </p>

          <div className="mt-8 overflow-hidden rounded-[1.8rem] border border-white/15">
            <div className="flex h-48 items-center justify-center bg-[radial-gradient(circle_at_25%_20%,#39281d_0%,#1b1512_40%,#100d0c_100%)] text-center md:h-56">
              <p className="text-sm uppercase tracking-[0.22em] text-[#f0d8bf]/70">Mapa sensorial / Google Maps Embed</p>
            </div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.7 }}
          className="flex flex-col items-start justify-end gap-6"
        >
          <a href="mailto:reservas@thesugarlab.com" className="text-lg text-[#f9e7d3] underline-offset-4 hover:underline">
            reservas@thesugarlab.com
          </a>
          <a href="tel:+34930111222" className="text-lg text-[#f9e7d3] underline-offset-4 hover:underline">
            +34 930 111 222
          </a>
          <button className="min-h-12 rounded-full border border-[#e3ba8c]/60 px-9 text-sm uppercase tracking-[0.24em] text-[#fbe8d4] transition hover:bg-[#f2c490] hover:text-[#18120f]">
            Reservar
          </button>
        </motion.div>
      </div>
    </footer>
  );
}
