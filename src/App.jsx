import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import Login from "./views/Login.jsx";
import Project from "./views/Project.jsx";
import { Route, Routes } from "react-router-dom";

function App() {

  const [connectedAccount, setConnectedAccount] = useState(null);

  useEffect(() => {
    const connectedWallet = localStorage.getItem("connectedAccount");
    setConnectedAccount(connectedWallet)
  }, []);

  return (
    <div className="min-h-screen relative">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/home" element={<Home />} />
        <Route path="/projects/:id" element={<Project />} />
      </Routes>
    </div>
  );
}

export default App;
