export default function ValoresPage() {
  const valores = [
    {
      titulo: "Foco no sucesso do cliente",
      descricao: "Trabalhamos incansavelmente para garantir que nossos parceiros alcancem e superem suas metas."
    },
    {
      titulo: "Gestão estratégica",
      descricao: "Cada decisão e processo é embasado em dados e metodologias que visam o crescimento seguro."
    },
    {
      titulo: "Performance com qualidade",
      descricao: "Entregamos resultados ágeis e de alto impacto sem abrir mão da excelência em cada detalhe."
    },
    {
      titulo: "Ética e transparência",
      descricao: "Nossas relações são pautadas pela honestidade, clareza de informações e respeito mútuo."
    },
    {
      titulo: "Desenvolvimento sustentável",
      descricao: "Buscamos soluções que garantam a longevidade do negócio de forma responsável e consciente."
    }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#FFFFFF] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Nossos <span className="text-[#FBAB18]">Valores</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#E5E7EB]">
            Os princípios inegociáveis que norteiam nossas ações e constroem relações de confiança.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {valores.map((valor, index) => (
            <div
              key={index}
              className="bg-[#111111] border border-[#333333] rounded-xl p-8 hover:border-[#FBAB18] transition-all duration-300 focus-within:ring-2 focus-within:ring-[#FBAB18] focus-within:outline-none"
              tabIndex={0}
            >
              <div className="flex items-center mb-4">
                <span className="flex-shrink-0 h-10 w-10 rounded-full bg-[#FBAB18] flex items-center justify-center mr-4">
                  <svg className="h-5 w-5 text-[#000000]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <h2 className="text-xl font-bold text-[#FFFFFF]">{valor.titulo}</h2>
              </div>
              <p className="text-[#E5E7EB] leading-relaxed">
                {valor.descricao}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}