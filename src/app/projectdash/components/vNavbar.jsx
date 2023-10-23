import React from "react";
import "../css/index.css";
//dummy
import { dummyinfo } from "../../testdata/data";

const taskbarContents = ["Tasks", "Documents", "Teams"];

const VNavbar = () => {
  return (
    <div
      style={{
        borderWidth: "1px",
        borderColor: "black",
        borderStyle: "solid",
        display: "block",
        width: "200px",
        marginTop: "10px",
      }}
    >
      <ul>
        <li>Tasks</li>
        <li>Documents</li>
        <li>Teams</li>
        <li>Dashboard</li>
        <li>Add Tasks</li>
        <li>Manage Team</li>
      </ul>
    </div>
  );
};

export default VNavbar;
