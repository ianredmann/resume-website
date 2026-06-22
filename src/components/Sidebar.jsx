import { useState, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

const LINKEDIN_HREF = 'https://linkedin.com/in/ian-redman-1288b4263/'
const GITHUB_HREF = 'https://github.com/ianredmann'

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

function ThemeIcon({ darkMode, size = 19 }) {
    return (
        <span className={`theme-icon-wrap${darkMode ? ' dark' : ''}`} style={{ width: size, height: size }}>
            <svg className="icon-sun" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 17a5 5 0 1 0 0-10 5 5 0 0 0 0 10zm0 2a7 7 0 1 1 0-14 7 7 0 0 1 0 14zM11 1h2v3h-2V1zm0 19h2v3h-2v-3zM3.515 4.929l1.414-1.414L7.05 5.636 5.636 7.05 3.515 4.93zM16.95 18.364l1.414-1.414 2.121 2.121-1.414 1.414-2.121-2.121zm2.121-14.85 1.414 1.415-2.121 2.121-1.414-1.414 2.121-2.121zM5.636 16.95l1.414 1.414-2.121 2.121-1.414-1.414 2.121-2.121zM23 11v2h-3v-2h3zM4 11v2H1v-2h3z"/>
            </svg>
            <svg className="icon-moon" xmlns="http://www.w3.org/2000/svg" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"/>
            </svg>
        </span>
    )
}

function IrLogo() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" className="mobile-logo" aria-hidden="true">
            <rect width="32" height="32" rx="6" fill="var(--color-border)" />
            <text
                x="16" y="22"
                textAnchor="middle"
                fontFamily="Georgia, serif"
                fontSize="16"
                fontWeight="700"
                fill="var(--color-text-muted)"
            >IR</text>
        </svg>
    )
}

