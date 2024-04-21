import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import Header from "../components/Header.jsx";
import CreateProject from "../components/CreateProject.jsx";
import { useGlobalState } from "../backend/index.jsx";
import { useEffect } from "react";
import { loadProjects } from "../services/Blockchain.jsx";

const Home = () => {
  const [projects] = useGlobalState("projects");
  const [connectedAccount] = useGlobalState("connectedAccount");
  useEffect(() => {
    console.log("hehe");
    console.log(connectedAccount);
    console.log(localStorage.getItem("connectedAccount"));
    if (localStorage.getItem("connectedAccount") !== null) {
      console.log("haha");
      loadProjects();
    }
  }, []);
  return (
    <>
      <Header />
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
