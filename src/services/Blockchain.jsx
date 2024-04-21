import address from "../artifacts/contractAddress.json";
import abi from "../artifacts/src/contracts/NeedFund.sol/NeedFund.json";
import {
  getGlobalState,
  setGlobalState,
  useGlobalState,
} from "../backend/index.jsx";
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
    await ethereum.enable();
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    localStorage.setItem("connectedAccount", accounts[0]?.toLowerCase());
    await getAndUseEthereumContract();
    window.location.href = "/home";
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
    // const [connectedAccount] = useGlobalState("connectedAccount");
    // console.log(connectedAccount);
    console.log("d");
    const provider = new ethers.BrowserProvider(ethereum);
    // await ethereum.enable();
    console.log("e");
    const signer = await provider.getSigner();
    console.log("f");
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    console.log("g");
    console.log(contract);
    return contract;
  } catch (error) {
    reportError(error);
  }
};

const loadProjects = async () => {
  try {
    if (!ethereum) return alert("Please install Metamask");
    console.log("a");
    const contract = localStorage.getItem("ethereumContract");
    const contractAfterParsed = JSON.parse(contract);
    console.log(contractAfterParsed);
    console.log(contract);
    console.log("b");
    const projects = await contractAfterParsed.getProjects();
    console.log(projects);
    structuredProjects(projects);
    console.log("d");
  } catch (error) {
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
  localStorage.setItem("projects", arrOfProject);
  console.log("heee " + localStorage.getItem("projects"));
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

export { connectWallet, createProject, loadProjects, disconnectWallet };