function Sidebar() {
    const [activeSection, setActiveSection] = useState('about')
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
    const [menuOpen, setMenuOpen] = useState(false)
    const [locationOpen, setLocationOpen] = useState(false)
    const [obuOpen, setObuOpen] = useState(false)
    const [localTime, setLocalTime] = useState(formatTime)
    const [distance, setDistance] = useState(null)
    const [locating, setLocating] = useState(false)
    const locationRef = useRef(null)
    const obuRef = useRef(null)
    const locationMobileRef = useRef(null)
    const obuMobileRef = useRef(null)

    const sections = [
        { id: 'about', label: 'Home' },
        { id: 'education', label: 'Education' },
        { id: 'athletics', label: 'Athletics' },
        { id: 'projects', label: 'Projects' },
        { id: 'experience', label: 'Experience' },
        { id: 'skills', label: 'Skills' },
        { id: 'contact', label: 'Contact' },
    ]

    useEffect(() => {
        const wasAtEdge = { current: false }

        const getSectionInView = () => {
            const vh = window.innerHeight
            const zoneTop = vh * 0.40
            const zoneBottom = vh * 0.45
            for (const { id } of sections) {
                const el = document.getElementById(id)
                if (!el) continue
                const rect = el.getBoundingClientRect()
                if (rect.top <= zoneBottom && rect.bottom >= zoneTop) return id
            }
            return null
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && !wasAtEdge.current) {
                        setActiveSection(entry.target.id)
                    }
                })
            },
            { rootMargin: '-40% 0px -55% 0px', threshold: 0 }
        )
        sections.forEach(({ id }) => {
            const el = document.getElementById(id)
            if (el) observer.observe(el)
        })

        const handleScroll = () => {
            const scrollTop = window.scrollY
            const scrollBottom = document.documentElement.scrollHeight - window.innerHeight - scrollTop
            if (scrollTop < 50) {
                wasAtEdge.current = true
                setActiveSection('about')
            } else if (scrollBottom < 50) {
                wasAtEdge.current = true
                setActiveSection('contact')
            } else {
                if (wasAtEdge.current) {
                    const current = getSectionInView()
                    if (current) setActiveSection(current)
                }
                wasAtEdge.current = false
            }
        }

        handleScroll()
        window.addEventListener('scroll', handleScroll, { passive: true })
        return () => {
            observer.disconnect()
            window.removeEventListener('scroll', handleScroll)
        }
    }, [])

    useEffect(() => {
        document.body.classList.toggle('dark-mode', darkMode)
        localStorage.setItem('theme', darkMode ? 'dark' : 'light')
    }, [darkMode])

    useEffect(() => {
        const meta = document.querySelector('meta[name="theme-color"]')
        if (!meta) return
        meta.setAttribute('content', darkMode ? '#1e1c1a' : '#ede9e1')
    }, [darkMode, menuOpen])

    useEffect(() => {
        const id = setInterval(() => setLocalTime(formatTime()), 1000)
        return () => clearInterval(id)
    }, [])

    useEffect(() => {
        if (!menuOpen) return
        const scrollY = window.scrollY
        document.body.style.position = 'fixed'
        document.body.style.top = `-${scrollY}px`
        document.body.style.width = '100%'
        return () => {
            document.body.style.position = ''
            document.body.style.top = ''
            document.body.style.width = ''
            window.scrollTo(0, scrollY)
        }
    }, [menuOpen])

    useEffect(() => {
        const handler = e => {
            const inLocation = (locationRef.current?.contains(e.target)) || (locationMobileRef.current?.contains(e.target))
            const inObu = (obuRef.current?.contains(e.target)) || (obuMobileRef.current?.contains(e.target))
            if (!inLocation) setLocationOpen(false)
            if (!inObu) setObuOpen(false)
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

    const handleNavClick = (e, id) => {
        e.preventDefault()
        setMenuOpen(false)
        const section = document.getElementById(id)
        if (section) section.scrollIntoView({ behavior: 'smooth' })
    }

    const linkedinLink = (
        <a href={LINKEDIN_HREF} target="_blank" rel="noreferrer" className="icon-link" title="LinkedIn">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.987V9h3.102v1.561h.046c.431-.817 1.484-1.678 3.054-1.678 3.268 0 3.868 2.151 3.868 4.948v6.621zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
            <span>LinkedIn</span>
        </a>
    )

    const githubLink = (
        <a href={GITHUB_HREF} target="_blank" rel="noreferrer" className="icon-link" title="GitHub">
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
            </svg>
            <span>GitHub</span>
        </a>
    )

    const themeToggle = (
        <button
            className="theme-toggle"
            onClick={() => setDarkMode(!darkMode)}
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
            <ThemeIcon darkMode={darkMode} size={15} />
            {darkMode ? 'Light mode' : 'Dark mode'}
        </button>
    )

    return (
        <aside className="sidebar">
            <div className="mobile-left-group">
                <button className="hamburger" onClick={() => setMenuOpen(!menuOpen)} aria-label={menuOpen ? 'Close menu' : 'Open menu'}>
                    <span className={`hamburger-lines${menuOpen ? ' open' : ''}`}>
                        <span className="line" />
                        <span className="line" />
                        <span className="line" />
                    </span>
                </button>
                <button
                    className="mobile-theme-btn"
                    onClick={() => setDarkMode(d => !d)}
                    aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                >
                    <ThemeIcon darkMode={darkMode} />
                </button>
            </div>
            {menuOpen && createPortal(
                <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />,
                document.body
            )}
            <a href="#about" onClick={(e) => handleNavClick(e, 'about')} className="mobile-logo-link"><IrLogo /></a>

            <div className="sidebar-top">
                <a href="#about" className="sidebar-name" onClick={(e) => handleNavClick(e, 'about')}>Ian Redman</a>
                <div className="sidebar-bio">
                    <p className="sidebar-role">
                        CS & Mathematics ·{' '}
                        <span className="obu-widget" ref={obuRef}>
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
                    </p>
                    <div className="location-widget" ref={locationRef}>
                        <div
                            className="location-trigger"
                            onClick={() => setLocationOpen(o => !o)}
                            role="button"
                            aria-expanded={locationOpen}
                        >
                            <span className="location-dot" />
                            <span>Houston, Texas</span>
                            <span className="location-time">{localTime}</span>
                        </div>
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
                    </div>
                </div>
            </div>

            <nav className={menuOpen ? 'open' : ''}>
                <ul>
                    {sections.map((section) => (
                        <li key={section.id}>
                            <a
                                href={`#${section.id}`}
                                className={activeSection === section.id ? 'active' : ''}
                                onClick={(e) => handleNavClick(e, section.id)}
                            >
                                {section.label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="mobile-bio">
                    <p className="sidebar-role">
                        CS & Mathematics ·{' '}
                        <span className="obu-widget" ref={obuMobileRef}>
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
                    </p>
                    <div className="location-widget" ref={locationMobileRef}>
                        <div
                            className="location-trigger"
                            onClick={() => setLocationOpen(o => !o)}
                            role="button"
                            aria-expanded={locationOpen}
                        >
                            <span className="location-dot" />
                            <span>Houston, Texas</span>
                            <span className="location-time">{localTime}</span>
                        </div>
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
                    </div>
                </div>
                <div className="mobile-nav-footer">
                    {linkedinLink}
                    {githubLink}
                </div>
            </nav>

            <div className="sidebar-footer">
                <div className="sidebar-links">
                    {linkedinLink}
                    {githubLink}
                </div>
                {themeToggle}
            </div>
        </aside>
    )
}

export default Sidebar
