import { useState, useEffect } from "react";
import axios from "axios";
import LoadingText from "../../LoadingText";
import ForwardArrow from "./ForwardArrow";
import "./Projects.css";

// PROJECTS
function Projects({
  setHeaderRender,
  setTechnicalSkillsRender,
  setProjectsRender,
  setProjectDetailsRender,
  setProjectDetailsId,
}) {
  return (
    <section id="projects">
      <div className="primary-container glass">
        <h2>
          Each project represents an{" "}
          <span className="bold-text purple-text">opportunity</span> for me to{" "}
          <span className="bold-text purple-text">push my limits</span> and{" "}
          <span className="bold-text purple-text">explore</span> new
          technologies and methodologies
        </h2>
        <ProjectsContainers
          setHeaderRender={setHeaderRender}
          setTechnicalSkillsRender={setTechnicalSkillsRender}
          setProjectsRender={setProjectsRender}
          setProjectDetailsRender={setProjectDetailsRender}
          setProjectDetailsId={setProjectDetailsId}
        />
      </div>
    </section>
  );
}

// PROJECTS - PROJECTS CONTAINER
function ProjectsContainers({
  setHeaderRender,
  setTechnicalSkillsRender,
  setProjectsRender,
  setProjectDetailsRender,
  setProjectDetailsId,
}) {
  function loadProjectDetails(projectId) {
    setHeaderRender(false);
    setTechnicalSkillsRender(false);
    setProjectsRender(false);
    setProjectDetailsId(projectId);
    setProjectDetailsRender(true);
  }

  const [projectsData, setProjectsData] = useState(null); // all data from API call

  // makes API call and sets state
  useEffect(() => {
    const url = "https://matsuuchi.com/api/projects";
    // const url = "http://localhost:8000/api/projects";
    axios
      .get(url)
      .then(({ data }) => {
        setTimeout(() => {
          setProjectsData(data);
        }, 500 + Math.random() * 500);
      })
      .catch((error) => console.log(error));
  }, []);

  if (projectsData !== null) {
    return projectsData.map((project) => (
      <div className="project-container" key={project.id}>
        <h3>{project.project_title}</h3>
        <button
          onClick={() => {
            loadProjectDetails(project.id);
          }}>
          <ForwardArrow arrowText={"LEARN MORE"} />
        </button>
        <h4>{project.project_subtitle}</h4>
        {project.project_website && project.project_github && (
          <ul>
            {project.project_website && (
              <li key={`${project.id}-website`}>{project.project_website}</li>
            )}
            {project.project_github && (
              <li key={`${project.id}-github`}>{project.project_github}</li>
            )}
          </ul>
        )}
        <div className="image-placeholder"></div>
      </div>
    ));
  } else {
    return <LoadingText paragraphs={5} minLines={3} />;
  }
}

export default Projects;
