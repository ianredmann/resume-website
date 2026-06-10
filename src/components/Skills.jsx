const programmingLanguages = [
    { name: 'JavaScript', src: 'https://cdn.simpleicons.org/javascript' },
    { name: 'Python',     src: 'https://cdn.simpleicons.org/python' },
    { name: 'Java',       src: 'https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/java/java-original.svg' },
    { name: 'Ruby',       src: 'https://cdn.simpleicons.org/ruby' },
    { name: 'OCaml',      src: 'https://cdn.simpleicons.org/ocaml' },
    { name: 'C',          src: 'https://cdn.simpleicons.org/c' },
    { name: 'Assembly',   src: null },
]

const webAndTools = [
    { name: 'React',    src: 'https://cdn.simpleicons.org/react' },
    { name: 'HTML5',    src: 'https://cdn.simpleicons.org/html5' },
    { name: 'CSS3',     src: 'https://cdn.simpleicons.org/css' },
    { name: 'Tailwind', src: 'https://cdn.simpleicons.org/tailwindcss' },
    { name: 'Node.js',  src: 'https://cdn.simpleicons.org/nodedotjs' },
    { name: 'SQLite',   src: 'https://cdn.simpleicons.org/sqlite' },
    { name: 'Git',      src: 'https://cdn.simpleicons.org/git' },
]

const spokenLanguages = [
    { name: 'English', level: 'Fluent', flag: 'https://flagcdn.com/gb.svg' },
    { name: 'Spanish', level: 'Fluent', flag: 'https://flagcdn.com/es.svg' },
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
    const doubled = [...items, ...items]
    return (
        <div className="card ticker-section">
            <p className="ticker-category">{label}</p>
            <div className="ticker-wrapper">
                <div className="ticker-track">
                    {doubled.map((item, i) => (
                        <div className="ticker-item" key={i}>
                            {item.src
                                ? <img src={item.src} alt={item.name} className="ticker-icon" loading="lazy" />
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
