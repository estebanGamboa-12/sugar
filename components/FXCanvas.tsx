"use client";

import { forwardRef, useEffect, useImperativeHandle, useRef } from "react";

export type FXCanvasHandle = {
  setScene: (index: number) => void;
  setIntensity: (value: number) => void;
  setPointer: (x: number, y: number) => void;
  tick: (time: number) => void;
};

type FXCanvasProps = {
  disabled?: boolean;
  className?: string;
};

type DustParticle = { x: number; y: number; vx: number; vy: number; life: number; size: number };

const PARTICLE_COUNT = 90;

const FXCanvas = forwardRef<FXCanvasHandle, FXCanvasProps>(function FXCanvas({ disabled = false, className = "" }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sceneRef = useRef(0);
  const intensityRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const timeRef = useRef(0);
  const particlesRef = useRef<DustParticle[]>([]);

  useImperativeHandle(ref, () => ({
    setScene(index) {
      sceneRef.current = index;
    },
    setIntensity(value) {
      intensityRef.current = Math.max(0, Math.min(1, value));
    },
    setPointer(x, y) {
      pointerRef.current = { x, y, active: true };
    },
    tick(time) {
      timeRef.current = time;
    },
  }));

  useEffect(() => {
    if (disabled) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particlesRef.current = Array.from({ length: PARTICLE_COUNT }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0008,
        vy: (Math.random() - 0.5) * 0.0008,
        life: Math.random(),
        size: 1 + Math.random() * 2,
      }));
    };

    const drawDust = (w: number, h: number, intensity: number) => {
      const pointer = pointerRef.current;
      const particles = particlesRef.current;
      ctx.save();
      ctx.globalCompositeOperation = "screen";
      for (const p of particles) {
        p.life += 0.006;
        p.x += p.vx + (pointer.active ? (pointer.x - p.x) * 0.0006 * intensity : 0);
        p.y += p.vy + (pointer.active ? (pointer.y - p.y) * 0.0006 * intensity : 0);

        if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1 || p.life > 1.2) {
          p.x = Math.random();
          p.y = Math.random();
          p.life = 0;
        }

        const alpha = Math.max(0, 0.16 * (1 - p.life) * intensity);
        ctx.fillStyle = `rgba(255,244,224,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    };

    const drawSteam = (w: number, h: number, intensity: number, t: number) => {
      const steamH = h * 0.36;
      const y = h * 0.08;
      const wave = Math.sin(t * 0.0018) * 14;
      const grad = ctx.createLinearGradient(0, y, 0, y + steamH);
      grad.addColorStop(0, `rgba(255,255,255,${0.1 * intensity})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = grad;
      ctx.filter = `blur(${16 + intensity * 12}px)`;
      ctx.fillRect(0, y + wave, w, steamH);
      ctx.filter = "none";
    };

    const drawDrip = (w: number, h: number, intensity: number, t: number) => {
      const top = h * 0.18;
      const amp = 26 * intensity;
      ctx.save();
      ctx.globalAlpha = 0.22 * intensity;
      ctx.fillStyle = "rgba(245,225,195,1)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, top);
      for (let x = 0; x <= w; x += 28) {
        const n = Math.sin((x * 0.018) + t * 0.0012) * amp;
        ctx.lineTo(x, top + n);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawSpotlight = (w: number, h: number, intensity: number) => {
      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;
      const r = Math.max(w, h) * (0.16 + intensity * 0.14);
      const grad = ctx.createRadialGradient(px, py, 20, px, py, r);
      grad.addColorStop(0, `rgba(255,232,196,${0.18 * intensity})`);
      grad.addColorStop(1, "rgba(255,232,196,0)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);
    };

    const render = (time: number) => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      ctx.clearRect(0, 0, w, h);

      const scene = sceneRef.current;
      const intensity = intensityRef.current;
      const t = timeRef.current || time;

      if (scene === 0) drawDust(w, h, intensity);
      if (scene === 2) drawSteam(w, h, intensity, t);
      if (scene === 3) drawDrip(w, h, intensity, t);
      if (scene === 4) drawSpotlight(w, h, intensity);

      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    seed();
    rafRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
    };
  }, [disabled]);

  if (disabled) return null;

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 z-20 ${className}`} aria-hidden />;
});

export default FXCanvas;
