import { col } from ".";

export const COVALENT_KEY = process.env.REACT_APP_COVALENT_KEY; // covalent api key
export const NFT_PORT_KEY = process.env.REACT_APP_NFT_PORT_KEY; // nft port key

// Flag.
export const USE_IPFS = true || process.env.REACT_APP_USE_IPFS;
export const USE_WORLD = false || process.env.REACT_APP_USE_WORLD;

export const APP_NAME = "Worldfund";
export const APP_DESC = "Create human-verified fundraise pages hosted on web3"

export const CONVOS = [
  "0xFc62E94af9aBd25a1D7abfe00F7034Cf154BbBD9",
  "0x06045177CA0aE933Be741D9016Cf8d6B056662AE",
  "0xc257274276a4e539741ca11b590b9447b26a8051"
]

export const BASE_CONVO= []

export const HISTORY_COLUMNS = [
  col("tx_hash", (row) => `${row.substr(0, 6)}**`),
  col("from_address"),
  col("value"),
  col("block_signed_at",
    (row) =>
      `${new Date(row).toLocaleDateString()} ${new Date(
        row
      ).toLocaleTimeString()}`
  ),
];

export const INFURA_ID = process.env.REACT_APP_INFURA_ID;

export const getInfuraUrl = (baseUrl) => `${baseUrl}/${INFURA_ID}`

export const CHAIN_OPTIONS = {
  80001: {
    name: "Mumbai",
    url: "https://mumbai.polygonscan.com/",
    rpcUrl: getInfuraUrl("https://polygon-mumbai.infura.io/v3"),
    id: 80001,
  },
  137: {
    name: "Matic Mainnet",
    url: "https://polygonscan.com/",
    rpcUrl: getInfuraUrl("https://polygon-mainnet.infura.io/v3"),
    id: 137,
  },
  42: { 
    name: "kovan", url: "https://kovan.etherscan.io/", id: 42, rpcUrl: getInfuraUrl("https://kovan.infura.io/v3")
 },
};

export const CHAIN_IDS = Object.keys(CHAIN_OPTIONS)

// 1: { name: "ethereum", url: "https://etherscan.io/tx/", id: 1 },
// 4: { name: "rinkeby", url: "https://rinkeby.etherscan.io/tx/", id: 4 },


export const ACTIVE_CHAIN = CHAIN_OPTIONS["42"]; // Specify active chain


export const CATEGORIES = [
  "Community", "Environment", "Business", "Competition", "Creative", "Event", "Faith", "Family", "Travel", "Volunteer", "Medical", "Education", "Gift", "Other"
]

export const EXAMPLE_FORM = {
  title: "John Smith is looking for donations",
  description: "I help clients by writing motivational pieces and video content. Your donations help keep me going.",
  fundAddress: "0xD7e02fB8A60E78071D69ded9Eb1b89E372EE2292",
  files: [],
  worldId: {},
  category: CATEGORIES[0]
};



export const IPFS_BASE_URL = "https://ipfs.io/ipfs"

console.log("config", COVALENT_KEY, NFT_PORT_KEY, ACTIVE_CHAIN, INFURA_ID);
