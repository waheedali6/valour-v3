'use client'

import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'
import SplitType from 'split-type'

gsap.registerPlugin(ScrollTrigger)

export default function KnowSec() {
  const sectionRef  = useRef(null)
  const frameNumRef = useRef(null)

  useEffect(() => {
    if (typeof window === 'undefined') return

    const section = sectionRef.current
    if (!section) return
    
    let mounted = true
    let timeoutId
    let innerCleanup = null

    const setupAnimations = () => {
      if (!mounted) return

      const scroller = document.getElementById('main-scroller')
      if (!scroller) {
        timeoutId = setTimeout(setupAnimations, 100)
        return
      }

      const triggers = []

    // =========================
    // SPLIT TEXT
    // =========================
    const heading = new SplitType('.know-big-h', { types: 'lines,words,chars' })
    const paragraph = new SplitType('.know-para-text', { types: 'chars' })

    heading.lines?.forEach((line) => {
      line.style.overflow = 'hidden'
      line.style.display = 'block'
    })

    // =========================
    // INITIAL STATES
    // =========================

    const buttonEl = section.querySelector('.know-btn')

    // Heading chars
    heading.chars?.forEach((char) => {
      Object.assign(char.style, {
        opacity: '0',
        transform: 'translateY(110%) rotateZ(4deg)',
        display: 'inline-block',
        transition: 'none',
        willChange: 'transform, opacity',
      })
    })

    // Paragraph chars
    paragraph.chars?.forEach((char) => {
      Object.assign(char.style, {
        opacity: '0',
        transform: 'translateY(30px)',
        display: 'inline-block',
        transition: 'none',
        willChange: 'transform, opacity',
      })
    })

    // Button
    if (buttonEl) {
      Object.assign(buttonEl.style, {
        opacity: '0',
        transform: 'translateY(30px)',
        transition: 'none',
        willChange: 'transform, opacity',
      })
    }

    // ── 1. BG parallax ─────────────────────────────────────────────
// const bgEl = document.createElement('div')
// bgEl.className = 'know-bg-layer'
// section.prepend(bgEl)

// const bg = gsap.fromTo(bgEl,
//   { yPercent: -15 },
//   {
//     yPercent: 15,
//     ease: 'none',
//     scrollTrigger: {
//           scroller: '#main-scroller',
//       trigger: section,
//       start: 'top bottom',
//       end: 'bottom top',
//       scrub: 1.5,
//       invalidateOnRefresh: true,
//     },
//   }
// )
// triggers.push(bg.scrollTrigger)

    // ── 3. Sticky left panel — fade in ─────────────────────────────
    const leftItems = section.querySelectorAll('.know-left-item')
    leftItems.forEach((el, i) => {
      gsap.set(el, { opacity: 0, x: -50 })
      const a = gsap.to(el, {
        opacity: 1, x: 0, duration: 1.1, delay: i * 0.48, ease: 'power4.out',
        scrollTrigger: {
          scroller: '#main-scroller', trigger: section, start: 'top 70%', toggleActions: 'play none none reverse', invalidateOnRefresh: true, }
      })
      triggers.push(a.scrollTrigger)
    })

    // ── 4. Horizontal ticker line scrub ───────────────────────────
    const ticker = section.querySelector('.know-ticker-inner')
    if (ticker) {
      const a = gsap.to(ticker, {
        x: '-60%', ease: 'none',
        scrollTrigger: {
          scroller: '#main-scroller', trigger: section, start: 'top bottom', end: 'bottom top', scrub: 1,invalidateOnRefresh: true, }
      })
      triggers.push(a.scrollTrigger)
    }

    // =========================
    // TEXT REVEAL
    // =========================
    let textAnimated = false

    const textObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !textAnimated) {
            textAnimated = true

            // Heading chars stagger
            heading.chars?.forEach((char, i) => {
              setTimeout(() => {
                Object.assign(char.style, {
                  transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s ease',
                  transform: 'translateY(0%) rotateZ(0deg)',
                  opacity: '1',
                })
              }, i * 25)
            })

            // Paragraph chars stagger
            paragraph.chars?.forEach((char, i) => {
              setTimeout(() => {
                Object.assign(char.style, {
                  transition: 'transform 0.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 0.6s ease',
                  transform: 'translateY(0px)',
                  opacity: '1',
                })
              }, 150 + i * 8)
            })

            // Button fade up
            if (buttonEl) {
              setTimeout(() => {
                Object.assign(buttonEl.style, {
                  transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
                  transform: 'translateY(0px)',
                  opacity: '1',
                })
              }, 400)
            }
          }
        })
      },
      { threshold: 0.25, rootMargin: '0px 0px -15% 0px' }
    )

    textObserver.observe(section)

      ScrollTrigger.refresh()

      innerCleanup = () => {
        triggers.forEach(t => t?.kill())
        textObserver.disconnect()
        heading.revert()
        paragraph.revert()
      }
    }

    setupAnimations()

    return () => {
      mounted = false
      if (timeoutId) clearTimeout(timeoutId)
      if (innerCleanup) innerCleanup()
    }
  }, [])

  const tickerText = Array(6).fill('VALOUR · FINE WATCHMAKING · LUCENT COLLECTION · BOLD FOR EVERYONE · ').join('')

  return (
    <section className='know-sec know-split-sec' ref={sectionRef}>
      <div className='know-grain' />
      <div className='container position-relative' style={{ zIndex: 2 }}>
        <div className='row align-items-start'>

          {/* Left — sticky */}
          <div className='col-md-6'>
            <div className='know-left-sticky'>
              <div className='know-left-item'>
                <h2 className='know-big-h'>Bold For Everyone.</h2>
              </div>
              <div className='know-left-item'>
                <p className='know-para-text'>
                  VALOUR's vision for the modern enthusiast is to bring to life bold
                  and inspired design at an accessible price. Valour's inaugural collection,
                  Lucent, offers a distinct and fun approach to the everyday watch.
                </p>
              </div>
              <div className='know-left-item'>
                <a href='#' className='theme-btn know-btn'>Get Know More</a>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Horizontal scrolling ticker */}
      <div className='know-ticker-wrap'>
        <div className='know-ticker-inner'>{tickerText}</div>
      </div>
    </section>
  )
}