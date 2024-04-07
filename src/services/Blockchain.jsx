import address from "../artifacts/contractAddress.json";
import abi from "../artifacts/src/contracts/NeedFund.sol/NeedFund.json";
import { getGlobalState, setGlobalState } from "../backend/index.jsx";
import { ethers } from "ethers"

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
  } catch (error) {
    reportError(error);
  }
};

const getEthereumContract = async () => {
  const connectedAccount = getGlobalState("connectedAccount");

  if (connectedAccount) {
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = provider.getSigner();
    const contract = new ethers.Contract(contractAddress, contractAbi, signer);
    return contract;

  } else {
    return getGlobalState("contract");
  }
};

const createProject = async({
  title,
  description,
  imageURL,
  cost,
  expiredAt
}) => {
  console.log(getEthereumContract())
  try {
    if (!ethereum) {
      return alert("Please install Metamask")
    }
    const contract = await getEthereumContract();
    cost = ethers.parseEther(cost)
    await contract.createProject(title, description, imageURL, cost, expiredAt)
    // await loadProjects()
    window.location.reload()
  }
  catch (error) {
    console.log("error")
    reportError(error);
  }
}

const isWalletConnected = async () => {
  try {
    if (!ethereum) {
      return alert("Please install Metamask");
    }
    const accounts = await ethereum.request({
      method: "eth_requestAccounts",
    });
    setGlobalState("connectedAccount", accounts[0]?.toLowerCase());

    window.ethereum.on("chainChanged", (chainId) => {
      window.location.reload();
    });

    window.ethereum.on("accountsChanged", async () => {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
      await isWalletConnected();
    });

    if (accounts.length) {
      setGlobalState("connectedAccount", accounts[0]?.toLowerCase());
    } else {
      alert("Please connect wallet.");
      console.log("No accounts found");
    }
  } catch (error) {
    reportError(error);
  }
};

const reportError = (error) => {
  console.log(error.message);
  throw new Error("No ethereum object")
};

export { connectWallet, isWalletConnected, createProject };