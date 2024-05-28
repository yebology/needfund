import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import Header from "../components/Header.jsx";
import CreateProject from "../components/CreateProject.jsx";
import { useGlobalState } from "../backend/index.jsx";
import React, { useEffect, useState } from "react";
import { loadProjects } from "../services/Blockchain.jsx";

const Home = () => {
  const [projects] = useGlobalState("projects");
  const [connectedAccount, setConnectedAccount] = useState(null);

  useEffect(() => {
    const storedAccount = localStorage.getItem("connectedAccount");
    if (storedAccount) {
      setConnectedAccount(storedAccount)
    }
  }, []);

  useEffect(() => {
    if (connectedAccount !== null) {
      loadProjects();
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
