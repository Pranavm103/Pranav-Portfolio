import Section from './Section'
import { facts, profile, certifications } from '../data'

export default function About() {
  return (
    <Section id="about" title="About me" intro="A short introduction and the basics.">
      <div className="about-grid">
        <div className="about-text" data-reveal>
          <p>{profile.summary}</p>
          <p>
            I completed my engineering degree in Electronics and Computer Engineering, then moved into
            full stack development through hands-on training and internships. My projects range from
            learning platforms to dashboards and an ECG-based research prototype.
          </p>
        </div>
        <dl className="facts glass" data-reveal>
          {facts.map((f) => (
            <div key={f.label}>
              <dt>{f.label}</dt>
              <dd>{f.value}</dd>
            </div>
          ))}
        </dl>
      </div>

      <h3 className="sub-title" data-reveal>Certifications</h3>
      <ul className="cert-grid">
        {certifications.map((c) => (
          <li className="glass cert" key={c.title} data-reveal>
            <strong>{c.title}</strong>
            <span>{c.issuer}</span>
          </li>
        ))}
      </ul>
    </Section>
  )
}
