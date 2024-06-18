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
      <div className="flex justify-center items-center my-5">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700"
        >
          {" "}
          Load More{" "}
        </button>
      </div>
      <CreateProject />
    </>
  );
};

export default Home;
