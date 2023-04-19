import { useEffect, useRef } from "react";
import "./TechnicalSkills.css";
import axios from "axios";

import LoadingText from "../../LoadingText";

// TECHNICAL SKILLS
function TechnicalSkills({ skillsData, setSkillsData }) {
  return (
    <section id="technical-skills" className="fade-in">
      <div className="primary-container glass">
        <h2>
          Coding is my <span className="bold-text purple-text">passion</span>.
          It's what I love to do. Here are some of my{" "}
          <span className="bold-text purple-text">favorite technologies</span>{" "}
          and how long I've been working with them
        </h2>
        <SkillsContainers
          skillsData={skillsData}
          setSkillsData={setSkillsData}
        />
      </div>
    </section>
  );
}

// TECHNICAL SKILLS - SKILLS CONTAINER
function SkillsContainers({ skillsData, setSkillsData }) {
  // makes API call and sets state
  useEffect(() => {
    if (skillsData === null) {
      const url = "https://matsuuchi.com/api/technical_skills";
      axios
        .get(url)
        .then(({ data }) => {
          setTimeout(() => {
            setSkillsData(data);
          }, 500 + Math.random() * 500);
        })
        .catch((error) => console.log(error));
    }
  }, [skillsData, setSkillsData]);

  if (skillsData !== null) {
    return skillsData.skills_type_list.map((skillType) => (
      <div className="skills-type-container" key={skillType[0]}>
        <h3>{skillType[1]}</h3>
        <SkillsList skillsData={skillsData} currentSkillType={skillType} />
      </div>
    ));
  } else {
    return <LoadingText paragraphs={7} minLines={3} />;
  }
}

// TECHNICAL SKILLS - SKILLS CONTAINER - SKILLS LIST
function SkillsList({ skillsData, currentSkillType }) {
  return skillsData.skills_list.map((skill) => {
    if (skill.skill_type === currentSkillType[0]) {
      return (
        <Skill
          oldestSkill={skillsData.oldest_skill}
          skillData={skill}
          key={skill.id} // this prevents React key prop warning and is not actually used
        />
      );
    } else {
      return null;
    }
  });
}

// TECHNICAL SKILLS - SKILLS CONTAINER - SKILLS LIST - SKILL
function Skill({ skillData, oldestSkill }) {
  // returns elapsed time in years and months with a start date as an argument
  function elapsedTime(skillStart) {
    let startDateObject = new Date(skillStart); // today
    let timeSince = new Date() - startDateObject; // compares start date to today
    let yearsSince = timeSince / (365 * 24 * 60 * 60 * 1000);
    let monthsSince = timeSince / (24 * 60 * 60 * 1000) / (365 / 12);
    let monthsRemainder = monthsSince % 12;

    let elapsedTimeString = "";

    if (yearsSince > 1) {
      elapsedTimeString += `${Math.floor(yearsSince)} years`;
    } else if (yearsSince === 1) {
      elapsedTimeString += `${Math.floor(yearsSince)} year`;
    }

    if (monthsRemainder > 1) {
      elapsedTimeString += ` ${Math.floor(monthsRemainder)} months`;
    } else if (monthsRemainder === 1) {
      elapsedTimeString += ` ${Math.floor(yearsSince)} month`;
    }

    return elapsedTimeString;
  }

  // returns percentage as integer with skill elapsed time as numerator and longest skill elapsted time as denominator
  function skillPercentage(skillStart, oldestSkill) {
    let startDateObject = new Date(skillStart); // today
    let timeSince = new Date() - startDateObject; // compares start date to today
    let oldestSkillDateObject = new Date(oldestSkill); // start date of oldest skill
    let oldestSkillTimeSince = new Date() - oldestSkillDateObject;
    let percentage = (timeSince / oldestSkillTimeSince) * 100;

    return percentage;
  }

  // sets animation for each skill progress bar
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      const skillAnimation = [
        {
          width: `0`,
        },
        { width: `${skillPercentage(skillData.skill_start, oldestSkill)}%` },
      ];

      const skillTiming = {
        duration: 1000,
        iterations: 1,
        fill: "forwards",
        easing: "ease",
      };

      ref.current.animate(skillAnimation, skillTiming);
    }
  }, [oldestSkill, skillData.skill_start]);

  return (
    <li key={skillData.id}>
      <h4>{skillData.skill_title}</h4>
      <div className="start-container">
        {elapsedTime(skillData.skill_start)}
      </div>
      <div className="experience-bar-container glass">
        <div className="experience-bar glass" ref={ref}></div>
      </div>
    </li>
  );
}

export default TechnicalSkills;
