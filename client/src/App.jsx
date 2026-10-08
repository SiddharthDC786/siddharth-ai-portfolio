import { useState } from 'react'
import { profile } from './data/profileData'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TourModal from './components/TourModal'
import Projects from './components/Projects'
import Skills from './components/Skills'
import EngineeringMindset from './components/EngineeringMindset'
import ChatAssistant from './components/ChatAssistant'
import Architecture from './components/Architecture'
import Profiles from './components/Profiles'
import Footer from './components/Footer'

function App() {
  const [tourOpen, setTourOpen] = useState(false)

  return (
    <div className="app-shell">
      <div className="ambient ambient-one" />
      <div className="ambient ambient-two" />
      <Navbar />
      <main>
        <Hero onOpenTour={() => setTourOpen(true)} />
        <TourModal open={tourOpen} onClose={() => setTourOpen(false)} />

        <section className="section" id="about">
          <div className="section-kicker">01 / ABOUT</div>
          <div className="about-grid">
            <div>
              <h2>I am still exploring — and that is intentional.</h2>
            </div>
            <div className="about-copy">
              <p>{profile.intro}</p>
              <div className="principle-card">
                <span>MY CURRENT APPROACH</span>
                <strong>{profile.philosophy}</strong>
              </div>
            </div>
          </div>
        </section>

        <Projects />
        <Skills />

        <section className="section" id="journey">
          <div className="section-kicker">04 / JOURNEY</div>
          <div className="journey-grid">
            <div className="journey-card">
              <span>NOW</span>
              <h3>{profile.year}</h3>
              <p>{profile.course}</p>
            </div>
            <div className="journey-card">
              <span>FOCUS</span>
              <h3>Build fundamentals</h3>
              <p>DSA, full-stack development and practical AI/ML projects.</p>
            </div>
            <div className="journey-card accent-card">
              <span>NEXT</span>
              <h3>Find my strongest lane</h3>
              <p>Explore AI engineering, data engineering and product-building before specialising.</p>
            </div>
          </div>
        </section>

        <EngineeringMindset />
        <ChatAssistant />
        <Architecture />
        <Profiles />
      </main>
      <Footer />
    </div>
  )
}

export default App
