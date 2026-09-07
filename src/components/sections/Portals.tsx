const PORTALS = [
  { label: "Main Site", href: "https://belentani.vercel.app" },
  { label: "Judas Exp.", href: "https://judas-experience-13898.buildaispace.app/" },
  { label: "ES / EU Portal", href: "http://www.belentani.es/" },
  { label: "LinkedIn", href: "https://linkedin.com/in/pedro-b-09473598" },
];

export default function Portals() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl text-[var(--neon)] border-l-[6px] border-[var(--neon)] pl-5 mb-10 uppercase tracking-[0.25em]">
        // PORTALS
      </h2>

      <div className="flex flex-wrap gap-5">
        {PORTALS.map((p) => (
          <a
            key={p.label}
            href={p.href}
            target="_blank"
            rel="noopener noreferrer"
            className="group relative overflow-hidden px-8 py-4 border-2 border-[var(--neon)] text-[var(--neon)] font-bold uppercase tracking-widest transition-colors duration-300 hover:text-black"
          >
            <span
              className="absolute top-0 left-0 h-full bg-[var(--neon)] transition-all duration-300 w-0 group-hover:w-full"
              style={{ zIndex: -1 }}
            />
            {p.label}
          </a>
        ))}
      </div>
    </section>
  );
}