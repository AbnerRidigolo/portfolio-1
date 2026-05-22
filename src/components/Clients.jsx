import { useRef, useEffect } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const clients = ['Google', 'NVIDIA', 'IBM', 'Salesforce', 'Intel', 'Microsoft', 'Amazon', 'Adobe', 'Oracle', 'SAP']

export default function Clients() {
  const sectionRef = useRef(null)
  const labelRef = useRef(null)
  const gridRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(labelRef.current, { opacity: 0, y: 14 })
      gsap.set(gridRef.current.children, { opacity: 0, y: 16 })

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: 'top 85%',
        once: true,
        onEnter: () => {
          gsap.to(labelRef.current, { opacity: 1, y: 0, duration: 0.55, ease: 'power3.out' })
          gsap.to(gridRef.current.children, {
            opacity: 1, y: 0, duration: 0.5, ease: 'power3.out',
            stagger: 0.045, delay: 0.1,
          })
        },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section ref={sectionRef} className="px-5 md:px-10 lg:px-14 py-20 md:py-28 border-b border-white/8">
      <div className="max-w-[1400px]">
        <span ref={labelRef} className="text-[11px] tracking-[0.16em] uppercase text-white/30 block mb-8 md:mb-10">
          Empresas que confiam
        </span>

        <div ref={gridRef} className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-y-4 gap-x-4">
          {clients.map(name => (
            <span
              key={name}
              className="text-[15px] font-light text-white/28 hover:text-white/65 transition-colors duration-300 cursor-default"
            >
              {name}
            </span>
          ))}
        </div>
      </div>
    </section>
  )
}
