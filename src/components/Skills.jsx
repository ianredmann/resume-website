import jsIcon       from '../assets/skills/javascript.svg'
import pyIcon       from '../assets/skills/python.svg'
import javaIcon     from '../assets/skills/java.svg'
import rubyIcon     from '../assets/skills/ruby.svg'
import ocamlIcon    from '../assets/skills/ocaml.svg'
import cIcon        from '../assets/skills/c.svg'
import reactIcon    from '../assets/skills/react.svg'
import html5Icon    from '../assets/skills/html5.svg'
import css3Icon     from '../assets/skills/css3.svg'
import tailwindIcon from '../assets/skills/tailwind.svg'
import nodejsIcon   from '../assets/skills/nodejs.svg'
import sqliteIcon   from '../assets/skills/sqlite.svg'
import gitIcon      from '../assets/skills/git.svg'
import flagGb       from '../assets/skills/flag-gb.svg'
import flagEs       from '../assets/skills/flag-es.svg'

const programmingLanguages = [
    { name: 'JavaScript', src: jsIcon },
    { name: 'Python',     src: pyIcon },
    { name: 'Java',       src: javaIcon },
    { name: 'Ruby',       src: rubyIcon },
    { name: 'OCaml',      src: ocamlIcon },
    { name: 'C',          src: cIcon },
    { name: 'Assembly',   src: null },
]

const webAndTools = [
    { name: 'React',    src: reactIcon },
    { name: 'HTML5',    src: html5Icon },
    { name: 'CSS3',     src: css3Icon },
    { name: 'Tailwind', src: tailwindIcon },
    { name: 'Node.js',  src: nodejsIcon },
    { name: 'SQLite',   src: sqliteIcon },
    { name: 'Git',      src: gitIcon },
]

const spokenLanguages = [
    { name: 'English', level: 'Fluent', flag: flagGb },
    { name: 'Spanish', level: 'Fluent', flag: flagEs },
]

function AssemblyIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="36"
            height="36"
            viewBox="0 0 24 24"
            fill="currentColor"
            style={{ color: 'var(--color-text-muted)' }}
        >
            <path d="M9 2v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9zm-2 4h10v10H7V6zm2 2v6h6V8H9z"/>
        </svg>
    )
}

function TickerRow({ label, items }) {
    const doubled = [...items, ...items, ...items]
    return (
        <div className="card ticker-section">
            <p className="ticker-category">{label}</p>
            <div className="ticker-wrapper">
                <div className="ticker-track">
                    {doubled.map((item, i) => (
                        <div className="ticker-item" key={i}>
                            {item.src
                                ? <img src={item.src} alt={item.name} className="ticker-icon" />
                                : <AssemblyIcon />
                            }
                            <span className="ticker-name">{item.name}</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

function Skills() {
    return (
        <section id="skills">
            <h2>Skills</h2>
            <TickerRow label="Programming Languages" items={programmingLanguages} />
            <TickerRow label="Web & Tools" items={webAndTools} />
            <div className="card">
                <p className="ticker-category">Spoken Languages</p>
                <div className="skills-languages">
                    {spokenLanguages.map(({ name, level, flag }) => (
                        <div className="language-item" key={name}>
                            <img src={flag} alt={`${name} flag`} className="flag-icon" />
                            <div className="language-text">
                                <span className="language-name">{name}</span>
                                <span className="language-level">{level}</span>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default Skills
