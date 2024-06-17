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
const alchemyAPI = import.meta.env.SEPOLIA_RPC_URL;
const providerToLoad = new AlchemyProvider("sepolia", "IFkGnzKHWzUGjcgOCKaWIFxSVFRonXyq");

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
    console.log("kiw")
    const provider = new ethers.BrowserProvider(ethereum);
    console.log("kiww")
    const signer = await provider.getSigner();
    console.log(signer);
    console.log("kiwww")
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    console.log(contract);
    console.log("hehe");
    return contract;
  } catch (error) {
    reportError(error);
  }
};

const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    console.log("hehe");
    const contract = await getLoadContract();
    console.log("hoho");
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
    console.log("hehehe");
    await contract.createProject(
      title,
      description,
      imageURL,
      costNeeded,
      expiredAt
    );
    console.log("aman");
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
    // ubah ke string
    cost: (parseInt(project.cost._hex) / 10 ** 18).toString(), 
    raised: (parseInt(project.raised._hex) / 10 ** 18).toString(),
    totalRaisedSoFar: (parseInt(project.totalRaisedSoFar._hex) / 10 ** 18).toString(),
    timestamp: (new Date(parseInt(project.timestamp)).getTime()).toString(),
    expiredAt: (new Date(parseInt(project.expiredAt)).getTime()).toString(),
    backers: (parseInt(project.backers)).toString(),
    status: (project.status).toString(),
  }));
  setGlobalState("projects", arrOfProject);
  localStorage.setItem("projects", JSON.stringify(arrOfProject));
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object.");
};

export { connectWallet, createProject, loadProjects, disconnectWallet };
