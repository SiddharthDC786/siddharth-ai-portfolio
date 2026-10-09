import { signature } from '../data/signatureData'

export default function Skills() {
  return (
    <section className="section signature-stack-section" id="skills">
      <div className="section-heading-row signature-heading">
        <div>
          <div className="section-kicker">04 / ENGINEERING STACK</div>
          <h2>Tools I have actually touched through learning and projects.</h2>
        </div>
        <p className="section-side-copy">Grouped by how I use them, not as a wall of logos. Some are current strengths; others are project exposure I am deliberately building on.</p>
      </div>

      <div className="stack-marquee" aria-hidden="true">
        <div className="stack-marquee-track">
          {[...signature.marquee, ...signature.marquee].map((tool, index) => <span key={`${tool}-${index}`}>{tool}<i>✦</i></span>)}
        </div>
      </div>

      <div className="signature-stack-grid">
        {signature.stack.map(group => (
          <article className="signature-stack-card magnetic-card" key={group.title}>
            <div className="stack-card-top"><span>{group.index}</span><b>{group.title}</b></div>
            <p>{group.note}</p>
            <div className="stack-tool-list">
              {group.tools.map(tool => <span key={tool}>{tool}</span>)}
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}
