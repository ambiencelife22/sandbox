// app/components/GradientBackground.tsx
"use client";

import { useEffect } from "react";

export default function GradientBackground() {
  useEffect(() => {
    const container = document.getElementById("particles-container");
    const particleCount = 80;

    const createParticle = () => {
      const particle = document.createElement("div");
      particle.className =
        "absolute rounded-full bg-white pointer-events-none opacity-0";

      const size = Math.random() * 3 + 1;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;

      const pos = resetParticle(particle);
      container?.appendChild(particle);
      animateParticle(particle, pos);
    };

    const resetParticle = (particle: HTMLElement) => {
      const x = Math.random() * 100;
      const y = Math.random() * 100;
      particle.style.left = `${x}%`;
      particle.style.top = `${y}%`;
      particle.style.opacity = "0";
      return { x, y };
    };

    const animateParticle = (
      particle: HTMLElement,
      pos: { x: number; y: number }
    ) => {
      const duration = Math.random() * 10 + 10;
      const delay = Math.random() * 5;

      setTimeout(() => {
        particle.style.transition = `all ${duration}s linear`;
        particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;
        const moveX = pos.x + (Math.random() * 20 - 10);
        const moveY = pos.y - Math.random() * 30;
        particle.style.left = `${moveX}%`;
        particle.style.top = `${moveY}%`;

        setTimeout(() => {
          animateParticle(particle, resetParticle(particle));
        }, duration * 1000);
      }, delay * 1000);
    };

    for (let i = 0; i < particleCount; i++) createParticle();

    const mouseMove = (e: MouseEvent) => {
      const mouseX = (e.clientX / window.innerWidth) * 100;
      const mouseY = (e.clientY / window.innerHeight) * 100;

      const particle = document.createElement("div");
      particle.className =
        "absolute rounded-full bg-orange pointer-events-none opacity-60";

      const size = Math.random() * 4 + 2;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${mouseX}%`;
      particle.style.top = `${mouseY}%`;

      container?.appendChild(particle);

      setTimeout(() => {
        particle.style.transition = "all 2s ease-out";
        particle.style.left = `${mouseX + (Math.random() * 10 - 5)}%`;
        particle.style.top = `${mouseY + (Math.random() * 10 - 5)}%`;
        particle.style.opacity = "0";

        setTimeout(() => {
          particle.remove();
        }, 2000);
      }, 10);

      document.querySelectorAll(".gradient-sphere").forEach((el) => {
        (el as HTMLElement).style.transform = `translate(${
          (e.clientX / window.innerWidth - 0.5) * 5
        }px, ${(e.clientY / window.innerHeight - 0.5) * 5}px)`;
      });
    };

    document.addEventListener("mousemove", mouseMove);
    return () => document.removeEventListener("mousemove", mouseMove);
  }, []);

  return (
    <div
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
      style={{
        background: "linear-gradient(44deg, #520e63, #651279, #b221d2)",
      }}
    >
      {" "}
      <div className="gradient-sphere absolute w-[40vw] h-[40vw] rounded-full blur-[60px] bg-gradient-to-tr from-pink-500/80 to-cyan-400/40 top-[-10%] left-[-10%] animate-float-1" />
      <div className="gradient-sphere absolute w-[45vw] h-[45vw] rounded-full blur-[60px] bg-gradient-to-tr from-pink-700/80 to-cyan-400/40 bottom-[-20%] right-[-10%] animate-float-2" />
      <div className="gradient-sphere absolute w-[30vw] h-[30vw] rounded-full blur-[60px] bg-gradient-to-tr from-pink-400/50 to-sky-300/30 top-[60%] left-[20%] animate-float-3" />
      <div
        className="gradient-sphere absolute w-[45vw] h-[45vw] rounded-full blur-[60px] bottom-[-20%] right-[-10%] animate-float-2"
        style={{
          background: "linear-gradient(44deg, #520e63, #651279, #b221d2)",
        }}
      />
      <div className="absolute top-0 left-0 w-full h-full z-20 bg-[length:40px_40px] bg-[linear-gradient(to_right,rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.03)_1px,transparent_1px)]" />
      <div
        className="absolute top-0 left-0 w-full h-full opacity-5 z-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
      <div className="absolute w-[40vw] h-[40vh] top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[radial-gradient(circle,rgba(72,0,255,0.15),transparent_70%)] blur-[30px] animate-pulse-glow z-10" />
      <div
        id="particles-container"
        className="absolute top-0 left-0 w-full h-full z-30"
      />
    </div>
  );
}
