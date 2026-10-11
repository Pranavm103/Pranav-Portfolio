import { useRef } from 'react'
import { useReveal } from '../hooks'

export default function Section({ id, title, intro, children, className = '' }) {
  const ref = useRef(null)
  useReveal(ref)
  return (
    <section id={id} className={`section ${className}`} ref={ref}>
      <div className="container">
        <header className="section-head">
          <h2 data-reveal>{title}</h2>
          {intro && <p data-reveal>{intro}</p>}
        </header>
        {children}
      </div>
    </section>
  )
}
