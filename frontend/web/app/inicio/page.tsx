export default function InicioPage() {
  return (
    <main className="w-full min-h-screen bg-[#000000] text-[#FFFFFF] flex flex-col justify-center items-center">
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32 flex flex-col items-center text-center">
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight mb-6">
          Conectando estratégia, <br className="hidden sm:block" />
          <span className="text-[#FBAB18]">pessoas e resultados</span>
        </h1>

        <p className="max-w-3xl text-lg sm:text-xl text-[#E5E7EB] mb-10 leading-relaxed">
          Consultoria integrada que estrutura, organiza e impulsiona empresas com visão estratégica e multidisciplinar.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
          <a
            href="/contato"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-[#000000] bg-[#FBAB18] hover:bg-[#FFFFFF] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000] focus:ring-[#FBAB18] w-full sm:w-auto"
            aria-label="Ir para a página de contato para falar com nossa especialista"
          >
            Fale com a nossa especialista
          </a>
        </div>
      </section>
    </main>
  );
}