import { profile } from '../data/profileData'

export default function Footer() {
  return (
    <footer className="footer container">
      <div>
        <span className="brand-mark">SD</span>
        <strong>{profile.name}</strong>
      </div>
      <p>Built to learn, not just to submit.</p>
      <a href="#top">Back to top ↑</a>
    </footer>
  )
}
