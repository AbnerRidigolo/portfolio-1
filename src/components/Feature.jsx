import { useRef, useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { LuCheck } from 'react-icons/lu'

gsap.registerPlugin(ScrollTrigger)

const bullets = [
  'Otimização de queries complexas para extração em larga escala',
  'Automação de indicadores de performance comercial em tempo real',
  'Integrações seguras via API e Procedimentos PL/SQL de alta performance',
]

const SQL = `SELECT
    v.id,
    u.name,
    SUM(v.total_sales) AS revenue
FROM operations v
JOIN users u ON v.user_id = u.id
WHERE v.status = 'COMPLETED'
GROUP BY v.id, u.name
ORDER BY revenue DESC;

// Analytics pipeline: [OK]
// Integrity check: [SUCCESS]`

function lineClass(line) {
  const t = line.trim()
  if (t === '') return ''
  if (t.startsWith('//')) return 'text-white/28'
  if (/^(SELECT|FROM|JOIN|WHERE|GROUP|ORDER|HAVING|LIMIT)/i.test(t)) return 'text-white/85'
  return 'text-white/50'
}

function CodeEditor({ active }) {
  const [charCount, setCharCount] = useState(0)
  const [done, setDone] = useState(false)
  const timerRef = useRef(null)

  useEffect(() => {
    if (!active) return
    let i = 0
    timerRef.current = setInterval(() => {
      i++
      setCharCount(i)
      if (i >= SQL.length) {
        clearInterval(timerRef.current)
        setDone(true)
      }
    }, 22)
    return () => clearInterval(timerRef.current)
  }, [active])

  const lines = SQL.slice(0, charCount).split('\n')

  return (
    <div className="bg-[#0a0a0a] rounded-2xl border border-white/8 overflow-hidden">
      {/* title bar */}
      <div className="flex items-center gap-2 px-4 py-3.5 bg-[#111] border-b border-white/6">
        <span className="w-3 h-3 rounded-full bg-white/18" />
        <span className="w-3 h-3 rounded-full bg-white/10" />
        <span className="w-3 h-3 rounded-full bg-white/6" />
        <span className="ml-3 font-mono text-[11px] tracking-[0.08em] uppercase text-white/22">
          query_engine.sql
        </span>
      </div>

      {/* code */}
      <div className="p-6 md:p-8 font-mono text-[12.5px] md:text-[13px] leading-[2] overflow-x-auto min-h-[248px]">
        <pre className="whitespace-pre-wrap">
          {lines.map((line, i) => (
            <span key={i} className={lineClass(line)}>
              {i > 0 && '\n'}{line}
            </span>
          ))}
          <span
            className={`inline-block w-[2px] h-[14px] bg-white/55 ml-px align-[-2px] ${
              done ? 'animate-pulse' : ''
            }`}
          />
        </pre>
      </div>
    </div>
  )
}

export default function Feature() {
  const sectionRef = useRef(null)
  const textRef    = useRef(null)
  const editorRef  = useRef(null)
  const [typing, setTyping] = useState(false)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set('[data-feat]', { opacity: 0, y: 22 })
      ScrollTrigger.create({
        trigger: textRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () =>
          gsap.to('[data-feat]', {
            opacity: 1, y: 0,
            duration: 0.7, ease: 'power3.out', stagger: 0.09,
          }),
      })

      gsap.set(editorRef.current, { opacity: 0, x: 30 })
      ScrollTrigger.create({
        trigger: editorRef.current,
        start: 'top 88%',
        once: true,
        onEnter: () =>
          gsap.to(editorRef.current, {
            opacity: 1, x: 0,
            duration: 0.8, ease: 'power3.out',
            onComplete: () => setTyping(true),
          }),
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8"
    >
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16 lg:gap-24 items-center max-w-[1400px] mx-auto">

        {/* Left */}
        <div ref={textRef} className="flex flex-col gap-6">
          <span data-feat className="text-[11px] tracking-[0.16em] uppercase text-white/30">
            Deep Engineering
          </span>

          <h2 data-feat className="text-[clamp(2rem,4vw,3.4rem)] tracking-[-0.025em] leading-[1.1]">
            <span className="font-medium">Arquitetura de Dados</span><br />
            <span className="font-medium">de </span><span className="font-bold text-white">Alta Performance.</span>
          </h2>

          <p data-feat className="text-[14.5px] leading-[1.85] text-white/45 font-light max-w-[440px]">
            Conheço a fundo a lógica de negócio dos principais sistemas corporativos.
            Do fiscal ao comercial, sei exatamente onde os dados moram e como extraí-los
            sem impactar a performance do seu servidor.
          </p>

          <ul data-feat className="flex flex-col gap-4 mt-1">
            {bullets.map((b, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="mt-[3px] flex-shrink-0 w-5 h-5 rounded-full bg-white/5 border border-white/12 flex items-center justify-center">
                  <LuCheck className="w-2.5 h-2.5 text-white/55" />
                </span>
                <span className="text-[13.5px] leading-[1.7] text-white/55 font-light">{b}</span>
              </li>
            ))}
          </ul>

          <a
            data-feat
            href="mailto:ridigoloabner@gmail.com"
            className="inline-flex items-center gap-2.5 w-fit mt-2 text-[11px] tracking-[0.1em] uppercase border border-white/18 text-white px-5 py-3 hover:bg-white hover:text-black transition-all duration-300 group"
          >
            Fale comigo
            <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
        </div>

        {/* Right */}
        <div ref={editorRef} className="will-change-transform">
          <CodeEditor active={typing} />
        </div>

      </div>
    </section>
  )
}
