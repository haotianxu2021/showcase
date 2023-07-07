// Project.js
const Project = ({ project }) => {
    return (
      <div>
        <h2>{project.title}</h2>
        <p>{project.description}</p>
        <p>Type: {project.type}</p>
        <a href={project.github}>Github</a>
        <a href={project.demo}>Demo</a>
        <p>Highlight: {project.highlight ? 'Yes' : 'No'}</p>
      </div>
    );
  };
  
  export default Project;
  