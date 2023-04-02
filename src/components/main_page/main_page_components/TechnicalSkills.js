import { useEffect, useState, useRef } from "react";
import "./TechnicalSkills.css";
import axios from "axios";

// TECHNICAL SKILLS
function TechnicalSkills() {
  return (
    <section id="technical-skills">
      <div className="primary-container glass">
        <h2>
          Coding is my <span className="bold-text purple-text">passion</span>.
          It's what I love to do. Here are some of my{" "}
          <span className="bold-text purple-text">favorite technologies</span>{" "}
          and how long I've been working with them
        </h2>
        <SkillsContainers />
      </div>
    </section>
  );
}

export default TechnicalSkills;

// TECHNICAL SKILLS - SKILLS CONTAINER
function SkillsContainers() {
  const [skillsData, setSkillsData] = useState(null); // all data from API call

  // makes API call and sets state
  useEffect(() => {
    const url = "https://matsuuchi.com/api/technical_skills";
    // const url = "http://localhost:8000/api/technical_skills";
    axios
      .get(url)
      .then(({ data }) => {
        setSkillsData(data);
      })
      .catch((error) => console.log(error));
  }, []);

  if (skillsData != null) {
    const skillsListElement = skillsData.skills_type_list.map((skillType) => (
      <div className="skills-type-container" key={skillType[0]}>
        <h3>{skillType[1]}</h3>
        <SkillsList skillsData={skillsData} currentSkillType={skillType} />
      </div>
    ));

    return skillsListElement;
  }
}

// TECHNICAL SKILLS - SKILLS CONTAINER - SKILLS LIST
function SkillsList({ skillsData, currentSkillType }) {
  const skillsElement = skillsData.skills_list.map((skill) => {
    if (skill.skill_type == currentSkillType[0]) {
      return <Skill oldestSkill={skillsData.oldest_skill} skillData={skill} />;
    }
  });

  return skillsElement;
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
    } else if (yearsSince == 1) {
      elapsedTimeString += `${Math.floor(yearsSince)} year`;
    }

    if (monthsRemainder > 1) {
      elapsedTimeString += ` ${Math.floor(monthsRemainder)} months`;
    } else if (monthsRemainder == 1) {
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
  const ref = useRef(null);

  const skill = (
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

  useEffect(() => {
    // integerSign 1 = positive, 2 = negative, 3 = both
    function randomMotionGenerator(max, integerSign) {
      let output = Math.random() * max;

      if (integerSign == 2) {
        output *= -1;
      } else if (Math.random() < 0.5 && integerSign == 3) {
        output *= -1;
      }

      return Math.round(output);
    }

    if (ref.current != null) {
      const skillAnimation = [
        {
          width: `0`,
        },
        { width: `${skillPercentage(skillData.skill_start, oldestSkill)}%` },
      ];

      const skillTiming = {
        duration: 500,
        iterations: 1,
        delay: randomMotionGenerator(1000, 1),
        fill: "forwards",
        easing: "ease",
      };

      ref.current.animate(skillAnimation, skillTiming);
    }
  }, []);

  return skill;
}
