import { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { navLinks } from '../data'
import { prefersReducedMotion, useTheme } from '../hooks'

const Sun = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
    <circle cx="12" cy="12" r="4" />
    <path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4" />
  </svg>
)
const Moon = () => (
  <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
  </svg>
)

export default function Navbar({ ready = true }) {
  const [active, setActive] = useState('home')
  const [open, setOpen] = useState(false)
  const [theme, toggleTheme] = useTheme()
  const bar = useRef(null)
  const indicator = useRef(null)
  const linkRefs = useRef({})
  const panel = useRef(null)
  const scrim = useRef(null)
  const themeBtn = useRef(null)

  // Entrance
  useEffect(() => {
    if (!ready || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap
        .timeline({ defaults: { ease: 'power3.out' }, delay: 0.5 })
        .from(bar.current, { y: -90, autoAlpha: 0, duration: 0.9 })
        .from('.nav-link', { y: -14, autoAlpha: 0, stagger: 0.06, duration: 0.5 }, '-=0.4')
    }, bar)
    return () => ctx.revert()
  }, [ready])

  // Scroll spy
  useEffect(() => {
    const sections = navLinks.map((l) => document.getElementById(l.id)).filter(Boolean)
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: '-45% 0px -50% 0px' }
    )
    sections.forEach((s) => io.observe(s))
    return () => io.disconnect()
  }, [])

  // Sliding indicator
  const moveIndicator = (animate = true) => {
    const el = linkRefs.current[active]
    if (!el || !indicator.current) return
    gsap.to(indicator.current, {
      x: el.offsetLeft,
      width: el.offsetWidth,
      autoAlpha: 1,
      duration: animate && !prefersReducedMotion() ? 0.55 : 0,
      ease: 'power3.out',
    })
  }
  useLayoutEffect(() => {
    moveIndicator()
  }, [active])
  useEffect(() => {
    const onResize = () => {
      moveIndicator(false)
      if (window.innerWidth > 880) setOpen(false)
    }
    window.addEventListener('resize', onResize)
    document.fonts?.ready.then(() => moveIndicator(false))
    return () => window.removeEventListener('resize', onResize)
  }, [active])

  // Mobile menu: blurred panel + blurred scrim behind it
  useEffect(() => {
    const p = panel.current
    const s = scrim.current
    if (!p || !s) return
    const items = p.querySelectorAll('a')
    gsap.killTweensOf([p, s, items])
    if (open) {
      document.body.style.overflow = 'hidden'
      gsap.set(p, { display: 'flex' })
      gsap.set(s, { display: 'block' })
      gsap.to(s, { autoAlpha: 1, duration: 0.3 })
      gsap.fromTo(p, { autoAlpha: 0, y: -16, scale: 0.97 }, { autoAlpha: 1, y: 0, scale: 1, duration: 0.35, ease: 'power3.out' })
      gsap.fromTo(items, { x: -18, autoAlpha: 0 }, { x: 0, autoAlpha: 1, stagger: 0.05, duration: 0.4, delay: 0.08, ease: 'power3.out' })
    } else {
      document.body.style.overflow = ''
      gsap.to([p, s], {
        autoAlpha: 0,
        duration: 0.2,
        onComplete: () => gsap.set([p, s], { display: 'none' }),
      })
    }
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  // Close on Escape
  useEffect(() => {
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [])

  const go = (e, id) => {
    e.preventDefault()
    setOpen(false)
    // wait a tick so body scroll-lock is released before scrolling
    setTimeout(() => {
      document.getElementById(id)?.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
      history.replaceState(null, '', `#${id}`)
    }, 30)
  }

  const onToggleTheme = () => {
    if (!prefersReducedMotion()) {
      gsap.fromTo(themeBtn.current, { rotate: 0, scale: 0.7 }, { rotate: 360, scale: 1, duration: 0.6, ease: 'back.out(1.8)' })
    }
    toggleTheme()
  }

  return (
    <>
      <header className="nav" ref={bar}>
        <a href="#home" className="brand" onClick={(e) => go(e, 'home')} aria-label="Pranav More, go to top">
          <span className="brand-mark">PM</span>
          <span className="brand-name">Pranav More</span>
        </a>

        <nav className="nav-links" aria-label="Primary">
          <span className="nav-indicator" ref={indicator} aria-hidden="true" />
          {navLinks.map((l) => (
            <a
              key={l.id}
              href={`#${l.id}`}
              ref={(el) => (linkRefs.current[l.id] = el)}
              className={`nav-link ${active === l.id ? 'is-active' : ''}`}
              aria-current={active === l.id ? 'page' : undefined}
              onClick={(e) => go(e, l.id)}
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <button
            ref={themeBtn}
            className="icon-btn"
            onClick={onToggleTheme}
            aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
          >
            {theme === 'dark' ? <Sun /> : <Moon />}
          </button>
          <button
            className={`icon-btn menu-btn ${open ? 'is-open' : ''}`}
            onClick={() => setOpen((o) => !o)}
            aria-label="Toggle menu"
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            <span />
            <span />
          </button>
        </div>
      </header>

      <div className="menu-scrim" ref={scrim} onClick={() => setOpen(false)} style={{ display: 'none' }} aria-hidden="true" />
      <nav id="mobile-menu" className="mobile-panel" ref={panel} style={{ display: 'none' }} aria-label="Mobile">
        {navLinks.map((l) => (
          <a key={l.id} href={`#${l.id}`} className={active === l.id ? 'is-active' : ''} onClick={(e) => go(e, l.id)}>
            {l.label}
          </a>
        ))}
      </nav>
    </>
  )
}
