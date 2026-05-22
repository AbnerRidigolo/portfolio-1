import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { useFloat } from '../hooks/useFloat'

export default function Hero() {
  const wrapRef = useRef(null)
  const floatRef1 = useFloat(1, 40)
  const floatRef2 = useFloat(3, 55)
  const floatRef3 = useFloat(2, 30)

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 })
      tl.fromTo('.hero-label',  { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' })
        .fromTo('.hero-title',  { opacity: 0, y: 32 }, { opacity: 1, y: 0, duration: 0.85, ease: 'power3.out' }, '-=0.35')
        .fromTo('.hero-cta',    { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, '-=0.4')
        .fromTo('.hero-email',  { opacity: 0 },         { opacity: 1, duration: 0.5, ease: 'power2.out' }, '-=0.3')
        .fromTo('.hero-scroll', { opacity: 0 },         { opacity: 1, duration: 0.6, ease: 'power2.out' }, '-=0.2')
        .fromTo('.hero-line',   { scaleX: 0 },          { scaleX: 1, duration: 1.1, ease: 'power3.inOut' }, 0)

      // looping scroll hint
      gsap.to('.hero-scroll-bar', {
        scaleY: 0.3, transformOrigin: 'top', repeat: -1, yoyo: true,
        duration: 1.1, ease: 'power1.inOut',
      })
    }, wrapRef)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={wrapRef} className="relative min-h-screen flex flex-col justify-end overflow-hidden">
      {/* Radial glow */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 15% 85%, rgba(255,255,255,0.05) 0%, transparent 65%)' }}
      />

      {/* Floating decorative nodes */}
      <div aria-hidden="true" ref={floatRef1}
        className="absolute top-[22%] right-[12%] w-1.5 h-1.5 rounded-full bg-white/20 pointer-events-none hidden md:block" />
      <div aria-hidden="true" ref={floatRef2}
        className="absolute top-[38%] right-[28%] w-2.5 h-2.5 rounded-full border border-white/15 pointer-events-none hidden md:block" />
      <div aria-hidden="true" ref={floatRef3}
        className="absolute top-[55%] right-[18%] w-1 h-1 rounded-full bg-white/30 pointer-events-none hidden md:block" />

      {/* Email — top right */}
      <a
        href="mailto:ridigoloabner@gmail.com"
        className="hero-email absolute top-20 right-5 md:right-10 lg:right-14 flex items-center gap-2 text-[11px] text-white/35 hover:text-white transition-colors duration-300 group"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-white/25 group-hover:bg-white transition-colors duration-300" />
        <span className="hidden sm:block">ridigoloabner@gmail.com</span>
        <span className="sm:hidden">Email</span>
      </a>

      {/* Content */}
      <div className="relative z-10 px-5 md:px-10 lg:px-14 pb-16 md:pb-24 max-w-[1400px]">
        <p className="hero-label text-[11px] tracking-[0.16em] uppercase text-white/30 mb-6 md:mb-8">
          Engenheiro de IA &amp; Cientista de Dados
        </p>

        <h1 className="hero-title text-[clamp(2.2rem,6vw,5.5rem)] font-medium leading-[1.08] tracking-[-0.03em] text-white mb-8 md:mb-12 max-w-[920px]">
          Inteligência que gera resultado —{' '}
          <span className="text-white/35">
            arquitetando ecossistemas de dados e soluções de IA para a empresa moderna.
          </span>
        </h1>

        <div className="hero-cta flex flex-wrap items-center gap-4 md:gap-6">
          {/* PRIMARY CTA */}
          <a
            href="mailto:ridigoloabner@gmail.com"
            className="inline-flex items-center gap-2.5 text-[11px] tracking-[0.1em] uppercase bg-white text-black px-6 py-3.5 font-medium hover:bg-white/85 active:scale-[0.98] transition-all duration-300 group"
          >
            Vamos conversar
            <svg className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" width="11" height="11" viewBox="0 0 12 12" fill="none">
              <path d="M1 11L11 1M11 1H4M11 1V8" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </a>
          {/* SECONDARY */}
          <a href="#services" className="text-[11px] tracking-[0.1em] uppercase text-white/35 hover:text-white transition-colors duration-300">
            Ver serviços
          </a>
        </div>
      </div>

      {/* Scroll indicator — bottom right */}
      <div className="hero-scroll absolute bottom-7 right-5 md:right-10 lg:right-14 hidden md:flex flex-col items-center gap-3 pointer-events-none">
        <span className="text-[10px] tracking-[0.14em] uppercase text-white/25 [writing-mode:vertical-rl]">
          Role
        </span>
        <span className="hero-scroll-bar block w-px h-10 bg-white/30" />
      </div>

      {/* Bottom divider line */}
      <div className="hero-line absolute bottom-0 left-0 right-0 h-px bg-white/8 origin-left" />
    </section>
  )
}
