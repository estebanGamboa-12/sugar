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

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  life: number;
  size: number;
};

const MAX_PARTICLES = 120;

const FXCanvas = forwardRef<FXCanvasHandle, FXCanvasProps>(function FXCanvas({ disabled = false, className = "" }, ref) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number | null>(null);
  const sceneRef = useRef(0);
  const intensityRef = useRef(0);
  const pointerRef = useRef({ x: 0.5, y: 0.5, active: false });
  const timeRef = useRef(0);
  const particlesRef = useRef<Particle[]>([]);

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

    const seedDust = () => {
      particlesRef.current = Array.from({ length: MAX_PARTICLES }, () => ({
        x: Math.random(),
        y: Math.random(),
        vx: (Math.random() - 0.5) * 0.0009,
        vy: (Math.random() - 0.5) * 0.0009,
        life: Math.random(),
        size: 0.4 + Math.random() * 2,
      }));
    };

    const drawDust = (w: number, h: number, intensity: number) => {
      const pointer = pointerRef.current;
      ctx.save();
      ctx.globalCompositeOperation = "screen";

      for (const p of particlesRef.current) {
        p.life += 0.006;
        p.x += p.vx + (pointer.active ? (pointer.x - p.x) * 0.0015 * intensity : 0);
        p.y += p.vy + (pointer.active ? (pointer.y - p.y) * 0.0015 * intensity : 0);

        if (p.x < 0 || p.x > 1 || p.y < 0 || p.y > 1 || p.life > 1.15) {
          p.x = Math.random();
          p.y = Math.random();
          p.life = 0;
        }

        const alpha = Math.max(0, (1 - p.life) * 0.22 * intensity);
        ctx.fillStyle = `rgba(250,236,205,${alpha})`;
        ctx.beginPath();
        ctx.arc(p.x * w, p.y * h, p.size, 0, Math.PI * 2);
        ctx.fill();
      }

      if (pointer.active && intensity > 0.1) {
        const px = pointer.x * w;
        const py = pointer.y * h;
        const halo = ctx.createRadialGradient(px, py, 8, px, py, 150 + 180 * intensity);
        halo.addColorStop(0, `rgba(255,240,214,${0.14 * intensity})`);
        halo.addColorStop(1, "rgba(255,240,214,0)");
        ctx.fillStyle = halo;
        ctx.fillRect(0, 0, w, h);
      }
      ctx.restore();
    };

    const drawSteam = (w: number, h: number, intensity: number, t: number) => {
      const areaTop = h * 0.06;
      const areaHeight = h * 0.38;
      const wave = Math.sin(t * 0.0013) * 16;
      const grad = ctx.createLinearGradient(0, areaTop, 0, areaTop + areaHeight);
      grad.addColorStop(0, `rgba(255,255,255,${0.12 * intensity})`);
      grad.addColorStop(1, "rgba(255,255,255,0)");
      ctx.save();
      ctx.filter = `blur(${14 + intensity * 16}px)`;
      ctx.fillStyle = grad;
      ctx.fillRect(0, areaTop + wave, w, areaHeight);
      ctx.restore();
    };

    const drawChocolateDrip = (w: number, h: number, intensity: number, t: number) => {
      const top = h * 0.13;
      const amp = 28 * intensity;
      ctx.save();
      ctx.globalAlpha = 0.28 * intensity;
      ctx.fillStyle = "rgba(241,225,198,1)";
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(0, top);
      for (let x = 0; x <= w; x += 24) {
        const y = top + Math.sin(x * 0.016 + t * 0.0013) * amp + Math.cos(x * 0.008 + t * 0.0011) * (amp * 0.5);
        ctx.lineTo(x, y);
      }
      ctx.lineTo(w, 0);
      ctx.closePath();
      ctx.fill();
      ctx.restore();
    };

    const drawSpotlight = (w: number, h: number, intensity: number) => {
      const px = pointerRef.current.x * w;
      const py = pointerRef.current.y * h;
      const grad = ctx.createRadialGradient(px, py, 10, px, py, Math.max(w, h) * (0.22 + intensity * 0.16));
      grad.addColorStop(0, `rgba(251,233,196,${0.18 * intensity})`);
      grad.addColorStop(1, "rgba(251,233,196,0)");
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
      if (scene === 3) drawChocolateDrip(w, h, intensity, t);
      if (scene === 4) drawSpotlight(w, h, intensity);

      rafRef.current = requestAnimationFrame(render);
    };

    resize();
    seedDust();
    rafRef.current = requestAnimationFrame(render);
    window.addEventListener("resize", resize);

    return () => {
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      window.removeEventListener("resize", resize);
    };
  }, [disabled]);

  if (disabled) return null;

  return <canvas ref={canvasRef} className={`pointer-events-none absolute inset-0 z-20 ${className}`} aria-hidden />;
});

export default FXCanvas;
