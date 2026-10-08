import { profile } from '../data/profileData'

export default function Navbar() {
  return (
    <header className="nav-wrap">
      <nav className="nav container">
        <a className="brand" href="#top" aria-label="Home">
          <span className="brand-mark">SD</span>
          <span>{profile.shortName}</span>
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#projects">Projects</a>
          <a href="#skills">Skills</a>
          <a href="#ask">Ask AI</a>
        </div>
        <a className="nav-cta" href={profile.links.resume} target="_blank" rel="noreferrer">
          Resume ↗
        </a>
      </nav>
    </header>
  )
}
