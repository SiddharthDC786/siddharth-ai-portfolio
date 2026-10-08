import { profile } from '../data/profileData'

export default function Skills() {
  return (
    <section className="section" id="skills">
      <div className="section-kicker">03 / SKILLS</div>
      <div className="skills-layout">
        <div>
          <h2>My toolkit is growing with every build.</h2>
          <p className="muted">I would rather show what I am learning than pretend to be an expert at everything.</p>
        </div>
        <div className="skill-groups">
          {Object.entries(profile.skills).map(([group, items]) => (
            <div className="skill-group" key={group}>
              <span className="skill-label">{group}</span>
              <div className="skill-pills">
                {items.map(item => <span key={item}>{item}</span>)}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
