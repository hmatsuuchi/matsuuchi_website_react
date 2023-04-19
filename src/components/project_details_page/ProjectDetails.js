import "./ProjectDetails.css";
import { useEffect, useState } from "react";
import axios from "axios";
import LoadingText from "../LoadingText";

// PROJECT DETAILS
function ProjectDetails({
  setMainPageRender,
  setProjectDetailsRender,
  projectDetailsId,
}) {
  const [projectDetailsData, setProjectDetailsData] = useState(false); // all data returned from the API call
  const [relatedTechnologies, setRelatedTechnologies] = useState(false);

  // returns to displaying main page
  function closeProjectDetails() {
    setMainPageRender(true);
    setProjectDetailsRender(false);
  }

  const url = `https://matsuuchi.com/api/project_details/${projectDetailsId}/`;

  useEffect(() => {
    axios
      .get(url)
      .then(({ data }) => {
        setTimeout(() => {
          // timeout does not server any function other than to make the loading animation more noticable
          // sorting algorithm for related technologies
          function compare(a, b) {
            if (a.skill_title.toUpperCase() < b.skill_title.toUpperCase()) {
              return -1;
            }
            if (a.skill_title.toUpperCase() > b.skill_title.toUpperCase()) {
              return 1;
            }
            return 0;
          }

          setProjectDetailsData(data); // set project data prop

          // grouping algorithm for related technologies
          const relatedTechnologiesGrouped = data.related_technologies
            .sort(compare)
            .reduce((group, arr) => {
              const { skill_type } = arr;
              group[skill_type] = group[skill_type] ?? [];
              group[skill_type].push(arr);

              return group;
            }, {});

          setRelatedTechnologies(relatedTechnologiesGrouped); // set individual prop for sorted and groupd related technologies
        }, 1000 + Math.random() * 500);
      })
      .catch((error) => console.log(error));
  }, [url, setProjectDetailsData, setRelatedTechnologies]);

  window.scrollTo(0, 0); // resets y-axis scroll position when transitioning to project details page

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
          <div className="project-details-content">
            <h3>{projectDetailsData.project.project_title}</h3>
            <p className="project-brief">
              {projectDetailsData.project.project_subtitle}
            </p>
            {projectDetailsData.project.project_website &&
              projectDetailsData.project.project_github && (
                <ul>
                  <li>
                    <a
                      href={projectDetailsData.project.project_website}
                      target="_blank"
                      rel="noreferrer">
                      <div className="web-globe"></div>
                      <div>on the web</div>
                    </a>
                  </li>
                  <li>
                    <a
                      href={projectDetailsData.project.project_github}
                      target="_blank"
                      rel="noreferrer">
                      <div className="github-logo"></div>
                      <div>on Github</div>
                    </a>
                  </li>
                </ul>
              )}
            {relatedTechnologies && [
              <div
                key={`technologies-title-${projectDetailsData.project.id}`}
                className="technologies-title">
                uses these technologies:
              </div>,
              <div
                key={`technologies-list-${projectDetailsData.project.id}`}
                className="related-technologies-container">
                {Object.values(relatedTechnologies).map((group) => {
                  return [
                    <ul
                      key={group[0].skill_type}
                      className="technology-group-container">
                      {group.map((skill) => {
                        return <li key={skill.id}>{skill.skill_title}</li>;
                      })}
                    </ul>,
                    <div
                      key={`technology-group-divider-${group[0].skill_type}`}
                      className="technology-group-divider"></div>,
                  ];
                })}
              </div>,
            ]}
            {projectDetailsData.project_details.map((detail) => {
              return [
                <picture key={`project-photo-${detail.id}`}>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_slim_300.png`}
                    media="(max-width: 300px)"></source>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_slim_400.png`}
                    media="(max-width: 400px)"></source>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_tall_500.png`}
                    media="(max-width: 500px)"></source>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_tall_600.png`}
                    media="(max-width: 600px)"></source>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_tall_700.png`}
                    media="(max-width: 700px)"></source>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_900.png`}
                    media="(max-width: 900px)"></source>
                  <source
                    srcSet={`/img/project_details_page/${detail.details_image_url}_1000.png`}
                    media="(max-width: 1000px)"></source>
                  <img
                    src={`/img/project_details_page/${detail.details_image_url}_wide_1200.png`}
                    alt={detail.details_image_alt}></img>
                </picture>,
                <div
                  key={`image-description-${detail.id}`}
                  className="image-description">
                  {detail.details_image_description}
                </div>,
                <p key={`project-details-${detail.id}`}>
                  {detail.details_text}
                </p>,
              ];
            })}
          </div>
        ) : (
          <LoadingText paragraphs={7} minLines={4} />
        )}
      </div>
    </section>
  );
}

export default ProjectDetails;
