import { useState, useEffect } from 'react'
import { createPortal } from 'react-dom'

const LINKEDIN_HREF = 'https://linkedin.com/in/ian-redman-1288b4263/'
const GITHUB_HREF = 'https://github.com/ianredmann'

const sections = [
    { id: 'home', label: 'Home' },
    { id: 'education', label: 'Education' },
    { id: 'athletics', label: 'Athletics' },
    { id: 'projects', label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'skills', label: 'Skills' },
    { id: 'contact', label: 'Contact' },
]

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
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="32" height="32" aria-hidden="true">
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

function Navbar() {
    const [activeSection, setActiveSection] = useState('home')
    const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark')
    const [menuOpen, setMenuOpen] = useState(false)
    const [scrollProgress, setScrollProgress] = useState(0)

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
                setActiveSection('home')
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
        const update = () => {
            const scrolled = window.scrollY
            const total = document.documentElement.scrollHeight - window.innerHeight
            setScrollProgress(total > 0 ? (scrolled / total) * 100 : 0)
        }
        update()
        window.addEventListener('scroll', update, { passive: true })
        return () => window.removeEventListener('scroll', update)
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

    const handleNavClick = (e, id) => {
        e.preventDefault()
        setMenuOpen(false)
        if (id === 'home') {
            window.scrollTo({ top: 0, behavior: 'smooth' })
            return
        }
        const section = document.getElementById(id)
        if (section) section.scrollIntoView({ behavior: 'smooth' })
    }

    return (
        <header className="topnav">
            <div className="topnav-progress">
                <div className="topnav-progress-fill" style={{ width: `${scrollProgress}%` }} />
            </div>

            <div className="topnav-inner">
                <a href="#home" className="topnav-logo" onClick={(e) => handleNavClick(e, 'home')}>
                    <IrLogo />
                </a>

                <div className="topnav-right">
                    <nav>
                        <ul>
                            {sections.map(({ id, label }) => (
                                <li key={id}>
                                    <a
                                        href={`#${id}`}
                                        className={activeSection === id ? 'active' : ''}
                                        onClick={(e) => handleNavClick(e, id)}
                                    >
                                        {label}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </nav>
                    <div className="topnav-actions">
                        <a href={LINKEDIN_HREF} target="_blank" rel="noreferrer" className="topnav-icon-btn" title="LinkedIn">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.987V9h3.102v1.561h.046c.431-.817 1.484-1.678 3.054-1.678 3.268 0 3.868 2.151 3.868 4.948v6.621zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                            </svg>
                        </a>
                        <a href={GITHUB_HREF} target="_blank" rel="noreferrer" className="topnav-icon-btn" title="GitHub">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                                <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                            </svg>
                        </a>
                        <button
                            className="topnav-icon-btn"
                            onClick={() => setDarkMode(d => !d)}
                            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                        >
                            <ThemeIcon darkMode={darkMode} size={16} />
                        </button>
                    </div>
                </div>

                <button
                    className="hamburger"
                    onClick={() => setMenuOpen(m => !m)}
                    aria-label={menuOpen ? 'Close menu' : 'Open menu'}
                >
                    <span className={`hamburger-lines${menuOpen ? ' open' : ''}`}>
                        <span className="line" />
                        <span className="line" />
                        <span className="line" />
                    </span>
                </button>
            </div>

            {menuOpen && createPortal(
                <div className="mobile-backdrop" onClick={() => setMenuOpen(false)} />,
                document.body
            )}

            <nav className={`topnav-drawer${menuOpen ? ' open' : ''}`}>
                <ul>
                    {sections.map(({ id, label }) => (
                        <li key={id}>
                            <a
                                href={`#${id}`}
                                className={activeSection === id ? 'active' : ''}
                                onClick={(e) => handleNavClick(e, id)}
                            >
                                {label}
                            </a>
                        </li>
                    ))}
                </ul>
                <div className="topnav-drawer-footer">
                    <a href={LINKEDIN_HREF} target="_blank" rel="noreferrer" className="icon-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M20.447 20.452H17.21v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.987V9h3.102v1.561h.046c.431-.817 1.484-1.678 3.054-1.678 3.268 0 3.868 2.151 3.868 4.948v6.621zM5.337 7.433a1.8 1.8 0 1 1 0-3.601 1.8 1.8 0 0 1 0 3.601zm1.554 13.019H3.783V9h3.108v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
                        </svg>
                        <span>LinkedIn</span>
                    </a>
                    <a href={GITHUB_HREF} target="_blank" rel="noreferrer" className="icon-link">
                        <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12"/>
                        </svg>
                        <span>GitHub</span>
                    </a>
                    <button
                        className="theme-toggle"
                        onClick={() => setDarkMode(d => !d)}
                        title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
                    >
                        <ThemeIcon darkMode={darkMode} size={15} />
                        {darkMode ? 'Light mode' : 'Dark mode'}
                    </button>
                </div>
            </nav>
        </header>
    )
}

export default Navbar
