import photo from '../assets/IMG_3007.avif'

function About(){
    return(
        <section id="about">
            <div className="about-content">
                <div className="about-text">
                    <h1>Hi, I'm Ian</h1>
                    <blockquote className="about-quote">
                        "The road to wisdom? Well, it's plain and simple to express:<br />err<br />and err<br />and err again<br />but less<br />and less<br />and less."
                        <cite className="about-quote-attr">— Piet Hein</cite>
                    </blockquote>
                    <p>As an unemployed new grad and retired swimmer (and deplorable chess player), this is my personal mantra.</p>
                </div>
                <img src={photo} alt="Ian Redman" className="about-photo" />
            </div>
        </section>
    )
}

export default About