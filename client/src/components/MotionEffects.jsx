import { useLayoutEffect, useRef } from 'react'

export default function MotionEffects() {
  const dotRef = useRef(null)
  const ringRef = useRef(null)
  const progressRef = useRef(null)

  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches

    document.documentElement.classList.add('motion-ready')

    const revealTargets = Array.from(document.querySelectorAll(
      '.section-heading-row, .about-grid, .about-detail-card, .focus-card, .training-strip, .learning-loop, .project-card, .signature-stack-card, .journey-step, .community-card, .favorite-card, .mindset-card, .ask-copy, .chat-card, .flow-node, .architecture-reasons article, .profile-card'
    ))

    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal')
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 55}ms`)
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.09, rootMargin: '0px 0px -5% 0px' }
    )

    revealTargets.forEach(element => observer.observe(element))

    const updateScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight
      const progress = max > 0 ? Math.min(window.scrollY / max, 1) : 0
      if (progressRef.current) progressRef.current.style.transform = `scaleX(${progress})`
    }

    window.addEventListener('scroll', updateScroll, { passive: true })
    updateScroll()

    let pointerX = -100
    let pointerY = -100
    let ringX = -100
    let ringY = -100
    let frame

    const animateCursor = () => {
      ringX += (pointerX - ringX) * 0.3
      ringY += (pointerY - ringY) * 0.3
      if (ringRef.current) ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`
      frame = requestAnimationFrame(animateCursor)
    }

    const onPointerMove = event => {
      pointerX = event.clientX
      pointerY = event.clientY
      if (dotRef.current) dotRef.current.style.transform = `translate3d(${pointerX}px, ${pointerY}px, 0)`
    }

    const interactive = Array.from(document.querySelectorAll('a, button, .magnetic-card, input'))
    const enter = () => document.documentElement.classList.add('cursor-active')
    const leave = () => document.documentElement.classList.remove('cursor-active')

    if (finePointer && !reduceMotion) {
      document.documentElement.classList.add('custom-cursor-enabled')
      window.addEventListener('pointermove', onPointerMove, { passive: true })
      interactive.forEach(el => {
        el.addEventListener('pointerenter', enter)
        el.addEventListener('pointerleave', leave)
      })
      frame = requestAnimationFrame(animateCursor)
    }

    const magnetic = Array.from(document.querySelectorAll('.magnetic'))
    const magneticMove = event => {
      const el = event.currentTarget
      const rect = el.getBoundingClientRect()
      const x = (event.clientX - rect.left - rect.width / 2) * 0.08
      const y = (event.clientY - rect.top - rect.height / 2) * 0.10
      el.style.setProperty('--magnetic-x', `${x}px`)
      el.style.setProperty('--magnetic-y', `${y}px`)
    }
    const magneticReset = event => {
      event.currentTarget.style.setProperty('--magnetic-x', '0px')
      event.currentTarget.style.setProperty('--magnetic-y', '0px')
    }

    if (finePointer && !reduceMotion) {
      magnetic.forEach(el => {
        el.addEventListener('pointermove', magneticMove)
        el.addEventListener('pointerleave', magneticReset)
      })
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', updateScroll)
      window.removeEventListener('pointermove', onPointerMove)
      cancelAnimationFrame(frame)
      interactive.forEach(el => {
        el.removeEventListener('pointerenter', enter)
        el.removeEventListener('pointerleave', leave)
      })
      magnetic.forEach(el => {
        el.removeEventListener('pointermove', magneticMove)
        el.removeEventListener('pointerleave', magneticReset)
      })
      document.documentElement.classList.remove('motion-ready', 'custom-cursor-enabled', 'cursor-active')
    }
  }, [])

  return (
    <>
      <div ref={progressRef} className="signature-scroll-progress" aria-hidden="true" />
      <div ref={ringRef} className="signature-cursor-ring" aria-hidden="true" />
      <div ref={dotRef} className="signature-cursor-dot" aria-hidden="true" />
    </>
  )
}
