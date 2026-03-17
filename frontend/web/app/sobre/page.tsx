export default function SobrePage() {
  return (
    <div className="w-full bg-[#000000] text-[#FFFFFF] py-16 sm:py-24 flex-grow">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Sobre a <span className="text-[#FBAB18]">Conecta 360º</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#E5E7EB]">
            Conheça nossa história, nossa visão estratégica e quem está por trás da nossa metodologia integrada de gestão.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="flex flex-col space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#FBAB18]">História e Origem</h2>
              <p className="text-[#E5E7EB] leading-relaxed text-lg">
                A Conecta 360º nasceu da percepção de que o sucesso empresarial exige uma abordagem holística. A origem do nosso nome reflete exatamente essa premissa: analisar, estruturar e impulsionar o negócio por todos os ângulos — unindo pessoas, processos, estratégia e resultados em um ciclo contínuo e integrado.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4 text-[#FBAB18]">Visão Estratégica</h2>
              <p className="text-[#E5E7EB] leading-relaxed text-lg">
                Nossa atuação é baseada em entender a fundo a realidade de cada cliente para entregar soluções personalizadas. Acreditamos que a gestão estratégica de pessoas é o motor principal para alcançar a alta performance operacional e comercial, conectando talentos aos objetivos do negócio.
              </p>
            </section>
          </div>

          <div className="bg-[#111111] p-8 sm:p-10 rounded-xl border border-[#333333] shadow-xl">
            <div className="mb-6">
              <span className="text-sm font-semibold tracking-wider text-[#E5E7EB] uppercase">
                Idealizadora
              </span>
              <h3 className="text-3xl sm:text-4xl font-extrabold text-[#FFFFFF] mt-2 mb-1">
                Louise Rakel
              </h3>
            </div>

            <ul className="space-y-4">
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#FBAB18] flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-[#000000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="ml-3 text-lg text-[#E5E7EB]">Psicóloga</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#FBAB18] flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-[#000000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="ml-3 text-lg text-[#E5E7EB]">Mentora de carreira</span>
              </li>
              <li className="flex items-start">
                <span className="flex-shrink-0 h-6 w-6 rounded-full bg-[#FBAB18] flex items-center justify-center mt-0.5">
                  <svg className="h-4 w-4 text-[#000000]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                  </svg>
                </span>
                <span className="ml-3 text-lg text-[#E5E7EB]">Especialista em gestão estratégica de pessoas e negócios</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}