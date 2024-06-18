import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import Identicons from "react-identicons";
import { loadProjects } from "../services/Blockchain";
import { truncate, useGlobalState, remainingDay } from "../backend";
import { FaEthereum } from "react-icons/fa";

const Projects = ({projects}) => {
  return (
    <div className="flex flex-col px-6 mb-7">
      <div className="flex justify-center items-center flex-wrap">
        {console.log(projects.length)}
        {projects.map((project, index) => (
          <ProjectCard key={index} id={index} project={project} />
        ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project }) => (
  <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4">
    <Link to={"/projects/" + project.index}>
      <img
        src={project.projectImageURL}
        alt={project.projectTitle}
        className="rounded-xl h-64 w-full object-cover"
      />
      <div className="p-4">
        <h5>{project.projectTitle}</h5>
        <div>
          <div className="flex justify-between items-center">
            <Identicons
              className="rounded-full shadow-md"
              string={project.owner}
              size={15}
            />
            <small className="text-gray-700">
              {" "}
              {truncate(project.owner, 4, 4, 11)}
            </small>
          </div>
          <small className="text-gray-500 mb-2">
            {new Date().getTime() > Number(project.expiredAt + '000') ? 'Expired' : remainingDay(project.expiredAt)}{""}
          </small>
        </div>
        <div className="w-full bg-gray-300">
          <div
            className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-l-full"
            style={{ width: '${(project.raised / project.cost) * 100}%' }}
          ></div>
        </div>

        <div className="flex justify-between items-center font-bold mt-1 mb-2 text-gray-700">
          <small>{project.raised} ETH Raised</small>
          <small className="flex justify-start items-center">
            <FaEthereum/>
            <span>{project.cost} ETH</span>
          </small>
        </div>

        <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500 font-bold">
          <small>{project.backers} Backers</small>
          <div>
            <small className="text-indigo-600">Open</small>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default Projects;
