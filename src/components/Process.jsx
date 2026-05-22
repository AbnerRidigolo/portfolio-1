import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const steps = [
  {
    n: '01',
    title: 'Diagnóstico',
    desc: 'Mergulho no seu negócio para mapear fontes de dados, gargalos e oportunidades reais de impacto — antes de escrever uma linha de código.',
  },
  {
    n: '02',
    title: 'Arquitetura',
    desc: 'Desenho a solução técnica e o roadmap com marcos claros e ROI estimado. Você aprova o plano antes de começarmos a construir.',
  },
  {
    n: '03',
    title: 'Desenvolvimento',
    desc: 'Implementação iterativa com entregas semanais. Pipelines, modelos e integrações construídos com qualidade de produção desde o dia um.',
  },
  {
    n: '04',
    title: 'Entrega & Suporte',
    desc: 'Deploy monitorado, documentação completa e transferência de conhecimento. Acompanho a evolução para garantir resultado contínuo.',
  },
]

export default function Process() {
  const sectionRef = useScrollReveal('[data-reveal]', 0.1)
  const gridRef = useRef(null)

  useEffect(() => {
    const el = gridRef.current
    if (!el) return
    const ctx = gsap.context(() => {
      gsap.set(el.children, { opacity: 0, y: 26 })
      ScrollTrigger.create({
        trigger: el,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.to(el.children, {
            opacity: 1, y: 0,
            duration: 0.65, ease: 'power3.out', stagger: 0.1,
          }),
      })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section id="process" className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={sectionRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12 md:mb-16">
          <div>
            <span data-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">
              Como funciono
            </span>
            <h2 data-reveal className="text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-[-0.025em] leading-[1.1] max-w-lg">
              Um processo claro,<br className="hidden sm:block" /> do diagnóstico à entrega
            </h2>
          </div>
          <p data-reveal className="text-[13px] text-white/35 max-w-[260px] leading-[1.75] font-light sm:text-right">
            Sem caixa-preta. Você sabe exatamente onde estamos em cada etapa.
          </p>
        </div>

        {/* Steps */}
        <div ref={gridRef} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8">
          {steps.map((s) => (
            <div
              key={s.n}
              className="bg-black flex flex-col gap-5 p-7 md:p-8 group hover:bg-white/[0.02] transition-colors duration-400 cursor-default"
            >
              <span className="text-[13px] tracking-[0.1em] text-white/25 tabular-nums group-hover:text-white/60 transition-colors duration-300">
                {s.n}
              </span>
              <div className="flex flex-col gap-2.5">
                <h3 className="text-[16px] font-medium tracking-[-0.01em] leading-[1.25] text-white/90">
                  {s.title}
                </h3>
                <p className="text-[12.5px] leading-[1.75] text-white/40 font-light">
                  {s.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}
