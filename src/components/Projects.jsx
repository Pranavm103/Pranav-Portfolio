import { useRef } from 'react'
import { gsap } from 'gsap'
import Section from './Section'
import { projects } from '../data'
import { prefersReducedMotion } from '../hooks'

function ProjectCard({ p }) {
  const ref = useRef(null)
  const fine = typeof window !== 'undefined' && window.matchMedia('(pointer: fine)').matches

  const onMove = (e) => {
    if (!fine || prefersReducedMotion()) return
    const r = ref.current.getBoundingClientRect()
    const px = (e.clientX - r.left) / r.width - 0.5
    const py = (e.clientY - r.top) / r.height - 0.5
    gsap.to(ref.current, { rotationY: px * 8, rotationX: -py * 8, transformPerspective: 900, duration: 0.5, ease: 'power3.out' })
    ref.current.style.setProperty('--mx', `${(px + 0.5) * 100}%`)
    ref.current.style.setProperty('--my', `${(py + 0.5) * 100}%`)
  }
  const onLeave = () =>
    gsap.to(ref.current, { rotationX: 0, rotationY: 0, duration: 0.7, ease: 'elastic.out(1, 0.6)' })

  return (
    <article className={`glass card project ${p.featured ? '' : 'is-compact'}`} ref={ref} onMouseMove={onMove} onMouseLeave={onLeave} data-reveal>
      <div className="card-top">
        <p className="muted">{p.kind}</p>
        {p.period && <span className="pill">{p.period}</span>}
      </div>
      <h3>{p.title}</h3>
      <p>{p.description}</p>
      {p.highlights?.length > 0 && (
        <ul className="highlights">
          {p.highlights.map((h) => <li key={h}>{h}</li>)}
        </ul>
      )}
      <ul className="tags">
        {p.tech.map((t) => <li key={t}>{t}</li>)}
      </ul>
      {(p.github || p.live) && (
        <div className="project-links">
          {p.github && <a href={p.github} target="_blank" rel="noreferrer">Source code</a>}
          {p.live && <a href={p.live} target="_blank" rel="noreferrer">Live demo</a>}
        </div>
      )}
    </article>
  )
}

export default function Projects() {
  const featured = projects.filter((p) => p.featured)
  const more = projects.filter((p) => !p.featured)
  return (
    <Section id="projects" title="Projects" intro="Selected work, from full stack apps to applied AI.">
      <div className="project-grid">
        {featured.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
      <h3 className="sub-title" data-reveal>More projects</h3>
      <div className="project-grid">
        {more.map((p) => <ProjectCard key={p.title} p={p} />)}
      </div>
    </Section>
  )
}
