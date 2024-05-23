import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Project from "./views/Project.jsx";
import { Route, Routes } from "react-router-dom";
// import { isWalletConnected } from "./services/Blockchain.jsx";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="min-h-screen realtive">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>

      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
