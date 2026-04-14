import Sidebar from './components/Sidebar'
import About from './components/About'
import Education from './components/Education'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Skills from './components/Skills'
import './App.css'

function App(){
  return(
    <div className="app">
      <Sidebar />
      <main className='content'>
        <About />
        <Education />
        <Projects />
        <Experience />
        <Skills />
        <section id="contact">
          <h2>Contact</h2>
          <div className="card">
            <p>Email: <a href="mailto: ianredman858@gmail.com">ianredman858@gmail.com</a></p>
            <p>Github: <a href="http://github.com/ianredmann" target="_blank">github.com/ianredmann</a></p>
            <p>LinkedIn: <a href="https://www.linkedin.com/in/ian-redman-1288b4263/" target="_blank">linkedin.com/in/ian-redman-1288b4263</a></p>
          </div>
        </section>
      </main>
    </div>
  )
}

export default App