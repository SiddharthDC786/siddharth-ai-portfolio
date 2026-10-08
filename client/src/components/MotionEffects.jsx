import { useEffect } from 'react'

export default function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    document.documentElement.classList.add('motion-ready')

    const revealTargets = Array.from(document.querySelectorAll(
      '.section-heading-row, .about-grid, .about-detail-card, .focus-card, .training-strip, .learning-loop, .project-card, .skill-group, .journey-step, .community-card, .favorite-card, .mindset-card, .ask-copy, .chat-card, .flow-node, .architecture-reasons article, .profile-card'
    ))

    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal')
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 65}ms`)
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-visible')
          observer.unobserve(entry.target)
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -7% 0px' }
    )

    revealTargets.forEach(element => observer.observe(element))

    const hero = document.querySelector('.hero')
    const panel = document.querySelector('.hero-panel')

    const handlePointerMove = event => {
      if (!hero || !panel || window.innerWidth < 1180) return
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      panel.style.setProperty('--hero-rotate-x', `${(-y * 2.8).toFixed(2)}deg`)
      panel.style.setProperty('--hero-rotate-y', `${(x * 3.6).toFixed(2)}deg`)
      panel.style.setProperty('--hero-shift-x', `${(x * 5).toFixed(1)}px`)
      panel.style.setProperty('--hero-shift-y', `${(y * 4).toFixed(1)}px`)
    }

    const resetPanel = () => {
      panel?.style.setProperty('--hero-rotate-x', '0deg')
      panel?.style.setProperty('--hero-rotate-y', '0deg')
      panel?.style.setProperty('--hero-shift-x', '0px')
      panel?.style.setProperty('--hero-shift-y', '0px')
    }

    hero?.addEventListener('pointermove', handlePointerMove)
    hero?.addEventListener('pointerleave', resetPanel)

    return () => {
      observer.disconnect()
      hero?.removeEventListener('pointermove', handlePointerMove)
      hero?.removeEventListener('pointerleave', resetPanel)
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return null
}
