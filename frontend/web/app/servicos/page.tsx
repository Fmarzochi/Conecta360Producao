export default function ServicosPage() {
  const servicos = [
    { nome: "Mentoria profissional" },
    { nome: "Recursos Humanos" },
    { nome: "Gestão Comercial" },
    { nome: "Marketing Estratégico" },
    { nome: "Gestão Administrativa" },
    { nome: "Gestão de Projetos" },
    { nome: "Gestão de Dados" },
    { nome: "Gestão de TI" },
    { nome: "Implementação NR-1" }
  ];

  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#FFFFFF] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Nossos <span className="text-[#FBAB18]">Serviços</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#E5E7EB]">
            Soluções completas e integradas para estruturar, organizar e impulsionar o seu negócio com excelência.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {servicos.map((servico, index) => (
            <div
              key={index}
              className="group bg-[#111111] border border-[#333333] rounded-xl p-8 hover:border-[#FBAB18] transition-all duration-300 flex flex-col items-center sm:items-start text-center sm:text-left focus-within:ring-2 focus-within:ring-[#FBAB18] focus-within:outline-none"
              tabIndex={0}
            >
              <div className="h-12 w-12 rounded-lg bg-[#FBAB18] bg-opacity-10 flex items-center justify-center mb-6 group-hover:bg-[#FBAB18] transition-colors duration-300">
                <svg className="h-6 w-6 text-[#FBAB18] group-hover:text-[#000000] transition-colors duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="text-xl font-bold text-[#FFFFFF] group-hover:text-[#FBAB18] transition-colors duration-300">
                {servico.nome}
              </h2>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center border-t border-[#333333] pt-12">
          <h3 className="text-2xl font-bold text-[#FFFFFF] mb-6">Precisa de uma solução sob medida?</h3>
          <a
            href="/contato"
            className="inline-flex items-center justify-center px-8 py-4 text-base font-bold rounded-md text-[#000000] bg-[#FBAB18] hover:bg-[#FFFFFF] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000] focus:ring-[#FBAB18]"
            aria-label="Ir para a página de contato"
          >
            Fale com nossos especialistas
          </a>
        </div>
      </div>
    </div>
  );
}