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
  const connectedAccount = localStorage.getItem("connectedAccount");
  console.log("c");
  if (connectedAccount) {
    console.log("d");
    const provider = new ethers.BrowserProvider(ethereum);
    console.log("e");
    const signer = await provider.getSigner();
    console.log("f");
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    console.log("g");
    return contract;
  } else {
    console.log("h");
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
    console.log("a");
    const contract = await getEthereumContract();
    console.log("b");
    const projects = await contract.getProjects();
    console.log(projects);
    structuredProjects(projects);
    await loadProjects();
    console.log("d");
  } catch (error) {
    reportError(error);
  }
};

const structuredProjects = async (projects) => {
  const arrOfProject = projects.map((project) => ({
    index: parseInt(project.index),
    owner: project.owner.toLowerCase(),
    projectTitle: project.projectTitle,
    projectDescription: project.projectDescription,
    projectImageURL: project.projectImageURL,
    cost: parseInt(project.cost._hex) / 10 ** 18,
    raised: parseInt(project.raised._hex) / 10 ** 18,
    totalRaisedSoFar: parseInt(project.totalRaisedSoFar._hex) / 10 ** 18,
    timestamp: new Date(parseInt(project.timestamp)).getTime(),
    expiredAt: new Date(parseInt(project.expiredAt)).getTime(),
    backers: parseInt(project.backers),
    status: project.status,
  }));
  setGlobalState("projects", arrOfProject);
  console.log("ha : " + Array.isArray(arrOfProject));
  localStorage.setItem("projects", arrOfProject);
  console.log("hw " + localStorage.getItem("projects"));  
  console.log(Array.isArray(arrOfProject) + "hohoho");
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

export { connectWallet, createProject, loadProjects };
