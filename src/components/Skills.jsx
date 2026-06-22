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
import LogoLoop     from './LogoLoop'

function AssemblyIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="36" height="36" viewBox="0 0 24 24" fill="currentColor"
            style={{ color: 'var(--color-text-muted)' }}>
            <path d="M9 2v2H7c-1.1 0-2 .9-2 2v2H3v2h2v2H3v2h2v2c0 1.1.9 2 2 2h2v2h2v-2h2v2h2v-2h2c1.1 0 2-.9 2-2v-2h2v-2h-2v-2h2V9h-2V7c0-1.1-.9-2-2-2h-2V3h-2v2h-2V3H9zm-2 4h10v10H7V6zm2 2v6h6V8H9z"/>
        </svg>
    )
}

const programmingLogos = [
    { src: jsIcon,    alt: 'JavaScript' },
    { src: pyIcon,    alt: 'Python' },
    { src: javaIcon,  alt: 'Java' },
    { src: rubyIcon,  alt: 'Ruby' },
    { src: ocamlIcon, alt: 'OCaml' },
    { src: cIcon,     alt: 'C' },
    { node: <AssemblyIcon />, ariaLabel: 'Assembly' },
]

const webAndToolsLogos = [
    { src: reactIcon,    alt: 'React' },
    { src: html5Icon,    alt: 'HTML5' },
    { src: css3Icon,     alt: 'CSS3' },
    { src: tailwindIcon, alt: 'Tailwind' },
    { src: nodejsIcon,   alt: 'Node.js' },
    { src: sqliteIcon,   alt: 'SQLite' },
    { src: gitIcon,      alt: 'Git' },
]

const spokenLanguages = [
    { name: 'English', level: 'Fluent', flag: flagGb },
    { name: 'Spanish', level: 'Fluent', flag: flagEs },
]

function Skills() {
    return (
        <section id="skills">
            <h2>Skills</h2>

            <div className="card ticker-section">
                <p className="ticker-category">Programming Languages</p>
                <LogoLoop
                    logos={programmingLogos}
                    speed={55}
                    logoHeight={36}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="var(--color-card-bg)"
                    ariaLabel="Programming languages"
                />
            </div>

            <div className="card ticker-section">
                <p className="ticker-category">Web & Tools</p>
                <LogoLoop
                    logos={webAndToolsLogos}
                    speed={55}
                    logoHeight={36}
                    gap={40}
                    pauseOnHover
                    scaleOnHover
                    fadeOut
                    fadeOutColor="var(--color-card-bg)"
                    ariaLabel="Web and tools"
                />
            </div>

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
