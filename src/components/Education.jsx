function Education() {
    const honors = [
        { value: '3.8', label: 'GPA' },
        { value: '×3', label: "President's List" },
        { value: '×5', label: "Dean's List" },
    ]

    return (
        <section id="education">
            <h2>Education</h2>

            <div className="card">
                <div className="card-header">
                    <h3>Ouachita Baptist University</h3>
                    <span className="location">Arkadelphia, AR</span>
                </div>
                <p className="degree">B.S Computer Science & B.S. Mathematics</p>
                <p className="date">August 2022 – May 2026</p>

                <div className="honors-row">
                    {honors.map(({ value, label }) => (
                        <div className="honor-block" key={label}>
                            <span className="honor-value">{value}</span>
                            <span className="honor-label">{label}</span>
                        </div>
                    ))}

                    <div className="honor-block">
                        <span className="honor-value honor-greek">κμε</span>
                        <span className="honor-label">Kappa Mu Epsilon</span>
                    </div>

                    <div className="honor-block">
                        <svg xmlns="http://www.w3.org/2000/svg" width="26" height="26" viewBox="0 0 24 24" fill="currentColor" className="honor-icon">
                            <path d="M19 5h-2V3H7v2H5C3.9 5 3 5.9 3 7v1c0 2.55 1.92 4.63 4.39 4.94A5.01 5.01 0 0 0 11 15.9V18H9v2h6v-2h-2v-2.1a5.01 5.01 0 0 0 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
                        </svg>
                        <span className="honor-label">CS Excellence Award</span>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Education
