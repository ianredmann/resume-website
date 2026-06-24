import { useEffect, useRef, useState } from 'react'
import seal from '../assets/Ouachita_Baptist_University_seal_2025.png'
import ShinyText from './ShinyText'
import { countUp } from '../utils/countUp'

function WaveText({ text, startDelay = 0 }) {
    return (
        <>
            {text.split('').map((char, i) => (
                <span
                    key={i}
                    className="wave-char"
                    style={{ animationDelay: `${startDelay + i * 0.04}s` }}
                >
                    {char === ' ' ? ' ' : char}
                </span>
            ))}
        </>
    )
}

function Education() {
    const diplomaRef = useRef(null)
    const statsRef = useRef(null)
    const [diplomaVisible, setDiplomaVisible] = useState(false)
    const [statsVisible, setStatsVisible] = useState(false)
    const [statsAnimated, setStatsAnimated] = useState(false)
    const [hoveredTerm, setHoveredTerm] = useState(null)
    const [hoveredStat, setHoveredStat] = useState(null)
    const [tappedStat, setTappedStat] = useState(null)
    const [gpa, setGpa] = useState('0.0')
    const [pres, setPres] = useState(0)
    const [dean, setDean] = useState(0)

    useEffect(() => {
        const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const diplomaObs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setDiplomaVisible(true)
                    diplomaObs.disconnect()
                }
            },
            { threshold: 0.15 }
        )
        if (diplomaRef.current) diplomaObs.observe(diplomaRef.current)

        const statsObs = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setStatsVisible(true)
                    if (prefersReduced) {
                        setGpa('3.8')
                        setPres(3)
                        setDean(5)
                        setStatsAnimated(true)
                    } else {
                        countUp(setGpa, 3.8, 2400, true)
                        countUp(setPres, 3, 1800)
                        countUp(setDean, 5, 2200)
                        setTimeout(() => setStatsAnimated(true), 800)
                    }
                    statsObs.disconnect()
                }
            },
            { threshold: 0.2 }
        )
        if (statsRef.current) statsObs.observe(statsRef.current)

        return () => {
            diplomaObs.disconnect()
            statsObs.disconnect()
        }
    }, [])

    useEffect(() => {
        const handler = e => {
            if (!statsRef.current?.contains(e.target)) setTappedStat(null)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const glowMap = {
        magna: ['gpa', 'pres', 'dean'],
        math: ['kme'],
        cs: ['cs-award'],
    }
    const reverseMap = {
        gpa: 'magna', pres: 'magna', dean: 'magna',
        kme: 'math',
        'cs-award': 'cs',
    }
    const activeStat = hoveredStat ?? tappedStat
    const activeTerm = hoveredTerm ?? (activeStat ? reverseMap[activeStat] : null)
    const glowing = activeTerm ? (glowMap[activeTerm] ?? []) : []

    const statItems = [
        { id: 'gpa', display: gpa, label: 'GPA' },
        { id: 'pres', display: `×${pres}`, label: "President's List" },
        { id: 'dean', display: `×${dean}`, label: "Dean's List" },
        { id: 'kme', display: 'κμε', label: 'Kappa Mu Epsilon', isText: true },
        { id: 'cs-award', display: null, label: 'CS Excellence Award', isIcon: true },
    ]

    const delays = [0, 0.08, 0.16, 0.24, 0.32]

    return (
        <section id="education">
            <h2>Education</h2>

            <div
                ref={diplomaRef}
                className={`diploma-card${diplomaVisible ? ' diploma-visible' : ''}`}
            >
                <div className="diploma-seal-wrap diploma-el" style={{ transitionDelay: '0s' }}>
                    <img src={seal} alt="Ouachita Baptist University Seal" className="diploma-seal" />
                </div>

                <p className="diploma-school diploma-el" style={{ transitionDelay: '0.15s' }}>
                    Ouachita Baptist University
                </p>

                <p className="diploma-certifies diploma-el" style={{ transitionDelay: '0.3s' }}>
                    This certifies that
                </p>

                <h3 className="diploma-name diploma-el" style={{ transitionDelay: '0.45s' }}>
                    Ian Redman
                </h3>

                <p className="diploma-completed diploma-el" style={{ transitionDelay: '0.6s' }}>
                    has completed the requirements for
                </p>

                <div className="diploma-degrees diploma-el" style={{ transitionDelay: '0.75s' }}>
                    <span
                        className={`diploma-degree${activeTerm === 'cs' ? ' diploma-term-active' : ''}`}
                        onMouseEnter={() => setHoveredTerm('cs')}
                        onMouseLeave={() => setHoveredTerm(null)}
                    >
                        <WaveText text="Bachelor of Science in Computer Science" startDelay={1.5} />
                    </span>
                    <span
                        className={`diploma-degree${activeTerm === 'math' ? ' diploma-term-active' : ''}`}
                        onMouseEnter={() => setHoveredTerm('math')}
                        onMouseLeave={() => setHoveredTerm(null)}
                    >
                        <WaveText text="Bachelor of Science in Mathematics" startDelay={2.1} />
                    </span>
                </div>

                <div className="diploma-footer diploma-el" style={{ transitionDelay: '0.9s' }}>
                    <span
                        className={`diploma-honors-text${activeTerm === 'magna' ? ' diploma-term-active' : ''}`}
                        onMouseEnter={() => setHoveredTerm('magna')}
                        onMouseLeave={() => setHoveredTerm(null)}
                    >
                        <ShinyText text="Magna Cum Laude" />
                    </span>
                    <span className="diploma-separator">·</span>
                    <span className="diploma-date">May 2026</span>
                </div>
            </div>

            <div ref={statsRef} className="education-stats">
                {statItems.map(({ id, display, label, isText, isIcon }, i) => (
                    <div
                        key={id}
                        className={[
                            'edu-stat',
                            statsVisible ? 'edu-stat-visible' : '',
                            statsAnimated ? 'edu-stat-animated' : '',
                            glowing.includes(id) ? 'edu-stat-glow' : '',
                        ].filter(Boolean).join(' ')}
                        style={!statsAnimated ? { transitionDelay: `${delays[i]}s` } : undefined}
                        onMouseEnter={() => setHoveredStat(id)}
                        onMouseLeave={() => setHoveredStat(null)}
                        onClick={() => setTappedStat(prev => prev === id ? null : id)}
                        role="button"
                        tabIndex={0}
                        aria-label={label}
                    >
                        {isIcon ? (
                            <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="currentColor" className="honor-icon">
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
