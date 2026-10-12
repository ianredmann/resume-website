import { projects } from '../data/projects'
import Reveal from './Reveal'

// A skill is highlighted when it appears in a project's tags, so the page
// shows what has actually been shipped rather than a flat claim.
const groups = [
    { label: 'Languages', items: ['Python', 'JavaScript', 'R', 'Java', 'C', 'Ruby', 'OCaml', 'Assembly'] },
    { label: 'Data & Analysis', items: ['Excel', 'SQLite', { name: 'Statistical analysis', tag: 'Statistical Data Analysis' }] },
    { label: 'Web & Tools', items: ['React', 'Node.js', 'HTML5', 'CSS3', 'Tailwind', 'Git', 'Playwright'] },
    { label: 'Spoken', items: [{ name: 'English', note: 'fluent' }, { name: 'Spanish', note: 'fluent' }] },
]

const projectsUsing = tag => projects.filter(p => p.tags.includes(tag)).map(p => p.title)

function Skill({ item }) {
    const { name, tag = name, note } = typeof item === 'string' ? { name: item } : item
    const used = projectsUsing(tag)
    return (
        <li
            className={`skill${used.length ? ' skill--used' : ''}`}
            title={used.length ? `Used in: ${used.join(', ')}` : undefined}
        >
            {name}
            {note && <span className="skill-note">{note}</span>}
        </li>
    )
}

function Skills() {
    return (
        <section id="skills">
            <h2>Skills</h2>

            <Reveal className="card skills-card">
                {groups.map(({ label, items }) => (
                    <div className="skill-row" key={label}>
                        <h3 className="skill-label">{label}</h3>
                        <ul className="skill-list">
                            {items.map(item => <Skill key={typeof item === 'string' ? item : item.name} item={item} />)}
                        </ul>
                    </div>
                ))}
                <p className="skills-legend">
                    <span className="skills-legend-dot" aria-hidden="true" /> used in a project above
                </p>
            </Reveal>
        </section>
    )
}

export default Skills
