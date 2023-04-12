import "./ProjectDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../LoadingText";

// PROJECT DETAILS
function ProjectDetails({
  projectId,
  setHeaderRender,
  setTechnicalSkillsRender,
  setProjectsRender,
  setProjectDetailsRender,
}) {
  function closeProjectDetails() {
    setHeaderRender(true);
    setTechnicalSkillsRender(true);
    setProjectsRender(true);
    setProjectDetailsRender(false);
  }
  const [projectDetailsData, setProjectDetailsData] = useState(false);

  const url = `https://matsuuchi.com/api/project_details/${projectId}/`;

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        setTimeout(() => {
          setProjectDetailsData(data);
        }, 1000 + Math.random() * 500);
      })
      .catch((error) => console.log(error));
  }, [url, setProjectDetailsData]);

  window.scrollTo(0, 0); // resets y-axis scroll position when transitioning to project details page
  console.log("ProjectDetails.js");

  return (
    <section id="project-details" className="fade-in">
      <div className="primary-container glass">
        <button onClick={closeProjectDetails}>
          <div className="back-arrow-container">
            <div className="back-arrow"></div>
            <div>BACK TO MAIN</div>
          </div>
        </button>
        {projectDetailsData ? (
          <div>
            <h3>{projectDetailsData.project_title}</h3>
            <h4>{projectDetailsData.project_subtitle}</h4>
          </div>
        ) : (
          <LoadingText paragraphs={7} minLines={4} />
        )}
      </div>
    </section>
  );
}

export default ProjectDetails;
