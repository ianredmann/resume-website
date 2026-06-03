function Projects() {
    return (
        <section id="projects">
            <h2>Projects</h2>

            <div className="card">
                <div className="card-header">
                    <h3>WTI Crude Oil Geopolitical Risk Analysis</h3>
                    <span className="date">April 2026</span>
                </div>
                <div className="tag-group">
                    <span className="tag">Statistical Data Analysis</span>
                    <span className="tag">Excel</span>
                </div>
                <ul>
                    <li>Collected and categorized ~400 daily WTI crude oil price observations (Oct 2024 – April 2026)
                        across four geopolitical regimes: de-escalation, policy uncertainty, geopolitical tension,
                        and military escalation.</li>
                    <li>Built price frequency distribution tables and t-tests in Excel; Military Escalation periods
                        exhibited ~3x daily price volatility (σ = 5.4% vs. 1.8% for Policy Uncertainty), with 61%
                        of days seeing moves &gt;2%, confirmed by a statistically significant Levene variance test
                        (p &lt; 0.0001).</li>
                    <li>Identified a +33.4% average 30-day return during Military Escalation vs. -3.4% during Policy
                        Uncertainty, translating findings into regime-based strategy recommendations: long bias on
                        escalation breakouts, defensive positioning during policy uncertainty windows.</li>
                </ul>
            </div>

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
                    <li>Inherited and refactored a monolithic codebase from a prior capstone group, decomposing
                        a single-file route handler into three purpose-built modules (admin, faculty, student)
                        to improve maintainability and separation of concerns.</li>
                    <li>Designed and implemented the admin dashboard from scratch — the only role not completed
                        by the prior team — including its data views, workflows, and all associated UI.</li>
                    <li>Implemented a unique-link access system using generated URL tokens to authenticate and
                        route users to their role-specific views, eliminating the need for a traditional login flow.</li>
                    <li>Redesigned the UI from zero — the inherited project had no CSS; implemented a complete
                        visual layer across all three user-facing screens.</li>
                </ul>
            </div>

            <div className="card">
                <div className="card-header">
                    <h3>Math Placement Index (MPI) Effectiveness Analysis</h3>
                    <span className="date">September 2025</span>
                </div>

                <div className="tag-group">
                    <span className="tag">Statistical Data Analysis</span>
                    <span className="tag">Excel</span>
                    <span className="tag">R</span>
                </div>
                <ul>
                    <li>Analyzed MPI placement exam outcomes across 8 math courses (~340 students) to evaluate
                        its viability as a replacement for ACT/SAT scores, computing ABC/AB success rates by
                        score band against OBU's 80/50 placement standard.</li>
                    <li>Identified critical underperformance in Number Sense placements (29% vs. 82% ABC success
                        rate for ACT/SAT-routed students); recommended raising the MPI cutoff threshold from 65
                        to 75 and tightening a second course's band, with findings presented to the Math Department.</li>
                </ul>
            </div>
        </section>
    )
}

export default Projects
