import "@nomicfoundation/hardhat-chai-matchers";
import "@nomiclabs/hardhat-etherscan";
import "@primitivefi/hardhat-dodoc";
import "@typechain/hardhat";
import { config as dotenvConfig } from "dotenv";
import "hardhat-gas-reporter";
import "hardhat-tracer";
import { HardhatUserConfig } from "hardhat/config";
import { NetworkUserConfig } from "hardhat/types";
import { resolve } from "path";
import "solidity-coverage";
import yargs from "yargs";

import "./tasks/accounts";

// import "./tasks/deploy";

const parser = yargs
  .option("network", {
    type: "string",
    default: "hardhat",
  })
  .help(false)
  .version(false);

dotenvConfig({ path: resolve(__dirname, "./.env") });

// Ensure that we have all the environment variables we need.
const { INFURA_API_KEY, MNEMONIC, ETHERSCAN_API_KEY, PK } = process.env;

const DEFAULT_MNEMONIC =
  "candy maple cake sugar pudding cream honey rich smooth crumble sweet treat";

(async() => {
  const argv = await parser.argv;
  if (["goerli", "rinkeby", "mainnet"].includes(argv.network) && INFURA_API_KEY === undefined) {
    throw new Error(
      `Could not find Infura key in env, unable to connect to network ${argv.network}`,
    );
  }
})();

const chainIds = {
  "harmony-mainnet": 1666600000,
  "harmony-devnet": 1666900000,
  hardhat: 31337,
  mainnet: 1,
  rinkeby: 4,
  goerli: 5,
  ganache: 1337,
  "skaleTestnet": 344106930
  // "arbitrum-mainnet": 42161,
  // avalanche: 43114,
  // bsc: 56,
  // "optimism-mainnet": 10,
  // "polygon-mainnet": 137,
  // "polygon-mumbai": 80001,
};

function getChainConfig(
  chain: keyof typeof chainIds,
): NetworkUserConfig {
  let jsonRpcUrl: string;
  switch (chain) {
    case "harmony-mainnet":
      jsonRpcUrl = "https://api.s0.t.hmny.io";
      break;
    case "harmony-devnet":
      jsonRpcUrl = "https://api.s0.ps.hmny.io";
      break;
    case "ganache":
      jsonRpcUrl = "http://localhost:8545/";
      break;
    case "skaleTestnet":
      jsonRpcUrl = "https://staging-v3.skalenodes.com/v1/staging-utter-unripe-menkar";
      break;
    default:
      jsonRpcUrl =
        "https://" + chain + ".infura.io/v3/" + INFURA_API_KEY;
  }
  if (PK) {
    return {
      accounts: [PK],
      chainId: chainIds[chain],
      url: jsonRpcUrl,
    };
  } else {
    return {
      accounts: {
        mnemonic: MNEMONIC || DEFAULT_MNEMONIC,
      },
      chainId: chainIds[chain],
      url: jsonRpcUrl,
    };
  }
}

const config: HardhatUserConfig = {
  defaultNetwork: "hardhat",
  etherscan: {
    apiKey: {
      harmonyDevnet: "your API key",
      harmony: "your API key",
      mainnet: ETHERSCAN_API_KEY || "",
      rinkeby: ETHERSCAN_API_KEY || ""
    },
    customChains: [
      {
        network: "harmonyDevnet",
        chainId: 1666900000,
        urls: {
          apiURL:
            "https://ctrver.b.hmny.io/verify?network=devnet",
          browserURL: "https://api.s0.ps.hmny.io",
        },
      },
    ],
  },
  gasReporter: {
    enabled: !!(
      process.env.REPORT_GAS &&
      process.env.REPORT_GAS != "false"
    ),
    showTimeSpent: true,
    showMethodSig: true,
    token: "ONE",
    currency: "USD",
    // gasPriceApi: process.env.GASPRICE_API_ENDPOINT,
    coinmarketcap: process.env.COINMARKETCAP_API_KEY,
    excludeContracts: [],
    src: "./contracts",
  },
  networks: {
    harmony: getChainConfig("harmony-mainnet"),
    harmonyDev: getChainConfig("harmony-devnet"),
    mainnet: getChainConfig("mainnet"),
    goerli: getChainConfig("goerli"),
    rinkeby: getChainConfig("rinkeby"),
    ganache: getChainConfig("ganache"),
    skaleTestnet: getChainConfig("skaleTestnet")
  },
  paths: {
    artifacts: "./artifacts",
    cache: "./cache",
    sources: "./contracts",
    tests: "./test",
  },
  solidity: {
    version: "0.8.16",
    settings: {
      metadata: {
        bytecodeHash: "none",
      },
      optimizer: {
        enabled: true,
        runs: 800,
      },
    },
  },
  typechain: {
    outDir: "src/types",
    target: "ethers-v5",
  },
  dodoc: {
    runOnCompile: !!(
      process.env.GEN_DOCS && process.env.GEN_DOCS != "false"
    ),
    // debugMode: false,
  },
};

export default config;
