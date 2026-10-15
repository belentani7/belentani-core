import type { Metadata } from "next";
import "./globals.css";
import "./verde-vivo.css";

export const metadata: Metadata = {
  title: "BELENTANI // VERDE VIVO",
  description:
    "Neural Architect · Voice AI · Zero-Token Routing. Trust & Safety, sistemas de IA y automatizacion en un ecosistema vivo.",
  openGraph: {
    title: "BELENTANI // VERDE VIVO",
    description:
      "Neural Architect · Voice AI · Zero-Token Routing",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    // data-theme permite cambiar el sistema visual entero con un atributo:
    // "verde" = tema VERDE VIVO (por defecto), "neon" = tema original intacto.
    <html lang="es" data-theme="verde">
      <body className="scanlines">{children}</body>
    </html>
  );
}
