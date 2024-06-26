import React, { useEffect } from "react";
import Identicons from "react-identicons";
import { FaEthereum } from "react-icons/fa";
import { setGlobalState, useGlobalState  } from "../backend/index.jsx";
import { loadProjects } from "../services/Blockchain.jsx";

const ProjectDetails = ({ id }) => {
  const [project] = useGlobalState("projects");

  return (
    <div className="py-24 px-6 flex justify-center">
      <div className="flex justify-center items-center flex-col md:w-2/3">
        <div className="flex justify-start items-start w-full sm:space-x-4 flex-wrap">
          <img
           src={project[id].projectImageURL}
           alt={project[id].projectTitle}
            className="rounded-xl h-64 w-full sm:w-1/3"
          />
          <div className="flex-1 sm:py-0 py-4">
            <div className="flex flex-col justify-start flex-wrap">
              <h5 className="text-gray-900 text-sm font-medium mb-2">
                {project[id].projectTitle}
              </h5>
              <small className="text-gray-500">2 days left</small>
            </div>
            <div className="flex justify-between items-center w-full pt-1">
              <div className="flex justify-start space-x-2 mb-3">
                <Identicons
                  className="rounded-full shadow-md"
                  string="0x9e....fa"
                  size={15}
                />
                <small className="text-gray-700">0x9e...13af</small>
                <small className="text-gray-500 font-bold">{16} Backings</small>
              </div>
              <div className="mb-3 font-bold">
                <small className="text-gray-500">Open</small>
              </div>
            </div>
          </div>
        </div>
        <p className="text-sm font-light mt-3">
          {project[id].projectDescription}
        </p>
        <div className="w-full bg-gray-300 mt-4">
          <div
            className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-l-full"
            style={{ width: `${(project[id].raised / project[id].cost) * 100}%` }}
          ></div>
        </div>
        <div className="flex justify-between items-center w-full font-bold mt-2">
          <small>{project.raised} ETH Raised</small>
          <small className="flex justify-start items-center">
            <FaEthereum />
            <span> {project[id].cost} ETH </span>
          </small>
        </div>
        <div className="flex justify-start w-full space-x-2 mt-4 my-5">
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700"
            onClick={() => setGlobalState("investScale", "scale-100")}
          >
            {" "}
            Invest Project{" "}
          </button>
          <button
            type="button"
            className="inline-block px-6 py-2.5 bg-red-600 text-white font-medium rounded-full shadow-md hover:bg-red-700"
            onClick={() => setGlobalState("deleteScale", "scale-100")}
          >
            {" "}
            Delete Project{" "}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetails;
