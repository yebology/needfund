import React from "react";
import { Link } from "react-router-dom";
import Identicons from "react-identicons";

const Projects = () => {
  return (
    <div className="flex flex-col px-6">
      <div className="flex justify-center items-center flex-wrap">
        {Array(6)
          .fill()
          .map((card, i) => (
            <ProjectCard key={i} id={i} project={card}/>
          ))}
      </div>
    </div>
  );
};

const ProjectCard = ({ project, id }) => (
  <div id="projects" className="rounded-lg shadow-lg bg-white w-64 m-4">
    <Link to={'/projects/' + id}>
      <img
        src="https://www.hdwallpapers.in/download/cell_biology_background_hd_wallpaper_cellular-HD.jpg"
        alt="title"
        className="rounded-xl h-64 w-full object-cover"
      />
      <div className="p-4">
        <h5>Biological Research</h5>
        <div>
          <div className="flex justify-between items-center">
            <Identicons
              className="rounded-full shadow-md"
              string="0x15...1ea2"
              size={15}
            />
            <small className="text-gray-700">0x15...1ea2</small>
          </div>
          <small className="text-gray-500">2 days left</small>
        </div>
        <div className="w-full bg-gray-300">
          <div
            className="bg-indigo-600 text-xs font-medium text-indigo-100 text-center p-0.5 leading-none rounded-l-full"
            style={{ width: "50%" }}
          ></div>
        </div>
        <div className="flex justify-between items-center flex-wrap mt-4 mb-2 text-gray-500 font-bold">
          <small>
            {14} Backers
          </small>
          <div>
            <small className="text-indigo-600">
              Open
            </small>
          </div>
        </div>
      </div>
    </Link>
  </div>
);

export default Projects;
