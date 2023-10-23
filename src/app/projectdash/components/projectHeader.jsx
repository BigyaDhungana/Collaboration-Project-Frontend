import React, { useState,useEffect } from "react";
import { yourProjects, teamnames } from "../../testdata/data";
import "../css/index.css";

const ProjectHeader = ({ projectname, func }) => {
  const [projectName, setProjectName] = useState(projectname);
  const [teamName, setTeamName] = useState("mobile app");

  const selectHandler = (e) => {
    if (e.target.name == "projectname") {
      setProjectName(e.target.value);
    } else {
      setTeamName(e.target.value);
    }
  };

  useEffect(() => {
    func(projectName, teamName);
  }, [projectName, teamName]);

  //variables
  //projectName->selected project name
  //teamName->selected team  name

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "space-evenly",
        width: "980px",
      }}
    >
      <div style={{ display: "flex" }}>
        <h3>Project Name :</h3>
        <select
          name="projectname"
          id="pnames"
          onChange={selectHandler}
          defaultValue={projectName}
        >
          {yourProjects.map((project, index) => {
            return (
              <option value={project} key={index}>
                {project}
              </option>
            );
          })}
        </select>
      </div>

      <div style={{ display: "flex" }}>
        <h3>Team Name :</h3>
        <select name="teamname" id="tname" onChange={selectHandler}>
          {teamnames.map((team, index) => {
            return (
              <option value={team} key={index}>
                {team}
              </option>
            );
          })}
        </select>
      </div>
    </div>
  );
};

export default ProjectHeader;
