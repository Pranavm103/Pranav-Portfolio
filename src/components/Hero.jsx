import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { profile } from '../data'
import { prefersReducedMotion } from '../hooks'

const chips = ['React', 'Node.js', 'Express', 'MongoDB', 'Tailwind']

export default function Hero({ onNav, ready = true }) {
  const root = useRef(null)

  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' }, delay: 0.45 })
      tl.from('.hero-status', { autoAlpha: 0, y: 16, duration: 0.6 })
        .from('.char', { yPercent: 110, rotate: 6, autoAlpha: 0, duration: 1, stagger: 0.045 }, '-=0.3')
        .from('.hero-role', { autoAlpha: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('.hero-copy', { autoAlpha: 0, y: 24, duration: 0.7 }, '-=0.5')
        .from('.hero-cta > *', { autoAlpha: 0, y: 20, stagger: 0.1, duration: 0.6 }, '-=0.45')
        .from('.profile-card', { autoAlpha: 0, y: 50, scale: 0.94, duration: 1.1 }, '-=1.2')
        .from('.stack-chip', { autoAlpha: 0, scale: 0.6, stagger: 0.08, duration: 0.5, ease: 'back.out(2)' }, '-=0.5')

      // Idle float on the profile card, parallax on mouse move
      gsap.to('.profile-card-inner', { y: -10, duration: 3.2, ease: 'sine.inOut', repeat: -1, yoyo: true })
      gsap.utils.toArray('.stack-chip').forEach((c, i) =>
        gsap.to(c, { y: i % 2 ? 8 : -8, duration: 2.4 + i * 0.3, ease: 'sine.inOut', repeat: -1, yoyo: true })
      )

      const card = root.current.querySelector('.profile-card')
      const rx = gsap.quickTo(card, 'rotationY', { duration: 0.6, ease: 'power3' })
      const ry = gsap.quickTo(card, 'rotationX', { duration: 0.6, ease: 'power3' })
      const move = (e) => {
        const r = root.current.getBoundingClientRect()
        rx(((e.clientX - r.left) / r.width - 0.5) * 12)
        ry(-((e.clientY - r.top) / r.height - 0.5) * 12)
      }
      if (window.matchMedia('(pointer: fine)').matches) {
        root.current.addEventListener('mousemove', move)
      }
    }, root)
    return () => ctx.revert()
  }, [ready])

  return (
    <section id="home" className="hero" ref={root}>
      <div className="container hero-grid">
        <div className="hero-text">
          <p className="hero-status">
            <span className="pulse" /> Open to full-time roles
          </p>
          <h1 className="hero-title" aria-label={profile.name}>
            {profile.name.split(' ').map((word, w) => (
              <span className="word" key={w} aria-hidden="true">
                {word.split('').map((c, i) => (
                  <span className="char-mask" key={i}>
                    <span className="char">{c}</span>
                  </span>
                ))}
              </span>
            ))}
          </h1>
          <p className="hero-role">{profile.role}</p>
          <p className="hero-copy">{profile.summary}</p>
          <div className="hero-cta">
            <a href="#projects" className="btn btn-primary" onClick={(e) => onNav(e, 'projects')}>
              View my work
            </a>
            <a href="#contact" className="btn btn-ghost" onClick={(e) => onNav(e, 'contact')}>
              Contact me
            </a>
            <a href="/Pranav_More_Resume.pdf" className="btn btn-link" download>
              Download resume
            </a>
          </div>
        </div>

        <div className="hero-visual">
          <div className="profile-card glass">
            <div className="profile-card-inner">
              <div className="photo">
                <img src="/pranav.jpg" alt="Portrait of Pranav More" width="250" height="330" />
              </div>
              <div>
                <p className="pc-name">{profile.name}</p>
                <p className="pc-sub">MERN Stack Developer</p>
              </div>
              <ul className="pc-list">
                <li><span>Location</span>{profile.location}</li>
                <li><span>Latest project</span>CourseCraft AI</li>
              </ul>
            </div>
          </div>
          {chips.map((c, i) => (
            <span key={c} className={`stack-chip glass chip-${i}`} aria-hidden="true">{c}</span>
          ))}
        </div>
      </div>
      <a href="#about" className="scroll-hint" onClick={(e) => onNav(e, 'about')} aria-label="Scroll to About">
        <span />
      </a>
    </section>
  )
}
