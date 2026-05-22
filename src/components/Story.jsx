import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { useParallax } from '../hooks/useParallax'

gsap.registerPlugin(ScrollTrigger)

const milestones = [
  { year: '2018', label: 'Primeiro script Python', desc: 'Uma análise de dados que economizou 40h/mês num estágio.' },
  { year: '2020', label: 'Primeiro modelo em produção', desc: 'ML de previsão de demanda rodando em e-commerce real.' },
  { year: '2022', label: 'Consultoria B2B', desc: 'Primeiros clientes enterprise. Pipeline de dados que processava 200M eventos/dia.' },
  { year: '2024', label: 'IA Generativa', desc: 'Primeiros projetos com LLMs e RAG para automação de processos críticos.' },
]

const stats = [
  { value: '6+',   label: 'Anos de experiência' },
  { value: '30+',  label: 'Projetos entregues' },
  { value: '500M', label: 'Eventos/dia em produção' },
  { value: '12',   label: 'Clientes enterprise' },
]

function PhotoPlaceholder() {
  return (
    <div className="relative w-full aspect-[3/4] bg-[#0d0d0d] border border-white/8 rounded-sm overflow-hidden flex flex-col items-center justify-center gap-4">
      {/* Abstract gradient bg */}
      <div className="absolute inset-0 bg-gradient-to-br from-white/4 via-transparent to-white/2 pointer-events-none" />
      <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />

      {/* Initials circle */}
      <div className="w-20 h-20 md:w-24 md:h-24 rounded-full border border-white/15 flex items-center justify-center relative z-10">
        <span className="text-2xl md:text-3xl font-medium tracking-[-0.02em] text-white/50">AR</span>
      </div>

      {/* Replace hint */}
      <span className="relative z-10 text-[10px] tracking-[0.1em] uppercase text-white/20 text-center px-6 leading-[1.6]">
        Substitua pela<br />sua foto aqui
      </span>

      {/* Corner marks */}
      <div className="absolute top-4 left-4 w-4 h-4 border-t border-l border-white/15" />
      <div className="absolute top-4 right-4 w-4 h-4 border-t border-r border-white/15" />
      <div className="absolute bottom-4 left-4 w-4 h-4 border-b border-l border-white/15" />
      <div className="absolute bottom-4 right-4 w-4 h-4 border-b border-r border-white/15" />
    </div>
  )
}

export default function Story() {
  const sectionRef = useRef(null)
  const textRef   = useRef(null)
  const statsRef  = useRef(null)
  const timelineRef = useRef(null)
  const parallaxRef = useParallax(25, 1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Text reveal
      gsap.set('[data-story-reveal]', { opacity: 0, y: 22 })
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.to('[data-story-reveal]', {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power3.out', stagger: 0.1,
          }),
      })

      // Stats counter feel
      gsap.set(statsRef.current?.children ?? [], { opacity: 0, y: 18 })
      ScrollTrigger.create({
        trigger: statsRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to(statsRef.current.children, {
            opacity: 1, y: 0,
            duration: 0.6, ease: 'power3.out', stagger: 0.07,
          }),
      })

      // Timeline
      gsap.set(timelineRef.current?.children ?? [], { opacity: 0, x: -16 })
      ScrollTrigger.create({
        trigger: timelineRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to(timelineRef.current.children, {
            opacity: 1, x: 0,
            duration: 0.6, ease: 'power3.out', stagger: 0.09,
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      id="story"
      ref={sectionRef}
      className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8"
    >
      <div className="max-w-[1400px]">

        {/* ── Header ── */}
        <div ref={textRef} className="mb-14 md:mb-20">
          <span data-story-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">
            Sobre mim
          </span>
          <h2 data-story-reveal className="text-[clamp(2rem,4.5vw,3.8rem)] font-medium tracking-[-0.025em] leading-[1.08] max-w-3xl">
            A história por trás<br className="hidden sm:block" /> dos dados
          </h2>
        </div>

        {/* ── Main grid: photo + story ── */}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_1.4fr] gap-10 md:gap-16 lg:gap-24 items-start mb-20 md:mb-28">

          {/* Photo */}
          <div ref={parallaxRef} className="will-change-transform max-w-sm md:max-w-none mx-auto md:mx-0">
            <PhotoPlaceholder />
          </div>

          {/* Story text */}
          <div className="flex flex-col gap-6 pt-0 md:pt-4" ref={textRef}>
            <p data-story-reveal className="text-[clamp(1rem,1.5vw,1.15rem)] leading-[1.85] text-white/70 font-light">
              Tudo começou com uma planilha que ninguém conseguia entender.
              No meu primeiro estágio, assumi a tarefa de "organizar uns dados" —
              e o que parecia simples virou uma obsessão. Escrevi meu primeiro
              script Python, automatizei 40 horas de trabalho manual por mês e,
              naquele momento, entendi que dados não são só números: são decisões.
            </p>

            <p data-story-reveal className="text-[15px] leading-[1.85] text-white/50 font-light">
              De lá pra cá, construí pipelines que processam centenas de milhões
              de eventos por dia, treinei modelos que previram churn antes que os
              clientes soubessem que estavam insatisfeitos, e implantei LLMs que
              automaram processos que ninguém acreditava que seriam possíveis
              automatizar.
            </p>

            <p data-story-reveal className="text-[15px] leading-[1.85] text-white/50 font-light">
              Mas o que realmente me move não é a tecnologia em si — é aquele
              momento em que um gestor olha para um dashboard e diz: "agora eu
              entendo o meu negócio". Transformar complexidade em clareza é o que
              define meu trabalho.
            </p>

            <p data-story-reveal className="text-[15px] leading-[1.85] text-white/50 font-light">
              Hoje atendo empresas B2B que querem escalar com dados e IA —
              sem achismos, sem promessas vazias. Só engenharia sólida,
              estratégia clara e resultado mensurável.
            </p>

            <a
              data-story-reveal
              href="mailto:ridigoloabner@gmail.com"
              className="inline-flex items-center gap-2.5 w-fit mt-2 text-[11px] tracking-[0.1em] uppercase border border-white/18 text-white px-5 py-3 hover:bg-white hover:text-black transition-all duration-300 group"
            >
              Vamos conversar
              <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        {/* ── Stats ── */}
        <div
          ref={statsRef}
          className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-20 md:mb-28"
        >
          {stats.map(({ value, label }) => (
            <div key={label} className="bg-black flex flex-col gap-2 py-8 px-6 md:px-8">
              <span className="text-[clamp(2rem,4vw,3rem)] font-medium tracking-[-0.03em] leading-none text-white">
                {value}
              </span>
              <span className="text-[12px] leading-[1.6] text-white/35 font-light">
                {label}
              </span>
            </div>
          ))}
        </div>

        {/* ── Timeline ── */}
        <div>
          <span className="text-[11px] tracking-[0.16em] uppercase text-white/28 block mb-10">
            Marcos
          </span>
          <div
            ref={timelineRef}
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/8"
          >
            {milestones.map(({ year, label, desc }) => (
              <div
                key={year}
                className="bg-black flex flex-col gap-3 p-6 md:p-8 border-t-2 border-transparent hover:border-white/20 transition-colors duration-300 group cursor-default"
              >
                <span className="text-[11px] tracking-[0.12em] text-white/28 font-light tabular-nums">
                  {year}
                </span>
                <h4 className="text-[15px] font-medium tracking-[-0.01em] leading-[1.3] group-hover:text-white/90 transition-colors duration-300">
                  {label}
                </h4>
                <p className="text-[12px] leading-[1.75] text-white/38 font-light">
                  {desc}
                </p>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  )
}
