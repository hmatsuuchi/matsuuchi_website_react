import { useEffect } from "react";
import "./MainPage.css";
import Header from "./main_page_components/Header";
import TechnicalSkills from "./main_page_components/TechnicalSkills";
import Projects from "./main_page_components/Projects";

function MainPage({
  setMainPageRender,
  setProjectDetailsRender,
  setProjectDetailsId,
  projectScrollPosition,
  setProjectScrollPosition,
  skillsData,
  setSkillsData,
  projectData,
  setProjectData,
}) {
  // scrolls back to previous y-scroll position when using back button from project details page
  useEffect(() => {
    window.scrollTo(0, projectScrollPosition);
  }, [projectScrollPosition]);

  return (
    <section id="main-page">
      <Header />
      <TechnicalSkills skillsData={skillsData} setSkillsData={setSkillsData} />
      <Projects
        setMainPageRender={setMainPageRender}
        setProjectDetailsRender={setProjectDetailsRender}
        skillsData={skillsData}
        setSkillsData={setSkillsData}
        projectData={projectData}
        setProjectData={setProjectData}
        setProjectDetailsId={setProjectDetailsId}
        setProjectScrollPosition={setProjectScrollPosition}
      />
    </section>
  );
}

export default MainPage;
