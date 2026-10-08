const nodes = [
  ['01', 'Visitor question', 'Natural-language request'],
  ['02', 'React / Vite', 'Chat UI + intent decoration'],
  ['03', 'Node / Express', 'Server-side API boundary'],
  ['04', 'Profile context + Gemini', 'Grounded generation'],
  ['05', 'Rich answer', 'Text + proof + actions']
]

export default function Architecture() {
  return (
    <section className="section architecture-section" id="architecture">
      <div className="section-heading-row">
        <div>
          <div className="section-kicker">07 / BEHIND THE PORTFOLIO</div>
          <h2>The chatbot is a small system, not just a text box.</h2>
        </div>
      </div>

      <div className="architecture-layout">
        <div className="flow-stack">
          {nodes.map(([num, title, text], index) => (
            <div className="flow-row" key={num}>
              <div className="flow-node"><span>{num}</span><strong>{title}</strong><small>{text}</small></div>
              {index < nodes.length - 1 && <b className="flow-arrow">↓</b>}
            </div>
          ))}
        </div>
        <div className="architecture-reasons">
          <article><span>SECURITY</span><h3>Secrets never enter frontend code.</h3><p>The browser talks to Express. The Gemini key remains in a server environment variable.</p></article>
          <article><span>GROUNDING</span><h3>Answers start from my data.</h3><p>The model receives structured profile information and instructions not to invent skills, ownership or achievements.</p></article>
          <article><span>RELIABILITY</span><h3>Important questions have fallbacks.</h3><p>Projects, skills, profiles, proof and resume actions can still work if the AI service is unavailable.</p></article>
        </div>
      </div>
    </section>
  )
}
