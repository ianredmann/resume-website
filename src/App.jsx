import { useEffect } from 'react'
import Navbar from './components/Navbar'
import About from './components/About'
import Education from './components/Education'
import Athletics from './components/Athletics'
import Contact from './components/Contact'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import Footer from './components/Footer'
import './App.css'

function App(){
  useEffect(() => {
    const cards = document.querySelectorAll('.card:not(.ath-cell)')
    cards.forEach((card) => card.classList.add('will-animate'))

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.2 }
    )

    const startObserving = () => cards.forEach((card) => observer.observe(card))

    // Cards already inside the initial viewport would otherwise fire their
    // reveal the instant observe() is called, racing the hero's own intro
    // animation. Wait for the user to actually scroll before observing.
    if (window.scrollY > 0) {
      startObserving()
    } else {
      window.addEventListener('scroll', startObserving, { once: true, passive: true })
    }

    return () => {
      observer.disconnect()
      window.removeEventListener('scroll', startObserving)
    }
  }, [])

  return(
    <div className="app">
      <Navbar />
      <main className='content'>
        <About />
        <Education />
        <Projects />
        <Experience />
        <Athletics />
        <Skills />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App