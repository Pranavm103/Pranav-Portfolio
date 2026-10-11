import { useEffect, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' &&
  window.matchMedia('(prefers-reduced-motion: reduce)').matches

export function useTheme() {
  const [theme, setTheme] = useState(
    () => document.documentElement.getAttribute('data-theme') || 'dark'
  )
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme)
    try {
      localStorage.setItem('theme', theme)
    } catch (e) {}
  }, [theme])
  const toggle = () => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))
  return [theme, toggle]
}

// Reveals every [data-reveal] element inside `ref` as the section scrolls into view.
export function useReveal(ref) {
  useEffect(() => {
    if (prefersReducedMotion() || !ref.current) return
    const ctx = gsap.context(() => {
      const items = gsap.utils.toArray('[data-reveal]')
      if (!items.length) return
      gsap.set(items, { autoAlpha: 0, y: 28 })
      ScrollTrigger.batch(items, {
        start: 'top 88%',
        once: true,
        onEnter: (batch) =>
          gsap.to(batch, {
            autoAlpha: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            stagger: 0.1,
            overwrite: true,
          }),
      })
    }, ref)
    return () => ctx.revert()
  }, [ref])
}
