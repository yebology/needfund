import React, { useEffect } from "react";
import ProjectDetails from "../components/ProjectDetails.jsx";
import ProjectBackers from "../components/ProjectBackers.jsx";
import UpdateProject from "../components/UpdateProject.jsx";
import InvestProject from "../components/InvestProject.jsx";
import DeleteProject from "../components/DeleteProject.jsx";
import { useParams } from "react-router-dom";
import { useGlobalState } from "../backend/index.jsx";
import { loadProjects } from "../services/Blockchain.jsx";

const Project = () => {
  const { id } = useParams();

  useEffect(() => {
    loadProjects();
  },[]);

  return (
    <>
      <ProjectDetails id={id} />
      <ProjectBackers/>
      <InvestProject/>
      <DeleteProject/>
    </>
  );
};

export default Project;
