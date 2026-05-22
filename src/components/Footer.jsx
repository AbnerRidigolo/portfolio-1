import { useScrollReveal } from '../hooks/useScrollReveal'

const navLinks = [
  { label: 'Serviços', href: '#services' },
  { label: 'Processo', href: '#process' },
  { label: 'Projetos', href: '#projects' },
  { label: 'Sobre', href: '#story' },
  { label: 'Depoimentos', href: '#testimonials' },
]

const social = [
  { label: 'LinkedIn', href: '#' },
  { label: 'GitHub', href: '#' },
  { label: 'Twitter', href: '#' },
]

export default function Footer() {
  const ref = useScrollReveal('[data-reveal]', 0.1)

  return (
    <footer ref={ref} className="px-5 md:px-10 lg:px-14 py-20 md:py-28 lg:py-32">
      <div className="max-w-[1400px] mx-auto">

        {/* Big CTA */}
        <p data-reveal className="text-[clamp(1.8rem,4.5vw,4rem)] font-medium tracking-[-0.025em] leading-[1.15] max-w-3xl mb-8 md:mb-10">
          Vamos definir juntos o futuro dos seus dados,{' '}
          <span className="text-white/35">tecnologia e inteligência.</span>
        </p>

        <a
          data-reveal
          href="mailto:ridigoloabner@gmail.com"
          className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.1em] uppercase bg-white text-black px-6 py-3.5 font-medium hover:bg-white/85 active:scale-[0.98] transition-all duration-300 group mb-16 md:mb-24"
        >
          Vamos conversar
          <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
            <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </a>

        {/* Link columns */}
        <div data-reveal className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-8 pb-14 md:pb-20 border-b border-white/8">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1 flex flex-col gap-3">
            <span className="text-[12px] font-medium tracking-[0.16em] uppercase text-white">
              Abner Ridigolo
            </span>
            <span className="text-[12px] leading-[1.7] text-white/35 font-light max-w-[200px]">
              Engenharia de IA & Dados para empresas B2B que querem escalar com clareza.
            </span>
          </div>

          {/* Navegação */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-1">Navegação</span>
            {navLinks.map(({ label, href }) => (
              <a key={label} href={href} className="text-[12px] text-white/45 hover:text-white transition-colors duration-200 w-fit">
                {label}
              </a>
            ))}
          </div>

          {/* Contato */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-1">Contato</span>
            <a href="mailto:ridigoloabner@gmail.com" className="text-[12px] text-white/45 hover:text-white transition-colors duration-200 w-fit break-all">
              ridigoloabner@gmail.com
            </a>
          </div>

          {/* Social */}
          <div className="flex flex-col gap-3.5">
            <span className="text-[10px] tracking-[0.12em] uppercase text-white/25 mb-1">Social</span>
            {social.map(({ label, href }) => (
              <a
                key={label}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-[12px] text-white/45 hover:text-white transition-colors duration-200 w-fit"
              >
                {label}
              </a>
            ))}
          </div>
        </div>

        {/* Bottom bar */}
        <div data-reveal className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pt-6">
          <span className="text-[11px] text-white/22 font-light">
            © 2026 Abner Ridigolo. Todos os direitos reservados.
          </span>
          <a href="#" className="text-[11px] tracking-[0.1em] uppercase text-white/28 hover:text-white transition-colors duration-300">
            Voltar ao topo ↑
          </a>
        </div>

      </div>
    </footer>
  )
}
