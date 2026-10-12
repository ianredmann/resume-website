import { useState, useEffect, useRef } from 'react'
import photo from '../assets/photo-about-2.avif'

const IAN_LAT = 29.7604
const IAN_LNG = -95.3698

const QUOTE_LEAD = `"The road to wisdom? Well, it's plain and simple to express:`
const QUOTE_LINES = ['err', 'and err', 'and err again', 'but less', 'and less', 'and less."']

// The poem is a damped oscillation: err, err, err again, but less and less.
// Plot it as one, and pin each line of the poem to a peak of the curve.
const VB_W = 1000
const VB_H = 200
const MID = VB_H / 2
const AMP = 82
const DECAY = 2.2
const wave = t => Math.exp(-DECAY * t) * Math.sin(2 * Math.PI * 3 * t)
const SAMPLES = Array.from({ length: 241 }, (_, i) => {
    const t = i / 240
    return { t, y: MID - AMP * wave(t) }
})
const WAVE_PATH = SAMPLES.map((p, i) => `${i ? 'L' : 'M'}${(p.t * VB_W).toFixed(1)} ${p.y.toFixed(1)}`).join(' ')
const PEAKS = SAMPLES.slice(1, -1)
    .filter((p, i) => (p.y - SAMPLES[i].y) * (SAMPLES[i + 2].y - p.y) < 0)
    .map((p, i) => ({ ...p, text: QUOTE_LINES[i], above: p.y < MID }))
const END_Y = SAMPLES[SAMPLES.length - 1].y

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
    const [localTime, setLocalTime] = useState(formatTime)
    const [distance, setDistance] = useState(null)
    const [locating, setLocating] = useState(false)
    const locationRef = useRef(null)

    useEffect(() => {
        const id = setInterval(() => setLocalTime(formatTime()), 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        const handler = e => {
            if (!locationRef.current?.contains(e.target)) setLocationOpen(false)
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

            <div className="hero-meta">
                <span className="hero-tag">CS & Mathematics</span>

                <span className="hero-tag">OBU '26</span>

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

            <div className="hero-head">
                <h1 className="hero-name">Ian Redman</h1>
                <div className="hero-photo-frame">
                    <img src={photo} alt="Ian Redman" className="hero-photo" />
                </div>
            </div>

            <div className="hero-sub">
                <p className="hero-lead">
                    Full Stack Developer &amp; Data Analyst. I build web apps and turn messy data into clear answers.
                </p>
                <div className="hero-cta">
                    <a
                        href="#projects"
                        className="hero-cta-btn hero-cta-btn--primary"
                        onClick={(e) => { e.preventDefault(); document.getElementById('projects').scrollIntoView({ behavior: 'smooth' }) }}
                    >
                        See my work <span aria-hidden="true">→</span>
                    </a>
                    <a
                        href="#contact"
                        className="hero-cta-btn"
                        onClick={(e) => { e.preventDefault(); document.getElementById('contact').scrollIntoView({ behavior: 'smooth' }) }}
                    >
                        Get in touch
                    </a>
                </div>
            </div>

            <figure className="hero-mantra">
                <blockquote>
                    <p className="mantra-lead">{QUOTE_LEAD}</p>
                    <div className="mantra-plot">
                        <svg viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none" aria-hidden="true">
                            <line className="mantra-axis" x1="0" y1={MID} x2={VB_W} y2={MID} />
                            <path className="mantra-line" d={WAVE_PATH} pathLength="1" />
                        </svg>
                        {PEAKS.map(({ t, y, text, above }) => (
                            <span
                                key={text}
                                className={`mantra-label ${above ? 'mantra-label--above' : 'mantra-label--below'}`}
                                style={{ left: `${t * 100}%`, top: `${(y / VB_H) * 100}%`, '--t': t }}
                            >{text}</span>
                        ))}
                        <span className="mantra-end" style={{ top: `${(END_Y / VB_H) * 100}%` }} aria-hidden="true" />
                    </div>
                </blockquote>
                <figcaption className="mantra-caption">
                    <span>As a new grad and retired swimmer (and deplorable chess player), this is my personal mantra.</span>
                    <cite>— Piet Hein</cite>
                </figcaption>
            </figure>

        </section>
    )
}

export default About
