import photoBW from '../assets/IMG_2467.avif'
import photoSwim from '../assets/IMG_1138.avif'
import photoBlock from '../assets/IMG_9974.avif'
import obuLogo from '../assets/ouachita-baptist.svg'
import ncaaLogo from '../assets/NCAA_DII_logo_c.svg'
import champ2025Logo from '../assets/25_D2_Festival_RGB.png.avif'
import champ2026Logo from '../assets/logo_2026-DII-Swimming-and-Diving-National-Championships.png'

const stats = [
    { value: '×2', label: 'All-American', area: 'stat-aa' },
    { value: '×2', label: 'First Team All-Conference', area: 'stat-1ac' },
    { value: '×1', label: 'Second Team All-Conference', area: 'stat-2ac' },
    { value: '×2', label: 'Academic All-District', area: 'stat-acd' },
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
    return (
        <section id="athletics">
            <h2>Athletics</h2>
            <div className="athletics-bento">

                <div className="bento-photo" style={{ gridArea: 'photo-bw' }}>
                    <img src={photoBW} alt="Ian Redman in swim cap" />
                </div>

                {stats.map(({ value, label, area }) => (
                    <div key={label} className="card bento-stat" style={{ gridArea: area }}>
                        <span className="honor-value">{value}</span>
                        <span className="honor-label">{label}</span>
                    </div>
                ))}

                <div className="card bento-logo" style={{ gridArea: 'obu-logo' }}>
                    <img src={obuLogo} alt="Ouachita Baptist University" />
                </div>

                <div className="card bento-logo" style={{ gridArea: 'ncaa-logo' }}>
                    <img src={ncaaLogo} alt="NCAA Division II" />
                </div>

                <div className="bento-photo" style={{ gridArea: 'photo-sw' }}>
                    <img src={photoSwim} alt="Ian Redman swimming freestyle" style={{ objectPosition: 'center center' }} />
                </div>

                <div className="bento-photo" style={{ gridArea: 'photo-blk' }}>
                    <img src={photoBlock} alt="Ian Redman at the block" />
                </div>

                <div className="bento-champs" style={{ gridArea: 'champs' }}>
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
                            <span className="championship-arrow">→</span>
                        </a>
                    ))}
                </div>

            </div>
        </section>
    )
}

export default Athletics
