import React, { useState } from "react";
import { FaTimes } from "react-icons/fa";
import { useGlobalState, setGlobalState } from "../backend/index.jsx";
import { createProject } from "../services/Blockchain.jsx";
import { toast } from "react-toastify";

const CreateProject = () => {
  const [createScale] = useGlobalState("createScale");

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [imageURL, setImageURL] = useState("");

  const toTimeStamp = (dateStr) => {
    const date = Date.parse(dateStr);
    return date / 1000;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !description || !imageURL || !amount || !date) return;

    const parameter = {
      title,
      description,
      imageURL,
      cost: amount,
      expiredAt: toTimeStamp(date),
    };
    console.log(parameter);

    await createProject(parameter);
    console.log("b");
    toast.success("Project created successfully!");
    console.log("a");
    onClose();
  };

  const onClose = () => {
    setGlobalState("createScale", "scale-0");
    reset();
  };

  const reset = () => {
    setTitle("");
    setDescription("");
    setImageURL("");
    setAmount("");
    setDate("");
  };

  return (
    <div
      className={`fixed flex items-center justify-center w-screen h-screen inset-0 bg-black bg-opacity-50 transform transition-transform duration-300 ${createScale}`}
    >
      <div className="bg-white shadow-xl shadow-black rounded-xl w-11/12 md:w-2/5 h-7/12 p-6">
        <form className="flex flex-col" onSubmit={handleSubmit} method="POST">
          <div className="flex justify-between items-center">
            <p className="font-semibold">Create Project</p>
            <button
              type="button"
              className="border-0 bg-transparent focus:outline-none"
              onClick={onClose}
            >
              <FaTimes />
            </button>
          </div>
          <div className="flex justify-center items-center mt-5">
            <div className="rounded-xl overflow-hidden w-20 h-20">
              <img
                src={
                  imageURL ||
                  "https://www.hdwallpapers.in/download/cell_biology_background_hd_wallpaper_cellular-HD.jpg"
                }
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
              onChange={(e) => setTitle(e.target.value)}
              value={title}
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
              onChange={(e) => setAmount(e.target.value)}
              value={amount}
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <input
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="date"
              name="date"
              placeholder="Expires at"
              onChange={(e) => setDate(e.target.value)}
              value={date}
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <input
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="url"
              name="imageURL"
              placeholder="Image URL"
              onChange={(e) => setImageURL(e.target.value)}
              value={imageURL}
              required
            />
          </div>
          <div className="flex justify-between items-center mt-5 rounded-xl bg-gray-300">
            <textarea
              className="block w-full bg-transparent border-0 text-sm py-3 px-3 text-slate-500 focus:outline focus:ring-0"
              type="text"
              name="description"
              placeholder="Project Description"
              onChange={(e) => setDescription(e.target.value)}
              value={description}
              required
            />
          </div>
          <button
            type="submit"
            className="inline-block px-6 py-2.5 mt-5 text-white font-medium rounded-full shadow-md bg-indigo-600 hover:bg-indigo-700"
          >
            {" "}
            Add Project{" "}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateProject;
