import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const testimonials = [
  {
    quote:
      'O Abner transformou nosso caos de planilhas em um pipeline confiável. Hoje tomamos decisões com dados que realmente confiamos — algo que parecia impossível seis meses atrás.',
    name: 'Mariana Costa',
    role: 'Head of Operations',
    company: 'LogTech',
    initials: 'MC',
  },
  {
    quote:
      'A automação de atendimento com IA que ele entregou pagou o projeto em três meses. Profissional raro: entende tanto de engenharia quanto de negócio.',
    name: 'Rafael Almeida',
    role: 'CTO',
    company: 'Finova',
    initials: 'RA',
  },
  {
    quote:
      'Contratamos para um diagnóstico e acabamos mantendo como parceiro estratégico. Clareza técnica, prazos cumpridos e resultado mensurável em cada entrega.',
    name: 'Juliana Pires',
    role: 'Diretora de Dados',
    company: 'RetailOne',
    initials: 'JP',
  },
]

export default function Testimonials() {
  const sectionRef = useScrollReveal('[data-reveal]', 0.1)
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el.children, { opacity: 0, y: 28 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.to(el.children, {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power3.out', stagger: 0.12,
          }),
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="testimonials" className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={sectionRef} className="mb-12 md:mb-16">
          <span data-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">
            Depoimentos
          </span>
          <h2 data-reveal className="text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-[-0.025em] leading-[1.1] max-w-xl">
            Quem já trabalhou comigo
          </h2>
        </div>

        {/* Cards */}
        <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/8">
          {testimonials.map((t) => (
            <figure
              key={t.name}
              className="bg-black flex flex-col justify-between gap-8 p-7 md:p-8 hover:bg-white/[0.02] transition-colors duration-400"
            >
              <blockquote className="text-[14px] leading-[1.8] text-white/70 font-light">
                <span className="text-white/20 text-2xl leading-none mr-1 align-[-4px]">“</span>
                {t.quote}
              </blockquote>
              <figcaption className="flex items-center gap-3 pt-6 border-t border-white/8">
                <span className="flex-shrink-0 w-9 h-9 rounded-full bg-white/6 border border-white/12 flex items-center justify-center text-[11px] font-medium text-white/55">
                  {t.initials}
                </span>
                <span className="flex flex-col">
                  <span className="text-[13px] font-medium text-white/85 leading-tight">{t.name}</span>
                  <span className="text-[11px] text-white/35 font-light leading-tight mt-0.5">
                    {t.role}, {t.company}
                  </span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>

      </div>
    </section>
  )
}
