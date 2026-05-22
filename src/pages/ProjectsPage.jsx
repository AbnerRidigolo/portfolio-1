import { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import {
  PROJECTS, CATEGORY_LABELS, SECTOR_LABELS, DIFFICULTY_LABELS,
  CATEGORY_FILTERS, SECTOR_FILTERS,
} from '../data/projects'
import { useScrollReveal } from '../hooks/useScrollReveal'

const DIFF_DOT = {
  facil:   'bg-[#5fb88f]',
  medio:   'bg-[#d9b25f]',
  dificil: 'bg-[#d97a6c]',
}

function FilterRow({ title, options, value, onChange }) {
  return (
    <div className="flex flex-col gap-3">
      <span className="text-[11px] tracking-[0.16em] uppercase text-white/30">{title}</span>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => {
          const active = value === o.slug
          return (
            <button
              key={o.slug}
              onClick={() => onChange(o.slug)}
              className={`text-[12px] tracking-[0.02em] rounded-full px-3.5 py-1.5 border transition-all duration-200 ${
                active
                  ? 'bg-white text-black border-white'
                  : 'text-white/45 border-white/15 hover:text-white hover:border-white/35'
              }`}
            >
              {o.label}
            </button>
          )
        })}
      </div>
    </div>
  )
}

function ProjectRow({ p }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-[3rem_1fr_15rem] gap-4 md:gap-8 items-start py-7 border-b border-white/8 hover:bg-white/[0.02] transition-colors duration-300 px-2 -mx-2">
      <span className="hidden md:block text-[12px] text-white/25 tabular-nums pt-1">{p.n}</span>
      <div className="flex flex-col gap-2.5">
        <span className="text-[10px] tracking-[0.14em] uppercase text-white/30">{CATEGORY_LABELS[p.category]}</span>
        <h3 className="text-[17px] md:text-[19px] font-medium tracking-[-0.015em] leading-[1.25] text-white/90">{p.title}</h3>
        <div className="flex flex-wrap gap-1.5 mt-1">
          {p.tech.map((t) => (
            <span key={t} className="text-[10px] tracking-[0.03em] text-white/35 border border-white/10 rounded-full px-2.5 py-1 font-light">{t}</span>
          ))}
        </div>
      </div>
      <div className="flex flex-col md:items-end gap-2.5">
        <span className="inline-flex items-center gap-2 text-[11px] text-white/65 border border-white/12 rounded-full px-3 py-1">
          <span className={`w-[7px] h-[7px] rounded-full ${DIFF_DOT[p.difficulty]}`} />
          {DIFFICULTY_LABELS[p.difficulty]}
        </span>
        <div className="flex flex-wrap gap-1.5 md:justify-end">
          {p.sectors.map((s) => (
            <span key={s} className="text-[10px] tracking-[0.02em] text-white/35 bg-white/[0.04] border border-white/8 rounded-full px-2.5 py-1">{SECTOR_LABELS[s]}</span>
          ))}
        </div>
      </div>
    </div>
  )
}

export default function ProjectsPage() {
  const [cat, setCat] = useState('all')
  const [sec, setSec] = useState('all')
  const headerRef = useScrollReveal('[data-reveal]', 0.08)

  const filtered = useMemo(
    () => PROJECTS.filter(
      (p) => (cat === 'all' || p.category === cat) && (sec === 'all' || p.sectors.includes(sec))
    ),
    [cat, sec]
  )

  const counts = useMemo(() => ({
    facil: PROJECTS.filter((p) => p.difficulty === 'facil').length,
    medio: PROJECTS.filter((p) => p.difficulty === 'medio').length,
    dificil: PROJECTS.filter((p) => p.difficulty === 'dificil').length,
  }), [])

  return (
    <main className="px-5 md:px-10 lg:px-14 pt-32 md:pt-40 pb-24 md:pb-32">
      <div className="max-w-[1400px] mx-auto">

        {/* Header */}
        <div ref={headerRef} className="mb-12 md:mb-16">
          <span data-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-4">Carteira</span>
          <h1 data-reveal className="text-[clamp(2rem,5vw,4rem)] font-medium tracking-[-0.03em] leading-[1.08] max-w-3xl">
            Projetos de IA, Dados e Engenharia de Dados.
          </h1>
          <p data-reveal className="text-[14.5px] leading-[1.8] text-white/45 font-light max-w-xl mt-6">
            Uma seleção de soluções end-to-end que entrego como consultoria solo —
            de modelos de machine learning a pipelines de dados e agentes de IA generativa.
            Filtre por categoria ou setor para explorar.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-px bg-white/8 mb-12 md:mb-16">
          {[
            { v: '35', l: 'Projetos no total' },
            { v: String(counts.facil).padStart(2, '0'), l: 'Fácil' },
            { v: String(counts.medio).padStart(2, '0'), l: 'Médio' },
            { v: String(counts.dificil).padStart(2, '0'), l: 'Difícil' },
          ].map((s) => (
            <div key={s.l} className="bg-black flex flex-col gap-2 py-7 px-6">
              <span className="text-[clamp(1.8rem,3.5vw,2.6rem)] font-medium tracking-[-0.03em] leading-none">{s.v}</span>
              <span className="text-[12px] text-white/35 font-light">{s.l}</span>
            </div>
          ))}
        </div>

        {/* Filters */}
        <div className="flex flex-col gap-6 mb-8">
          <FilterRow title="Categoria" options={CATEGORY_FILTERS} value={cat} onChange={setCat} />
          <FilterRow title="Setor" options={SECTOR_FILTERS} value={sec} onChange={setSec} />
        </div>

        {/* Count */}
        <p className="text-[12.5px] text-white/40 font-light mb-2">
          Mostrando <strong className="text-white font-medium">{filtered.length}</strong> de {PROJECTS.length} projetos
        </p>

        {/* List */}
        <div className="border-t border-white/8">
          {filtered.length > 0
            ? filtered.map((p) => <ProjectRow key={p.n} p={p} />)
            : <p className="py-12 text-white/40 font-light text-[14px]">Nenhum projeto combina com esses filtros.</p>}
        </div>

        {/* CTA */}
        <div className="mt-16 flex flex-wrap items-center gap-4">
          <Link
            to="/chat"
            className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.1em] uppercase bg-white text-black px-6 py-3.5 font-medium hover:bg-white/85 active:scale-[0.98] transition-all duration-300"
          >
            Pergunte ao assistente AI
          </Link>
          <a href="mailto:ridigoloabner@gmail.com" className="text-[11px] tracking-[0.1em] uppercase text-white/35 hover:text-white transition-colors duration-300">
            Falar com o Abner
          </a>
        </div>

      </div>
    </main>
  )
}
