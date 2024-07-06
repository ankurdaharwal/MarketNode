declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PRIVATE_KEY: string;
      MUMBAI_TESTNET?: string;
      POLYGON_MAINNET?: string;
      ETH_MAINNET?: string;
      CONTRACT_ADDRESS: string;
      POLYGONSCAN_API_KEY?: string;
      ETHERSCAN_API_KEY?: string;
    }
  }
}

// If this file has no import/export statements (i.e. is a script)
// convert it into a module by adding an empty export statement.
export {};
