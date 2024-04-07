import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../backend/index.js";

const DeleteProject = () => {
  const [deleteScale] = useGlobalState("deleteScale");
  return (
    <div
      className={`fixed flex items-center justify-center w-screen h-screen inset-0 bg-black bg-opacity-50 transform transition-transform duration-300 ${deleteScale}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold"> #Project Title </p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={() => setGlobalState("deleteScale", "scale-0")}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden w-20 h-20">
              <img
                src="https://www.hdwallpapers.in/download/cell_biology_background_hd_wallpaper_cellular-HD.jpg"
                alt="title"
                className="h-full w-full object-cover cursor-pointer"
              />
            </div>
          </div>
          <div className="flex-row w-full text-center justify-center items-center mt-5 rounded-xl font-semibold">
            <p>Are you sure want to delete this project ? </p>
            <small className="text-red-600">
              Once you delete it, you can't bring back this project again
            </small>
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 mt-5 text-white font-medium rounded-full shadow-md bg-red-600 hover:bg-red-700"
          >
            {" "}
            Delete Project{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default DeleteProject;
