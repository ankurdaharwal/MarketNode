# Market Node - Assignment

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg?cacheSeconds=2592000)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](#)
[![Twitter: An1cu12](https://img.shields.io/twitter/follow/an1cu12.svg?style=social)](https://twitter.com/An1cu12)

## Setup
- `yarn`

## Environment File (.env)
- POLYGON_MAINNET: Polygon Mainnet Provider RPC endpoint
- AMOY_TESTNET: Polygon (Amoy) Testnet Provider RPC endpoint
- ETH_MAINNET: Ethereum Mainnet Provider RPC endpoint
- PRIVATE_KEY: Private key for the deployer account
- CONTRACT_ADDRESS: ERC-20 Token Smart Contract Address
- POLYGONSCAN_API_KEY?: PolygonScan Blockchain Explorer API Key
- ETHERSCAN_API_KEY?: EtherScan Blockchain Explorer API Key

## Compile & migrate (Deploy) the ERC-20 Token Smart Contract
- `yarn deploy` (Deploy the Smart Contracts to Amoy Polygon PoS Testnet)
- Copy the artifacts JSON file from `artifacts/contracts/MarketNodeToken.sol/MarketNodeToken.json` to `src/abi/MarketNodeToken.json`

## Test the ERC-20 Token Smart Contract functionalities
- `yarn test`

## Compile REST API Server
- `yarn compile`

## Start the API Server
- `yarn start`

## Features
- 📦 [Hardhat](https://hardhat.org/) - Ethereum development environment for professionals
- 🦾 [TypeChain Hardhat plugin](https://github.com/ethereum-ts/TypeChain/tree/master/packages/hardhat) - Automatically generate TypeScript bindings for smartcontracts while using Hardhat.
- 🎨 [OpenZeppelin](https://docs.openzeppelin.com/contracts/4.x/) - standard for secure blockchain applications

## Author

👤 **Ankur Daharwal**

- Website: [Ankur's Portfolio](https://ankurdaharwal.wixsite.com/blockchain)
- Twitter: [@An1cu12](https://twitter.com/An1cu12)
- Github: [@ankurdaharwal](https://github.com/ankurdaharwal)

## Show your support

Give a ⭐️ if you liked this project and ☕ for me if you loved it!

[![ko-fi](https://ko-fi.com/img/githubbutton_sm.svg)](ko-fi.com/an1cu12)
