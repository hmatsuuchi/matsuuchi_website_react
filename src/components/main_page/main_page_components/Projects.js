import { useEffect } from "react";
import axios from "axios";
import LoadingText from "../../LoadingText";
import "./Projects.css";

// PROJECTS
function Projects({
  setMainPageRender,
  setProjectDetailsRender,
  projectData,
  setProjectData,
  setProjectDetailsId,
  setProjectScrollPosition,
}) {
  return (
    <section id="projects" className="fade-in">
      <div className="primary-container glass">
        <h2>
          Each project represents an opportunity for me to{" "}
          <span className="bold-text purple-text">push my limits</span> and{" "}
          <span className="bold-text purple-text">explore</span> new
          technologies and methodologies
        </h2>
        <ProjectsContainers
          setMainPageRender={setMainPageRender}
          setProjectDetailsRender={setProjectDetailsRender}
          projectData={projectData}
          setProjectData={setProjectData}
          setProjectDetailsId={setProjectDetailsId}
          setProjectScrollPosition={setProjectScrollPosition}
        />
      </div>
    </section>
  );
}

// PROJECTS - PROJECTS CONTAINER
function ProjectsContainers({
  setMainPageRender,
  setProjectDetailsRender,
  projectData,
  setProjectData,
  setProjectDetailsId,
  setProjectScrollPosition,
}) {
  function loadProjectDetails(projectId) {
    setMainPageRender(false);
    setProjectDetailsRender(true);
    setProjectDetailsId(projectId);
    setProjectDetailsRender(true);
  }

  // makes API call and sets state
  useEffect(() => {
    if (projectData === null) {
      const url = "https://matsuuchi.com/api/projects";
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
        <p className="project-brief">{project.project_subtitle}</p>
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
        <picture>
          <source
            srcSet={`/img/main_page/projects/${project.project_image_url}_slim_300.png`}
            media="(max-width: 300px)"></source>
          <source
            srcSet={`/img/main_page/projects/${project.project_image_url}_slim_400.png`}
            media="(max-width: 400px)"></source>
          <source
            srcSet={`/img/main_page/projects/${project.project_image_url}_tall_500.png`}
            media="(max-width: 500px)"></source>
          <img
            src={`/img/main_page/projects/${project.project_image_url}_tall_600.png`}
            alt={project.project_image_alt}></img>
        </picture>
      </div>
    ));
  } else {
    return <LoadingText paragraphs={5} minLines={3} />;
  }
}

export default Projects;
