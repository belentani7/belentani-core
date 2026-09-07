"use client";

import { useEffect, useState } from "react";

const QUOTES = [
  '"Fazer visível o que importa."',
  '"Zero-token routing, máxima eficiencia."',
  '"Donde el código se convierte en experiencia."',
];

export default function Hero() {
  const [quote, setQuote] = useState("");

  useEffect(() => {
    let charIndex = 0;
    let quoteIndex = 0;
    let timeout: ReturnType<typeof setTimeout>;

    const typeLoop = () => {
      const current = QUOTES[quoteIndex % QUOTES.length];
      if (charIndex <= current.length) {
        setQuote(current.slice(0, charIndex));
        charIndex++;
        timeout = setTimeout(typeLoop, 70);
      } else {
        timeout = setTimeout(() => {
          charIndex = 0;
          quoteIndex++;
          setTimeout(typeLoop, 50);
        }, 2500);
      }
    };

    timeout = setTimeout(typeLoop, 1200);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <header className="text-center mb-20 pt-20 pb-10 border-b border-[var(--border)]">
      <div
        className="inline-block px-4 py-1 border border-[var(--neon)] text-[var(--neon)] text-xs tracking-[0.3em] mb-8"
        style={{ boxShadow: "0 0 15px var(--neon-glow)", animation: "pulse 2s infinite" }}
      >
        STATUS: OMEGA_CLEAN // RENDERING
      </div>

      <h1
        className="font-display uppercase text-[clamp(3.5rem,10vw,7rem)] tracking-[0.2em] relative inline-block text-white"
        style={{
          textShadow:
            "0 0 10px var(--neon), 0 0 20px var(--neon-glow), 0 0 40px var(--neon-glow)",
        }}
      >
        BELENTANI
      </h1>

      <div className="text-xl text-[var(--neon)] mt-4 tracking-widest" style={{ textShadow: "0 0 5px var(--neon)" }}>
        Neural Architect · Voice AI · Zero-Token Routing
      </div>

      <div className="mt-6 text-sm text-gray-500 tracking-wider">
        <span>São Paulo ⇄ Barcelona</span> | <span>14:45 UTC-12</span> |{" "}
        <a
          href="https://belentani.vercel.app"
          target="_blank"
          rel="noopener noreferrer"
          className="text-[var(--neon)] hover:underline"
        >
          belentani.vercel.app
        </a>
      </div>

      <div className="text-center text-2xl text-white mt-12 italic min-h-[40px]">
        <span>{quote}</span>
        <span
          className="inline-block w-2.5 h-6 bg-[var(--neon)] ml-1 align-middle"
          style={{ animation: "blink 1s infinite" }}
        >
          _
        </span>
      </div>
    </header>
  );
}