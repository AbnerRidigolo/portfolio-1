import {
  SiPython, SiTensorflow, SiPytorch, SiScikitlearn,
  SiPandas, SiNumpy, SiJupyter, SiMlflow, SiOpenai,
  SiApachespark, SiApacheairflow, SiApachekafka,
  SiSnowflake, SiDatabricks, SiDocker, SiKubernetes,
  SiGooglecloud, SiPostgresql,
} from 'react-icons/si'
import { useScrollReveal } from '../hooks/useScrollReveal'

/* ── Core tool lists ── */
const row1 = [
  { icon: SiPython,      name: 'Python' },
  { icon: SiTensorflow,  name: 'TensorFlow' },
  { icon: SiPytorch,     name: 'PyTorch' },
  { icon: SiScikitlearn, name: 'scikit-learn' },
  { icon: SiPandas,      name: 'Pandas' },
  { icon: SiNumpy,       name: 'NumPy' },
  { icon: SiOpenai,      name: 'OpenAI' },
  { icon: SiMlflow,      name: 'MLflow' },
  { icon: SiJupyter,     name: 'Jupyter' },
]

const row2 = [
  { icon: SiApachespark,   name: 'Apache Spark' },
  { icon: SiApacheairflow, name: 'Airflow' },
  { icon: SiApachekafka,   name: 'Kafka' },
  { icon: SiSnowflake,     name: 'Snowflake' },
  { icon: SiDatabricks,    name: 'Databricks' },
  { icon: SiDocker,        name: 'Docker' },
  { icon: SiKubernetes,    name: 'Kubernetes' },
  { icon: SiGooglecloud,   name: 'GCP' },
  { icon: null,            name: 'AWS' },
  { icon: SiPostgresql,    name: 'PostgreSQL' },
]

function ToolItem({ icon: Icon, name }) {
  return (
    <div className="flex items-center gap-2 px-4 md:px-5 border-r border-white/8 group cursor-default" style={{ minWidth: 'max-content' }}>
      {Icon
        ? <Icon className="w-[15px] h-[15px] flex-shrink-0 text-white/30 group-hover:text-white/70 transition-colors duration-300" />
        : <span className="w-[15px] h-[15px] flex-shrink-0 flex items-center justify-center text-[7px] font-bold text-white/30 group-hover:text-white/70 transition-colors duration-300 leading-none">{name.slice(0,2).toUpperCase()}</span>
      }
      <span className="text-[11px] tracking-[0.05em] text-white/28 group-hover:text-white/62 transition-colors duration-300 whitespace-nowrap font-light">
        {name}
      </span>
    </div>
  )
}

function MarqueeRow({ items, direction = 'left', duration = '36s' }) {
  const doubled = [...items, ...items]
  return (
    <div className="marquee-track overflow-hidden" style={{ '--marquee-duration': duration }}>
      <div className={`flex w-max ${direction === 'left' ? 'marquee-left' : 'marquee-right'}`}>
        {doubled.map((tool, i) => <ToolItem key={i} {...tool} />)}
      </div>
    </div>
  )
}

export default function ToolsMarquee() {
  const ref = useScrollReveal('[data-reveal]', 0.1)

  return (
    <section ref={ref} className="border-b border-white/8 overflow-hidden">
      <div className="flex items-stretch">

        {/* Left label */}
        <div
          data-reveal
          className="flex-shrink-0 flex flex-col justify-center px-5 md:px-8 border-r border-white/8"
          style={{ minWidth: 'clamp(90px, 10vw, 130px)' }}
        >
          <span className="text-[10px] tracking-[0.12em] uppercase text-white/28 leading-[1.7]">
            Ferramentas<br className="hidden sm:block" /> que domino
          </span>
        </div>

        {/* Two marquee rows */}
        <div className="flex-1 min-w-0 flex flex-col divide-y divide-white/8">
          <div className="py-4">
            <MarqueeRow items={row1} direction="left"  duration="38s" />
          </div>
          <div className="py-4">
            <MarqueeRow items={row2} direction="right" duration="44s" />
          </div>
        </div>

      </div>
    </section>
  )
}
