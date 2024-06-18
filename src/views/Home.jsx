import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import Header from "../components/Header.jsx";
import CreateProject from "../components/CreateProject.jsx";
import { setGlobalState, useGlobalState } from "../backend/index.jsx";
import React, { useEffect, useState } from "react";
import { loadProjects } from "../services/Blockchain.jsx";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../App.css";

const Home = () => {
  const [projects] = useGlobalState("projects");
  const [connectedAccount] = useGlobalState("connectedAccount");

  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    const recentlyCreateProject = localStorage.getItem("createNewProject");
    if (storedAccount) {
      setGlobalState("connectedAccount", storedAccount);
      loadProjects();
    }
    console.log(recentlyCreateProject);
    if (recentlyCreateProject == true) {
      toast.success("Project created successfully!", {
        className: "toast-position",
        autoClose: 5000,
      });
      localStorage.setItem("createNewProject", false);
      console.log(recentlyCreateProject + "sad");
    }
  }, []);

  return (
    <>
      <Header connectedAccount={connectedAccount} />
      <Hero />
      <Projects projects={projects} />
      <CreateProject />
    </>
  );
};

export default Home;
