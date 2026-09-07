"use client";

import dynamic from "next/dynamic";
import { useLenis } from "@/components/three/useLenis";
import Hero from "@/components/sections/Hero";
import Arsenal from "@/components/sections/Arsenal";
import Missions from "@/components/sections/Missions";
import Portals from "@/components/sections/Portals";
import Repos from "@/components/sections/Repos";

const BelentaniExperience = dynamic(
  () => import("@/components/three/NeuralCore"),
  {
    ssr: false,
    loading: () => (
      <div className="fixed inset-0 z-[-1] bg-[#050505] flex items-center justify-center">
        <div className="text-[var(--neon)] animate-pulse tracking-widest">
          LOADING NEURAL CORE...
        </div>
      </div>
    ),
  }
);

export default function Home() {
  useLenis();

  return (
    <>
      <BelentaniExperience />
      <div className="grid-bg" />

      <div className="relative z-10 max-w-[1200px] mx-auto px-5 py-10">
        <Hero />
        <Arsenal />
        <Missions />
        <Portals />
        <Repos />
      </div>
    </>
  );
}