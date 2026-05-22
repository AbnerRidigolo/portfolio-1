/**
 * Floating orbital animation — replicates pierre.finance's data-float system.
 * Patterns: 1=circle, 2=figure-8, 3=organic drift
 */
import { useEffect, useRef } from 'react'

export function useFloat(pattern = 1, strength = 50) {
  const ref = useRef(null)
  const stateRef = useRef({ t: Math.random() * Math.PI * 2, prevX: null, prevY: null })

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const amp = (strength / 100) * 14
    const LERP = 0.12
    const SPEED = 0.0006

    let rafId
    let running = true

    function tick(time) {
      if (!running) return
      const state = stateRef.current
      state.t += SPEED * time * 0.016

      let tx = 0
      let ty = 0

      if (pattern === 1) {
        tx = Math.sin(state.t) * amp
        ty = Math.cos(state.t) * amp
      } else if (pattern === 2) {
        tx = Math.sin(state.t) * amp
        ty = Math.sin(state.t * 2) * amp * 0.5
      } else {
        tx = (Math.sin(state.t * 0.7) + Math.sin(state.t * 1.3)) * amp * 0.5
        ty = (Math.cos(state.t * 0.9) + Math.cos(state.t * 1.1)) * amp * 0.5
      }

      if (state.prevX === null) { state.prevX = tx; state.prevY = ty }
      state.prevX += (tx - state.prevX) * LERP
      state.prevY += (ty - state.prevY) * LERP

      el.style.transform = `translate(${state.prevX.toFixed(2)}px, ${state.prevY.toFixed(2)}px)`
      rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => { running = false; cancelAnimationFrame(rafId) }
  }, [pattern, strength])

  return ref
}
