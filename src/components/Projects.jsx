function Projects() {
    return (
        <section id="projects">
            <h2>Projects</h2>

            <div className="card">
                <div className="card-header">
                    <h3>Registration Reservation App</h3>
                    <span className="date">December 2025</span>
                </div>

                <div className="tag-group">
                    <span className="tag">Full-Stack</span>
                    <span className="tag">JavaScript</span>
                    <span className="tag">HTML5</span>
                    <span className="tag">CSS3</span>
                    <span className="tag">SQLite</span>
                    <span className="tag">Node.js</span>
                </div>
                <ul>
                    <li>Designed and implemented a web-based registration system
                        with user authentication, scheduling, and persistent data storage.</li>
                    <li>Built server-side logic using Node.js with SQLite dataabase integration,
                        managed schemas and queries using DBeaver. </li>
                    <li>Developed dynamic views with EJS templates and implemented form validation
                        and session-based workflows.</li>
                </ul>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>Math Placement Index Effectiveness Analysis</h3>
                    <span className="date">September 2025</span>
                </div>

                <div className="tag-group">
                    <span className="tag">Statistical Data Analysis</span>
                    <span className="tag">Excel</span>
                    <span className="tag">R</span>
                </div>
                <ul>
                    <li>Analyzed student grade outcomes and MPI courses to evaluate the
                        effectiveness of the university's math course placement system.</li>
                    <li>Identified trends on potential misplacements to inform recommendations
                        on placement thresholds and system adjustments.</li>
                </ul>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>NASA API Website</h3>
                    <span className="date">May 2024</span>
                </div>
                <div className="tag-group">
                    <span className="tag">Web Development</span>
                    <span className="tag">API</span>
                    <span className="tag">HTML5</span>
                    <span className="tag">CSS3</span>
                    <span className="tag">JavaScript</span>
                    <span className="Node.js"></span>
                </div>
                <ul>
                    <li>Built a web application that connects to a public NASA API to retrieve
                        and display data dynamically based on user inputted dates.</li>
                </ul>
            </div>
        </section>
    )
}

export default Projects