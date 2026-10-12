// `result` is the headline number on the card front; it counts up when scrolled into view.
// `story` is the short version shown on expand. The GitHub READMEs hold the full write-ups.
export const projects = [
    {
        category: 'Data Analysis',
        title: 'D2 Swim Program Progression Analysis',
        date: 'June 2026',
        summary: 'Scraped and scored four D-II rosters to see how swimmers improve after freshman year.',
        result: { num: 17.5, decimal: true, prefix: '+', duration: 1500, label: 'power points: OBU men led 3+ year progression (n=27)' },
        github: 'https://github.com/ianredmann/d2_swim_program_progression_analysis?tab=readme-ov-file',
        tags: ['Python', 'SQLite', 'Playwright', 'osascript'],
        story: [
            { label: 'Problem', text: 'Do D-II swimmers keep improving after freshman year, and does it differ by program?' },
            { label: 'Approach', text: 'A four-stage Python pipeline scrapes rosters and times, scores swims in power points, and stores them in SQLite. Progression is the top-five average power points.' },
            { label: 'Outcome', text: 'Across ~127 swimmers in four programs (classes of 2019–2022), OBU men posted the highest 3+ year mean. Built as a proof of concept for a full division study.' },
        ],
    },
    {
        category: 'Data Analysis',
        title: 'WTI Crude Oil Geopolitical Risk Analysis',
        date: 'April 2026',
        summary: 'Does war move oil? Tested ~400 days of prices across four geopolitical regimes.',
        result: { num: 3, prefix: '~', suffix: '×', duration: 1200, label: 'daily volatility during military escalation (p < 0.0001)' },
        github: 'https://github.com/ianredmann/wti-crude-oil-geopolitical-risk-analysis',
        tags: ['Statistical Data Analysis', 'Python', 'Excel'],
        story: [
            { label: 'Problem', text: 'Does geopolitical conflict change how WTI crude oil behaves?' },
            { label: 'Approach', text: 'Categorized ~400 daily prices (Oct 2024 – Apr 2026) into four regimes, then compared distributions with t-tests and a Levene variance test in Excel.' },
            { label: 'Outcome', text: 'Military escalation showed σ = 5.4% daily moves vs 1.8% under policy uncertainty, and a +33.4% average 30-day return vs −3.4%. A small sample, so the results are exploratory.' },
        ],
    },
    {
        category: 'Full-Stack',
        title: 'Registration Reservation App',
        date: 'December 2025',
        summary: 'Rebuilt a reservation system a prior team left half-finished.',
        result: { num: 4, duration: 800, label: 'modules extracted from a monolith, plus a new admin dashboard and full UI' },
        github: 'https://github.com/ianredmann/registration-reservation-system',
        tags: ['JavaScript', 'HTML5', 'CSS3', 'SQLite', 'Node.js'],
        story: [
            { label: 'Problem', text: 'A prior capstone team left a monolithic, unstyled app with the admin role unfinished.' },
            { label: 'Approach', text: 'Split the single route handler into admin, faculty and student modules plus a data-access module. Built the admin dashboard from scratch and replaced logins with generated URL-token links.' },
            { label: 'Outcome', text: 'A complete three-role app with a consistent UI across every screen.' },
        ],
    },
    {
        category: 'Data Analysis',
        title: 'Math Placement Index (MPI) Effectiveness Analysis',
        date: 'September 2025',
        summary: 'Checked whether a math placement exam can replace ACT/SAT scores for course placement.',
        result: { num: 29, suffix: '%', duration: 1500, label: 'ABC success for Number Sense placements, vs 82% for ACT/SAT-routed students' },
        github: 'https://github.com/ianredmann/mpi-placement-analysis',
        tags: ['Statistical Data Analysis', 'Excel', 'R'],
        story: [
            { label: 'Problem', text: 'Can the MPI exam replace ACT/SAT scores for routing students into math courses?' },
            { label: 'Approach', text: "Compared ABC/AB success rates by MPI score band across 8 courses (~340 students) against OBU's 80/50 placement standard." },
            { label: 'Outcome', text: 'Recommended raising the MPI cutoff from 65 to 75 and tightening a second course band. Findings were presented to the Math Department.' },
        ],
    },
]
