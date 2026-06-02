'use client'

import { useEffect, useRef } from 'react'
import SplitType from 'split-type'

const WatchSec = () => {
    const sectionRef = useRef(null)

    useEffect(() => {
        if (typeof window === 'undefined') return

        const section = sectionRef.current
        if (!section) return

        // =========================
        // SPLIT TEXT
        // =========================
        const heading = new SplitType('.watch-text h2', { types: 'lines,words,chars' })
        const badge = new SplitType('.watch-text span', { types: 'chars' })

        heading.lines?.forEach((line) => {
            line.style.overflow = 'hidden'
            line.style.display = 'block'
        })

        // =========================
        // INITIAL STATES
        // =========================
        const parallax = section.querySelector('.watch-parallax')
        // const bgZoom    = section.querySelector('.watch-bg-zoom')
        const paragraph = section.querySelector('.watch-text p')
        const buttonEl2 = section.querySelector('.know-btn')
        const imgEl = section.querySelector('.watch-img')

        // Image
        // Object.assign(parallax.style, {
        //     transform:  'translateY(120px) rotate(-10deg) scale(1.2)',
        //     opacity:    '0',
        //     transition: 'none',
        //     willChange: 'transform, opacity',
        // })

        // BG
        // Object.assign(bgZoom.style, {
        //     transform:  'scale(1.15)',
        //     willChange: 'transform',
        // })

        // Badge chars
        badge.chars?.forEach((char) => {
            Object.assign(char.style, {
                opacity: '0',
                transform: 'translateY(14px) rotateX(-60deg)',
                display: 'inline-block',
                transition: 'none',
                willChange: 'transform, opacity',
            })
        })

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

        // Paragraph
        Object.assign(paragraph.style, {
            opacity: '0',
            transform: 'translateY(30px)',
            filter: 'blur(6px)',
            transition: 'none',
            willChange: 'transform, opacity',
        })

        // Button
        if (buttonEl2) {
            Object.assign(buttonEl2.style, {
                opacity: '0',
                transform: 'translateY(30px)',
                transition: 'none',
                willChange: 'transform, opacity',
            })
        }
        if (imgEl) {
            Object.assign(imgEl.style, {
                opacity: '0',
                transform: 'translateX(-170px)',
                transition: 'none',
                willChange: 'transform,',
            })
        }

        // =========================
        // SCROLL PARALLAX (rAF)
        // =========================
        let ticking = false

        const onScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    const rect = section.getBoundingClientRect()
                    const winH = window.innerHeight

                    // 👇 start animation earlier (adjust 100–300 as needed)
                    const offset = 200

                    const progress = Math.max(
                        0,
                        Math.min(
                            1,
                            (-rect.top + offset) / (rect.height - winH || 1)
                        )
                    )

                    // bg parallax movement (smoother with px instead of %)
                    //   const bgY = progress * 80 // tweak intensity

                    //   bgZoom.style.transform = `scale(1) translateY(${bgY}px)`

                    ticking = false
                })

                ticking = true
            }
        }

        document.getElementById('main-scroller')?.addEventListener('scroll', onScroll, { passive: true })

        // =========================
        // IMAGE REVEAL (scroll-scrub via rAF)
        // =========================
        // let imgAnimated = false

        // const imgObserver = new IntersectionObserver(
        //     (entries) => {
        //         entries.forEach((entry) => {
        //             if (entry.isIntersecting && !imgAnimated) {
        //                 imgAnimated = true

        //                 Object.assign(parallax.style, {
        //                     transition: 'transform 1.4s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.2s ease',
        //                     transform:  'translateY(0px) rotate(0deg) scale(1)',
        //                     opacity:    '1',
        //                 })

        //                 Object.assign(bgZoom.style, {
        //                     transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1)',
        //                     transform:  'scale(1) translateY(0%)',
        //                 })
        //             }
        //         })
        //     },
        //     { threshold: 0.2, rootMargin: '0px 0px -10% 0px' }
        // )

        // imgObserver.observe(section)

        // =========================
        // TEXT REVEAL
        // =========================
        let textAnimated = false

        const textObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !textAnimated) {
                        textAnimated = true

                        // Badge chars stagger
                        badge.chars?.forEach((char, i) => {
                            setTimeout(() => {
                                Object.assign(char.style, {
                                    transition: 'transform 1.6s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.6s ease',
                                    transform: 'translateY(0px) rotateX(0deg)',
                                    opacity: '1',
                                })
                            }, i * 40)
                        })

                        // Heading chars stagger
                        heading.chars?.forEach((char, i) => {
                            setTimeout(() => {
                                Object.assign(char.style, {
                                    transition: 'transform 1.8s cubic-bezier(0.16, 1, 0.3, 1), opacity 1.8s ease',
                                    transform: 'translateY(0%) rotateZ(0deg)',
                                    opacity: '1',
                                })
                            }, 150 + i * 25)
                        })

                        // Paragraph
                        setTimeout(() => {
                            Object.assign(paragraph.style, {
                                transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease, filter 1s ease',
                                transform: 'translateY(0px)',
                                opacity: '1',
                                filter: 'blur(0px)',
                            })
                        }, 550)


                        // Button
                        if (buttonEl2) {
                            setTimeout(() => {
                                Object.assign(buttonEl2.style, {
                                    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
                                    transform: 'translateY(0px)',
                                    opacity: '1',
                                })
                            }, 750)
                        }
                            setTimeout(() => {
                                Object.assign(imgEl.style, {
                                    transition: 'transform 1s cubic-bezier(0.16, 1, 0.3, 1), opacity 1s ease',
                                    transform: 'translateX(0px)',
                                    opacity: '1',
                                })
                            }, 1 * 40)
                    }
                })
            },
            { threshold: 0.25, rootMargin: '0px 0px -15% 0px' }
        )

        textObserver.observe(section)

        // =========================
        // CLEANUP
        // =========================
        return () => {
            imgObserver.disconnect()
            textObserver.disconnect()
            document.getElementById('main-scroller')?.removeEventListener('scroll', onScroll)
            heading.revert()
            badge.revert()
        }

    }, [])

    return (
        <section className='watch-sec' ref={sectionRef}>
            <div className="watch-bg-zoom"></div>
            <div className="watch-overlay"></div>
            <div className="container">
                <div className="row align-items-center">
                    <div className="col-lg-6">
                        <div className="watch-img-wrap">
                            <div className="watch-glow"></div>
                            <div className="watch-parallax">
                                <div className="watch-float">
                                    <img
                                        src="/images/blue.png"
                                        alt="watch"
                                        className='img-fluid watch-img'
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-6 text-col">
                        <div className="watch-text">
                            <span>NEW GENERATION</span>
                            <h2>
                                Vibrant Colors Inspired<br/>
                                By Light And Nature
                            </h2>
                            <p>
                                Crafted with precision and inspired by
                                natural gradients, the new collection
                                delivers elegance through refined materials,
                                immersive color depth, and timeless engineering.
                            </p>
                            <a href='#' className='theme-btn know-btn'>Get Customize</a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default WatchSec