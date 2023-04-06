import "./ProjectDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../LoadingText";
import BackArrow from "./project_details_page_components/BackArrow";

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
        setProjectDetailsData(data);
      })
      .catch((error) => console.log(error));
  }, [url, setProjectDetailsData]);

  return (
    <section id="project-details">
      <div className="primary-container glass">
        <button onClick={closeProjectDetails}>
          <BackArrow />
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
