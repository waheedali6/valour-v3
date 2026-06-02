'use client'

import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

export default function ScrollProvider({ children }) {
  const scrollerRef = useRef(null)

  useEffect(() => {
    const scroller = scrollerRef.current
    if (!scroller) return

    ScrollTrigger.defaults({ scroller })
    ScrollTrigger.refresh()

    // ── Config ───────────────────────────────────────────────────────────
    const SNAP_DURATION  = 1        // seconds for the snap animation
    const SNAP_EASE      = 'power3.inOut'
    const SCROLL_THRESHOLD = 40        // px scrolled before snap triggers
    const IDLE_DELAY     = 60          // ms of no-scroll before snap fires

    let isSnapping   = false
    let idleTimer    = null
    let snapOrigin   = scroller.scrollTop   // scrollTop when user started scrolling
    let lastScrollTop = scroller.scrollTop

    const getSections = () =>
      Array.from(scroller.querySelectorAll('.snap-section'))

    const getCurrentSectionIndex = (sections) => {
      // Which section's top is closest to current scrollTop
      const scrollTop = scroller.scrollTop
      let idx = 0
      let minDist = Infinity
      sections.forEach((sec, i) => {
        const dist = Math.abs(sec.offsetTop - scrollTop)
        if (dist < minDist) { minDist = dist; idx = i }
      })
      return idx
    }

    const snapTo = (targetScrollTop) => {
      if (isSnapping) return
      isSnapping = true

      gsap.to(scroller, {
        scrollTop: targetScrollTop,
        duration: SNAP_DURATION,
        ease: SNAP_EASE,
        onComplete: () => {
          isSnapping = false
          snapOrigin = scroller.scrollTop
          lastScrollTop = scroller.scrollTop
          ScrollTrigger.refresh()
        },
      })
    }

    const trySnap = () => {
      if (isSnapping) return

      const sections = getSections()
      if (!sections.length) return

      const delta = scroller.scrollTop - snapOrigin

      // Only snap if user has scrolled past the threshold
      if (Math.abs(delta) < SCROLL_THRESHOLD) return

      const currentIdx = getCurrentSectionIndex(sections)
      const direction  = delta > 0 ? 1 : -1
      const targetIdx  = Math.max(0, Math.min(sections.length - 1, currentIdx + direction))
      const target     = sections[targetIdx].offsetTop

      snapTo(target)
    }

    const onScroll = () => {
      if (isSnapping) return

      lastScrollTop = scroller.scrollTop

      clearTimeout(idleTimer)
      idleTimer = setTimeout(trySnap, IDLE_DELAY)
    }

    // Reset origin whenever user starts a fresh scroll gesture
    const onScrollStart = () => {
      if (!isSnapping) snapOrigin = scroller.scrollTop
    }

    // Wheel: capture scroll origin at the start of each wheel burst
    const onWheel = () => {
      if (!isSnapping) snapOrigin = scroller.scrollTop
    }

    scroller.addEventListener('scroll',     onScroll,      { passive: true })
    scroller.addEventListener('wheel',      onWheel,       { passive: true })
    scroller.addEventListener('touchstart', onScrollStart, { passive: true })

    return () => {
      scroller.removeEventListener('scroll',     onScroll)
      scroller.removeEventListener('wheel',      onWheel)
      scroller.removeEventListener('touchstart', onScrollStart)
      clearTimeout(idleTimer)
      ScrollTrigger.defaults({ scroller: window })
      ScrollTrigger.getAll().forEach(t => t.kill())
    }
  }, [])

  return (
    <div
      id="main-scroller"
      ref={scrollerRef}
      style={{
        height: '100vh',
        overflowY: 'scroll',
        overflowX: 'hidden',
        position: 'relative',
      }}
    >
      {children}
    </div>
  )
}