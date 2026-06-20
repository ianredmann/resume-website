import { useState } from 'react'

const projects = [
    {
        category: 'Data Analysis',
        title: 'WTI Crude Oil Geopolitical Risk Analysis',
        date: 'April 2026',
        stat: { value: '+33.4%', label: 'avg 30-day return during military escalation' },
        tags: ['Statistical Data Analysis', 'Excel'],
        bullets: [
            'Collected and categorized ~400 daily WTI crude oil price observations (Oct 2024 – April 2026) across four geopolitical regimes: de-escalation, policy uncertainty, geopolitical tension, and military escalation.',
            'Built price frequency distribution tables and t-tests in Excel; Military Escalation periods exhibited ~3x daily price volatility (σ = 5.4% vs. 1.8% for Policy Uncertainty), with 61% of days seeing moves >2%, confirmed by a statistically significant Levene variance test (p < 0.0001).',
            'Identified a +33.4% average 30-day return during Military Escalation vs. -3.4% during Policy Uncertainty, translating findings into regime-based strategy recommendations: long bias on escalation breakouts, defensive positioning during policy uncertainty windows.',
        ],
    },
    {
        category: 'Full-Stack',
        title: 'Registration Reservation App',
        date: 'December 2025',
        stat: { value: '4', label: 'role modules refactored from a monolith' },
        tags: ['JavaScript', 'HTML5', 'CSS3', 'SQLite', 'Node.js'],
        bullets: [
            'Inherited and refactored a monolithic codebase from a prior capstone group, decomposing a single-file route handler into three purpose-built modules (admin, faculty, student) to improve maintainability and separation of concerns.',
            'Designed and implemented the admin dashboard from scratch — the only role not completed by the prior team — including its data views, workflows, and all associated UI.',
            'Implemented a unique-link access system using generated URL tokens to authenticate and route users to their role-specific views, eliminating the need for a traditional login flow.',
            'Redesigned the UI from zero — the inherited project had no CSS; implemented a complete visual layer across all three user-facing screens.',
        ],
    },
    {
        category: 'Data Analysis',
        title: 'Math Placement Index (MPI) Effectiveness Analysis',
        date: 'September 2025',
        stat: { value: '~340', label: 'students analyzed across 8 courses' },
        tags: ['Statistical Data Analysis', 'Excel', 'R'],
        bullets: [
            "Analyzed MPI placement exam outcomes across 8 math courses (~340 students) to evaluate its viability as a replacement for ACT/SAT scores, computing ABC/AB success rates by score band against OBU's 80/50 placement standard.",
            "Identified critical underperformance in Number Sense placements (29% vs. 82% ABC success rate for ACT/SAT-routed students); recommended raising the MPI cutoff threshold from 65 to 75 and tightening a second course's band, with findings presented to the Math Department.",
        ],
    },
]

function Projects() {
    const [flipped, setFlipped] = useState(() => projects.map(() => false))

    const toggle = (i) =>
        setFlipped(f => f.map((v, idx) => (idx === i ? !v : v)))

    return (
        <section id="projects">
            <h2>Projects</h2>

            <div className="project-grid">
                {projects.map(({ category, title, date, stat, tags, bullets }, i) => (
                    <div
                        key={title}
                        className={`project-card-wrapper${flipped[i] ? ' flipped' : ''}`}
                        onClick={() => toggle(i)}
                        role="button"
                        tabIndex={0}
                        aria-pressed={flipped[i]}
                        aria-label={`${title} — click to ${flipped[i] ? 'see overview' : 'see details'}`}
                        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) } }}
                    >
                        <div className="project-card-inner">

                            <div className="project-card-front">
                                <div>
                                    <span className="project-category">{category}</span>
                                    <h3 className="project-title">{title}</h3>
                                </div>
                                <div className="project-stat-block">
                                    <span className="project-stat-value">{stat.value}</span>
                                    <span className="project-stat-label">{stat.label}</span>
                                </div>
                                <div>
                                    <div className="tag-group">
                                        {tags.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                    <span className="flip-hint">Details →</span>
                                </div>
                            </div>

                            <div className="project-card-back">
                                <div className="card-header">
                                    <h3>{title}</h3>
                                    <span className="date">{date}</span>
                                </div>
                                <ul className="project-bullets">
                                    {bullets.map((b, j) => <li key={j}>{b}</li>)}
                                </ul>
                                <div>
                                    <div className="tag-group">
                                        {tags.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                    <span className="flip-hint">← Back</span>
                                </div>
                            </div>

                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Projects
