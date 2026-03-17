import Link from "next/link";

export default function Footer() {
  return (
    <footer className="w-full bg-[#000000] text-[#FFFFFF] border-t border-[#1F2937] py-10 mt-auto" aria-labelledby="footer-heading">
      <h2 id="footer-heading" className="sr-only">
        Rodapé
      </h2>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row justify-between items-center md:items-start gap-6">
          <div className="flex flex-col items-center md:items-start">
            <Link href="/inicio" className="font-bold text-2xl tracking-tight text-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-[#FBAB18] rounded px-1" aria-label="Página Inicial Conecta 360º">
              Conecta <span className="text-[#FBAB18]">360º</span>
            </Link>
            <p className="mt-2 text-sm text-[#E5E7EB] text-center md:text-left">
              Consultoria Integrada de Apoio à Gestão
            </p>
          </div>
          <div className="flex flex-col items-center md:items-end text-sm text-[#E5E7EB]">
            <p className="mb-1">Natal</p>
            <p className="mb-3">Rio Grande do Norte</p>
            <p className="text-xs text-[#9CA3AF]">
              &copy; 2024 Conecta 360º
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}