const principles = [
  {
    number: '01',
    title: 'Build for failure',
    text: 'The portfolio has deterministic local answers for important demo questions, so a temporary AI API failure does not turn the core feature into a dead box.'
  },
  {
    number: '02',
    title: 'Keep secrets server-side',
    text: 'The Gemini API key stays in the Node/Express server environment. The browser calls my backend instead of receiving the secret directly.'
  },
  {
    number: '03',
    title: 'Pick tools for the problem',
    text: 'Structured records fit relational storage, connected investigation data benefits from graph thinking, and UI choices should support the workflow rather than the trendiest stack.'
  }
]

export default function EngineeringMindset() {
  return (
    <section className="section" id="mindset">
      <div className="section-heading-row">
        <div>
          <div className="section-kicker">07 / ENGINEERING MINDSET</div>
          <h2>How I think when I build.</h2>
        </div>
        <p className="section-side-copy">Small decisions reveal more than a long list of tools.</p>
      </div>
      <div className="mindset-grid">
        {principles.map(item => (
          <article className="mindset-card" key={item.number}>
            <span>{item.number}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  )
}
