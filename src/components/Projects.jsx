import { useState, useEffect, useRef } from 'react'
import { countUp } from '../utils/countUp'

const projects = [
    {
        category: 'Data Analysis',
        title: 'D2 Swim Program Progression Analysis',
        date: 'June 2026',
        stat: { num: 127, prefix: '~', duration: 1200, label: 'swimmers analyzed across 4 programs and 4 entering classes' },
        github: 'https://github.com/ianredmann/d2_swim_program_progression_analysis?tab=readme-ov-file',
        tags: ['Python', 'SQLite', 'Playwright', 'osascript'],
        bullets: [
            'Built a four stage Python pipeline that included roster scraping, times collection, power point scoring, and progression aggregation, engineering a three tier scraping approach (requests → Playwright with persistent Firefox → osascript via Safari) as each method was blocked by successive Cloudflare protections including Turnstile.',
            'Defined a progression metric using top five average SCY power points to normalize across heterogeneous event portfolios. Stored results in a normalized SQLite schema with idempotent INSERT OR IGNORE inserts and aggregated by team, gender, and cohort.',
            'Analyzed ~127 swimmers across four D-II programs and four entering classes (2019–2022), where OBU Men posted the highest 3+ year mean (+17.5 pts, n=27), with results presented as a proof of concept validating the methodology for a future full division study.',
        ],
    },
    {
        category: 'Data Analysis',
        title: 'WTI Crude Oil Geopolitical Risk Analysis',
        date: 'April 2026',
        stat: { num: 33.4, prefix: '+', suffix: '%', decimal: true, duration: 1500, label: 'avg 30-day return during military escalation' },
        github: 'https://github.com/ianredmann/wti-crude-oil-geopolitical-risk-analysis',
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
        stat: { num: 4, duration: 800, label: 'role modules refactored from a monolith' },
        github: 'https://github.com/ianredmann/registration-reservation-system',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'SQLite', 'Node.js'],
        bullets: [
            'Inherited and refactored a monolithic codebase from a prior capstone group, decomposing a single-file route handler into three purpose-built modules (admin, faculty, student) to improve maintainability and separation of concerns.',
            'Designed and implemented the admin dashboard from scratch, which was the only role not completed by the prior team, including its data views, workflows, and all associated UI.',
            'Implemented a unique link access system using generated URL tokens to authenticate and route users to their role specific views, eliminating the need for a traditional login flow.',
            'Redesigned the UI from zero. The inherited project had no CSS, and a complete visual layer across all three user-facing screens was implemented.',
        ],
    },
    {
        category: 'Data Analysis',
        title: 'Math Placement Index (MPI) Effectiveness Analysis',
        date: 'September 2025',
        stat: { num: 340, prefix: '~', duration: 1800, label: 'students analyzed across 8 courses' },
        github: 'https://github.com/ianredmann/mpi-placement-analysis',
        tags: ['Statistical Data Analysis', 'Excel', 'R'],
        bullets: [
            "Analyzed MPI placement exam outcomes across 8 math courses (~340 students) to evaluate its viability as a replacement for ACT/SAT scores, computing ABC/AB success rates by score band against OBU's 80/50 placement standard.",
            "Identified critical underperformance in Number Sense placements (29% vs. 82% ABC success rate for ACT/SAT-routed students); recommended raising the MPI cutoff threshold from 65 to 75 and tightening a second course's band, with findings presented to the Math Department.",
        ],
    },
]

function Projects() {
    const [flipped, setFlipped] = useState(() => projects.map(() => false))
    const [statCounts, setStatCounts] = useState(() => projects.map(p => p.stat.decimal ? '0.0' : 0))
    const statRefs = useRef([])

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (!entry.isIntersecting) return
                    const i = parseInt(entry.target.dataset.statIndex)
                    observer.unobserve(entry.target)
                    const { num, decimal, duration } = projects[i].stat
                    if (prefersReduced) {
                        setStatCounts(prev => prev.map((c, idx) => idx === i ? (decimal ? num.toFixed(1) : num) : c))
                    } else {
                        countUp(
                            v => setStatCounts(prev => prev.map((c, idx) => idx === i ? v : c)),
                            num,
                            duration,
                            decimal
                        )
                    }
                })
            },
            { threshold: 0.4 }
        )
        statRefs.current.forEach(el => { if (el) observer.observe(el) })
        return () => observer.disconnect()
    }, [])

    const toggle = (i) =>
        setFlipped(f => f.map((v, idx) => (idx === i ? !v : v)))

    return (
        <section id="projects">
            <h2>Projects</h2>

            <div className="project-grid">
                {projects.map(({ category, title, date, stat, tags, bullets, github }, i) => (
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
                                <div
                                    className="project-stat-block"
                                    ref={el => { statRefs.current[i] = el }}
                                    data-stat-index={i}
                                >
                                    <span className="project-stat-value">
                                        {stat.prefix ?? ''}{statCounts[i]}{stat.suffix ?? ''}
                                    </span>
                                    <span className="project-stat-label">{stat.label}</span>
                                </div>
                                <div>
                                    <div className="tag-group">
                                        {tags.map(t => <span key={t} className="tag">{t}</span>)}
                                    </div>
                                    {github ? (
                                        <div className="project-card-footer">
                                            <a
                                                href={github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="topnav-icon-btn"
                                                title="View on GitHub"
                                                onClick={e => e.stopPropagation()}
                                                onKeyDown={e => e.stopPropagation()}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                                </svg>
                                            </a>
                                            <span className="flip-hint">Details →</span>
                                        </div>
                                    ) : (
                                        <span className="flip-hint">Details →</span>
                                    )}
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
                                    <div className="project-card-footer">
                                        {github && (
                                            <a
                                                href={github}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="topnav-icon-btn"
                                                title="View on GitHub"
                                                onClick={e => e.stopPropagation()}
                                                onKeyDown={e => e.stopPropagation()}
                                            >
                                                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                                    <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                                                </svg>
                                            </a>
                                        )}
                                        <span className="flip-hint">← Back</span>
                                    </div>
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
