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

    let isSnapping = false
    let wheelLocked = false

    const getSections = () =>
      Array.from(scroller.querySelectorAll('.snap-section'))

    const getCurrentSectionIndex = (sections) => {
      const scrollTop = scroller.scrollTop

      let idx = 0
      let minDist = Infinity

      sections.forEach((sec, i) => {
        const dist = Math.abs(sec.offsetTop - scrollTop)
        if (dist < minDist) {
          minDist = dist
          idx = i
        }
      })

      return idx
    }

    const snapToSection = (direction) => {
      if (isSnapping) return

      const sections = getSections()
      if (!sections.length) return

      const currentIdx = getCurrentSectionIndex(sections)

      const targetIdx = Math.max(
        0,
        Math.min(sections.length - 1, currentIdx + direction)
      )

      if (targetIdx === currentIdx) return

      isSnapping = true

      gsap.to(scroller, {
        scrollTop: sections[targetIdx].offsetTop,
        duration: 1,
        ease: 'power3.inOut',
        onComplete: () => {
          isSnapping = false
        },
      })
    }

  const onWheel = (e) => {
  if (isSnapping || wheelLocked) return;

  const sections = getSections();
  if (!sections.length) return;

  const currentIdx = getCurrentSectionIndex(sections);
  const currentSection = sections[currentIdx];

  const sectionTop = currentSection.offsetTop;
  const sectionBottom =
    sectionTop + currentSection.scrollHeight - scroller.clientHeight;

  const scrollTop = scroller.scrollTop;
  const direction = e.deltaY > 0 ? 1 : -1;

  const SNAP_OFFSET = Math.min(120, scroller.clientHeight * 0.15);

const atBottom = scrollTop >= sectionBottom - SNAP_OFFSET;
  const atTop = scrollTop <= sectionTop + 2;

  // Allow normal scrolling inside oversized sections
  if (direction > 0 && !atBottom) {
    return;
  }

  if (direction < 0 && !atTop) {
    return;
  }

  // Only prevent default when we're actually snapping
  e.preventDefault();

  wheelLocked = true;

  snapToSection(direction);

  setTimeout(() => {
    wheelLocked = false;
  }, 800);
};

    scroller.addEventListener('wheel', onWheel, { passive: false })

    return () => {
      scroller.removeEventListener('wheel', onWheel)
      ScrollTrigger.defaults({ scroller: window })
      ScrollTrigger.getAll().forEach((t) => t.kill())
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