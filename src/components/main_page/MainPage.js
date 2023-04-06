import "./MainPage.css";
import Header from "./main_page_components/Header";
import TechnicalSkills from "./main_page_components/TechnicalSkills";
import Projects from "./main_page_components/Projects";
import ProjectDetails from "../project_details_page/ProjectDetails";
import { useState } from "react";

function MainPage() {
  const [headerRender, setHeaderRender] = useState(true);
  const [technicalSkillsRender, setTechnicalSkillsRender] = useState(true);
  const [projectsRender, setProjectsRender] = useState(true);
  const [projectDetailsRender, setProjectDetailsRender] = useState(false);
  const [projectDetailsId, setProjectDetailsId] = useState(null);

  return (
    <section id="main-page">
      {headerRender ? <Header /> : null}
      {technicalSkillsRender ? <TechnicalSkills /> : null}
      {projectsRender ? (
        <Projects
          setHeaderRender={setHeaderRender}
          setTechnicalSkillsRender={setTechnicalSkillsRender}
          setProjectsRender={setProjectsRender}
          setProjectDetailsRender={setProjectDetailsRender}
          setProjectDetailsId={setProjectDetailsId}
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
