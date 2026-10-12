import { useInView } from '../hooks/useInView'
import { useCountUp } from '../hooks/useCountUp'
import photoBW from '../assets/photo-swim-bw.avif'
import photoSwim from '../assets/photo-swimming.avif'
import photoBlock from '../assets/photo-block.avif'
import obuLogo from '../assets/ouachita-baptist.svg'
import ncaaLogo from '../assets/ncaa-dii-logo.svg'
import champ2025Logo from '../assets/champ-2025-ncaa-dii.avif'
import champ2026Logo from '../assets/champ-2026-ncaa-dii.png'

const stats = [
    { num: 2, prefix: '×', label: 'All-American', years: '2024–25, 2025–26', area: 'stat-aa', delay: 0.45 },
    { num: 2, prefix: '×', label: 'First Team All-Conference', years: '2024–25, 2025–26', area: 'stat-1ac', delay: 0.30 },
    { num: 1, prefix: '×', label: 'Second Team All-Conference', years: '2023–24', area: 'stat-2ac', delay: 0.35 },
    { num: 2, prefix: '×', label: 'Academic All-District', years: '2024–25, 2025–26', area: 'stat-acd', delay: 0.40 },
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

function StatCell({ stat, visible }) {
    const { num, prefix, label, years, area, delay } = stat
    const count = useCountUp(num, visible, { duration: 800, delay: 600 })
    return (
        <div
            className={`card bento-stat reveal${visible ? ' reveal-in' : ''}`}
            style={{ gridArea: area, transitionDelay: `${delay}s` }}
        >
            <span className="honor-value">{prefix}{count}</span>
            <span className="honor-label">{label}</span>
            <span className="stat-years">{years}</span>
        </div>
    )
}

function Athletics() {
    const [bentoRef, visible] = useInView({ threshold: 0.1 })
    const cell = (area, delay) => ({
        className: `reveal${visible ? ' reveal-in' : ''}`,
        style: { gridArea: area, transitionDelay: `${delay}s` },
    })

    return (
        <section id="athletics">
            <h2>Athletics</h2>
            <div className="athletics-bento" ref={bentoRef}>

                <div className={`bento-photo ${cell('photo-bw', 0.28).className}`} style={cell('photo-bw', 0.28).style}>
                    <img src={photoBW} alt="Ian Redman in swim cap" />
                    <div className="photo-caption"><span>Battle of the Ravine</span></div>
                </div>

                {stats.map(stat => (
                    <StatCell key={stat.label} stat={stat} visible={visible} />
                ))}

                <div className={`card bento-logo ${cell('ncaa-logo', 0.05).className}`} style={cell('ncaa-logo', 0.05).style}>
                    <img src={ncaaLogo} alt="NCAA Division II" />
                </div>

                <div className={`card bento-logo ${cell('obu-logo', 0.1).className}`} style={cell('obu-logo', 0.1).style}>
                    <img src={obuLogo} alt="Ouachita Baptist University" />
                </div>

                <div className={`bento-photo ${cell('photo-sw', 0.52).className}`} style={cell('photo-sw', 0.52).style}>
                    <img src={photoSwim} alt="Ian Redman swimming freestyle" style={{ objectPosition: 'center center' }} />
                    <div className="photo-caption"><span>NCAA Championships</span></div>
                </div>

                <div className={`bento-photo ${cell('photo-blk', 0).className}`} style={cell('photo-blk', 0).style}>
                    <img src={photoBlock} alt="Ian Redman at the block" />
                    <div className="photo-caption"><span>Conference Championships</span></div>
                </div>

                <div className={`bento-champs ${cell('champs', 0.18).className}`} style={cell('champs', 0.18).style}>
                    {championships.map(({ year, logo, event, place, url }) => (
                        <a
                            key={year}
                            href={url}
                            target="_blank"
                            rel="noreferrer"
                            className="card bento-champ"
                        >
                            <img src={logo} alt={`${year} NCAA DII Championships`} className="championship-logo" />
                            <div className="championship-detail">
                                <span className="championship-event">{event}</span>
                                <span className="championship-place">{place}</span>
                            </div>
                            <span className="championship-arrow" aria-hidden="true">↗</span>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Athletics
