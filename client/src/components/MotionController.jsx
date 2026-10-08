import { useEffect } from 'react'

const revealSelectors = [
  '.section-heading-row',
  '.about-detail-card',
  '.focus-card',
  '.training-strip',
  '.learning-loop',
  '.project-card',
  '.skill-group',
  '.journey-step',
  '.community-card',
  '.favorite-card',
  '.mindset-card',
  '.ask-copy',
  '.chat-card',
  '.flow-node',
  '.architecture-reasons article',
  '.profile-card'
]

export default function MotionController() {
  useEffect(() => {
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (reduceMotion) return undefined

    const elements = Array.from(document.querySelectorAll(revealSelectors.join(',')))

    elements.forEach((element, index) => {
      element.classList.add('motion-reveal')
      element.style.setProperty('--reveal-delay', `${Math.min((index % 4) * 70, 210)}ms`)
    })

    document.documentElement.classList.add('motion-ready')

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return
          entry.target.classList.add('motion-visible')
          observer.unobserve(entry.target)
        })
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -7% 0px'
      }
    )

    elements.forEach(element => observer.observe(element))

    const heroPanel = document.querySelector('.hero-panel')
    const hero = document.querySelector('.hero')

    const handlePointerMove = event => {
      if (!heroPanel || !hero || window.innerWidth < 1180) return
      const rect = hero.getBoundingClientRect()
      const x = (event.clientX - rect.left) / rect.width - 0.5
      const y = (event.clientY - rect.top) / rect.height - 0.5
      heroPanel.style.setProperty('--hero-rotate-y', `${x * 3.2}deg`)
      heroPanel.style.setProperty('--hero-rotate-x', `${y * -2.4}deg`)
      heroPanel.style.setProperty('--hero-shift-x', `${x * 5}px`)
      heroPanel.style.setProperty('--hero-shift-y', `${y * 4}px`)
    }

    const resetHero = () => {
      if (!heroPanel) return
      heroPanel.style.setProperty('--hero-rotate-y', '0deg')
      heroPanel.style.setProperty('--hero-rotate-x', '0deg')
      heroPanel.style.setProperty('--hero-shift-x', '0px')
      heroPanel.style.setProperty('--hero-shift-y', '0px')
    }

    hero?.addEventListener('pointermove', handlePointerMove)
    hero?.addEventListener('pointerleave', resetHero)

    return () => {
      observer.disconnect()
      hero?.removeEventListener('pointermove', handlePointerMove)
      hero?.removeEventListener('pointerleave', resetHero)
      document.documentElement.classList.remove('motion-ready')
    }
  }, [])

  return null
}
