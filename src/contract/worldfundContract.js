import { ethers } from "ethers";
import { sendNotification } from "../util/epns";
import { WORLDFUND_CONTRACT } from "./metadata";

// const getSigner = async () => {
//   let signer;
//   await window.ethereum.enable();
//   const provider = new ethers.providers.Web3Provider(window.ethereum);
//   signer = provider.getSigner();
//   return signer;
// };

// https://dapp-world.com/smartbook/how-to-use-ethers-with-polygon-k5Hn
export async function deployContract(provider, title, description, fundAddress, proof) {
  // const signer = await getSigner();
  const signer = provider.getSigner();

  //   https://dev.to/yosi/deploy-a-smart-contract-with-ethersjs-28no

  // Create an instance of a Contract Factory
  const factory = new ethers.ContractFactory(
    WORLDFUND_CONTRACT.abi,
    WORLDFUND_CONTRACT.bytecode,
    signer
  );

  const validatedAddress = ethers.utils.getAddress(fundAddress);

  // Start deployment, returning a promise that resolves to a contract object
  // const gasPrice = await provider.getGasPrice()
  // const options = { gasPrice: gasPrice.toNumber(), gasLimit: 1000000 }
  const contract = await factory.deploy(title, description, validatedAddress, proof || '');
  await contract.deployed();
  console.log("Contract deployed to address:", contract.address);
  return contract;
}

export const validAddress = (addr) => {
  try {
    ethers.utils.getAddress(addr);
    return true;
  } catch (e) {
    return false;
  }
};

export const submitPayment = async (provider, contractAddress, amount, message, owner) => {
  if (!contractAddress) {
    return {};
  }
  const signer = provider.getSigner();
  const worldfundContract = new ethers.Contract(
    contractAddress,
    WORLDFUND_CONTRACT.abi,
    signer
  );
  const options = {value: ethers.utils.parseEther(amount)}
  let result = {}
  // result = await worldfundContract.donate(message || '', options);
  const title = "New donation!"

  const tx = await sendNotification({recipientAddress: owner, title, message: message || title, cta: window.location.href})
  return result;
};
