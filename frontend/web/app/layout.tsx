import type { Metadata } from "next";
import "../styles/globals.css";
import Navbar from "../components/navbar/Navbar";

export const metadata: Metadata = {
  title: "Conecta 360º | Consultoria Integrada",
  description: "Consultoria integrada que estrutura, organiza e impulsiona empresas com visão estratégica e multidisciplinar.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className="bg-[#000000] text-[#FFFFFF] antialiased min-h-screen flex flex-col">
        <Navbar />
        <main className="flex-grow flex flex-col">
          {children}
        </main>
      </body>
    </html>
  );
}