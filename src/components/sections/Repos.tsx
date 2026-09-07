const REPOS = [
  {
    name: "belentani_Omega",
    desc: "Artist ecosystem connecting music, code, and creative technology.",
    lang: "JavaScript",
  },
  {
    name: "heyduck",
    desc: "Hub web del universo DUCK: apps, musica y herramientas de produccion.",
    lang: "HTML",
  },
  {
    name: "meta-skill",
    desc: "Zero-token skill router for Claude Code and Qwen Code. No LLM token burn.",
    lang: "HTML",
  },
  {
    name: "Belentani",
    desc: "NOIACORE LAB: catálogo, agente, automatización y diseño cinematográfico.",
    lang: "TypeScript",
  },
  {
    name: "CARQUIDEC",
    desc: "Parametric architecture studio — AI-driven bioclimatic design.",
    lang: "HTML",
  },
];

export default function Repos() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl text-[var(--neon)] border-l-[6px] border-[var(--neon)] pl-5 mb-10 uppercase tracking-[0.25em]">
        // POPULAR REPOS
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {REPOS.map((repo) => (
          <div
            key={repo.name}
            className="group bg-[var(--glass)] border border-[var(--border)] p-8 backdrop-blur-md transition-all duration-500 cursor-pointer hover:border-[var(--neon)] hover:-translate-y-3"
            style={{
              transition:
                "all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275)",
            }}
          >
            <div className="text-xl text-white font-bold mb-4">{repo.name}</div>
            <div className="text-sm text-gray-400 mb-6 leading-relaxed min-h-[50px]">
              {repo.desc}
            </div>
            <span className="inline-block px-3.5 py-1.5 bg-[#ff073a1a] border border-[var(--neon)] rounded-full text-xs text-[var(--neon)]">
              {repo.lang}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}