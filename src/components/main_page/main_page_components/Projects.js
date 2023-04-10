import { useEffect } from "react";
import axios from "axios";
import LoadingText from "../../LoadingText";
import "./Projects.css";

// PROJECTS
function Projects({
  setHeaderRender,
  setTechnicalSkillsRender,
  setProjectsRender,
  projectData,
  setProjectData,
  setProjectDetailsRender,
  setProjectDetailsId,
  projectScrollPosition,
  setProjectScrollPosition,
}) {
  return (
    <section id="projects" className="fade-in">
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
          projectData={projectData}
          setProjectData={setProjectData}
          setProjectDetailsRender={setProjectDetailsRender}
          setProjectDetailsId={setProjectDetailsId}
          projectScrollPosition={projectScrollPosition}
          setProjectScrollPosition={setProjectScrollPosition}
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
  projectData,
  setProjectData,
  setProjectDetailsRender,
  setProjectDetailsId,
  projectScrollPosition,
  setProjectScrollPosition,
}) {
  // scrolls back to previous y-scroll position when using back button from project details page
  useEffect(() => {
    window.scrollTo(0, projectScrollPosition);
  }, [projectScrollPosition]);

  function loadProjectDetails(projectId) {
    // delays removal of header, technical skills and projects elements until after project details animation completes
    setTimeout(() => {
      setHeaderRender(false);
      setTechnicalSkillsRender(false);
      setProjectsRender(false);
      setProjectDetailsId(projectId);
      setProjectDetailsRender(true);
    }, 500);
  }

  // makes API call and sets state
  useEffect(() => {
    if (projectData === null) {
      const url = "https://matsuuchi.com/api/projects";
      // const url = "http://localhost:8000/api/projects";
      axios
        .get(url)
        .then(({ data }) => {
          setTimeout(() => {
            setProjectData(data);
          }, 500 + Math.random() * 500);
        })
        .catch((error) => console.log(error));
    }
  }, [projectData, setProjectData]);

  if (projectData !== null) {
    return projectData.map((project) => (
      <div
        id={`project-id-${project.id}`}
        className="project-container"
        key={project.id}>
        <h3>{project.project_title}</h3>
        <h4>{project.project_subtitle}</h4>
        {project.project_website && project.project_github && (
          <ul>
            {project.project_website && (
              <li>
                <a
                  href={project.project_website}
                  target="_blank"
                  rel="noreferrer">
                  on the web
                </a>
              </li>
            )}
            {project.project_github && (
              <li>
                <a
                  href={project.project_github}
                  target="_blank"
                  rel="noreferrer">
                  on Github
                </a>
              </li>
            )}
          </ul>
        )}
        <button
          onClick={() => {
            loadProjectDetails(project.id);
            setProjectScrollPosition(window.scrollY);

            // gets all sections on page (not including background or main page) and shifts them offscreen
            const allSections = document.getElementsByTagName("section");
            Array.from(allSections).forEach((element) => {
              if (element.id !== "background" && element.id !== "main-page") {
                element.classList.add("fade-out");
              }
            });
          }}>
          <div className="forward-arrow-container">
            <div>SEE DETAILS</div>
            <div className="forward-arrow"></div>
          </div>
        </button>
        <div className="image-placeholder"></div>
      </div>
    ));
  } else {
    return <LoadingText paragraphs={5} minLines={3} />;
  }
}

export default Projects;
