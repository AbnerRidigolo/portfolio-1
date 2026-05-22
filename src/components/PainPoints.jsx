import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  LuDatabase, LuShieldAlert, LuGauge, LuTriangleAlert, LuTrendingDown,
  LuServer, LuBrainCircuit, LuLock, LuCloud, LuLayers, LuZapOff, LuCpu,
} from 'react-icons/lu'
import { useScrollReveal } from '../hooks/useScrollReveal'

gsap.registerPlugin(ScrollTrigger)

const row1 = [
  {
    icon: LuLayers,
    title: 'Silos de Dados',
    desc: 'Informações fragmentadas em dezenas de planilhas e sistemas soltos que não se comunicam entre si.',
  },
  {
    icon: LuTriangleAlert,
    title: 'Baixa Confiabilidade',
    desc: 'Tomada de decisão baseada em dados desatualizados, duplicados ou com erros estruturais constantes.',
  },
  {
    icon: LuGauge,
    title: 'Dashboards Lentos',
    desc: 'Pipelines de ETL que demoram horas para rodar e relatórios que travam na hora da apresentação.',
  },
  {
    icon: LuDatabase,
    title: 'Dados sem Governança',
    desc: 'Ninguém sabe quem é dono de qual dado. Auditorias viram pesadelos e compliance fica comprometido.',
  },
  {
    icon: LuServer,
    title: 'Escalabilidade Limitada',
    desc: 'Soluções que funcionam com 1GB mas quebram sob o peso real do volume de produção.',
  },
  {
    icon: LuZapOff,
    title: 'Relatórios Inconsistentes',
    desc: 'Cada área produz um número diferente para a mesma métrica. Reuniões viram debates sobre qual dado é o certo.',
  },
]

const row2 = [
  {
    icon: LuTrendingDown,
    title: 'Falta de ROI com IA',
    desc: 'PoCs de inteligência artificial caras que nunca geram valor financeiro real para o negócio.',
  },
  {
    icon: LuShieldAlert,
    title: 'Riscos de Governança',
    desc: 'Insegurança ao usar LLMs e IA Generativa corporativa por medo de vazamento de dados sensíveis.',
  },
  {
    icon: LuLock,
    title: 'Modelos Presos no Jupyter',
    desc: 'Dificuldade enorme de tirar modelos de Machine Learning do notebook e colocá-los em produção real.',
  },
  {
    icon: LuBrainCircuit,
    title: 'Time sem Capacidade Técnica',
    desc: 'Equipe interna sem maturidade para manter, monitorar e evoluir soluções de dados e IA complexas.',
  },
  {
    icon: LuCloud,
    title: 'Custos Cloud Explodindo',
    desc: 'Faturas de cloud crescendo mês a mês sem visibilidade do que gera custo ou como otimizar.',
  },
  {
    icon: LuCpu,
    title: 'IA sem Estratégia',
    desc: 'Adoção de IA reativa, baseada em hype, sem roadmap claro nem critérios para priorizar iniciativas.',
  },
]

function Card({ icon: Icon, title, desc }) {
  return (
    <div className="flex-shrink-0 w-[260px] sm:w-[300px] md:w-[320px] bg-white/[0.03] border border-white/8 rounded-xl p-6 flex flex-col gap-4 hover:bg-white/[0.055] hover:border-white/16 transition-all duration-400 cursor-default group">
      {/* Icon */}
      <div className="w-10 h-10 rounded-lg bg-white/6 border border-white/8 flex items-center justify-center flex-shrink-0 group-hover:bg-white/10 transition-colors duration-300">
        <Icon className="w-4.5 h-4.5 text-white/55 group-hover:text-white/80 transition-colors duration-300" size={18} />
      </div>
      {/* Text */}
      <div className="flex flex-col gap-2">
        <h3 className="text-[15px] font-medium tracking-[-0.01em] leading-[1.25] text-white/85">
          {title}
        </h3>
        <p className="text-[12.5px] leading-[1.75] text-white/38 font-light">
          {desc}
        </p>
      </div>
    </div>
  )
}

export default function PainPoints() {
  const sectionRef = useRef(null)
  const row1Ref    = useRef(null)
  const row2Ref    = useRef(null)
  const headerRef  = useScrollReveal('[data-reveal]', 0.1)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()

      mm.add('(min-width: 640px)', () => {
        // Row 1: starts right, moves left
        gsap.fromTo(row1Ref.current,
          { x: 60 },
          {
            x: -80,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
            },
          }
        )

        // Row 2: starts left, moves right
        gsap.fromTo(row2Ref.current,
          { x: -80 },
          {
            x: 60,
            ease: 'none',
            scrollTrigger: {
              trigger: sectionRef.current,
              start: 'top bottom',
              end: 'bottom top',
              scrub: 1.8,
            },
          }
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="py-24 md:py-32 lg:py-40 border-b border-white/8 overflow-hidden"
    >
      {/* Header */}
      <div ref={headerRef} className="px-5 md:px-10 lg:px-14 mb-14 md:mb-18 max-w-[1400px] mx-auto">
        <span data-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">
          Dores que resolvo
        </span>
        <h2 data-reveal className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.025em] leading-[1.1] max-w-2xl">
          Chega de sofrer com{' '}
          <span className="text-white/35">dados desorganizados</span>
        </h2>
      </div>

      {/* Row 1 — slides LEFT on scroll */}
      <div className="mb-4">
        <div ref={row1Ref} className="flex gap-3 md:gap-4 px-5 md:px-10 lg:px-14 will-change-transform">
          {[...row1, ...row1.slice(0, 3)].map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>

      {/* Row 2 — slides RIGHT on scroll */}
      <div>
        <div ref={row2Ref} className="flex gap-3 md:gap-4 px-5 md:px-10 lg:px-14 will-change-transform">
          {[...row2, ...row2.slice(0, 3)].map((card, i) => (
            <Card key={i} {...card} />
          ))}
        </div>
      </div>
    </section>
  )
}
