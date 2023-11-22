import React, { useState, useEffect } from "react";
import { yourProjects, teamnames } from "../../testdata/data";
import "../css/index.css";
import { realm } from "@mdxeditor/editor";
const ProjectHeader = ({ initialProjectId, func, metaDatalist }) => {
  const [projectId, setProjectId] = useState(initialProjectId);
  const [teamId, setTeamId] = useState(
    metaDatalist.find((project) => project.project_id == projectId).teams[0].id
  );
  // console.log(metaDatalist);
  const selectHandler = (e) => {
    if (e.target.name == "projectnameid") {
      setProjectId(e.target.value);
    } else {
      setTeamId(e.target.value);
    }
  };

  useEffect(() => {
    const temp = metaDatalist.find((project) => project.project_id == projectId)
      .teams[0].id;
    setTeamId(temp);
    func(projectId, teamId);
    // console.log(teamId);
  }, [projectId, teamId]);
  // console.log(
  //   metaDatalist.find((projectObj) => projectObj.project_id == initialProjectId)
  //     .project_name
  // );
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
          name="projectnameid"
          id="pnames"
          onChange={selectHandler}
          defaultValue={
            metaDatalist.find(
              (projectObj) => projectObj.project_id == initialProjectId
            )?.project_id
          }
        >
          {metaDatalist.map((element) => {
            return (
              <option value={element.project_id} key={element.project_id}>
                {element.project_name}
              </option>
            );
          })}
        </select>
      </div>

      <div style={{ display: "flex" }}>
        <h3>Team Name :</h3>
        <select
          name="teamnameid"
          id="tname"
          onChange={selectHandler}
          defaultValue={teamId}
        >
          {metaDatalist
            .find((project) => project.project_id == projectId)
            .teams.map((team) => {
              return (
                <option value={team.id} key={team.id}>
                  {team.name}
                </option>
              );
            })}
        </select>
      </div>
    </div>
  );
};

export default ProjectHeader;
