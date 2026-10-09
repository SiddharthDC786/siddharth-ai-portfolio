import { profile } from '../data/profileData'

const items = [
  { title: 'GitHub', detail: '@SiddharthDC786', href: profile.links.github, mark: 'GH' },
  { title: 'LeetCode', detail: '@DCSiddharth', href: profile.links.leetcode, mark: 'LC' },
  { title: 'LinkedIn', detail: 'DC Siddharth', href: profile.links.linkedin, mark: 'IN' },
  { title: 'Resume', detail: 'View PDF', href: profile.links.resume, mark: 'CV' }
]

export default function Profiles() {
  return (
    <section className="section" id="profiles">
      <div className="section-heading-row">
        <div>
          <div className="section-kicker">09 / PROFILES</div>
          <h2>Find me beyond this page.</h2>
        </div>
      </div>
      <div className="profile-grid">
        {items.map(item => (
          <a className="profile-card" href={item.href} target="_blank" rel="noreferrer" key={item.title}>
            <span className="profile-mark">{item.mark}</span>
            <div><strong>{item.title}</strong><span>{item.detail}</span></div>
            <span className="profile-arrow">↗</span>
          </a>
        ))}
      </div>
    </section>
  )
}
