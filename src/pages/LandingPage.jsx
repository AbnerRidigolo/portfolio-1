import Hero from '../components/Hero'
import PainPoints from '../components/PainPoints'
import Services from '../components/Services'
import Process from '../components/Process'
import Projects from '../components/Projects'
import Feature from '../components/Feature'
import Story from '../components/Story'
import ToolsMarquee from '../components/ToolsMarquee'
import Clients from '../components/Clients'
import Testimonials from '../components/Testimonials'
import Footer from '../components/Footer'

export default function LandingPage() {
  return (
    <>
      <main>
        <Hero />
        <PainPoints />
        <Services />
        <Process />
        <Projects />
        <Feature />
        <Story />
        <ToolsMarquee />
        <Clients />
        <Testimonials />
      </main>
      <Footer />
    </>
  )
}
