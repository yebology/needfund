import React, { useEffect } from "react";
import { setGlobalState, useGlobalState } from "../backend/index.jsx";
import { loadProjects } from "../services/Blockchain.jsx";

const Hero = () => {
  const [projects] = useGlobalState("projects");
  useEffect(() => {
    loadProjects();
  }, []);
  return (
    <div className="text-center bg-white py-36 px-6 text-gray-800">
      <h1 className="text-5xl md:text-6xl xl:text-7xl font-bold tracking-tight mb-12">
        <span>Fueling Web3 Dreams Together With</span>
        <br />
        <span className="text-indigo-600">NeedFund.</span>
      </h1>
      <div className="flex justify-center items-center space-x-2">
        <button
          type="button"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700"
          onClick={() => setGlobalState("createScale", "scale-100")}
        >
          {" "}
          Add Project{" "}
        </button>
        <button
          type="button"
          className="inline-block px-6 py-2.5  text-indigo-600 font-medium rounded-full shadow-md bg-transparent hover:bg-slate-50 border border-indigo-600"
        >
          {" "}
          Invest Project{" "}
        </button>
      </div>
    </div>
  );
};

export default Hero;
