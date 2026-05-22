import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Staggered fade-up reveal on scroll using GSAP ScrollTrigger.
 * Pass a CSS selector string to target children, or leave blank for the element itself.
 */
export function useScrollReveal(childSelector = null, stagger = 0.1) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const targets = childSelector ? gsap.utils.toArray(el.querySelectorAll(childSelector)) : [el]
    if (!targets.length) return

    gsap.set(targets, { opacity: 0, y: 28 })

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: el,
        start: 'top 85%',
        once: true,
      },
    })

    tl.to(targets, {
      opacity: 1,
      y: 0,
      duration: 0.75,
      ease: 'power3.out',
      stagger,
    })

    return () => {
      tl.kill()
      ScrollTrigger.getAll().forEach(st => {
        if (st.trigger === el) st.kill()
      })
    }
  }, [childSelector, stagger])

  return ref
}
