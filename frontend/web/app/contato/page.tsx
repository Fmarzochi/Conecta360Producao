"use client";

export default function ContatoPage() {
  return (
    <div className="w-full min-h-screen bg-[#000000] text-[#FFFFFF] py-16 sm:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20">

        <div className="flex flex-col justify-center">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight mb-6">
            Fale <span className="text-[#FBAB18]">Conosco</span>
          </h1>
          <p className="text-lg text-[#E5E7EB] mb-10 leading-relaxed">
            Preencha o formulário para agendar uma conversa com nossa especialista ou entre em contato direto pelas nossas redes.
          </p>

          <div className="flex flex-col sm:flex-row gap-4">
            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-md text-[#FFFFFF] bg-[#25D366] hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000] focus:ring-[#25D366] w-full sm:w-auto"
              aria-label="Entrar em contato via WhatsApp"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              WhatsApp
            </a>

            <a
              href="#"
              className="inline-flex items-center justify-center px-6 py-4 border border-transparent text-base font-bold rounded-md text-[#FFFFFF] bg-[#0077B5] hover:bg-opacity-90 transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000] focus:ring-[#0077B5] w-full sm:w-auto"
              aria-label="Acessar nosso LinkedIn"
            >
              <svg className="w-6 h-6 mr-3" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              LinkedIn
            </a>
          </div>
        </div>

        <div className="bg-[#111111] p-8 sm:p-10 rounded-xl border border-[#333333] shadow-2xl">
          <form className="space-y-6">
            <div>
              <label htmlFor="nome" className="block text-sm font-medium text-[#E5E7EB] mb-2">Nome Completo *</label>
              <input
                type="text"
                id="nome"
                name="nome"
                required
                className="w-full px-4 py-3 bg-[#000000] border border-[#333333] rounded-md text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FBAB18] focus:border-transparent transition-colors"
                placeholder="Seu nome completo"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#E5E7EB] mb-2">Email *</label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-3 bg-[#000000] border border-[#333333] rounded-md text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FBAB18] focus:border-transparent transition-colors"
                placeholder="seu@email.com"
              />
            </div>

            <div>
              <label htmlFor="telefone" className="block text-sm font-medium text-[#E5E7EB] mb-2">Telefone *</label>
              <input
                type="tel"
                id="telefone"
                name="telefone"
                required
                className="w-full px-4 py-3 bg-[#000000] border border-[#333333] rounded-md text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FBAB18] focus:border-transparent transition-colors"
                placeholder="(00) 00000-0000"
              />
            </div>

            <div>
              <label htmlFor="empresa" className="block text-sm font-medium text-[#E5E7EB] mb-2">Empresa *</label>
              <input
                type="text"
                id="empresa"
                name="empresa"
                required
                className="w-full px-4 py-3 bg-[#000000] border border-[#333333] rounded-md text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FBAB18] focus:border-transparent transition-colors"
                placeholder="Nome da sua empresa"
              />
            </div>

            <div>
              <label htmlFor="mensagem" className="block text-sm font-medium text-[#E5E7EB] mb-2">Mensagem *</label>
              <textarea
                id="mensagem"
                name="mensagem"
                rows={4}
                required
                className="w-full px-4 py-3 bg-[#000000] border border-[#333333] rounded-md text-[#FFFFFF] placeholder-[#6B7280] focus:outline-none focus:ring-2 focus:ring-[#FBAB18] focus:border-transparent transition-colors resize-none"
                placeholder="Como podemos ajudar a impulsionar seu negócio?"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-base font-bold text-[#000000] bg-[#FBAB18] hover:bg-[#FFFFFF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-[#000000] focus:ring-[#FBAB18] transition-colors mt-8"
            >
              Enviar Mensagem
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}