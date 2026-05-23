function Education() {
    return (
        <section id="education">
            <h2>Education</h2>

            <div className="card">
                <div className="card-header">
                    <h3>Ouachita Baptist University</h3>
                    <span className="location">Arkadelphia, AR</span>
                </div>
                <p className="degree">B.S Computer Science & B.S. Mathematics</p>
                <p className="date">August 2022 - May 2026 (expected)</p>

                <ul>
                    <li>GPA: 3.8</li>
                    <li>Member, Kappa Mu Epsilon (Mathematics Honors Society)</li>
                    <li>President's List: Fall 2022, Spring 2024, Spring 2026</li>
                    <li>Dean's List: Fall 2023, Spring 2023, Fall 2024, Spring 2025, Fall 2025</li>
                    <li>Academic Excellence Award - CS & Math Department, May 2024</li>
                </ul>

                <div className="card">
                    <div className="card-header">
                        <h3>OBU Swim Team (NCAA Division II)</h3>
                    </div>
                    <ul>
                        <li>Second Team All-American(2024-2025, 2025-2026)</li>
                        <li>Academic All-District(2024-2025, 2025-2026)</li>
                        <li>First Team All-Conference(2024-2025, 2025-2026)</li>
                        <li>Second Team All Conference(2023-2024)</li>
                        <li>2025 NCAA DII Championship - 400 Freestyle Relay, 13th place</li>
                        <li>2026 NCAA DII Championship - 400 Freestule Relay, 15th place</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default Education