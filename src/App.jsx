import { useEffect, useState } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Loader from './components/Loader'
import Background from './components/Background'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import About from './components/About'
import Experience from './components/Experience'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Contact from './components/Contact'
import { profile } from './data'
import { prefersReducedMotion } from './hooks'

export default function App() {
  const [showLoader, setShowLoader] = useState(true)
  const [ready, setReady] = useState(false)

  const go = (e, id) => {
    e.preventDefault()
    document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh()
    window.addEventListener('load', refresh)
    return () => window.removeEventListener('load', refresh)
  }, [])

  return (
    <>
      {showLoader && <Loader onReveal={() => setReady(true)} onDone={() => setShowLoader(false)} />}
      <Background />
      <Navbar ready={ready} />
      <main>
        <Hero onNav={go} ready={ready} />
        <About />
        <Experience />
        <Projects />
        <Skills />
        <Contact />
      </main>
      <footer className="footer">
        <div className="container">
          <p>{profile.tagline}</p>
          <p>&copy; {new Date().getFullYear()} {profile.name}. Built with React and GSAP.</p>
        </div>
      </footer>
    </>
  )
}
