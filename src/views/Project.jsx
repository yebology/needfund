import React from "react";
import ProjectDetails from "../components/ProjectDetails.jsx";
import ProjectBackers from "../components/ProjectBackers.jsx";
import UpdateProject from "../components/UpdateProject.jsx";
import InvestProject from "../components/InvestProject.jsx";
import DeleteProject from "../components/DeleteProject.jsx";

const Project = () => {
  return (
    <>
      <ProjectDetails/>
      <ProjectBackers/>
      <UpdateProject/>
      <InvestProject/>
      <DeleteProject/>
    </>
  );
};

export default Project;
