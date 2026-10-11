import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import Section from './Section'
import { profile } from '../data'
import { prefersReducedMotion } from '../hooks'

// Default: FormSubmit (no key, needs a one-time email activation).
// Optional: set VITE_WEB3FORMS_KEY (free key from web3forms.com) to use Web3Forms instead, no activation step.
const FORMSUBMIT = `https://formsubmit.co/ajax/e72a96af86ba02942b4b9d777e69e906`
const W3_KEY = import.meta.env.VITE_WEB3FORMS_KEY

class SendError extends Error {
  constructor(message, kind = 'server') {
    super(message)
    this.kind = kind
  }
}

async function sendMessage({ name, email, message }) {
  const useW3 = Boolean(W3_KEY)
  let res
  try {
    res = await fetch(useW3 ? 'https://api.web3forms.com/submit' : FORMSUBMIT, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
      body: JSON.stringify(
        useW3
          ? { access_key: W3_KEY, subject: `New portfolio message from ${name}`, from_name: 'Portfolio website', name, email, message }
          : { name, email, message, _subject: `New portfolio message from ${name}`, _template: 'table', _captcha: 'false' }
      ),
    })
  } catch (e) {
    throw new SendError('Could not reach the mail service.', 'network')
  }

  let json = {}
  try {
    json = await res.json()
  } catch (e) {}
  const ok = res.ok && (json.success === true || String(json.success) === 'true')
  if (!ok) {
    const msg = json.message || `Request failed (${res.status}).`
    throw new SendError(msg, /activat/i.test(msg) ? 'activation' : 'server')
  }
}

export default function Contact() {
  const [sending, setSending] = useState(false)
  const [toast, setToast] = useState(null) // { type: 'success' | 'error', title, text, id }
  const form = useRef(null)
  const toastRef = useRef(null)
  const timer = useRef(null)

  const dismiss = () => {
    clearTimeout(timer.current)
    if (!toastRef.current) return setToast(null)
    gsap.to(toastRef.current, {
      autoAlpha: 0,
      y: 24,
      duration: prefersReducedMotion() ? 0 : 0.3,
      ease: 'power2.in',
      onComplete: () => setToast(null),
    })
  }

  const show = (type, title, text) => {
    clearTimeout(timer.current)
    setToast({ type, title, text, id: Date.now() })
  }

  // Animate the toast in whenever a new one appears, then auto-dismiss
  useEffect(() => {
    if (!toast || !toastRef.current) return
    gsap.fromTo(
      toastRef.current,
      { autoAlpha: 0, y: 30, scale: 0.96 },
      { autoAlpha: 1, y: 0, scale: 1, duration: prefersReducedMotion() ? 0 : 0.5, ease: 'back.out(1.6)' }
    )
    timer.current = setTimeout(dismiss, 5000)
    return () => clearTimeout(timer.current)
  }, [toast?.id])

  const onSubmit = async (e) => {
    e.preventDefault()
    const data = Object.fromEntries(new FormData(form.current))
    if (data._honey) return // spam trap, bots fill this hidden field

    setSending(true)
    try {
      await sendMessage(data)
      form.current.reset() // clear all fields
      show('success', 'Message sent', 'Thanks for reaching out. I will reply to your email soon.')
    } catch (err) {
      console.error('Contact form error:', err)
      if (err.kind === 'activation') {
        show('error', 'Form needs activation', `Open the activation email sent to ${profile.email} (check Spam), click Activate Form, then send again.`)
      } else if (err.kind === 'network') {
        show('error', 'Message not sent', `${err.message} Check your connection or ad blocker, or email ${profile.email} directly.`)
      } else {
        show('error', 'Message not sent', `${err.message} You can also email ${profile.email} directly.`)
      }
    } finally {
      setSending(false)
    }
  }

  const { github, linkedin, twitter } = profile.links

  return (
    <>
      <Section id="contact" title="Get in touch" intro="Have a role, project or question? Send a message and it will land in my inbox.">
        <div className="contact-grid">
          <div className="contact-info">
            <a className="glass card info" href={`mailto:${profile.email}`} data-reveal>
              <span className="muted">Email</span>
              <strong>{profile.email}</strong>
            </a>
            <a className="glass card info" href={`tel:${profile.phoneHref}`} data-reveal>
              <span className="muted">Phone</span>
              <strong>{profile.phone}</strong>
            </a>
            <div className="glass card info" data-reveal>
              <span className="muted">Location</span>
              <strong>{profile.location}</strong>
            </div>
            {(github || linkedin || twitter) && (
              <div className="social" data-reveal>
                {linkedin && <a href={linkedin} target="_blank" rel="noreferrer">LinkedIn</a>}
                {github && <a href={github} target="_blank" rel="noreferrer">GitHub</a>}
                {twitter && <a href={twitter} target="_blank" rel="noreferrer">X (Twitter)</a>}
              </div>
            )}
          </div>

          <form className="glass card form" ref={form} onSubmit={onSubmit} data-reveal>
            <label>
              Your name
              <input name="name" type="text" required autoComplete="name" placeholder="Jane Doe" />
            </label>
            <label>
              Your email
              <input name="email" type="email" required autoComplete="email" placeholder="jane@company.com" />
            </label>
            <label>
              Message
              <textarea name="message" rows="5" required placeholder="Tell me about the role or project" />
            </label>
            <input type="text" name="_honey" className="hp" tabIndex="-1" autoComplete="off" aria-hidden="true" />
            <button className="btn btn-primary" type="submit" disabled={sending}>
              {sending ? 'Sending...' : 'Send message'}
            </button>
          </form>
        </div>
      </Section>

      {/* Toast sits outside the section so the reveal transforms can't affect its fixed position */}
      <div className="toast-region" role="status" aria-live="polite">
        {toast && (
          <div className={`toast glass ${toast.type}`} ref={toastRef} key={toast.id}>
            <span className="toast-icon" aria-hidden="true">
              {toast.type === 'success' ? (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5" /></svg>
              ) : (
                <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2.6" strokeLinecap="round"><path d="M12 7v6M12 17h.01" /></svg>
              )}
            </span>
            <div>
              <strong>{toast.title}</strong>
              <p>{toast.text}</p>
            </div>
            <button className="toast-close" onClick={dismiss} aria-label="Dismiss notification">
              <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </div>
        )}
      </div>
    </>
  )
}
