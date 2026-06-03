import { useLayoutEffect } from 'react'
import Sidebar from './components/Sidebar'
import About from './components/About'
import Education from './components/Education'
import Athletics from './components/Athletics'
import Contact from './components/Contact'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import './App.css'

function App(){
  useLayoutEffect(() => {
    const cards = document.querySelectorAll('.card')

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            observer.unobserve(entry.target)
          }
        })
      },
      { threshold: 0.08 }
    )

    cards.forEach((card) => {
      card.classList.add('will-animate')
      observer.observe(card)
    })

    return () => observer.disconnect()
  }, [])

  return(
    <div className="app">
      <Sidebar />
      <main className='content'>
        <About />
        <Education />
        <Athletics />
        <Projects />
        <Experience />
        <Skills />
        <Contact />
      </main>
    </div>
  )
}

export default App