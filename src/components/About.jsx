import { useScrollReveal } from '../hooks/useScrollReveal'
import { useParallax } from '../hooks/useParallax'
import { useFloat } from '../hooks/useFloat'

function AbstractArt() {
  return (
    <svg viewBox="0 0 560 560" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        <radialGradient id="ab-bg" cx="50%" cy="50%" r="70%">
          <stop offset="0%" stopColor="#1a1a1a" />
          <stop offset="100%" stopColor="#000" />
        </radialGradient>
      </defs>
      <rect width="560" height="560" fill="url(#ab-bg)" />
      <g stroke="#ffffff" strokeWidth="0.5" fill="none" opacity="0.15">
        {[0,22,44,66,88,110,132,154,176].map((o, i) => (
          <path key={i} d={`M0,${238+o} C100,${208+o} 200,${268+o} 280,${238+o} S460,${208+o} 560,${238+o}`} />
        ))}
      </g>
      <g stroke="#ffffff" strokeWidth="0.7" opacity="0.28">
        <line x1="90" y1="170" x2="280" y2="130" /><line x1="280" y1="130" x2="470" y2="210" />
        <line x1="470" y1="210" x2="380" y2="380" /><line x1="380" y1="380" x2="180" y2="400" />
        <line x1="180" y1="400" x2="90" y2="290" /><line x1="90" y1="290" x2="280" y2="295" />
        <line x1="280" y1="295" x2="380" y2="380" /><line x1="280" y1="130" x2="280" y2="295" />
        <line x1="185" y1="80" x2="280" y2="130" /><line x1="420" y1="80" x2="280" y2="130" />
        <line x1="520" y1="130" x2="470" y2="210" /><line x1="140" y1="460" x2="280" y2="295" />
        <line x1="470" y1="400" x2="380" y2="380" />
      </g>
      <g fill="#ffffff">
        <circle cx="90" cy="170" r="4" /><circle cx="280" cy="130" r="6.5" />
        <circle cx="470" cy="210" r="5" /><circle cx="380" cy="380" r="7.5" />
        <circle cx="180" cy="400" r="4" /><circle cx="90" cy="290" r="4" />
        <circle cx="280" cy="295" r="5.5" /><circle cx="140" cy="460" r="3.5" />
        <circle cx="470" cy="400" r="4" />
      </g>
      <g fill="none" stroke="#ffffff" strokeWidth="0.7" opacity="0.18">
        <rect x="46" y="46" width="34" height="34" />
        <rect x="460" y="42" width="28" height="28" />
        <rect x="490" y="450" width="24" height="24" />
        <rect x="28" y="468" width="20" height="20" />
      </g>
    </svg>
  )
}

export default function About() {
  const sectionRef = useScrollReveal('[data-reveal]', 0.09)
  const parallaxRef = useParallax(35, 1)
  const floatNodeRef = useFloat(3, 45)

  return (
    <section id="about" ref={sectionRef} className="px-5 md:px-10 lg:px-14 py-24 md:py-32 lg:py-40 border-b border-white/8">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 md:gap-16 lg:gap-24 items-center max-w-[1400px]">

        {/* Image with parallax */}
        <div data-reveal className="relative">
          <div ref={parallaxRef} className="aspect-square bg-[#0a0a0a] rounded-sm overflow-hidden border border-white/8 will-change-transform">
            <AbstractArt />
          </div>
          {/* Floating accent node */}
          <div ref={floatNodeRef}
            aria-hidden="true"
            className="absolute -bottom-4 -right-4 w-3 h-3 rounded-full border border-white/20 hidden md:block will-change-transform"
          />
        </div>

        {/* Text */}
        <div className="flex flex-col gap-5 md:gap-6">
          <span data-reveal className="text-[11px] tracking-[0.16em] uppercase text-white/30">About</span>

          <h2 data-reveal className="text-[clamp(2rem,4vw,3.5rem)] font-medium tracking-[-0.02em] leading-[1.08]">
            Abner Ridigolo
          </h2>

          <p data-reveal className="text-sm text-white/35 -mt-1">
            AI Engineer &amp; Data Scientist
          </p>

          <p data-reveal className="text-[15px] leading-[1.85] text-white/55 max-w-md font-light">
            My philosophy is to demystify complex technologies and partner with
            businesses to build robust, data-driven systems that unlock tangible
            value. I craft custom ML models and optimize data pipelines for
            sustainable growth.
          </p>

          <p data-reveal className="text-[15px] leading-[1.85] text-white/55 max-w-md font-light">
            With deep expertise in machine learning, large language models, and
            scalable data infrastructure, I bridge the gap between cutting-edge
            research and real-world enterprise solutions.
          </p>

          <div data-reveal className="flex flex-wrap gap-2 pt-1">
            {['Machine Learning', 'Data Engineering', 'LLM / RAG', 'AI Strategy', 'Cloud Infra'].map(tag => (
              <span
                key={tag}
                className="text-[11px] tracking-[0.04em] text-white/35 border border-white/10 px-3 py-1.5 rounded-full hover:border-white/25 hover:text-white/60 transition-all duration-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
