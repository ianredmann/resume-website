import { useState } from 'react'
import { projects } from '../data/projects'
import Reveal from './Reveal'
import Collapse, { Chevron } from './Collapse'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function ProjectCard({ project, index }) {
    const { category, title, date, summary, result, tags, story, github } = project
    const [open, setOpen] = useState(false)
    const [ref, inView] = useInView({ threshold: 0.3 })
    const value = useCountUp(result.num, inView, { duration: result.duration, decimal: result.decimal })
    const panelId = `project-story-${index}`

    return (
        <article
            ref={ref}
            className={`project-card reveal${inView ? ' reveal-in' : ''}`}
            style={{ transitionDelay: `${(index % 2) * 0.08}s` }}
        >
            <div className="project-meta">
                <span>{category}</span>
                <span>{date}</span>
            </div>

            <h3 className="project-title">{title}</h3>
            <p className="project-summary">{summary}</p>

            <div className="project-result">
                <span className="project-result-value">
                    {result.prefix ?? ''}{value}{result.suffix ?? ''}
                </span>
                <span className="project-result-label">{result.label}</span>
            </div>

            <Collapse open={open} id={panelId}>
                <dl className="project-story">
                    {story.map(({ label, text }) => (
                        <div key={label}>
                            <dt>{label}</dt>
                            <dd>{text}</dd>
                        </div>
                    ))}
                </dl>
            </Collapse>

            <div className="tag-group">
                {tags.map(t => <span key={t} className="tag">{t}</span>)}
            </div>

            <div className="project-actions">
                {github && (
                    <a href={github} target="_blank" rel="noreferrer" className="project-link">
                        Full write-up on GitHub <span aria-hidden="true">↗</span>
                    </a>
                )}
                <button
                    type="button"
                    className="project-toggle"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpen(o => !o)}
                >
                    {open ? 'Less' : 'Details'}
                    <Chevron open={open} />
                </button>
            </div>
        </article>
    )
}

function Projects() {
    return (
        <section id="projects">
            <h2>Projects</h2>
            <div className="project-grid">
                {projects.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                ))}
            </div>
        </section>
    )
}

export default Projects
