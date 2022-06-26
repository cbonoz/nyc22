import WalletConnectProvider from "@walletconnect/web3-provider";
import { providers } from "ethers";
import { MUMBAI_RPC, RPC_ID, RPC_URL } from "./constants";

export const resetWalletConnector = (connector) => {
  if (
    connector &&
    connector.walletConnectProvider?.wc?.uri
  ) {
    connector.walletConnectProvider = undefined
  }
}

export const initWeb3 = async () => {
    console.log('initWeb3', RPC_ID)
    const provider = new WalletConnectProvider({
      rpc: {
        80001: MUMBAI_RPC
      },
      qrcode: true,
    });
    //  Create WalletConnect Provider
    // https://docs.walletconnect.com/quick-start/dapps/web3-provider#infura-id
  
    //  Enable session (triggers QR Code modal)
    try {
      const c = await provider.getWalletConnector()
      resetWalletConnector(c)
    } catch (e) {}
    await provider.enable()
    // web3Provider = new Web3(provider)


    //  Wrap with Web3Provider from ethers.js
    return new providers.Web3Provider(provider);
}