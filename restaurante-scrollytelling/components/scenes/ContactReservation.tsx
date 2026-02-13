"use client";

import { useState } from "react";
import { CONTACT } from "../../data/contact";

export default function ContactReservation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    date: "",
    time: "",
    guests: "2",
    message: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: integrar con API o servicio de reservas
    console.log("Reserva:", formData);
    setFormData({ name: "", email: "", date: "", time: "", guests: "2", message: "" });
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <section
      data-contact
      id="reservar"
      className="relative w-full overflow-hidden bg-[#faf8f5] pb-24"
    >
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-0 lg:grid-cols-2">
        <div className="order-2 flex flex-col justify-center px-6 py-16 lg:order-1 lg:px-16 lg:py-24">
          <h2 className="font-serif text-[clamp(2rem,5vw,3.5rem)] font-medium tracking-tight text-[#0a0a0a]">
            Reserva tu mesa
          </h2>
          <p className="mt-4 text-sm text-[#0a0a0a]/60">
            Completa el formulario y te confirmaremos en menos de 24h.
          </p>

          <form onSubmit={handleSubmit} className="mt-10 flex flex-col gap-5">
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
              <div>
                <label htmlFor="name" className="mb-1 block text-xs uppercase tracking-wider text-[#0a0a0a]/60">
                  Nombre
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  required
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Tu nombre"
                  className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-2 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="email" className="mb-1 block text-xs uppercase tracking-wider text-[#0a0a0a]/60">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="tu@email.com"
                  className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-2 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 gap-5 sm:grid-cols-3">
              <div>
                <label htmlFor="date" className="mb-1 block text-xs uppercase tracking-wider text-[#0a0a0a]/60">
                  Fecha
                </label>
                <input
                  id="date"
                  name="date"
                  type="date"
                  required
                  value={formData.date}
                  onChange={handleChange}
                  className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-2 text-[#0a0a0a] focus:border-[#0a0a0a] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="time" className="mb-1 block text-xs uppercase tracking-wider text-[#0a0a0a]/60">
                  Hora
                </label>
                <input
                  id="time"
                  name="time"
                  type="time"
                  required
                  value={formData.time}
                  onChange={handleChange}
                  className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-2 text-[#0a0a0a] focus:border-[#0a0a0a] focus:outline-none"
                />
              </div>
              <div>
                <label htmlFor="guests" className="mb-1 block text-xs uppercase tracking-wider text-[#0a0a0a]/60">
                  Comensales
                </label>
                <select
                  id="guests"
                  name="guests"
                  value={formData.guests}
                  onChange={handleChange}
                  className="w-full border-b border-[#0a0a0a]/20 bg-transparent py-2 text-[#0a0a0a] focus:border-[#0a0a0a] focus:outline-none"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8].map((n) => (
                    <option key={n} value={n}>
                      {n} {n === 1 ? "persona" : "personas"}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="message" className="mb-1 block text-xs uppercase tracking-wider text-[#0a0a0a]/60">
                Comentarios
              </label>
              <textarea
                id="message"
                name="message"
                rows={3}
                value={formData.message}
                onChange={handleChange}
                placeholder="Alergias, celebraciones, preferencias..."
                className="w-full resize-none border-b border-[#0a0a0a]/20 bg-transparent py-2 text-[#0a0a0a] placeholder:text-[#0a0a0a]/40 focus:border-[#0a0a0a] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              className="mt-4 w-fit rounded-full bg-[#0a0a0a] px-10 py-3 font-medium uppercase tracking-[0.2em] text-[#faf8f5] transition hover:bg-[#1a1a1a]"
            >
              Enviar reserva
            </button>
          </form>
        </div>

        <div className="order-1 flex flex-col lg:order-2">
          <div className="aspect-4/3 w-full overflow-hidden lg:aspect-auto lg:h-full lg:min-h-[500px]">
            <iframe
              src={CONTACT.mapEmbed}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del restaurante"
              className="h-full w-full"
            />
          </div>
          <div className="border-t border-[#0a0a0a]/10 bg-[#f6f1e9] px-6 py-8 lg:px-12">
            <h3 className="font-serif text-xl font-medium text-[#0a0a0a]">{CONTACT.name}</h3>
            <p className="mt-2 text-sm text-[#0a0a0a]/70">{CONTACT.address}</p>
            <p className="mt-1 text-sm text-[#0a0a0a]/70">{CONTACT.hours}</p>
            <a
              href={`tel:${CONTACT.phone.replace(/\s/g, "")}`}
              className="mt-2 inline-block text-sm font-medium text-[#0a0a0a] hover:underline"
            >
              {CONTACT.phone}
            </a>
            <a
              href={`mailto:${CONTACT.email}`}
              className="mt-1 block text-sm font-medium text-[#0a0a0a] hover:underline"
            >
              {CONTACT.email}
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
