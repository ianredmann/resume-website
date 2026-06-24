import { useEffect, useRef, useState } from 'react'
import { countUp } from '../utils/countUp'
import photoBW from '../assets/photo-swim-bw.avif'
import photoSwim from '../assets/photo-swimming.avif'
import photoBlock from '../assets/photo-block.avif'
import obuLogo from '../assets/ouachita-baptist.svg'
import ncaaLogo from '../assets/ncaa-dii-logo.svg'
import champ2025Logo from '../assets/champ-2025-ncaa-dii.avif'
import champ2026Logo from '../assets/champ-2026-ncaa-dii.png'

const stats = [
    { num: 2, prefix: '×', label: 'All-American', area: 'stat-aa', delay: '0.45s' },
    { num: 2, prefix: '×', label: 'First Team All-Conference', area: 'stat-1ac', delay: '0.30s' },
    { num: 1, prefix: '×', label: 'Second Team All-Conference', area: 'stat-2ac', delay: '0.35s' },
    { num: 2, prefix: '×', label: 'Academic All-District', area: 'stat-acd', delay: '0.40s' },
]

const championships = [
    {
        year: '2025',
        logo: champ2025Logo,
        event: '400 Freestyle Relay',
        place: '13th Place',
        url: 'https://obutigers.com/news/2025/3/15/mens-swimming-and-diving-tigersharks-wrap-up-trip-to-national-championships.aspx',
    },
    {
        year: '2026',
        logo: champ2026Logo,
        event: '400 Freestyle Relay',
        place: '15th Place',
        url: 'https://obutigers.com/news/2026/2/26/mens-swimming-diving-eight-tigersharks-earn-nationals-invite.aspx',
    },
]

function Athletics() {
    const bentoRef = useRef(null)
    const [visible, setVisible] = useState(false)
    const [counts, setCounts] = useState(stats.map(() => 0))

    useEffect(() => {
        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true)
                    observer.disconnect()
                    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
                    if (prefersReduced) {
                        setCounts(stats.map(s => s.num))
                    } else {
                        stats.forEach((s, i) => {
                            setTimeout(() => {
                                countUp(
                                    v => setCounts(prev => prev.map((c, idx) => idx === i ? v : c)),
                                    s.num,
                                    800
                                )
                            }, 600)
                        })
                    }
                }
            },
            { threshold: 0.1 }
        )
        if (bentoRef.current) observer.observe(bentoRef.current)
        return () => observer.disconnect()
    }, [])

    const bentoClass = `athletics-bento${visible ? ' ath-visible' : ''}`

    return (
        <section id="athletics">
            <h2>Athletics</h2>
            <div className={bentoClass} ref={bentoRef}>

                <div className="bento-photo ath-cell" style={{ gridArea: 'photo-bw', animationDelay: '0.28s' }}>
                    <img src={photoBW} alt="Ian Redman in swim cap" />
                </div>

                {stats.map(({ prefix, label, area, delay }, i) => (
                    <div key={label} className="card bento-stat ath-cell" style={{ gridArea: area, animationDelay: delay }}>
                        <span className="honor-value">{prefix}{counts[i]}</span>
                        <span className="honor-label">{label}</span>
                    </div>
                ))}

                <div className="card bento-logo ath-cell" style={{ gridArea: 'ncaa-logo', animationDelay: '0.05s' }}>
                    <img src={ncaaLogo} alt="NCAA Division II" />
                </div>

                <div className="card bento-logo ath-cell" style={{ gridArea: 'obu-logo', animationDelay: '0.10s' }}>
                    <img src={obuLogo} alt="Ouachita Baptist University" />
                </div>

                <div className="bento-photo ath-cell" style={{ gridArea: 'photo-sw', animationDelay: '0.52s' }}>
                    <img src={photoSwim} alt="Ian Redman swimming freestyle" style={{ objectPosition: 'center center' }} />
                </div>

                <div className="bento-photo ath-cell" style={{ gridArea: 'photo-blk', animationDelay: '0s' }}>
                    <img src={photoBlock} alt="Ian Redman at the block" />
                </div>

                <div className="bento-champs ath-cell" style={{ gridArea: 'champs', animationDelay: '0.18s' }}>
                    {championships.map(({ year, logo, event, place, url }) => (
                        <a
                            key={year}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="card bento-champ ath-cell"
                        >
                            <img src={logo} alt={`${year} NCAA DII Championships`} className="championship-logo" />
                            <div className="championship-detail">
                                <span className="championship-event">{event}</span>
                                <span className="championship-place">{place}</span>
                            </div>
                            <span className="championship-arrow">→</span>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Athletics
