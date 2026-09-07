const ARSENAL = [
  {
    category: "CORE SYSTEMS",
    items: "TypeScript · Python · Java · Go · PowerShell",
  },
  {
    category: "WEB / FRAMEWORKS",
    items: "React 19 · Next.js 16 · Astro · Vite · Node.js · tRPC",
  },
  {
    category: "DATA / INFRA",
    items: "Drizzle ORM · MySQL · Redis · Express",
  },
  {
    category: "3D / MOTION",
    items: "Three.js · R3F · GSAP · Lenis · Framer Motion",
  },
  {
    category: "AI / AUDIO",
    items: "RVC · Applio · Whisper · Demucs · Tone.js",
  },
  {
    category: "AGENT TOOLS",
    items: "Claude Code · Qwen Code · Cline · Aider · OpenCode",
  },
];

export default function Arsenal() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl text-[var(--neon)] border-l-[6px] border-[var(--neon)] pl-5 mb-10 uppercase tracking-[0.25em]">
        // TECH ARSENAL
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {ARSENAL.map((item) => (
          <div
            key={item.category}
            className="group relative overflow-hidden bg-[var(--glass)] border border-[var(--border)] p-6 backdrop-blur-md transition-all duration-500 hover:border-[var(--neon)] hover:-translate-y-2"
            style={{ transition: "all 0.4s ease" }}
          >
            <div
              className="absolute top-0 left-[-100%] w-full h-full"
              style={{
                background:
                  "linear-gradient(90deg, transparent, rgba(255,7,58,0.3), transparent)",
                transition: "0.6s",
                pointerEvents: "none",
              }}
            />
            <div className="text-sm text-[var(--neon)] tracking-[0.15em] mb-4 font-bold">
              {item.category}
            </div>
            <div className="text-sm text-gray-300 leading-[1.8]">{item.items}</div>
          </div>
        ))}
      </div>
    </section>
  );
}