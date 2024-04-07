import React from "react";
import { Link } from "react-router-dom";
import { connectWallet } from "../services/Blockchain.jsx";
import { truncate, useGlobalState } from "../backend/index.jsx";

const Header = () => {
  const [connectedAccount] = useGlobalState('connectedAccount')
  return (
    <header className="flex justify-between items-center p-5 bg-white shadow-lg fixed top-0 left-0 right-0">
      <Link
        to="/"
        className="flex justify-start items-center text-xl text-black space-x-1"
      >
        <span>NeedFund</span>
      </Link>
      <div className="flex space-x-2 justify-center">
        {connectedAccount ? (
          <button
          type="button"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700"
          onClick={connectWallet}
        >
          {" "}
          {truncate(connectedAccount, 4, 4, 11)}
        </button>
        ) : (
          <button
          type="button"
          className="inline-block px-6 py-2.5 bg-indigo-600 text-white font-medium rounded-full shadow-md hover:bg-indigo-700"
          onClick={connectWallet}
        >
          {" "}
          Connect Wallet{" "}
        </button>
        )}
        
      </div>
    </header>
  );
};

export default Header;
