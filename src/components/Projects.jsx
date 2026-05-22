import { useRef, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
  {
    id: '01',
    category: 'Data Engineering',
    title: 'DataFlow Pipeline',
    description:
      'Pipeline ETL de alta escala para processamento de mais de 500 milhões de eventos/dia. Reduziu o tempo de ingestão em 73% e eliminou inconsistências críticas de dados em produção.',
    tags: ['Apache Spark', 'Airflow', 'Snowflake', 'AWS', 'Python'],
    link: '#',
    repo: '#',
    accent: 'from-blue-500/8 to-transparent',
    size: 'large',
  },
  {
    id: '02',
    category: 'LLM / GenAI',
    title: 'Suporte Inteligente',
    description:
      'LLM fine-tuned + RAG para automação de atendimento B2B. Resolveu 68% dos chamados sem intervenção humana, economizando 1.200 horas/mês de suporte.',
    tags: ['OpenAI', 'LangChain', 'RAG', 'FastAPI', 'Redis'],
    link: '#',
    repo: '#',
    accent: 'from-violet-500/8 to-transparent',
    size: 'small',
  },
  {
    id: '03',
    category: 'Machine Learning',
    title: 'Churn Predictor B2B',
    description:
      'Modelo preditivo de churn para SaaS enterprise com 91% de acurácia. Antecipou cancelamentos em até 45 dias, permitindo ações de retenção proativas.',
    tags: ['scikit-learn', 'XGBoost', 'Pandas', 'MLflow', 'Streamlit'],
    link: '#',
    repo: '#',
    accent: 'from-emerald-500/8 to-transparent',
    size: 'small',
  },
  {
    id: '04',
    category: 'Analytics em Tempo Real',
    title: 'Real-time Analytics Hub',
    description:
      'Plataforma de analytics streaming com latência < 200ms. Processa eventos de 12 fontes simultâneas e entrega dashboards ao vivo para tomada de decisão executiva.',
    tags: ['Kafka', 'Apache Flink', 'Databricks', 'Grafana', 'Python'],
    link: '#',
    repo: '#',
    accent: 'from-orange-500/8 to-transparent',
    size: 'large',
  },
  {
    id: '05',
    category: 'Document AI',
    title: 'DocIntelligence',
    description:
      'Sistema RAG para Q&A sobre bases de documentos corporativos. Indexa contratos, relatórios e manuais — respostas precisas com rastreabilidade de fontes.',
    tags: ['LlamaIndex', 'pgvector', 'OpenAI', 'FastAPI', 'Docker'],
    link: '#',
    repo: '#',
    accent: 'from-cyan-500/8 to-transparent',
    size: 'small',
  },
  {
    id: '06',
    category: 'AI Strategy',
    title: 'AI Readiness Framework',
    description:
      'Framework open-source para avaliar maturidade em IA de empresas B2B. Adotado por 30+ organizações como ponto de partida para roadmaps de transformação digital.',
    tags: ['Python', 'Streamlit', 'GitHub', 'Notion API'],
    link: '#',
    repo: '#',
    accent: 'from-rose-500/8 to-transparent',
    size: 'small',
  },
]

function ProjectCard({ project, index }) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    gsap.set(el, { opacity: 0, y: 28 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 88%',
      once: true,
      onEnter: () =>
        gsap.to(el, {
          opacity: 1, y: 0,
          duration: 0.7,
          ease: 'power3.out',
          delay: (index % 3) * 0.08,
        }),
    })
    return () => st.kill()
  }, [index])

  return (
    <article
      ref={ref}
      className={`group relative flex flex-col justify-between border border-white/8 p-6 md:p-8
        hover:border-white/18 transition-all duration-400 overflow-hidden cursor-default
        ${project.size === 'large' ? 'md:col-span-2' : ''}`}
    >
      {/* Accent gradient top */}
      <div className={`absolute inset-x-0 top-0 h-32 bg-gradient-to-b ${project.accent} pointer-events-none`} />

      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-start justify-between mb-6">
          <span className="text-[10px] tracking-[0.14em] uppercase text-white/28 font-light">
            {project.category}
          </span>
          <div className="flex items-center gap-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <a
              href={project.repo}
              className="text-[10px] tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors duration-200"
              onClick={e => e.stopPropagation()}
            >
              GitHub
            </a>
            <a
              href={project.link}
              className="text-[10px] tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors duration-200 flex items-center gap-1"
              onClick={e => e.stopPropagation()}
            >
              Demo
              <svg width="9" height="9" viewBox="0 0 10 10" fill="none">
                <path d="M1 9L9 1M9 1H3.5M9 1V6.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </a>
          </div>
        </div>

        <span className="text-[11px] text-white/20 font-light tabular-nums">{project.id}</span>
        <h3 className="text-xl md:text-2xl font-medium tracking-[-0.02em] leading-[1.2] mt-1.5 mb-4 group-hover:text-white/90 transition-colors duration-300">
          {project.title}
        </h3>
        <p className="text-[13px] leading-[1.8] text-white/42 font-light max-w-md">
          {project.description}
        </p>
      </div>

      {/* Tags */}
      <div className="relative z-10 flex flex-wrap gap-1.5 mt-8">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="text-[10px] tracking-[0.04em] text-white/28 border border-white/8 px-2.5 py-1 rounded-full group-hover:border-white/15 transition-colors duration-300 font-light"
          >
            {tag}
          </span>
        ))}
      </div>
    </article>
  )
}

export default function Projects() {
  const headerRef = useRef(null)

  useEffect(() => {
    const el = headerRef.current
    if (!el) return
    gsap.set(el.children, { opacity: 0, y: 20 })
    const st = ScrollTrigger.create({
      trigger: el,
      start: 'top 85%',
      once: true,
      onEnter: () =>
        gsap.to(el.children, {
          opacity: 1, y: 0,
          duration: 0.65, ease: 'power3.out', stagger: 0.1,
        }),
    })
    return () => st.kill()
  }, [])

  return (
    <section id="projects" className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8">
      <div className="max-w-[1400px]">

        {/* Header */}
        <div ref={headerRef} className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-10 md:mb-14">
          <div>
            <span className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">
              Projetos
            </span>
            <h2 className="text-[clamp(1.8rem,3.5vw,3rem)] font-medium tracking-[-0.02em] leading-[1.1]">
              Trabalho selecionado
            </h2>
          </div>
          <div className="flex flex-col gap-3 sm:items-end">
            <p className="text-[13px] text-white/35 max-w-[240px] leading-[1.75] font-light sm:text-right">
              Problemas reais,<br />soluções que escalam.
            </p>
            <Link
              to="/projetos"
              className="inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-white/50 hover:text-white transition-colors duration-300 group"
            >
              Ver todos os 35
              <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
                <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </Link>
          </div>
        </div>

        {/* Grid — 3 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-px bg-white/8">
          {projects.map((p, i) => (
            <ProjectCard key={p.id} project={p} index={i} />
          ))}
        </div>

        {/* CTA — ver todos */}
        <div className="mt-10 md:mt-14">
          <Link
            to="/projetos"
            className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.1em] uppercase border border-white/18 text-white px-6 py-3.5 hover:bg-white hover:text-black transition-all duration-300 group"
          >
            Ver carteira completa
            <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </Link>
        </div>

      </div>
    </section>
  )
}
