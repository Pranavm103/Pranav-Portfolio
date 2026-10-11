import Section from './Section'
import { skills } from '../data'

export default function Skills() {
  return (
    <Section id="skills" title="Skills" intro="The tools I use day to day.">
      <div className="skill-grid">
        {skills.map((s) => (
          <div className="glass card skill" key={s.group} data-reveal>
            <h3>{s.group}</h3>
            <ul className="tags">
              {s.items.map((i) => <li key={i}>{i}</li>)}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  )
}
