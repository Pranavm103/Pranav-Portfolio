import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { prefersReducedMotion } from '../hooks'

export default function Background() {
  const root = useRef(null)

  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.utils.toArray('.orb').forEach((orb, i) => {
        gsap.to(orb, {
          x: gsap.utils.random(-120, 120),
          y: gsap.utils.random(-90, 90),
          scale: gsap.utils.random(0.9, 1.25),
          duration: gsap.utils.random(9, 14),
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
          delay: i * 0.6,
        })
      })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <div className="bg" ref={root} aria-hidden="true">
      <span className="orb orb-a" />
      <span className="orb orb-b" />
      <span className="orb orb-c" />
      <span className="grain" />
    </div>
  )
}
