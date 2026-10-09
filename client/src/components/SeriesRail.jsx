const episodes = [
  { number: '01', title: 'The Full Story', subtitle: 'Who I am and how I am exploring', href: '#about', tone: 'story' },
  { number: '02', title: 'Now Building', subtitle: 'MERN, Python backend and DSA', href: '#current-focus', tone: 'build' },
  { number: '03', title: 'Selected Work', subtitle: 'Projects with technical evidence', href: '#projects', tone: 'projects' },
  { number: '04', title: 'Skill Universe', subtitle: 'The stack behind the builds', href: '#skills', tone: 'stack' },
  { number: '05', title: 'Evaluator AI', subtitle: 'Ask, compare and challenge claims', href: '#ask', tone: 'ai' }
]

export default function SeriesRail() {
  return (
    <section className="series-rail-shell container" aria-label="Continue exploring Siddharth's portfolio">
      <div className="series-rail-heading">
        <div>
          <span>CONTINUE EXPLORING</span>
          <h2>Pick an episode.</h2>
        </div>
        <small>Every section tells the same story from a different angle.</small>
      </div>

      <div className="series-rail">
        {episodes.map((episode, index) => (
          <a className={`series-episode-card episode-${episode.tone}`} href={episode.href} key={episode.number} style={{ '--episode-delay': `${index * 70}ms` }}>
            <div className="episode-card-top">
              <span>EPISODE {episode.number}</span>
              <b>▶</b>
            </div>
            <div>
              <h3>{episode.title}</h3>
              <p>{episode.subtitle}</p>
            </div>
            <i />
          </a>
        ))}
      </div>
    </section>
  )
}
