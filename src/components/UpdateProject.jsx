import React from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../backend/index.js";

const UpdateProject = () => {
  const [updateScale] = useGlobalState("updateScale");
  return (
    <div
      className={`fixed flex items-center justify-center w-screen h-screen inset-0 bg-black bg-opacity-50 transform transition-transform duration-300 ${updateScale}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Edit Project</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={() => setGlobalState("updateScale", "scale-0")}
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
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <input
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="text"
              name="title"
              placeholder="Project Title"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <input
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="number"
              step={0.01}
              min={0.01}
              name="amount"
              placeholder="Amount (ETH)"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <input
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires at"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <input
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="url"
              name="image_url"
              placeholder="Image URL"
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <textarea
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="text"
              name="description"
              placeholder="Project Description"
              required
            />
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 mt-5 text-white font-medium rounded-full shadow-md bg-indigo-600 hover:bg-indigo-700"
          >
            {" "}
            Invest Project{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateProject;
