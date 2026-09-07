const MISSIONS = [
  {
    project: "NOIACORE LAB",
    stack: "React 19 · tRPC · LLM · MySQL",
    status: "298 files · Live",
    warning: false,
  },
  {
    project: "MetaSkill",
    stack: "Python · Zero-token routing",
    status: "16 archetypes",
    warning: false,
  },
  {
    project: "AgentGuard",
    stack: "Go · Budget firewall",
    status: "Auto-pause daemon",
    warning: false,
  },
  {
    project: "DUCK Ecosystem",
    stack: "Astro · 6 apps",
    status: "GitHub Pages",
    warning: false,
  },
  {
    project: "Voice Clone",
    stack: "RVC · Applio · Kaggle GPU",
    status: "47 stems training",
    warning: true,
  },
  {
    project: "Evidence Ledger",
    stack: "TS · Audit trail",
    status: "Cryptographic",
    warning: false,
  },
];

export default function Missions() {
  return (
    <section className="mb-24">
      <h2 className="text-2xl text-[var(--neon)] border-l-[6px] border-[var(--neon)] pl-5 mb-10 uppercase tracking-[0.25em]">
        // ACTIVE MISSIONS
      </h2>

      <div className="overflow-x-auto border border-[var(--border)] backdrop-blur-md bg-[var(--glass)]">
        <table className="w-full border-collapse min-w-[700px]">
          <thead>
            <tr>
              {["Project", "Stack", "Status"].map((h) => (
                <th
                  key={h}
                  className="p-5 text-left text-[var(--neon)] text-sm uppercase tracking-widest bg-[#ff073a0d] border-b border-[var(--border)]"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {MISSIONS.map((m) => (
              <tr key={m.project} className="border-b border-[var(--border)] hover:bg-[#ff073a08]">
                <td className="p-5">
                  <span
                    className="inline-block w-3 h-3 rounded-full mr-3 align-middle"
                    style={{
                      background: m.warning ? "#ffaa00" : "var(--neon)",
                      boxShadow: m.warning ? "0 0 12px #ffaa00" : "0 0 12px var(--neon)",
                      animation: m.warning ? "pulse 0.8s infinite" : "pulse 1.5s infinite",
                    }}
                  />
                  {m.project}
                </td>
                <td className="p-5 text-gray-400">{m.stack}</td>
                <td className="p-5" style={{ color: m.warning ? "#ffaa00" : "var(--neon)" }}>
                  {m.status}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}