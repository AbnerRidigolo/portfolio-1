import { useEffect, useRef } from 'react'

const LERP = 0.13

export default function Cursor() {
  const dotRef = useRef(null)
  const mouse  = useRef({ x: -200, y: -200 })
  const pos    = useRef({ x: -200, y: -200 })
  const raf    = useRef(null)

  useEffect(() => {
    const el = dotRef.current
    if (!el) return

    const onMove = (e) => {
      mouse.current.x = e.clientX
      mouse.current.y = e.clientY
      el.style.opacity = '1'
    }
    const onLeave  = () => { el.style.opacity = '0' }
    const onOver   = (e) => { if (e.target.closest('a, button')) el.style.transform += ' scale(2)' }
    const onOut    = (e) => { /* scale reset happens in loop */ }

    document.addEventListener('mousemove', onMove)
    document.addEventListener('mouseleave', onLeave)

    const loop = () => {
      pos.current.x += (mouse.current.x - pos.current.x) * LERP
      pos.current.y += (mouse.current.y - pos.current.y) * LERP
      el.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px)`
      raf.current = requestAnimationFrame(loop)
    }
    raf.current = requestAnimationFrame(loop)

    return () => {
      document.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseleave', onLeave)
      cancelAnimationFrame(raf.current)
    }
  }, [])

  return (
    <div
      ref={dotRef}
      aria-hidden="true"
      className="fixed top-0 left-0 z-[99999] pointer-events-none will-change-transform opacity-0 hidden md:block"
      style={{ transition: 'opacity 0.3s' }}
    >
      {/* dot centrado no cursor */}
      <div className="w-2.5 h-2.5 rounded-full bg-white/70 -translate-x-1/2 -translate-y-1/2" />
    </div>
  )
}
