import WalletConnectProvider from "@walletconnect/web3-provider";
import Web3Modal from "web3modal";
import { ACTIVE_CHAIN, MUMBAI_RPC, INFURA_ID, RPC_URL } from "../util/constants";

const infuraTokens = MUMBAI_RPC.split('/')
const infuraId = infuraTokens[infuraTokens.length - 1]
console.log('inf', infuraId, MUMBAI_RPC)

export const web3ModalSetup = () =>
  new Web3Modal({
    network: "mainnet", // Optional. If using WalletConnect on xDai, change network to "xdai" and add RPC info below for xDai chain.
    // cacheProvider: true, // optional
    theme: "light", // optional. Change to "dark" for a dark theme.
    providerOptions: {
      walletconnect: {
        package: WalletConnectProvider, // required
        options: {
        //   bridge: "https://polygon.bridge.walletconnect.org",
          chainId: ACTIVE_CHAIN.id,
        //   rpcUrl: ACTIVE_CHAIN.rpcUrl,
          rpc: {
            // 10: "https://mainnet.optimism.io", // xDai
            // 100: "https://rpc.gnosischain.com", // xDai
            137: "https://polygon-rpc.com",
            // 31337: "http://localhost:8545",
            // 42161: "https://arb1.arbitrum.io/rpc",
            80001: MUMBAI_RPC,
            // 71401: "https://godwoken-testnet-v1.ckbapp.dev",
          },
        },
      },
    }
})