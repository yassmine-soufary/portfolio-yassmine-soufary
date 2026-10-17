import Navbar from '../components/Navbar'
import BinaryRainBackground from '../components/BinaryRainBackground'
import Hero from '../components/Hero'
import TechMarquee from '../components/TechMarquee'
import About from '../components/About'
import Experience from '../components/Experience'
import Projects from '../components/Projects'
import Education from '../components/Education'
import SkillsSection from '../components/SkillsSection'
import AwardsCertifications from '../components/AwardsCertifications'
import Languages from '../components/Languages'
import AssociativeLife from '../components/AssociativeLife'
import GithubActivity from '../components/GithubActivity'
import CtaBanner from '../components/CtaBanner'
import Contact from '../components/Contact'

export default function Home() {
    return (
        <>
            <Navbar />
            <BinaryRainBackground />
            <main style={{ position: 'relative', zIndex: 1 }}>
                <Hero />
                <TechMarquee />
                <About />
                <Experience />
                <Projects />
                <Education />
                <SkillsSection />
                <AwardsCertifications />
                <Languages />
                <AssociativeLife />
                <GithubActivity />
                <CtaBanner />
                <Contact />
            </main>
        </>
    )
}
