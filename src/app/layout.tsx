import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "BELENTANI // NEURAL ARCHITECT",
  description:
    "Neural Architect · Voice AI · Zero-Token Routing. Experience in red neon.",
  openGraph: {
    title: "BELENTANI // NEURAL ARCHITECT",
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
    <html lang="es">
      <body className="scanlines">{children}</body>
    </html>
  );
}