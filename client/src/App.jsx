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
          <div className="about-grid refined-about-grid">
            <div>
              <h2>I am still exploring — and that is intentional.</h2>
              <p className="about-lead">I would rather build enough real things to choose my direction with evidence than pick a title too early.</p>
            </div>
            <div className="about-copy">
              <p>{profile.intro}</p>
              <div className="principle-card">
                <span>MY CURRENT APPROACH</span>
                <strong>{profile.philosophy}</strong>
              </div>
            </div>
          </div>

          <div className="about-detail-grid">
            {profile.aboutDetails.map(item => (
              <article className="about-detail-card" key={item.label}>
                <span>{item.label}</span>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
              </article>
            ))}
          </div>
        </section>

        <section className="section focus-section" id="current-focus">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">02 / CURRENTLY</div>
              <h2>What I am actually working on right now.</h2>
            </div>
            <p className="section-side-copy">My portfolio is not a finished identity. It is a snapshot of what I am actively learning and testing through college.</p>
          </div>

          <div className="focus-grid">
            {profile.currentFocus.map(item => (
              <article className="focus-card" key={item.index}>
                <div className="focus-index">{item.index}</div>
                <h3>{item.title}</h3>
                <p>{item.text}</p>
                <div className="focus-tags">{item.tags.map(tag => <span key={tag}>{tag}</span>)}</div>
              </article>
            ))}
          </div>

          <div className="training-strip">
            <div>
              <span>COLLEGE TRAINING</span>
              <strong>{profile.collegeTraining.title}</strong>
            </div>
            <p>{profile.collegeTraining.summary}</p>
            <b>{profile.collegeTraining.provider}</b>
          </div>

          <div className="learning-loop" aria-label="How Siddharth learns">
            <span>HOW I LEARN</span>
            <div>
              {profile.learningLoop.map((step, index) => (
                <span key={step}><b>{step}</b>{index < profile.learningLoop.length - 1 && <i>→</i>}</span>
              ))}
            </div>
          </div>
        </section>

        <Projects />
        <Skills />

        <section className="section" id="journey">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">05 / JOURNEY</div>
              <h2>Range first. Depth with clarity next.</h2>
            </div>
            <p className="section-side-copy">I am using each stage to learn what kind of technical problems I want to spend more time solving.</p>
          </div>
          <div className="journey-timeline">
            {profile.journey.map((item, index) => (
              <article className={`journey-step ${index === profile.journey.length - 1 ? 'active' : ''}`} key={item.label}>
                <div className="journey-marker"><span>{String(index + 1).padStart(2, '0')}</span></div>
                <div>
                  <span>{item.label}</span>
                  <h3>{item.title}</h3>
                  <p>{item.text}</p>
                </div>
              </article>
            ))}
          </div>
        </section>

        <section className="section personal-section" id="beyond-code">
          <div className="section-heading-row">
            <div>
              <div className="section-kicker">06 / BEYOND CODE</div>
              <h2>The work I do says more when it has context.</h2>
            </div>
            <p className="section-side-copy">Technology is one part of how I am growing. Teamwork, community work and the projects I genuinely enjoy matter too.</p>
          </div>

          <div className="personal-grid">
            <article className="community-card">
              <div className="personal-card-top">
                <span>COMMUNITY INVOLVEMENT</span>
                <b>SC</b>
              </div>
              <h3>{profile.community.title}</h3>
              <p className="personal-role">{profile.community.role}</p>
              <p>{profile.community.summary}</p>
              <div className="focus-tags">{profile.community.areas.map(area => <span key={area}>{area}</span>)}</div>
              <div className="context-note">
                <span>ABOUT THE ORGANISATION</span>
                <p>{profile.community.organisation}</p>
              </div>
            </article>

            <article className="favorite-card">
              <div className="personal-card-top">
                <span>{profile.favoriteProject.kicker}</span>
                <b>★</b>
              </div>
              <h3>{profile.favoriteProject.title}</h3>
              <p>{profile.favoriteProject.text}</p>
              <a className="favorite-link" href={profile.favoriteProject.link} target="_blank" rel="noreferrer">Explore the project ↗</a>
            </article>
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
