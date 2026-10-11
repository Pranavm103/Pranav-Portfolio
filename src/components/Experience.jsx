import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import Section from './Section'
import { experience, education } from '../data'
import { prefersReducedMotion } from '../hooks'

export default function Experience() {
  const tl = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion() || !tl.current) return
    const ctx = gsap.context(() => {
      gsap.fromTo(
        '.timeline-fill',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: 'none',
          scrollTrigger: { trigger: tl.current, start: 'top 70%', end: 'bottom 70%', scrub: 0.6 },
        }
      )
    }, tl)
    return () => ctx.revert()
  }, [])

  return (
    <Section id="experience" title="Experience and education" intro="Where I have worked and studied.">
      <div className="timeline" ref={tl}>
        <span className="timeline-line" aria-hidden="true">
          <span className="timeline-fill" />
        </span>
        {experience.map((e) => (
          <article className="tl-item" key={e.role} data-reveal>
            <span className="tl-dot" aria-hidden="true" />
            <div className="glass card">
              <div className="card-top">
                <div>
                  <h3>{e.role}</h3>
                  <p className="muted">{e.company}{e.place ? ` - ${e.place}` : ''}</p>
                </div>
                <span className="pill">{e.period}</span>
              </div>
              <ul className="bullets">
                {e.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
              <ul className="tags">
                {e.tech.map((t) => <li key={t}>{t}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </div>

      <h3 className="sub-title" data-reveal>Education</h3>
      <div className="edu-grid">
        {education.map((ed) => (
          <article className="glass card edu" key={ed.school} data-reveal>
            <span className="pill">{ed.period}</span>
            <h3>{ed.school}</h3>
            <p className="muted">{ed.degree}, {ed.place}</p>
            <p className="score">{ed.score}</p>
          </article>
        ))}
      </div>
    </Section>
  )
}
