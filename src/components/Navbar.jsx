import { useEffect, useRef, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { gsap } from 'gsap'

const navLinks = [
  { label: 'Sobre mim', to: '/#story',    type: 'hash' },
  { label: 'Projetos', to: '/projetos',  type: 'route' },
  { label: 'Serviços', to: '/#services', type: 'hash' },
  { label: 'Ask AI',   to: '/chat',      type: 'route' },
]

export default function Navbar() {
  const ref = useRef(null)
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const { pathname } = useLocation()

  useEffect(() => {
    gsap.fromTo(ref.current,
      { opacity: 0, y: -20 },
      { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out', delay: 0.1 }
    )
  }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function renderLink(link, className, onClick) {
    const active = link.type === 'route' && pathname === link.to
    const cls = typeof className === 'function' ? className(active) : className
    if (link.type === 'route') {
      return <Link to={link.to} className={cls} onClick={onClick}>{link.label}</Link>
    }
    return <a href={link.to} className={cls} onClick={onClick}>{link.label}</a>
  }

  return (
    <>
      <nav
        ref={ref}
        className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-5 md:px-10 lg:px-14 py-4 md:py-5 transition-all duration-300 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/8' : 'bg-transparent'
        }`}
      >
        {/* Logo */}
        <Link to="/" className="text-[11px] font-medium tracking-[0.16em] uppercase text-white hover:opacity-60 transition-opacity duration-200">
          Abner Ridigolo
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <span key={link.label}>
              {renderLink(
                link,
                (active) => `text-[11px] tracking-[0.1em] uppercase transition-colors duration-200 ${active ? 'text-white' : 'text-white/40 hover:text-white'}`
              )}
            </span>
          ))}
        </div>

        {/* Desktop CTA */}
        <a
          href="mailto:ridigoloabner@gmail.com"
          className="hidden md:inline-flex items-center gap-2 text-[11px] tracking-[0.1em] uppercase text-white/40 hover:text-white transition-colors duration-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-white/30" />
          ridigoloabner@gmail.com
        </a>

        {/* Mobile hamburger */}
        <button
          className="md:hidden flex flex-col justify-center items-end gap-1.5 w-8 h-8 relative z-50"
          onClick={() => setMenuOpen(v => !v)}
          aria-label="Menu"
        >
          <span className={`block h-px bg-white transition-all duration-300 origin-right ${menuOpen ? 'w-5 rotate-[-45deg] translate-y-[3px]' : 'w-5'}`} />
          <span className={`block h-px bg-white transition-all duration-300 origin-right ${menuOpen ? 'w-5 rotate-[45deg] -translate-y-[3px]' : 'w-3.5'}`} />
        </button>
      </nav>

      {/* Mobile menu overlay */}
      <div
        className={`fixed inset-0 z-40 bg-black flex flex-col justify-center px-5 transition-all duration-500 md:hidden ${
          menuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        <div className="flex flex-col gap-8">
          {navLinks.map((link, i) => (
            <span
              key={link.label}
              style={{ transitionDelay: menuOpen ? `${i * 60}ms` : '0ms' }}
            >
              {renderLink(
                link,
                'text-4xl font-medium tracking-[-0.02em] text-white hover:text-white/50 transition-colors duration-200',
                () => setMenuOpen(false)
              )}
            </span>
          ))}
          <a
            href="mailto:ridigoloabner@gmail.com"
            onClick={() => setMenuOpen(false)}
            className="text-4xl font-medium tracking-[-0.02em] text-white hover:text-white/50 transition-colors duration-200"
          >
            Contato
          </a>
        </div>
        <div className="absolute bottom-10 left-5 right-5 border-t border-white/8 pt-6">
          <span className="text-[11px] text-white/25 tracking-[0.1em] uppercase">
            © 2026 Abner Ridigolo
          </span>
        </div>
      </div>
    </>
  )
}
