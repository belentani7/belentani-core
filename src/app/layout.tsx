import type { Metadata } from "next";
import "./globals.css";
import "./canon.css";

export const metadata: Metadata = {
  title: "BELENTANI // NEURAL ARCHITECT",
  description:
    "Neural Architect · Voice AI · Zero-Token Routing. Trust & Safety, sistemas de IA y automatizacion con evidencia auditable.",
  openGraph: {
    title: "BELENTANI // NEURAL ARCHITECT",
    description: "Neural Architect · Voice AI · Zero-Token Routing",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme="canon" reorganiza el sistema visual sobre la paleta canonica
    // (rojo neon, oro viejo, negro, violeta). Sin el atributo el sitio usa el
    // tema actual: la adopcion es gradual y revertir es quitar un atributo.
    <html lang="es" data-theme="canon">
      <body className="scanlines">{children}</body>
    </html>
  );
}
