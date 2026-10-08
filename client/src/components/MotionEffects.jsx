import { useLayoutEffect } from 'react'

export default function MotionEffects() {
  useLayoutEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    document.documentElement.classList.add('motion-ready')

    const revealTargets = Array.from(document.querySelectorAll(
      '.section-heading-row, .about-grid, .about-detail-card, .focus-card, .training-strip, .learning-loop, .project-card, .skill-group, .journey-step, .community-card, .favorite-card, .mindset-card, .ask-copy, .chat-card, .flow-node, .architecture-reasons article, .profile-card'
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
      { threshold: 0.1, rootMargin: '0px 0px -6% 0px' }
    )

    revealTargets.forEach(element => observer.observe(element))

    return () => {
      observer.disconnect()
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return null
}
