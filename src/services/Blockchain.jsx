import address from "../artifacts/contractAddress.json";
import abi from "../artifacts/src/contracts/NeedFund.sol/NeedFund.json";
import {
  getGlobalState,
  setGlobalState,
  useGlobalState,
} from "../backend/index.jsx";
import { AlchemyProvider, ethers } from "ethers";
import { Utils } from "alchemy-sdk";

const { ethereum } = window;
const contractAddress = address.address;
const contractAbi = abi.abi;
const network = import.meta.env.VITE_NETWORK;
const apiKey = import.meta.env.VITE_ALCHEMY_API_KEY;
const providerToLoad = new AlchemyProvider(network, apiKey);

const connectWallet = async () => {
  try {

    if (!ethereum) {
      return alert("Please install a compatible Web3 wallet (like Metamask)");
    }

    const accounts = await ethereum.request({ method: "eth_requestAccounts" });
    console.log("hahah");

    if (!accounts || accounts.length === 0) {
      return alert("No accounts connected. Please connect a wallet.");
    }

    const connectedAccount = accounts[0].toLowerCase();
    setGlobalState("connectedAccount", connectedAccount);
    localStorage.setItem("connectedAccount", connectedAccount);

    await getAndUseEthereumContract();

  } catch (error) {
    reportError(error); 
  }
};


const disconnectWallet = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    setGlobalState("connectedAccount", "");
    localStorage.removeItem("connectedAccount");
  } catch (error) {
    reportError(error);
  }
};

const getAndUseEthereumContract = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask.");
    const contract = await getEthereumContract();
    localStorage.setItem("ethereumContract", JSON.stringify(contract));
    console.log(localStorage.getItem("ethereumContract"));
  } catch (error) {
    reportError(error);
  }
};

const getEthereumContract = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask.");
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;
  } catch (error) {
    reportError(error);
  }
};

const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    const contract = await getLoadContract();
    const projects = await contract.getProjects();
    structuredProjects(projects);
  } catch (error) {
    reportError(error);
  }
};

const getLoadContract = async () => {
  try {
    if (!ethereum) {
      return alert("Please install Metamask!");
    }
    const contract = new ethers.Contract(contractAddress, contractAbi, providerToLoad);
    return contract;
  }
  catch (error) {
    reportError(error);
  }
};

const createProject = async ({
  title,
  description,
  imageURL,
  cost,
  expiredAt,
}) => {

  try {
    if (!ethereum) {
      return alert("Please install Metamask");
    }
    const contract = await getEthereumContract();
    let costNeeded = Utils.parseEther(cost).toString();
    await contract.createProject(
      title,
      description,
      imageURL,
      costNeeded,
      expiredAt
    );
    window.location.reload();
  } catch (error) {
    console.log("error");
    reportError(error);
  }

};

const structuredProjects = async (projects) => {
  const arrOfProject = projects.map((project) => ({
    index: (parseInt(project.index)).toString(),
    owner: project.owner.toLowerCase(),
    projectTitle: project.projectTitle,
    projectDescription: project.projectDescription,
    projectImageURL: project.projectImageURL,
    cost: parseInt(project.cost) / 10 ** 18, 
    raised: parseInt(project.raised) / 10 ** 18,
    totalRaisedSoFar: parseInt(project.totalRaisedSoFar) / 10 ** 18,
    timestamp: (new Date(parseInt(project.timestamp)).getTime()).toString(),
    expiredAt: (new Date(parseInt(project.expiredAt)).getTime()).toString(),
    backers: parseInt(project.backers),
    status: (project.status).toString(),
  }));
  setGlobalState("projects", arrOfProject);
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { connectWallet, createProject, loadProjects, disconnectWallet };
