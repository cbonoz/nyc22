import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ACTIVE_CHAIN, MUMBAI_RPC, INFURA_ID, RPC_URL } from "../util/constants";

export const web3ModalSetup = () =>
  new Web3Modal({
    network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
    cacheProvider: false, // optional
    theme: "light", // optional. Change to "dark" for a dark theme.
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
          bridge: "https://polygon.bridge.walletconnect.org",
          chainId: ACTIVE_CHAIN.id + "",
          infuraId: INFURA_ID,
        //   rpcUrl: ACTIVE_CHAIN.rpcUrl,
          rpc: {
            80001: "https://polygon-mumbai.infura.io/v3",
            4: "https://kovan.infura.io/v3",
            31337: "http://localhost:8545",
            137: "https://polygon-mainnet.infura.io/v3"
          },
        },
      },
    }
})