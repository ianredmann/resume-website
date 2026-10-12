import Navbar from './components/Navbar'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import Skills from './components/Skills'
import Experience from './components/Experience'
import Athletics from './components/Athletics'
import Contact from './components/Contact'
import Footer from './components/Footer'
import './App.css'

function App(){
  return(
    <div className="app">
      <Navbar />
      <main className='content'>
        <About />
        <Education />
        <Projects />
        <Skills />
        <Experience />
        <Athletics />
        <Contact />
      </main>
      <Footer />
    </div>
  )
}

export default App
