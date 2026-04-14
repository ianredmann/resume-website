function Skills() {
    const skillGroups = [
      {
        title: 'Programming Languages',
        skills: ['Java', 'JavaScript', 'Python', 'C', 'Assembly', 'OCaml', 'Ruby'],
      },
      {
        title: 'Frontend',
        skills: ['React', 'HTML5', 'CSS3', 'Tailwind CSS'],
      },
      {
        title: 'Backend',
        skills: ['Node.js', 'Git'],
      },
      {
        title: 'Databases',
        skills: ['SQLite'],
      },
      {
        title: 'Spoken Languages',
        skills: ['English — Fluent', 'Spanish — Fluent'],
      },
    ]
  
    return (
      <section id="skills">
        <h2>Skills</h2>
        <div className="skills-grid">
          {skillGroups.map((group) => (
            <div className="card" key={group.title}>
              <h3>{group.title}</h3>
              <div className="skills-group">
                {group.skills.map((skill) => (
                  <span className="skill-tag" key={skill}>{skill}</span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    )
  }
  
  export default Skills