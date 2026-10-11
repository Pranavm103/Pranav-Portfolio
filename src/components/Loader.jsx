import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../hooks'

const LINES = ['Crafting the', 'experience']
const C = 2 * Math.PI * 46 // ring circumference (r = 46)

export default function Loader({ onReveal, onDone }) {
  const root = useRef(null)
  const count = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) {
      onReveal()
      onDone()
      return
    }
    document.body.style.overflow = 'hidden'
    window.scrollTo(0, 0)
    let cancelled = false

    const ctx = gsap.context(() => {
      const progress = { v: 0 }
      gsap.set('.ld-ring-draw', { strokeDasharray: C, strokeDashoffset: C })

      // Ambient loops (run until the loader leaves)
      gsap.to('.ld-ring-spin', { rotation: 360, svgOrigin: '50 50', duration: 14, ease: 'none', repeat: -1 })
      gsap.to('.ld-orbit', { rotation: -360, svgOrigin: '50 50', duration: 6, ease: 'none', repeat: -1 })
      gsap.to('.ld-glow', { scale: 1.18, svgOrigin: '50 50', duration: 2.2, ease: 'sine.inOut', repeat: -1, yoyo: true })

      const tl = gsap.timeline({ paused: true, onComplete: onDone })
      tl.from('.ld-mark', { scale: 0, rotate: -120, autoAlpha: 0, duration: 0.8, ease: 'back.out(2)' })
        .from('.ld-svg', { autoAlpha: 0, scale: 0.8, duration: 1, ease: 'power3.out' }, 0)
        .to('.ld-ring-draw', { strokeDashoffset: 0, duration: 2.4, ease: 'power2.inOut' }, 0.2)
        .from('.ld-char', { yPercent: 125, rotate: 8, autoAlpha: 0, duration: 0.9, stagger: 0.035, ease: 'power4.out' }, 0.35)
        .to(progress, {
          v: 100,
          duration: 2.4,
          ease: 'power2.inOut',
          onUpdate: () => {
            if (count.current) count.current.textContent = Math.round(progress.v)
          },
        }, 0.2)
        .to('.ld-bar-fill', { scaleX: 1, duration: 2.4, ease: 'power2.inOut' }, 0.2)
        // hold, then the text leaves
        .to('.ld-char', { yPercent: -125, autoAlpha: 0, duration: 0.55, stagger: 0.02, ease: 'power3.in' }, '+=0.35')
        .to('.ld-mark, .ld-svg, .ld-meta', { autoAlpha: 0, scale: 0.9, duration: 0.5, ease: 'power2.in' }, '<0.1')
        // the window opens: two halves part, the page animates in underneath
        .add(() => onReveal(), '>-0.1')
        .to('.ld-panel-top', { yPercent: -100, duration: 1.05, ease: 'power4.inOut' }, '<')
        .to('.ld-panel-bottom', { yPercent: 100, duration: 1.05, ease: 'power4.inOut' }, '<')

      // Wait briefly for web fonts so the headline doesn't jump
      Promise.race([document.fonts?.ready, new Promise((r) => setTimeout(r, 1500))]).then(() => {
        if (!cancelled) tl.play()
      })
    }, root)

    return () => {
      cancelled = true
      ctx.revert()
      document.body.style.overflow = ''
    }
  }, [])

  return (
    <div className="loader" ref={root} role="status" aria-live="polite" aria-label="Loading portfolio">
      <div className="ld-panel ld-panel-top" />
      <div className="ld-panel ld-panel-bottom" />

      <div className="ld-content">
        <svg className="ld-svg" viewBox="0 0 100 100" aria-hidden="true">
          <defs>
            <linearGradient id="ldGrad" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0" stopColor="var(--accent)" />
              <stop offset="1" stopColor="var(--accent-2)" />
            </linearGradient>
          </defs>
          <circle className="ld-glow" cx="50" cy="50" r="30" fill="url(#ldGrad)" opacity="0.12" />
          <circle className="ld-ring-spin" cx="50" cy="50" r="38" fill="none" stroke="var(--border)" strokeWidth="0.5" strokeDasharray="1.5 3.5" />
          <circle
            className="ld-ring-draw"
            cx="50" cy="50" r="46"
            fill="none" stroke="url(#ldGrad)" strokeWidth="0.7" strokeLinecap="round"
            transform="rotate(-90 50 50)"
          />
          <g className="ld-orbit">
            <circle cx="50" cy="4" r="1.5" fill="var(--accent-2)" />
            <circle cx="50" cy="96" r="1" fill="var(--accent)" />
          </g>
        </svg>

        <div className="ld-mark" aria-hidden="true">PM</div>

        <h2 className="ld-title" aria-label="Crafting the experience">
          {LINES.map((line) => (
            <span className="ld-line" key={line} aria-hidden="true">
              {line.split(' ').map((word, w) => (
                <span className="ld-word" key={w}>
                  {word.split('').map((c, i) => (
                    <span className="ld-mask" key={i}>
                      <span className="ld-char">{c}</span>
                    </span>
                  ))}
                </span>
              ))}
            </span>
          ))}
        </h2>

        <div className="ld-meta" aria-hidden="true">
          <div className="ld-bar"><span className="ld-bar-fill" /></div>
          <p className="ld-count"><span ref={count}>0</span>%</p>
        </div>
      </div>
    </div>
  )
}
