import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const services = [
  {
    index: '01',
    title: 'Automação de Pipelines de Dados',
    desc: 'Fluxos automatizados de ponta a ponta para ingestão, transformação e armazenamento. Processamento em tempo real e em batch, em escala enterprise.',
    tags: ['ETL / ELT', 'Airflow', 'Spark', 'Tempo real'],
    size: 'large',
  },
  {
    index: '02',
    title: 'Implementação de LLMs Sob Medida',
    desc: 'Fine-tuning e deploy de modelos de linguagem adaptados ao seu domínio. Pipelines RAG, engenharia de prompt e APIs prontas para produção.',
    tags: ['Fine-tuning', 'RAG', 'Inferência'],
    size: 'large',
  },
  {
    index: '03',
    title: 'Análise Preditiva',
    desc: 'Modelos de ML que preveem tendências, reduzem churn e revelam insights acionáveis a partir do seu histórico de dados.',
    tags: ['Previsão', 'Modelos ML', 'BI'],
    size: 'small',
  },
  {
    index: '04',
    title: 'Consultoria em Estratégia de IA',
    desc: 'Transformo ambiguidade organizacional em roadmaps de IA acionáveis, com marcos claros de ROI.',
    tags: ['Roadmap', 'Workshops'],
    size: 'small',
  },
  {
    index: '05',
    title: 'Governança & Segurança de Dados',
    desc: 'Políticas, padrões e controles que garantem qualidade de dados, compliance e adoção responsável de IA.',
    tags: ['Compliance', 'Privacidade', 'IA Responsável'],
    size: 'small',
  },
]

function ServiceCard({ service }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { opacity: 0, y: 24 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(el, { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }),
    })
    return () => st.kill()
  }, [])

  return (
    <div
      ref={ref}
      className="group border border-white/8 p-6 md:p-8 flex flex-col justify-between gap-7 md:gap-10
        hover:border-white/18 hover:bg-white/[0.025] transition-all duration-400 cursor-default will-change-transform"
    >
      {/* Header row */}
      <div className="flex items-start justify-between">
        <span className="text-[10px] tracking-[0.12em] text-white/22">{service.index}</span>
        <svg
          className="w-3.5 h-3.5 text-white/0 group-hover:text-white/40 transition-all duration-300 -rotate-45 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
          viewBox="0 0 12 12" fill="none"
        >
          <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
        </svg>
      </div>

      {/* Body */}
      <div className="flex flex-col gap-3">
        <h3 className={`font-medium tracking-[-0.02em] leading-[1.2] text-white ${service.size === 'large' ? 'text-xl md:text-2xl lg:text-3xl' : 'text-lg md:text-xl'}`}>
          {service.title}
        </h3>
        <p className="text-[13px] leading-[1.8] text-white/40 max-w-xs font-light">{service.desc}</p>
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {service.tags.map(tag => (
          <span key={tag} className="text-[10px] tracking-[0.05em] text-white/28 border border-white/10 px-2.5 py-1 rounded-full">
            {tag}
          </span>
        ))}
      </div>
    </div>
  )
}

export default function Services() {
  const headerRef = useScrollReveal('[data-reveal]', 0.1)

  return (
    <section id="services" className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8">
      <div className="max-w-[1400px]">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span data-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">Serviços</span>
            <h2 data-reveal className="text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-[-0.025em] leading-[1.1] max-w-md">
              O que eu entrego
            </h2>
          </div>
          <p data-reveal className="text-[13px] text-white/35 max-w-[260px] leading-[1.75] font-light sm:text-right">
            Engenharia de IA e dados de ponta a ponta para empresas B2B.
          </p>
        </div>

        {/* Top row: 2 large */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/8 mb-px">
          {services.slice(0, 2).map(s => <ServiceCard key={s.index} service={s} />)}
        </div>

        {/* Bottom row: 3 small */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/8">
          {services.slice(2).map(s => <ServiceCard key={s.index} service={s} />)}
        </div>
      </div>
    </section>
  )
}
