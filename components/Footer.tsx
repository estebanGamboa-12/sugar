"use client";

import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="fixed inset-x-0 bottom-0 -z-10 bg-[#0b0b0b] px-5 pb-8 pt-12 text-[#f7f4ef] md:px-12 md:pb-12 md:pt-16">
      <div className="mx-auto grid max-w-6xl gap-10 md:grid-cols-2 md:gap-16">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-[#cba578]">Contacto</p>
          <h2 className="mt-4 font-[family-name:var(--font-display-serif)] text-[clamp(3rem,9vw,7.2rem)] leading-[0.9]">
            SAY HELLO
          </h2>
          <a
            href="mailto:hola@sugarlab.studio"
            className="mt-4 inline-flex min-h-11 items-center text-lg text-[#f0d7b8] underline-offset-4 hover:underline"
          >
            hola@sugarlab.studio
          </a>
        </div>

        <motion.form
          initial={{ opacity: 0, y: 26 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          transition={{ duration: 0.65 }}
          className="space-y-6"
        >
          {[
            { label: "Nombre", type: "text" },
            { label: "Email", type: "email" },
          ].map((field) => (
            <label key={field.label} className="block">
              <span className="text-xs uppercase tracking-[0.22em] text-white/55">{field.label}</span>
              <input
                type={field.type}
                className="mt-3 block min-h-11 w-full border-0 border-b border-white/30 bg-transparent pb-2 text-base outline-none transition-colors duration-300 focus:border-[#d8b58d]"
              />
            </label>
          ))}

          <label className="block">
            <span className="text-xs uppercase tracking-[0.22em] text-white/55">Mensaje</span>
            <textarea
              rows={3}
              className="mt-3 block min-h-11 w-full resize-none border-0 border-b border-white/30 bg-transparent pb-2 text-base outline-none transition-colors duration-300 focus:border-[#d8b58d]"
            />
          </label>

          <button
            type="submit"
            className="inline-flex min-h-11 items-center rounded-full border border-[#d8b58d]/60 px-6 text-sm uppercase tracking-[0.18em] text-[#f0d7b8] transition hover:bg-[#d8b58d] hover:text-black"
          >
            Enviar
          </button>
        </motion.form>
      </div>
    </footer>
  );
}
