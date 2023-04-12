import "./MainPage.css";
import Header from "./main_page_components/Header";
import TechnicalSkills from "./main_page_components/TechnicalSkills";
import Projects from "./main_page_components/Projects";
import ProjectDetails from "../project_details_page/ProjectDetails";
import { useState } from "react";

function MainPage() {
  const [headerRender, setHeaderRender] = useState(true); // render state of Header section
  const [technicalSkillsRender, setTechnicalSkillsRender] = useState(true); // render state of Technical Skills section
  const [projectsRender, setProjectsRender] = useState(true); // render state of Projects section

  const [projectDetailsRender, setProjectDetailsRender] = useState(false); // render state of Project Details section
  const [projectDetailsId, setProjectDetailsId] = useState(null); // id of project details to be loaded
  const [projectScrollPosition, setProjectScrollPosition] = useState(0); // Y-axis value of viewport before click to project details

  const [skillsData, setSkillsData] = useState(null); // all technical skills data from API call
  const [projectData, setProjectData] = useState(null); // all project data from API call

  console.log("=====================");
  console.log("MainPage.js");

  return (
    <section id="main-page">
      {headerRender ? <Header /> : null}
      {technicalSkillsRender ? (
        <TechnicalSkills
          skillsData={skillsData}
          setSkillsData={setSkillsData}
        />
      ) : null}
      {projectsRender ? (
        <Projects
          setHeaderRender={setHeaderRender}
          setTechnicalSkillsRender={setTechnicalSkillsRender}
          skillsData={skillsData}
          setSkillsData={setSkillsData}
          setProjectsRender={setProjectsRender}
          projectData={projectData}
          setProjectData={setProjectData}
          setProjectDetailsRender={setProjectDetailsRender}
          setProjectDetailsId={setProjectDetailsId}
          projectScrollPosition={projectScrollPosition}
          setProjectScrollPosition={setProjectScrollPosition}
        />
      ) : null}
      {projectDetailsRender ? (
        <ProjectDetails
          projectId={projectDetailsId}
          setHeaderRender={setHeaderRender}
          setTechnicalSkillsRender={setTechnicalSkillsRender}
          setProjectsRender={setProjectsRender}
          setProjectDetailsRender={setProjectDetailsRender}
          setProjectDetailsId={setProjectDetailsId}
        />
      ) : null}
    </section>
  );
}

export default MainPage;
