import { useState, useEffect } from 'react'
import img1 from '../assets/IMG_2467.jpeg'
import img2 from '../assets/IMG_9991.jpeg'
import img3 from '../assets/IMG_1080.png'
import img4 from '../assets/IMG_1138.jpeg'
import img5 from '../assets/IMG_9974.jpeg'

const photos = [img1, img2, img3, img4, img5]

const stats = [
    { value: '×2', label: 'All-American' },
    { value: '×2', label: 'First Team All-Conference' },
    { value: '×1', label: 'Second Team All-Conference' },
    { value: '×2', label: 'Academic All-District' },
]

const championships = [
    {
        year: '2025',
        event: '400 Freestyle Relay',
        place: '13th Place',
        url: 'https://obutigers.com/news/2025/3/15/mens-swimming-and-diving-tigersharks-wrap-up-trip-to-national-championships.aspx',
    },
    {
        year: '2026',
        event: '400 Freestyle Relay',
        place: '15th Place',
        url: 'https://obutigers.com/news/2026/2/26/mens-swimming-diving-eight-tigersharks-earn-nationals-invite.aspx',
    },
]

function Athletics() {
    const [active, setActive] = useState(0)
    const [paused, setPaused] = useState(false)

    useEffect(() => {
        if (paused) return
        const id = setInterval(() => {
            setActive(i => (i + 1) % photos.length)
        }, 3500)
        return () => clearInterval(id)
    }, [paused])

    return (
        <section id="athletics">
            <h2>Athletics</h2>

            <div className="athletics-layout">

                <div
                    className="athletics-carousel"
                    onMouseEnter={() => setPaused(true)}
                    onMouseLeave={() => setPaused(false)}
                >
                    {photos.map((src, i) => (
                        <div key={i} className={`carousel-slide${i === active ? ' active' : ''}`}>
                            <img src={src} className="carousel-bg" alt="" />
                            <img src={src} className="carousel-fg" alt="OBU swim competition" />
                        </div>
                    ))}
                    <div className="carousel-dots">
                        {photos.map((_, i) => (
                            <button
                                key={i}
                                className={`carousel-dot${i === active ? ' active' : ''}`}
                                onClick={() => setActive(i)}
                                aria-label={`Photo ${i + 1}`}
                            />
                        ))}
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">
                        <h3>OBU Swim Team</h3>
                        <span className="location">NCAA Division II</span>
                    </div>

                    <div className="athletics-stat-grid">
                        {stats.map(({ value, label }) => (
                            <div className="athletics-stat-block" key={label}>
                                <span className="honor-value">{value}</span>
                                <span className="honor-label">{label}</span>
                            </div>
                        ))}
                    </div>

                    <div className="championships">
                        <p className="championships-title">NCAA DII Championships</p>
                        {championships.map(({ year, event, place, url }) => (
                            <a
                                key={year}
                                href={url}
                                target="_blank"
                                rel="noreferrer"
                                className="championship-entry"
                            >
                                <div className="championship-year">{year}</div>
                                <div className="championship-detail">
                                    <span className="championship-event">{event}</span>
                                    <span className="championship-place">{place}</span>
                                </div>
                                <span className="championship-arrow">→</span>
                            </a>
                        ))}
                    </div>
                </div>

            </div>
        </section>
    )
}

export default Athletics
