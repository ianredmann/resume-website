function Experience() {
    return (
        <section id="experience">
            <h2>Experience</h2>

            <div className="card">
                <div className="card-header">
                    <h3>Ouachita Baptist University</h3>
                    <span className="location"> Arkadelphia, Arkansas</span>
                </div>
                <p className="role">Resident Assistant</p>
                <p className="date">August 2023 - May 2025</p>
                <ul>
                    <li>Oversaw a diverse communit of 47 freshmen and 40 upperclassmen
                        students, providing guidance, support, and a safe living environment
                        within the residential hall.</li>
                </ul>

                <p className="role">Library Archivist</p>
                <p className="date">May 2024 - August 2024</p>
                <ul>
                    <li>Assisted in the organization, preservation, and digitization of archival 
                        materials within a university library setting. Managed historical documents and 
                        records with attention to detail, ensuring accurate cataloging and accessibility. </li>
                </ul>

                <p className="role">Bioinformatics Hackathon Mentor</p>
                <p className="date">April 2026</p>
                <ul>
                    <li>Guided a group of 10 high school students through hands-on sequencing and genome annotation tasks,
                        adapting and explaining technical concepts for non-expert audiences, as well as collaborating with
                        them to troubleshoot errors and ensure succesful completion.
                    </li>
                </ul>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>AJ Fitness Swim Team</h3>
                    <span className="location">Tegucigalpa, Honduras</span>
                </div>
                <p className="role">Club Team Captain</p>
                <p className="date">July 2021 - August 2022</p>
                <ul>
                    <li>Led by example in both practice and competition, motivating
                        and inspiring fellow team members to consistently acheive peak performance.</li>
                </ul>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>Compass Group</h3>
                    <span className="location">Oxford, United Kingdom</span>
                </div>
                <p className="role">Front of House Team Member</p>
                <p className="date">June 2025 – August 2025</p>
                <ul>
                    <li>Worked in a high-volume, time-critical catering environment
                        requiring coordination, adaptability, and consistency under
                        pressure.</li>
                </ul>
            </div>
        </section>
    )
}

export default Experience