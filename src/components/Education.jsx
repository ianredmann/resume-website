import seal from '../assets/Ouachita_Baptist_University_seal_2025.png'
import Reveal from './Reveal'
import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'

function Education() {
    const [statsRef, statsVisible] = useInView({ threshold: 0.2 })
    const gpa = useCountUp(3.8, statsVisible, { duration: 1600, decimal: true })
    const pres = useCountUp(3, statsVisible, { duration: 1200 })
    const dean = useCountUp(5, statsVisible, { duration: 1400 })

    const statItems = [
        { id: 'gpa', display: gpa, label: 'GPA' },
        { id: 'pres', display: `×${pres}`, label: "President's List" },
        { id: 'dean', display: `×${dean}`, label: "Dean's List" },
        { id: 'kme', display: 'κμε', label: 'Kappa Mu Epsilon', isText: true },
        { id: 'cs-award', display: null, label: 'CS Excellence Award', isIcon: true },
    ]

    return (
        <section id="education">
            <h2>Education</h2>

            <Reveal className="diploma-card">
                <img src={seal} alt="Ouachita Baptist University Seal" className="diploma-seal" />

                <p className="diploma-school">Ouachita Baptist University</p>
                <p className="diploma-certifies">This certifies that</p>
                <h3 className="diploma-name">Ian Redman</h3>
                <p className="diploma-completed">has completed the requirements for</p>

                <div className="diploma-degrees">
                    <span className="diploma-degree">Bachelor of Science in Computer Science</span>
                    <span className="diploma-degree">Bachelor of Science in Mathematics</span>
                </div>

                <div className="diploma-footer">
                    <span className="diploma-honors-text">Magna Cum Laude</span>
                    <span className="diploma-separator">·</span>
                    <span className="diploma-date">May 2026</span>
                </div>
            </Reveal>

            <div ref={statsRef} className="education-stats">
                {statItems.map(({ id, display, label, isText, isIcon }, i) => (
                    <div
                        key={id}
                        className={`edu-stat reveal${statsVisible ? ' reveal-in' : ''}`}
                        style={{ transitionDelay: `${i * 0.08}s` }}
                    >
                        {isIcon ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="honor-icon" aria-hidden="true">
                                <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H9v2h6v-2h-2v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                            </svg>
                        ) : (
                            <span className={`honor-value${isText ? ' honor-greek' : ''}`}>{display}</span>
                        )}
                        <span className="honor-label">{label}</span>
                    </div>
                ))}
            </div>
        </section>
    )
}

export default Education
