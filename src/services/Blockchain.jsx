import address from "../artifacts/contractAddress.json";
import abi from "../artifacts/src/contracts/NeedFund.sol/NeedFund.json";
import { getGlobalState, setGlobalState } from "../backend/index.jsx";
import { ethers } from "ethers";
import { Utils } from "alchemy-sdk";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;

const connectWallet = async () => {
  try {
    if (!ethereum) {
      return alert("Please install Metamask");
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    if (accounts[0]) {
      localStorage.setItem("connectedAccount", accounts[0]?.toLowerCase());
    }
  } catch (error) {
    reportError(error);
  }
};

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");
  if (connectedAccount) {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } else {
    return getGlobalState("contract");
  }
};

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiredAt,
}) => {
  // console.log(getEthereumContract());
  try {
    if (!ethereum) {
      return alert("Please install Metamask");
    }
    const contract = await getEthereumContract();
    let costNeeded = Utils.parseEther(cost).toString();
    console.log(costNeeded);
    await contract.createProject(
      title,
      description,
      imageURL,
      costNeeded,
      expiredAt
    );
    console.log("bisa");
    window.location.reload();
  } catch (error) {
    console.log("error");
    reportError(error);
  }
};

const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getEthereumContract();
    const projects = await contract.getProjects();
    // const stats = await contract.stats();
    // setGlobalState('projects', structuredProjects(projects));
  } catch (error) {
    reportError(error);
  }
};

// const isWalletConnected = async () => {
//   try {
//     if (!ethereum) return alert("Please install Metamask");

//     const accounts = await ethereum.request({ method: "eth_accounts" });
//     setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
//     const storedAdress = localStorage.getItem("connectedAccount");

//     if (storedAdress && ethers.isAddress(storedAdress)) {
//       setGlobalState("connectedAccount", storedAdress);
//     }
//     else {
//       console.log("No valid connected account found.");
//     }

//     window.ethereum.on("chainChanged", (chainId) => {
//       window.location.reload();
//     });
//     window.ethereum.on("accountsChanged", async () => {
//       setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
//       await isWalletConnected();
//     });

//   } catch (error) {
//     reportError(error);
//   }
// };

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { connectWallet, createProject };
