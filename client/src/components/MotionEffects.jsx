import { useEffect } from 'react'

export default function MotionEffects() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const revealTargets = document.querySelectorAll(
      '.section-heading-row, .about-grid, .about-detail-card, .focus-card, .training-strip, .learning-loop, .project-card, .skill-group, .journey-step, .community-card, .favorite-card, .mindset-card, .chat-card, .architecture-layout, .profile-card'
    )

    revealTargets.forEach((element, index) => {
      element.classList.add('motion-reveal')
      element.style.setProperty('--reveal-delay', `${Math.min(index % 4, 3) * 70}ms`)
    })

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('motion-visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
    )

    revealTargets.forEach(element => observer.observe(element))

    const hero = document.querySelector('.hero')
    const panel = document.querySelector('.hero-panel')

    const handlePointerMove = event => {
      if (!hero || !panel || window.innerWidth < 900) return
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      panel.style.setProperty('--hero-rotate-x', `${(-y * 4).toFixed(2)}deg`)
      panel.style.setProperty('--hero-rotate-y', `${(x * 5).toFixed(2)}deg`)
    }

    const resetPanel = () => {
      panel?.style.setProperty('--hero-rotate-x', '0deg')
      panel?.style.setProperty('--hero-rotate-y', '0deg')
    }

    hero?.addEventListener('pointermove', handlePointerMove)
    hero?.addEventListener('pointerleave', resetPanel)

    return () => {
      observer.disconnect()
      hero?.removeEventListener('pointermove', handlePointerMove)
      hero?.removeEventListener('pointerleave', resetPanel)
    }
  }, [])

  return null
}
