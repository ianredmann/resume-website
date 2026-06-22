import { useState, useEffect, useRef } from 'react'
import photo from '../assets/photo-about.avif'

const IAN_LAT = 29.7604
const IAN_LNG = -95.3698

function haversineDistance(lat1, lng1, lat2, lng2) {
    const R = 3958.8
    const toRad = d => d * Math.PI / 180
    const dLat = toRad(lat2 - lat1)
    const dLng = toRad(lng2 - lng1)
    const a = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLng / 2) ** 2
    return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

function formatTime() {
    return new Date().toLocaleTimeString('en-US', {
        timeZone: 'America/Chicago',
        hour: 'numeric',
        minute: '2-digit',
        hour12: true,
    })
}

function About() {
    const [locationOpen, setLocationOpen] = useState(false)
    const [obuOpen, setObuOpen] = useState(false)
    const [localTime, setLocalTime] = useState(formatTime)
    const [distance, setDistance] = useState(null)
    const [locating, setLocating] = useState(false)
    const locationRef = useRef(null)
    const obuRef = useRef(null)

    useEffect(() => {
        const id = setInterval(() => setLocalTime(formatTime()), 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const handler = e => {
            if (!locationRef.current?.contains(e.target)) setLocationOpen(false)
            if (!obuRef.current?.contains(e.target)) setObuOpen(false)
        }
        document.addEventListener('mousedown', handler)
        return () => document.removeEventListener('mousedown', handler)
    }, [])

    const handleLocate = () => {
        if (!navigator.geolocation) return
        setLocating(true)
        navigator.geolocation.getCurrentPosition(
            pos => {
                const d = haversineDistance(IAN_LAT, IAN_LNG, pos.coords.latitude, pos.coords.longitude)
                setDistance(Math.round(d))
                setLocating(false)
            },
            () => setLocating(false)
        )
    }

    return (
        <section id="home" className="hero">
            <div className="hero-content">
                <div className="hero-text">
                    <h1>Hi, I'm Ian</h1>

                    <div className="hero-meta">
                        <span className="hero-tag">CS & Mathematics</span>

                        <span className="obu-widget hero-tag hero-tag-btn" ref={obuRef}>
                            <span
                                className="obu-trigger"
                                onClick={() => setObuOpen(o => !o)}
                                role="button"
                                aria-expanded={obuOpen}
                            >OBU '26</span>
                            {obuOpen && (
                                <div className="obu-popup">
                                    <div className="location-popup-header">
                                        <span className="location-popup-city">Ouachita Baptist University</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Location</span>
                                        <span>Arkadelphia, AR</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Founded</span>
                                        <span>1886</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Enrollment</span>
                                        <span>~1,500 students</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Conference</span>
                                        <span>GAC · NCAA DII</span>
                                    </div>
                                    <div className="location-popup-divider" />
                                    <a
                                        href="https://www.obu.edu"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="location-btn"
                                    >Visit obu.edu →</a>
                                </div>
                            )}
                        </span>

                        <span className="location-widget hero-tag hero-tag-btn" ref={locationRef}>
                            <span
                                className="location-trigger"
                                onClick={() => setLocationOpen(o => !o)}
                                role="button"
                                aria-expanded={locationOpen}
                            >
                                <span className="location-dot" />
                                Houston, TX
                                <span className="location-time">{localTime}</span>
                            </span>
                            {locationOpen && (
                                <div className="location-popup">
                                    <div className="location-popup-header">
                                        <span className="location-dot" />
                                        <span className="location-popup-city">Houston, Texas</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Timezone</span>
                                        <span>Central (CT)</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Local time</span>
                                        <span>{localTime}</span>
                                    </div>
                                    <div className="location-popup-row">
                                        <span>Work style</span>
                                        <span>Hybrid / On-site</span>
                                    </div>
                                    {distance !== null && (
                                        <div className="location-popup-row">
                                            <span>Distance</span>
                                            <span>{distance < 10 ? "You're here!" : `${distance.toLocaleString()} mi away`}</span>
                                        </div>
                                    )}
                                    <div className="location-popup-divider" />
                                    <button
                                        className="location-btn"
                                        onClick={handleLocate}
                                        disabled={locating}
                                    >
                                        <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
                                            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                                        </svg>
                                        {locating ? 'Locating…' : distance !== null ? 'Update location' : 'Use my location'}
                                    </button>
                                </div>
                            )}
                        </span>
                    </div>

                    <blockquote className="about-quote">
                        "The road to wisdom? Well, it's plain and simple to express:<br />err<br />and err<br />and err again<br />but less<br />and less<br />and less."
                        <cite className="about-quote-attr">— Piet Hein</cite>
                    </blockquote>
                    <p>As an unemployed new grad and retired swimmer (and deplorable chess player), this is my personal mantra.</p>
                </div>

                <img src={photo} alt="Ian Redman" className="hero-photo" />
            </div>
        </section>
    )
}

export default About
