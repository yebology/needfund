import Hero from "../components/Hero.jsx";
import Projects from "../components/Projects.jsx";
import Header from "../components/Header.jsx";
import CreateProject from "../components/CreateProject.jsx";
import { useGlobalState } from "../backend/index.jsx";
import { useEffect } from "react";

const Home = () => {
  const [connectedAccount, setConnectedAccount] =
    useGlobalState("connectedAccount");
  useEffect(() => {
    const account = localStorage.getItem("connectedAccount");
    if (account) {
      setConnectedAccount(account);
    }
  }, []);
  return (
    <>
      <Header />
      <Hero />
      <Projects />
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
