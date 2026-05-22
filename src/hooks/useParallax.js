/**
 * Scroll parallax — replicates pierre.finance's data-parallax system.
 * pattern 1 = vertical inverted (moves up as you scroll down)
 * pattern 2 = vertical direct  (moves down as you scroll down)
 */
import { useEffect, useRef } from 'react'

export function useParallax(strength = 40, pattern = 1) {
  const ref = useRef(null)
  const state = useRef({ currentY: 0, targetY: 0, rect: null, ticking: false })

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const LERP = 0.1
    const k = (strength / 100) * 0.22
    let running = true

    function updateRect() {
      state.current.rect = el.getBoundingClientRect()
    }

    function onScroll() {
      const s = state.current
      const rect = el.getBoundingClientRect()
      const center = rect.top + rect.height / 2 - window.innerHeight / 2
      const dir = pattern === 1 ? -1 : 1
      s.targetY = center * k * dir
    }

    function tick() {
      if (!running) return
      const s = state.current
      s.currentY += (s.targetY - s.currentY) * LERP
      if (Math.abs(s.targetY - s.currentY) > 0.01) {
        el.style.transform = `translateY(${s.currentY.toFixed(2)}px)`
      }
      requestAnimationFrame(tick)
    }

    updateRect()
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', updateRect, { passive: true })
    requestAnimationFrame(tick)

    return () => {
      running = false
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', updateRect)
    }
  }, [strength, pattern])

  return ref
}
