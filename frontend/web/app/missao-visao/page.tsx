export default function MissaoVisaoPage() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#FFFFFF] py-16 sm:py-24 flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center mb-16">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-4">
            Missão e <span className="text-[#FBAB18]">Visão</span>
          </h1>
          <p className="max-w-2xl mx-auto text-lg text-[#E5E7EB]">
            Os pilares estratégicos que guiam nossa atuação e o futuro que construímos todos os dias.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12">
          <div className="bg-[#111111] border border-[#333333] rounded-2xl p-8 sm:p-12 hover:border-[#FBAB18] transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#FBAB18]" tabIndex={0}>
            <div className="h-14 w-14 rounded-xl bg-[#FBAB18] bg-opacity-10 flex items-center justify-center mb-8">
              <svg className="h-8 w-8 text-[#FBAB18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6">Nossa Missão</h2>
            <p className="text-[#E5E7EB] text-lg sm:text-xl leading-relaxed">
              Organizar, estruturar e impulsionar empresas por meio de uma gestão eficiente, estratégica e humanizada.
            </p>
          </div>

          <div className="bg-[#111111] border border-[#333333] rounded-2xl p-8 sm:p-12 hover:border-[#FBAB18] transition-colors duration-300 focus-within:ring-2 focus-within:ring-[#FBAB18]" tabIndex={0}>
            <div className="h-14 w-14 rounded-xl bg-[#FBAB18] bg-opacity-10 flex items-center justify-center mb-8">
              <svg className="h-8 w-8 text-[#FBAB18]" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-[#FFFFFF] mb-6">Nossa Visão</h2>
            <p className="text-[#E5E7EB] text-lg sm:text-xl leading-relaxed">
              Ser referência nacional em soluções empresariais integradas.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}