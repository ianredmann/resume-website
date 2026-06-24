import { useState } from 'react'
import obuLogo from '../assets/ouachita-baptist.svg'
import ajLogo from '../assets/aj-fitness-logo.png'
import compassLogo from '../assets/compass-group-logo.png'

const experiences = [
    {
        role: 'Club Team Captain',
        employer: 'AJ Fitness Swim Team',
        location: 'Tegucigalpa, Honduras',
        date: 'July 2021 – August 2022',
        logo: ajLogo,
        bullets: [
            'Captained a 40-person team of swimmers aged 10–18, serving as the first point of contact for resolving conflicts and setting the standard for punctuality and effort during training.',
            'Led pre-race speeches and team cheers to maintain morale and competitive focus during meets.',
            'Served as captain during the team\'s rise from 4th to 2nd place at the national championship.',
        ],
    },
    {
        role: 'Resident Assistant',
        employer: 'Ouachita Baptist University',
        location: 'Arkadelphia, Arkansas',
        date: 'August 2023 – May 2025',
        logo: obuLogo,
        bullets: [
            'Supported 47 freshman residents through their first-year transition before moving to an upperclassmen building — adapting from a social integration focus to a community-standards and conflict-resolution role.',
            'Coordinated Open Dorm periods, handled after-hours noise complaints, and maintained regular resident engagement logs for the Resident Life department.',
            'Co-organized an annual haunted house event across the residential building, coordinating room setups with residents and managing live check-in and wait-time communication for 100+ participants.',
        ],
    },
    {
        role: 'Library Archivist',
        employer: 'Ouachita Baptist University',
        location: 'Arkadelphia, Arkansas',
        date: 'May 2024 – August 2024',
        logo: obuLogo,
        bullets: [
            'Organized and preserved physical documents, photographs, and miscellaneous archival materials under the direction of the head archivist.',
            'Digitized selected materials for online publication, ensuring records were accurately cataloged and accessible in the university\'s digital archive.',
        ],
    },
    {
        role: 'Front of House Team Member',
        employer: 'Compass Group',
        location: 'Oxford, United Kingdom',
        date: 'June 2025 – August 2025',
        logo: compassLogo,
        bullets: [
            'Executed events of varying scale across multiple Oxford University college venues — from gatherings of around 100 to large formal events exceeding 400 guests — covering full setup, service, and breakdown.',
            'Took on bar operations at select events, managing drink service alongside broader front-of-house responsibilities in a high-volume, time-sensitive environment.',
        ],
    },
    {
        role: 'Bioinformatics Hackathon Mentor',
        employer: 'Ouachita Baptist University',
        location: 'Arkadelphia, Arkansas',
        date: 'April 2026',
        logo: obuLogo,
        bullets: [
            'Guided 10 high school students through a full-day hands-on session in phage gene annotation, teaching the use of PECAAN, Glimmer, GeneMark, and associated functional databases.',
            'Adapted graduate-level bioinformatics workflows for a non-expert audience; student annotations were submitted for potential inclusion in peer-reviewed research following faculty review.',
        ],
    },
]

function Experience() {
    const [openIndex, setOpenIndex] = useState(null)

    const toggle = (i) => setOpenIndex(prev => prev === i ? null : i)

    return (
        <section id="experience">
            <h2>Experience</h2>
            <div className="timeline">
                {experiences.map(({ role, employer, location, date, logo, bullets }, i) => (
                    <div className="timeline-entry" key={role}>
                        <div className="timeline-dot" />
                        <div
                            className={`card timeline-card exp-card${openIndex === i ? ' open' : ''}`}
                            onClick={() => toggle(i)}
                            role="button"
                            tabIndex={0}
                            aria-expanded={openIndex === i}
                            onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggle(i) } }}
                        >
                            <div className="exp-header">
                                <img src={logo} alt={employer} className="exp-logo" />
                                <div className="exp-header-info">
                                    <div className="card-header">
                                        <p className="role">{role}</p>
                                        <span className="date">{date}</span>
                                    </div>
                                    <span className="location">{employer} · {location}</span>
                                </div>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    viewBox="0 0 24 24"
                                    fill="none"
                                    stroke="currentColor"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    className={`exp-chevron${openIndex === i ? ' open' : ''}`}
                                >
                                    <polyline points="6 9 12 15 18 9" />
                                </svg>
                            </div>
                            <div className="exp-detail">
                                <div className="exp-detail-inner">
                                    <ul>
                                        {bullets.map((b, j) => <li key={j}>{b}</li>)}
                                    </ul>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Experience
