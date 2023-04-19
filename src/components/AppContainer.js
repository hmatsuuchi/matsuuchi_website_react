import { useState } from "react";
import "./AppContainer.css";
import MainPage from "./main_page/MainPage";
import ProjectDetails from "./project_details_page/ProjectDetails";

function AppContainer() {
  // render states
  const [mainPageRender, setMainPageRender] = useState(true);
  const [projectDetailsRender, setProjectDetailsRender] = useState(null);
  // shared states
  const [projectDetailsId, setProjectDetailsId] = useState(null); // id of project details set when user button clicks to see additional details about project
  // MainPage state
  const [projectScrollPosition, setProjectScrollPosition] = useState(0); // Y-axis value of viewport before click to project details
  const [skillsData, setSkillsData] = useState(null); // all technical skills data from API call
  const [projectData, setProjectData] = useState(null); // all project data from API call

  return (
    <div id="app-container">
      {mainPageRender ? (
        <MainPage
          setMainPageRender={setMainPageRender}
          setProjectDetailsRender={setProjectDetailsRender}
          setProjectDetailsId={setProjectDetailsId}
          projectScrollPosition={projectScrollPosition}
          setProjectScrollPosition={setProjectScrollPosition}
          skillsData={skillsData}
          setSkillsData={setSkillsData}
          projectData={projectData}
          setProjectData={setProjectData}
        />
      ) : null}
      {projectDetailsRender ? (
        <ProjectDetails
          setMainPageRender={setMainPageRender}
          setProjectDetailsRender={setProjectDetailsRender}
          projectDetailsId={projectDetailsId}
        />
      ) : null}
    </div>
  );
}

export default AppContainer;
