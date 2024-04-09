import { useEffect, useState } from "react";
import "./App.css";
import Header from "./components/Header.jsx";
import Home from "./views/Home.jsx";
import Project from "./views/Project.jsx";
import { Route, Routes } from "react-router-dom";
// import { isWalletConnected } from "./services/Blockchain.jsx";
import { ToastContainer } from "react-toastify";
import { useGlobalState } from "./backend/index.jsx";

function App() {
  const [connectedAccount, setConnectedAccount] =
    useGlobalState("connectedAccount");
  useEffect(() => {
    const account = localStorage.getItem("connectedAccount");
    if (account) {
      setConnectedAccount(account);
    }
  }, []);
  // useEffect(() => {
  //   isWalletConnected()
  // }, []);
  return (
    <div className="min-h-screen realtive">
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
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
