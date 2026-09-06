"use client";

import { useEffect, useRef } from "react";

type Particle = {
  x: number;
  y: number;
  vx: number;
  vy: number;
  r: number;
  a: number;
};

export function Starfield() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const pointer = useRef({ x: 0.5, y: 0.35, active: false });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let width = 0;
    let height = 0;
    let raf = 0;
    let particles: Particle[] = [];

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * dpr);
      canvas.height = Math.floor(height * dpr);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.min(160, Math.floor((width * height) / 14000));
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.25,
        vy: (Math.random() - 0.5) * 0.25,
        r: Math.random() * 1.6 + 0.3,
        a: Math.random() * 0.7 + 0.2,
      }));
    };

    const onMove = (clientX: number, clientY: number) => {
      pointer.current = { x: clientX / width, y: clientY / height, active: true };
    };

    const onPointer = (e: PointerEvent) => onMove(e.clientX, e.clientY);
    const onTouch = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) onMove(t.clientX, t.clientY);
    };

    const draw = () => {
      const theme = document.documentElement.getAttribute("data-theme");
      ctx.clearRect(0, 0, width, height);
      const g = ctx.createRadialGradient(
        width * pointer.current.x,
        height * pointer.current.y,
        0,
        width * pointer.current.x,
        height * pointer.current.y,
        Math.max(width, height) * 0.55,
      );
      if (theme === "light") {
        g.addColorStop(0, "rgba(255, 182, 255, 0.28)");
        g.addColorStop(0.4, "rgba(125, 211, 252, 0.12)");
        g.addColorStop(1, "rgba(244, 240, 255, 0)");
      } else {
        g.addColorStop(0, "rgba(190, 18, 60, 0.28)");
        g.addColorStop(0.45, "rgba(76, 5, 25, 0.12)");
        g.addColorStop(1, "rgba(7, 3, 8, 0)");
      }
      ctx.fillStyle = g;
      ctx.fillRect(0, 0, width, height);

      const px = pointer.current.x * width;
      const py = pointer.current.y * height;

      for (const p of particles) {
        if (!reduce) {
          const dx = px - p.x;
          const dy = py - p.y;
          const dist = Math.hypot(dx, dy) || 1;
          const pull = pointer.current.active ? 0.018 : 0.006;
          p.vx += (dx / dist) * pull * (80 / dist);
          p.vy += (dy / dist) * pull * (80 / dist);
          p.vx *= 0.96;
          p.vy *= 0.96;
          p.x += p.vx;
          p.y += p.vy;
          if (p.x < 0) p.x = width;
          if (p.x > width) p.x = 0;
          if (p.y < 0) p.y = height;
          if (p.y > height) p.y = 0;
        }
        ctx.beginPath();
        ctx.fillStyle =
          theme === "light"
            ? `rgba(124, 58, 237, ${p.a})`
            : `rgba(255, 214, 222, ${p.a})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(draw);
    };

    resize();
    if (reduce) {
      draw();
    } else {
      raf = requestAnimationFrame(draw);
    }

    window.addEventListener("resize", resize);
    window.addEventListener("pointermove", onPointer, { passive: true });
    window.addEventListener("touchmove", onTouch, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", resize);
      window.removeEventListener("pointermove", onPointer);
      window.removeEventListener("touchmove", onTouch);
    };
  }, []);

  return <canvas ref={canvasRef} className="starfield" aria-hidden="true" />;
}
